import React from "react";

/**
 * CodePane — Displays synchronized Razor / HTML generated code snippets with a copy button.
 */
export default function CodePane({ activeTab, setActiveTab, razorCode, htmlCode, onCopy, copied }) {
  const codeToDisplay = activeTab === "razor" ? razorCode : htmlCode;
  const languageClass = `language-${activeTab === "razor" ? "cshtml" : "html"}`;

  return (
    <div className="pg-footer">
      <div className="pg-tabs-nav">
        <button
          type="button"
          className={`pg-tab-btn ${activeTab === "razor" ? "pg-tab-btn-active" : ""}`}
          onClick={() => setActiveTab("razor")}
        >
          Razor Syntax Snippet
        </button>
        <button
          type="button"
          className={`pg-tab-btn ${activeTab === "html" ? "pg-tab-btn-active" : ""}`}
          onClick={() => setActiveTab("html")}
        >
          Rendered HTML Markup
        </button>
      </div>

      <div className="pg-tab-content">
        <div className="pg-code-container">
          <button
            type="button"
            className="pg-copy-btn"
            onClick={() => onCopy(codeToDisplay)}
          >
            {copied ? "Copied! ✓" : "Copy"}
          </button>
          <pre className={`pg-code-preview ${languageClass}`}>
            <code>{codeToDisplay}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
