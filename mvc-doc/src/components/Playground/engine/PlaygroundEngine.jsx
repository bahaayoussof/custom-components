import React from "react";
import { useColorMode } from "@docusaurus/theme-common";
import { usePlaygroundState } from "./usePlaygroundState";
import ControlsPane from "./ControlsPane";
import PreviewPane from "./PreviewPane";
import CodePane from "./CodePane";

/**
 * PlaygroundEngine — Core modular container assembling header controls,
 * preview pane, property controls pane, and code output pane.
 */
export default function PlaygroundEngine({ componentName, config }) {
  const { colorMode } = useColorMode();
  const {
    propsState,
    errors,
    direction,
    setDirection,
    activeTab,
    setActiveTab,
    copied,
    setPropValue,
    copyToClipboard,
  } = usePlaygroundState(config);

  // Generate code snippets safely
  const razorCode =
    typeof config?.renderRazor === "function"
      ? config.renderRazor(propsState) || ""
      : typeof config?.renderRazor === "string"
      ? config.renderRazor
      : "";
  const rawHtmlCode =
    typeof config?.renderHtml === "function"
      ? config.renderHtml(propsState) || ""
      : typeof config?.renderHtml === "string"
      ? config.renderHtml
      : "";
  const htmlCode =
    typeof rawHtmlCode === "string"
      ? rawHtmlCode.replace(/@await\s+Html\.PartialAsync\s*\([^)]*\);?/gi, "")
      : "";

  return (
    <div className="pg-container">
      {/* Header controls (Title) */}
      <div className="pg-header">
        <h5 className="pg-header-title">
          {config.title || componentName} Playground
        </h5>
      </div>

      {/* Main body layout (Preview Pane + Controls Pane) */}
      <div className="pg-body">
        <PreviewPane
          config={config}
          propsState={propsState}
          direction={direction}
          colorMode={colorMode}
          componentName={componentName}
        />
        <ControlsPane
          propsConfig={config.props}
          propsState={propsState}
          errors={errors}
          onChange={setPropValue}
        />
      </div>

      {/* Code Snippets Viewer & Copy button */}
      <CodePane
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        razorCode={razorCode}
        htmlCode={htmlCode}
        onCopy={copyToClipboard}
        copied={copied}
      />
    </div>
  );
}
