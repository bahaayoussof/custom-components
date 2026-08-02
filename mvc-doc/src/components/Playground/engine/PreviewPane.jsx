import React, { useState, useEffect, useRef } from "react";

/**
 * PreviewPane — Sandboxed iframe component preview renderer.
 * Option 1 Architecture: Uses CSS container min-height + one-time onload height calculation.
 * Completely eliminates ResizeObserver to prevent layout loop error overlays.
 */
export default function PreviewPane({ config, propsState, direction, colorMode, componentName }) {
  const iframeRef = useRef(null);
  const [debouncedParams, setDebouncedParams] = useState({
    propsState,
    direction,
    colorMode,
  });

  // Debounce iframe updates to prevent lagging during typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams({ propsState, direction, colorMode });
    }, 150);
    return () => clearTimeout(handler);
  }, [propsState, direction, colorMode]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
    if (!doc) return;

    const { propsState: p, direction: dir, colorMode: mode } = debouncedParams;

    // Resolve HTML, CSS, JS
    const htmlCode = typeof config.renderHtml === "function" ? config.renderHtml(p) : "";
    const cssCode = typeof config.css === "function" ? config.css(p) : config.css || "";
    const jsCode = typeof config.js === "function" ? config.js(p) : config.js || "";

    const srcDoc = `
      <!DOCTYPE html>
      <html lang="ar" dir="${dir}" data-bs-theme="${mode}">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- Bootstrap 5 -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css" rel="stylesheet">
          ${config.iframeHeadExtra || ""}
          <style>
            body {
              background: transparent;
              padding: 1rem;
              display: flex;
              justify-content: center;
              align-items: flex-start;
              min-height: 100%;
              width: 100%;
              box-sizing: border-box;
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
            }

            /* --- UNIVERSAL DARK MODE COMPONENT FIXES --- */
            [data-bs-theme="dark"] {
              color-scheme: dark;
            }

            [data-bs-theme="dark"] body {
              color: #f8fafc;
            }

            [data-bs-theme="dark"] [style*="background: #F3F4F6"],
            [data-bs-theme="dark"] [style*="background:#F3F4F6"],
            [data-bs-theme="dark"] [style*="background-color: #F3F4F6"],
            [data-bs-theme="dark"] [style*="background: white"],
            [data-bs-theme="dark"] [style*="background: #fff"],
            [data-bs-theme="dark"] [style*="background:#fff"],
            [data-bs-theme="dark"] [style*="background-color: white"],
            [data-bs-theme="dark"] [style*="background-color: #ffffff"],
            [data-bs-theme="dark"] [style*="background-color:#fff"] {
              background-color: #1e293b !important;
              color: #f8fafc !important;
              border-color: #334155 !important;
            }

            [data-bs-theme="dark"] [style*="color: #54565B"],
            [data-bs-theme="dark"] [style*="color: #6C737F"],
            [data-bs-theme="dark"] [style*="color: #667085"],
            [data-bs-theme="dark"] [style*="color: #1F2937"],
            [data-bs-theme="dark"] [style*="color: #111827"],
            [data-bs-theme="dark"] [style*="color:#54565B"],
            [data-bs-theme="dark"] [style*="color:#6C737F"],
            [data-bs-theme="dark"] [style*="color:#1F2937"],
            [data-bs-theme="dark"] [style*="color:#111827"] {
              color: #e2e8f0 !important;
            }

            [data-bs-theme="dark"] .btn-light,
            [data-bs-theme="dark"] button.border,
            [data-bs-theme="dark"] .btn-outline-secondary {
              background-color: #334155 !important;
              color: #f8fafc !important;
              border-color: #475569 !important;
            }

            [data-bs-theme="dark"] .card,
            [data-bs-theme="dark"] .ab-card,
            [data-bs-theme="dark"] .attachment-card,
            [data-bs-theme="dark"] [style*="border: 2px solid #E2ECF9"],
            [data-bs-theme="dark"] .modal-content,
            [data-bs-theme="dark"] .modal-body,
            [data-bs-theme="dark"] .dropdown-menu,
            [data-bs-theme="dark"] .cs-trigger,
            [data-bs-theme="dark"] .cs-dropdown,
            [data-bs-theme="dark"] .cs-search-input,
            [data-bs-theme="dark"] .form-control,
            [data-bs-theme="dark"] .form-select {
              background-color: #1e293b !important;
              color: #f8fafc !important;
              border-color: #334155 !important;
            }

            [data-bs-theme="dark"] .status-modal-title,
            [data-bs-theme="dark"] .modal-body h5 {
              color: #f8fafc !important;
            }

            [data-bs-theme="dark"] .status-modal-msg,
            [data-bs-theme="dark"] .modal-body p {
              color: #cbd5e1 !important;
            }

            [data-bs-theme="light"] .status-modal-title,
            [data-bs-theme="light"] .modal-body h5 {
              color: #0f172a !important;
            }

            [data-bs-theme="light"] .status-modal-msg,
            [data-bs-theme="light"] .modal-body p {
              color: #475569 !important;
            }

            [data-bs-theme="dark"] .attachment-card h6,
            [data-bs-theme="dark"] .attachment-card .text-dark {
              color: #f8fafc !important;
            }

            [data-bs-theme="dark"] .attachment-card p,
            [data-bs-theme="dark"] .attachment-card .text-muted {
              color: #94a3b8 !important;
            }

            [data-bs-theme="dark"] .attachment-card button,
            [data-bs-theme="dark"] .attachment-preview {
              background-color: #334155 !important;
              color: #f8fafc !important;
              border-color: #475569 !important;
            }

            [data-bs-theme="dark"] .attachment-card button:hover,
            [data-bs-theme="dark"] .attachment-preview:hover {
              background-color: #00a79d !important;
              color: #ffffff !important;
              border-color: #00a79d !important;
            }

            /* --- MOMAH TABLE DARK MODE OVERRIDES --- */
            [data-bs-theme="dark"] .momah-table-host .table-wrapper,
            [data-bs-theme="dark"] .momah-table-host .jtable-main-container,
            [data-bs-theme="dark"] .momah-table-host .table {
              background-color: #1e293b !important;
              border-color: #334155 !important;
              color: #f8fafc !important;
            }

            [data-bs-theme="dark"] .momah-table-host .table thead,
            [data-bs-theme="dark"] .momah-table-host .table thead tr,
            [data-bs-theme="dark"] .momah-table-host .table thead th {
              background-color: #0f172a !important;
              color: #94a3b8 !important;
              border-color: #334155 !important;
            }

            [data-bs-theme="dark"] .momah-table-host .table tbody tr,
            [data-bs-theme="dark"] .momah-table-host .table tbody td {
              background-color: #1e293b !important;
              color: #f8fafc !important;
              border-color: #334155 !important;
            }

            [data-bs-theme="dark"] .momah-table-host input.form-control,
            [data-bs-theme="dark"] .momah-table-host .page-link {
              background-color: #334155 !important;
              color: #f8fafc !important;
              border-color: #475569 !important;
            }

            ${cssCode}
          </style>
        </head>
        <body>
          <div id="playground-component-root" style="width: 100%; min-height: 100%; display: flex; justify-content: center; align-items: flex-start;">
            ${htmlCode}
          </div>
          <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
          <script>
            try {
              ${jsCode}
            } catch(e) {
              console.error("[Playground Preview Execution Error]:", e);
            }
          </script>
        </body>
      </html>
    `;

    doc.open();
    doc.write(srcDoc);
    doc.close();

    // Option 1: Adjust height safely on load without ResizeObserver loops
    const updateIframeHeight = () => {
      window.requestAnimationFrame(() => {
        if (!iframeRef.current) return;
        const currentDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
        if (!currentDoc) return;
        const rootEl = currentDoc.getElementById("playground-component-root");
        const bodyHeight = currentDoc.body ? currentDoc.body.scrollHeight : 200;
        const calculatedHeight = rootEl && rootEl.offsetHeight > 0 ? rootEl.offsetHeight + 60 : bodyHeight;
        iframeRef.current.style.height = `${Math.max(calculatedHeight, 220)}px`;
      });
    };

    iframeRef.current.onload = updateIframeHeight;
    updateIframeHeight();
  }, [config, debouncedParams, componentName]);

  return (
    <div className="pg-preview-pane">
      <iframe
        ref={iframeRef}
        className="pg-preview-frame"
        title={`${componentName} Live Preview`}
      />
    </div>
  );
}
