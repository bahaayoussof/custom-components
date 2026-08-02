import React from "react";

/**
 * ControlsPane — Generates dynamic form controls from component prop definitions.
 * Supports: text, textarea, number, boolean, switch, select/enum, color, date.
 */
export default function ControlsPane({ propsConfig = [], propsState, errors, onChange }) {
  if (!propsConfig || propsConfig.length === 0) {
    return (
      <div className="pg-controls-pane">
        <p className="text-muted style-sm">لا توجد خصائص قابلة للتعديل</p>
      </div>
    );
  }

  return (
    <div className="pg-controls-pane">
      <h6 className="pg-controls-heading">Properties</h6>

      {propsConfig.map((prop) => {
        const value = propsState[prop.name] ?? "";
        const error = errors[prop.name];
        const isRequired = prop.required === true;

        return (
          <div key={prop.name} className="pg-prop-group">
            {/* Boolean / Switch / Checkbox control */}
            {prop.type === "boolean" || prop.type === "switch" || prop.type === "checkbox" ? (
              <label className="pg-checkbox-label">
                <input
                  type="checkbox"
                  className="pg-checkbox"
                  checked={!!propsState[prop.name]}
                  onChange={(e) => onChange(prop.name, e.target.checked)}
                />
                {prop.label || prop.name}
              </label>
            ) : (
              <>
                <label className="pg-prop-label">
                  {prop.label || prop.name}
                  {isRequired && <span className="pg-required-star">*</span>}
                </label>

                {/* Select / Enum control */}
                {prop.type === "select" || prop.type === "enum" ? (
                  <select
                    className={`pg-input ${error ? "pg-input-error" : ""}`}
                    value={value}
                    onChange={(e) => onChange(prop.name, e.target.value)}
                  >
                    {prop.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : prop.type === "textarea" ? (
                  <textarea
                    className={`pg-input ${error ? "pg-input-error" : ""}`}
                    rows={3}
                    value={value}
                    onChange={(e) => onChange(prop.name, e.target.value)}
                  />
                ) : prop.type === "color" ? (
                  <div className="pg-color-input-wrapper">
                    <input
                      type="color"
                      className="pg-color-swatch"
                      value={value || "#000000"}
                      onChange={(e) => onChange(prop.name, e.target.value)}
                    />
                    <input
                      type="text"
                      className={`pg-input pg-color-input-text ${error ? "pg-input-error" : ""}`}
                      value={value}
                      onChange={(e) => onChange(prop.name, e.target.value)}
                    />
                  </div>
                ) : prop.type === "date" ? (
                  <input
                    type="date"
                    className={`pg-input ${error ? "pg-input-error" : ""}`}
                    value={value}
                    onChange={(e) => onChange(prop.name, e.target.value)}
                  />
                ) : (
                  /* Standard text or number control */
                  <input
                    type={prop.type === "number" ? "number" : "text"}
                    className={`pg-input ${error ? "pg-input-error" : ""}`}
                    min={prop.min}
                    max={prop.max}
                    value={value}
                    onChange={(e) =>
                      onChange(
                        prop.name,
                        prop.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value
                      )
                    }
                  />
                )}

                {error && <span className="pg-error-text">{error}</span>}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
