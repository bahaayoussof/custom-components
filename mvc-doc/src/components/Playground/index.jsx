import PlaygroundEngine from "./engine/PlaygroundEngine";
import { componentConfigs } from "./configs/index";
import "./styles.css";

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

/**
 * Public Playground component entry point.
 * Resolves component configuration from registry and renders the PlaygroundEngine.
 */
export default function Playground({ componentName }) {
  const config = componentConfigs[componentName] || fallbackConfig(componentName);
  return <PlaygroundEngine componentName={componentName} config={config} />;
}
