import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { componentConfigs } from "./configs/index";
import { generatedComponents } from "./generated";
import "./styles.css";

/**
 * Interpolates template expressions using the props state.
 * SECURITY NOTE: Uses `new Function` to evaluate template expressions.
 * This is designed for internal-only documentation usage with trusted inputs.
 * Do not expose this function to execute untrusted user-supplied string data.
 */
export function interpolate(template, props) {
  if (!template) return "";

  let result = "";
  let i = 0;
  while (i < template.length) {
    if (template[i] === "$" && template[i + 1] === "{") {
      let braceCount = 1;
      let start = i + 2;
      let j = start;
      while (j < template.length && braceCount > 0) {
        if (template[j] === "{") {
          braceCount++;
        } else if (template[j] === "}") {
          braceCount--;
        }
        j++;
      }
      if (braceCount === 0) {
        const expr = template.substring(start, j - 1);
        try {
          const fn = new Function("props", `return ${expr.trim()};`);
          const val = fn(props);
          result +=
            typeof val === "string"
              ? interpolate(val, props)
              : val !== undefined && val !== null
                ? val
                : "";
        } catch (e) {
          console.error("Expression evaluation error:", expr, e);
        }
        i = j;
        continue;
      }
    }
    result += template[i];
    i++;
  }
  return result;
}

// Fallback configuration if component config is missing
const fallbackConfig = (name) => ({
  title: name,
  props: [
    {
      name: "content",
      label: "Mock HTML Content",
      type: "textarea",
      default: `<div class="p-3 text-center border rounded bg-light">${name} Preview</div>`,
    },
  ],
  renderRazor: (props) =>
    `@await Html.PartialAsync("~/Views/Shared/UI/_${name}.cshtml")`,
  renderHtml: (props) => props.content,
});

export default function Playground({ componentName }) {
  const { colorMode } = useColorMode();
  // 1. Resolve configuration
  const config =
    componentConfigs[componentName] || fallbackConfig(componentName);

  // Helper to determine if a prop is required
  const isPropRequired = (prop) => prop.required === true;

  // 2. Initialize properties state & errors state
  const initialValues = {};
  const initialErrors = {};
  config.props.forEach((p) => {
    initialValues[p.name] = p.default;
    initialErrors[p.name] = null;
  });

  const [propsState, setPropsState] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [direction, setDirection] = useState("rtl"); // Default to RTL for Momah components
  const [activeCodeTab, setActiveCodeTab] = useState("razor"); // 'razor' | 'html'
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleError = (e) => {
      const msg = e.message || (e.reason && e.reason.message) || '';
      if (
        msg &&
        (msg.includes("ResizeObserver loop completed with undelivered notifications") ||
          msg.includes("ResizeObserver loop limit exceeded"))
      ) {
        e.stopImmediatePropagation();
        e.preventDefault();
      }
    };
    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleError, true);
    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleError, true);
    };
  }, []);

  // 3. Handle prop changes with validation
  const handlePropChange = useCallback((name, value) => {
    const propConfig = config.props.find((p) => p.name === name);
    let errorMsg = null;

    if (propConfig) {
      const required = isPropRequired(propConfig);
      if (
        required &&
        (value === undefined || value === null || String(value).trim() === "")
      ) {
        errorMsg = "هذا الحقل مطلوب (Required)";
      } else if (propConfig.type === "number") {
        const num = Number(value);
        if (isNaN(num)) {
          errorMsg = "يجب أن يكون رقماً (Must be a number)";
        } else {
          if (propConfig.min !== undefined && num < propConfig.min) {
            errorMsg = `الحد الأدنى ${propConfig.min} (Min: ${propConfig.min})`;
          }
          if (propConfig.max !== undefined && num > propConfig.max) {
            errorMsg = `الحد الأقصى ${propConfig.max} (Max: ${propConfig.max})`;
          }
        }
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));

    setPropsState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, [config]);

  // 4. Generate snippets (memoized — prevents expensive re-computation on unrelated renders)
  const gen = useMemo(
    () =>
      config.useGeneratedMarkup && generatedComponents[componentName]
        ? generatedComponents[componentName]
        : null,
    [config, componentName],
  );

  const razorCode = useMemo(
    () => (config.renderRazor ? config.renderRazor(propsState) : ""),
    [config, propsState],
  );

  const htmlCode = useMemo(() => {
    const raw =
      gen && gen.markup
        ? interpolate(gen.markup, propsState)
        : config.renderHtml
          ? config.renderHtml(propsState)
          : "";
    return raw.replace(/@await\s+Html\.PartialAsync\s*\([^)]*\);?/gi, "");
  }, [gen, config, propsState]);

  // Debounce iframe updates to prevent lag during fast typing/input changes
  const [debouncedParams, setDebouncedParams] = useState({
    htmlCode,
    propsState,
    direction,
    colorMode,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams({
        htmlCode,
        propsState,
        direction,
        colorMode,
      });
    }, 250);

    return () => clearTimeout(handler);
  }, [htmlCode, propsState, direction, colorMode]);

  // 5. Update iframe srcdoc
  useEffect(() => {
    if (!iframeRef.current) return;

    const doc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow.document;
    if (!doc) return;

    const {
      htmlCode: debouncedHtml,
      propsState: debouncedProps,
      direction: debouncedDir,
      colorMode: debouncedMode,
    } = debouncedParams;

    const componentCss =
      gen && gen.css ? interpolate(gen.css, debouncedProps) : config.css || "";
    const componentJs =
      gen && gen.js ? interpolate(gen.js, debouncedProps) : config.js || "";

    const srcDoc = `
      <!DOCTYPE html>
      <html lang="ar" dir="${debouncedDir}" data-bs-theme="${debouncedMode}">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script>
            window.addEventListener('error', function(e) {
              const msg = e.message || (e.reason && e.reason.message) || '';
              if (
                msg &&
                (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
                  msg.includes('ResizeObserver loop limit exceeded'))
              ) {
                e.stopImmediatePropagation();
                e.preventDefault();
              }
            }, true);
            window.addEventListener('unhandledrejection', function(e) {
              const msg = e.message || (e.reason && e.reason.message) || '';
              if (
                msg &&
                (msg.includes('ResizeObserver loop completed with undelivered notifications') ||
                  msg.includes('ResizeObserver loop limit exceeded'))
              ) {
                e.stopImmediatePropagation();
                e.preventDefault();
              }
            }, true);
          </script>
          <!-- Load Bootstrap 5 -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
          <!-- Load Bootstrap Icons -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css" rel="stylesheet">
          <style>
            body {
              background: transparent;
              padding: 1.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 180px;
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
            }
            ${componentCss}
          </style>
        </head>
        <body>
          <div id="playground-component-root" style="width: 100%; display: flex; justify-content: center;">
            ${debouncedHtml}
          </div>
          <!-- Load jQuery & Bootstrap JS Bundle -->
          <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
          <script>
            // Mock calendars plugin for playground interactivity
            (function($) {
              if (!$) return;
              $.calendars = {
                instance: function(type) {
                  return {
                    formatDate: function(format, date) { return date; }
                  };
                }
              };
              $.fn.calendarsPicker = function(options) {
                var $el = this;
                var triggerId = options.showTrigger || '';

                function selectMockRange() {
                  const today = new Date().toISOString().split('T')[0];
                  const nextWeek = new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0];
                  const rangeVal = options.rangeSelect ? \`\${today} - \${nextWeek}\` : today;
                  $el.val(rangeVal);
                  $el.addClass('is-valid').removeClass('is-invalid');

                  // Hide error div if present
                  $("#" + $el.attr('id') + "-error").hide();

                  // Update calendar icon color
                  var $icon = $el.next('span').find('svg path');
                  if ($icon.length) $icon.attr('fill', '#28a745');

                  if (options.onSelect) {
                    options.onSelect(options.rangeSelect ? [today, nextWeek] : [today]);
                  }
                  $el.trigger('change');
                }

                $el.css('cursor', 'pointer').on('click', selectMockRange);
                if (triggerId) {
                  $(triggerId).on('click', selectMockRange);
                }
                return this;
              };
            })(window.jQuery);

            // Mock createCalendersWithRang for DateInput
            window.createCalendersWithRang = function(selector, min, max, type, range) {
              const $el = window.jQuery(selector);
              $el.css('cursor', 'pointer').on('click', function() {
                const today = new Date().toISOString().split('T')[0];
                $el.val(today);
                $el.addClass('is-valid').removeClass('is-invalid');
                $el.trigger('change');
              });
            };

            try {
              ${componentJs}
            } catch(e) {
              console.error(e);
            }
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(srcDoc);
    doc.close();

    // Auto-adjust iframe height to its contents after load
    iframeRef.current.onload = () => {
      const body = doc.querySelector("body");
      if (!body) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (iframeRef.current) {
            const bodyHeight = entry.target.scrollHeight;
            window.requestAnimationFrame(() => {
              if (iframeRef.current) {
                iframeRef.current.style.height = `${Math.max(bodyHeight + 40, 200)}px`;
              }
            });
          }
        }
      });

      resizeObserver.observe(body);

      // Store cleanup function on the DOM node to avoid race conditions
      iframeRef.current.cleanupObserver = () => resizeObserver.disconnect();
    };

    return () => {
      if (iframeRef.current && typeof iframeRef.current.cleanupObserver === "function") {
        iframeRef.current.cleanupObserver();
      }
    };
  }, [debouncedParams]);

  // 6. Handle Copy to Clipboard
  const handleCopy = useCallback(() => {
    const textToCopy = activeCodeTab === "razor" ? razorCode : htmlCode;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [activeCodeTab, razorCode, htmlCode]);

  return (
    <div className="pg-container">
      {/* Header controls */}
      <div className="pg-header">
        <h5 className="pg-header-title">
          {config.title || componentName} Preview
        </h5>
        <div className="pg-header-controls">
          <button
            type="button"
            className={`pg-btn ${direction === "rtl" ? "pg-btn-active" : ""}`}
            onClick={() => setDirection("rtl")}
            aria-label="Switch to RTL (Arabic) direction"
            aria-pressed={direction === "rtl"}
          >
            RTL (عربي)
          </button>
          <button
            type="button"
            className={`pg-btn ${direction === "ltr" ? "pg-btn-active" : ""}`}
            onClick={() => setDirection("ltr")}
            aria-label="Switch to LTR (English) direction"
            aria-pressed={direction === "ltr"}
          >
            LTR (English)
          </button>
        </div>
      </div>

      {/* Main body layout */}
      <div className="pg-body">
        {/* Preview Area */}
        <div className="pg-preview-pane">
          <iframe
            ref={iframeRef}
            className="pg-preview-frame"
            title={`${componentName} Live Preview`}
          />
        </div>

        {/* Props Controls sidebar */}
        <div className="pg-controls-pane">
          <h6 className="pg-controls-heading">Properties</h6>
          {config.props
            .filter((prop) => {
              if (prop.name === "maxFiles" && !propsState.multiple)
                return false;
              return true;
            })
            .map((prop) => (
              <div key={prop.name} className="pg-prop-group">
                {prop.type === "boolean" ? (
                  <label className="pg-checkbox-label">
                    <input
                      type="checkbox"
                      className="pg-checkbox"
                      checked={!!propsState[prop.name]}
                      onChange={(e) =>
                        handlePropChange(prop.name, e.target.checked)
                      }
                    />
                    {prop.label || prop.name}
                  </label>
                ) : (
                  <>
                    <label className="pg-prop-label">
                      {prop.label || prop.name}
                      {isPropRequired(prop) && (
                        <span className="pg-required-star">*</span>
                      )}
                    </label>
                    {prop.type === "select" ? (
                      <select
                        className={`pg-input ${errors[prop.name] ? "pg-input-error" : ""}`}
                        value={propsState[prop.name]}
                        onChange={(e) =>
                          handlePropChange(prop.name, e.target.value)
                        }
                      >
                        {prop.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : prop.type === "textarea" ? (
                      <textarea
                        className={`pg-input ${errors[prop.name] ? "pg-input-error" : ""}`}
                        rows={3}
                        value={propsState[prop.name]}
                        onChange={(e) =>
                          handlePropChange(prop.name, e.target.value)
                        }
                      />
                    ) : prop.type === "color" ? (
                      <div className="pg-color-input-wrapper">
                        <input
                          type="color"
                          className="pg-color-swatch"
                          aria-label={`Color picker for ${prop.label || prop.name}`}
                          value={propsState[prop.name]}
                          onChange={(e) =>
                            handlePropChange(prop.name, e.target.value)
                          }
                        />
                        <input
                          type="text"
                          className={`pg-input pg-color-input-text ${errors[prop.name] ? "pg-input-error" : ""}`}
                          value={propsState[prop.name]}
                          onChange={(e) =>
                            handlePropChange(prop.name, e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <input
                        type={prop.type === "number" ? "number" : "text"}
                        className={`pg-input ${errors[prop.name] ? "pg-input-error" : ""}`}
                        min={prop.min}
                        max={prop.max}
                        value={propsState[prop.name]}
                        onChange={(e) =>
                          handlePropChange(
                            prop.name,
                            prop.type === "number"
                              ? Number(e.target.value)
                              : e.target.value,
                          )
                        }
                      />
                    )}
                    {errors[prop.name] && (
                      <span className="pg-error-text">{errors[prop.name]}</span>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Code Snippets Viewer */}
      <div className="pg-footer">
        <div className="pg-tabs-nav">
          <button
            type="button"
            className={`pg-tab-btn ${activeCodeTab === "razor" ? "pg-tab-btn-active" : ""}`}
            onClick={() => setActiveCodeTab("razor")}
          >
            Razor Partial Syntax
          </button>
          <button
            type="button"
            className={`pg-tab-btn ${activeCodeTab === "html" ? "pg-tab-btn-active" : ""}`}
            onClick={() => setActiveCodeTab("html")}
          >
            Rendered HTML Markup
          </button>
        </div>
        <div className="pg-tab-content">
          <div className="pg-code-container">
            <button type="button" className="pg-copy-btn" onClick={handleCopy} aria-label="Copy code to clipboard">
              {copied ? "Copied! ✓" : "Copy"}
            </button>
            <pre
              className={`language-${activeCodeTab === "razor" ? "cshtml" : "html"}`}
              style={{
                margin: 0,
                padding: "1rem",
                overflowX: "auto",
                maxHeight: "200px",
              }}
            >
              <code>{activeCodeTab === "razor" ? razorCode : htmlCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
