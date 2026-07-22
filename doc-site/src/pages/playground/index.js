import React, { useState } from "react";
import Layout from "@theme/Layout";

const PLAYGROUND_COMPONENTS = {
  DualDate: {
    name: "DualDate Picker",
    defaultProps: {
      label: "Select Date of Birth",
      mode: "HijriGregorian",
      rtl: true,
      disabled: false,
      required: true,
      showIcon: true,
    },
    codeGenerator: (p) =>
      `@Html.Momah().DualDateFor(m => m.BirthDate)\n    .SetLabel("${p.label}")\n    .SetMode(DualDateMode.${p.mode})\n    .SetRtl(${p.rtl})\n    .SetDisabled(${p.disabled})\n    .SetRequired(${p.required})\n    .ShowCalendarIcon(${p.showIcon})\n    .Render()`,
  },
  MomahTable: {
    name: "MomahTable Grid",
    defaultProps: {
      label: "User Accounts Directory",
      pageSize: 10,
      serverSorting: true,
      filterable: true,
      rtl: true,
    },
    codeGenerator: (p) =>
      `@Html.Momah().MomahTableFor(m => m.UserList)\n    .SetTitle("${p.label}")\n    .SetPagination(pageSize: ${p.pageSize})\n    .EnableSorting(${p.serverSorting})\n    .EnableFiltering(${p.filterable})\n    .SetRtl(${p.rtl})\n    .Render()`,
  },
  SelectInput: {
    name: "SelectInput Dropdown",
    defaultProps: {
      label: "Department Selection",
      enableSearch: true,
      multiple: false,
      rtl: true,
      required: true,
    },
    codeGenerator: (p) =>
      `@Html.Momah().SelectInputFor(m => m.DepartmentId)\n    .SetLabel("${p.label}")\n    .SetOptions(ViewBag.Departments)\n    .EnableSearch(${p.enableSearch})\n    .SetMultiple(${p.multiple})\n    .SetRtl(${p.rtl})\n    .Render()`,
  },
};

export default function Playground() {
  const [selectedKey, setSelectedKey] = useState("DualDate");
  const [props, setProps] = useState(PLAYGROUND_COMPONENTS.DualDate.defaultProps);
  const [viewport, setViewport] = useState("100%");
  const [copied, setCopied] = useState(false);

  const activeComp = PLAYGROUND_COMPONENTS[selectedKey];

  const handleSelectComp = (key) => {
    setSelectedKey(key);
    setProps(PLAYGROUND_COMPONENTS[key].defaultProps);
  };

  const updateProp = (key, val) => {
    setProps((prev) => ({ ...prev, [key]: val }));
  };

  const generatedCode = activeComp.codeGenerator(props);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout title="Interactive Playground — Momah Components" description="Storybook-inspired interactive sandbox for testing ASP.NET MVC Razor components.">
      <div style={{ padding: "1.5rem 1rem", maxWidth: "1400px", margin: "0 auto" }}>
        {/* TOP TOOLBAR */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between", alignItems: "center", background: "var(--momah-bg-surface)", padding: "1rem 1.5rem", borderRadius: "var(--momah-radius-lg)", border: "1px solid var(--momah-border-subtle)", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontWeight: "700", fontSize: "1.1rem" }}>Component Sandbox:</span>
            <select
              value={selectedKey}
              onChange={(e) => handleSelectComp(e.target.value)}
              style={{ padding: "0.5rem 1rem", borderRadius: "var(--momah-radius-md)", border: "1px solid var(--momah-border-strong)", background: "var(--momah-bg-app)", color: "var(--momah-text-primary)", fontWeight: "600" }}
            >
              {Object.keys(PLAYGROUND_COMPONENTS).map((k) => (
                <option key={k} value={k}>{PLAYGROUND_COMPONENTS[k].name}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--momah-text-muted)" }}>Viewport:</span>
            <button onClick={() => setViewport("100%")} style={{ padding: "0.4rem 0.8rem", borderRadius: "4px", border: "1px solid var(--momah-border-subtle)", background: viewport === "100%" ? "var(--momah-brand-primary)" : "var(--momah-bg-app)", color: viewport === "100%" ? "#fff" : "var(--momah-text-secondary)", cursor: "pointer" }}>💻 100%</button>
            <button onClick={() => setViewport("768px")} style={{ padding: "0.4rem 0.8rem", borderRadius: "4px", border: "1px solid var(--momah-border-subtle)", background: viewport === "768px" ? "var(--momah-brand-primary)" : "var(--momah-bg-app)", color: viewport === "768px" ? "#fff" : "var(--momah-text-secondary)", cursor: "pointer" }}>📱 Tablet (768px)</button>
            <button onClick={() => setViewport("375px")} style={{ padding: "0.4rem 0.8rem", borderRadius: "4px", border: "1px solid var(--momah-border-subtle)", background: viewport === "375px" ? "var(--momah-brand-primary)" : "var(--momah-bg-app)", color: viewport === "375px" ? "#fff" : "var(--momah-text-secondary)", cursor: "pointer" }}>📲 Mobile (375px)</button>
          </div>

          <button onClick={handleCopyCode} style={{ background: "var(--momah-brand-primary)", color: "#fff", border: "none", padding: "0.6rem 1.2rem", borderRadius: "var(--momah-radius-md)", fontWeight: "600", cursor: "pointer" }}>
            {copied ? "Copied Snippet! ✓" : "📋 Copy Razor Code"}
          </button>
        </div>

        {/* WORKSPACE SPLIT PANES */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "1.5rem", minHeight: "500px" }}>
          {/* PREVIEW CANVAS */}
          <div style={{ background: "var(--momah-bg-surface)", border: "1px solid var(--momah-border-subtle)", borderRadius: "var(--momah-radius-lg)", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ width: viewport, transition: "width 0.3s ease", border: viewport !== "100%" ? "2px dashed var(--momah-brand-accent)" : "none", padding: viewport !== "100%" ? "1rem" : "0", borderRadius: "8px" }}>
              <div style={{ background: "var(--momah-bg-app)", padding: "1.5rem", borderRadius: "10px", border: "1px solid var(--momah-border-subtle)", direction: props.rtl ? "rtl" : "ltr" }}>
                <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", marginBottom: "0.5rem", color: "var(--momah-text-primary)" }}>
                  {props.label || "Component Field"} {props.required && <span style={{ color: "red" }}>*</span>}
                </label>
                <div style={{ background: "var(--momah-bg-surface)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--momah-brand-primary)", color: "var(--momah-text-primary)", fontWeight: "500", opacity: props.disabled ? 0.5 : 1 }}>
                  {selectedKey === "DualDate" && (props.showIcon ? "📅 1445-09-15 Hijri  /  2024-03-25 Gregorian" : "1445-09-15 Hijri  /  2024-03-25 Gregorian")}
                  {selectedKey === "MomahTable" && `Rendering Table Data Grid (Page Size: ${props.pageSize})`}
                  {selectedKey === "SelectInput" && "Search options dropdown..."}
                </div>
              </div>
            </div>
          </div>

          {/* DOCK PANEL (CONTROLS & CODE) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* CONTROLS PANEL */}
            <div style={{ background: "var(--momah-bg-surface)", border: "1px solid var(--momah-border-subtle)", borderRadius: "var(--momah-radius-lg)", padding: "1.25rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.1rem", borderBottom: "1px solid var(--momah-border-subtle)", paddingBottom: "0.5rem" }}>Props Control Panel</h3>
              
              {Object.keys(props).map((k) => (
                <div key={k} style={{ marginBottom: "0.85rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--momah-text-secondary)" }}>{k}:</label>
                  {typeof props[k] === "boolean" ? (
                    <input type="checkbox" checked={props[k]} onChange={(e) => updateProp(k, e.target.checked)} />
                  ) : (
                    <input type="text" value={props[k]} onChange={(e) => updateProp(k, e.target.value)} style={{ padding: "0.3rem 0.6rem", borderRadius: "4px", border: "1px solid var(--momah-border-strong)", background: "var(--momah-bg-app)", color: "var(--momah-text-primary)", fontSize: "0.85rem", width: "160px" }} />
                  )}
                </div>
              ))}
            </div>

            {/* GENERATED CODE */}
            <div style={{ background: "#090d16", border: "1px solid var(--momah-border-subtle)", borderRadius: "var(--momah-radius-lg)", padding: "1.25rem", flexGrow: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: "600" }}>Razor Output</span>
              </div>
              <pre style={{ margin: 0, color: "#38bdf8", fontFamily: "var(--momah-font-code)", fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>
                <code>{generatedCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
