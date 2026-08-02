export const Tooltip = {
  title: "_Tooltip",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Trigger Label Text",
      type: "string",
      default: "متطلبات المستند",
      required: true,
    },
    {
      name: "content",
      label: "Tooltip Content (HTML)",
      type: "textarea",
      default: "<ol><li>الهوية الوطنية</li><li>عقد العمل</li></ol>",
      required: true,
    },
    {
      name: "icon",
      label: "Trigger Icon (HTML)",
      type: "string",
      default: '<i class="bi bi-question-circle-fill"></i>',
    },
    {
      name: "placement",
      label: "Placement",
      type: "select",
      options: ["top", "bottom", "start", "end"],
      default: "bottom",
    },
    {
      name: "maxHeight",
      label: "Max Height",
      type: "string",
      default: "200px",
    },
    {
      name: "cssClass",
      label: "Extra CSS Class(es)",
      type: "string",
      default: "",
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    label = "${props.label}",
    icon = "${(props.icon || "").replace(/"/g, '\\"')}",
    content = "${(props.content || "").replace(/"/g, '\\"').replace(/\n/g, "\\\n")}",
    placement = "${props.placement}",
    maxHeight = "${props.maxHeight}",
    cssClass = "${props.cssClass}"
})`,
  renderHtml: (props) => {
    const tooltipId = "tip-demo";
    const hasLabel = !!props.label;
    const hasIcon = !!props.icon;
    const labelHtml = hasLabel
      ? `<span class="tt-label">${props.label}</span>`
      : "";
    const iconHtml = hasIcon
      ? `<span class="tt-icon ${!hasLabel ? "tt-icon-only" : ""}">${props.icon}</span>`
      : "";

    return `<div class="d-flex justify-content-center align-items-center" style="min-height: 180px;">
  <span class="tt-wrapper ${props.cssClass}" tabindex="0" role="button" aria-describedby="${tooltipId}">
    ${labelHtml}
    ${iconHtml}
    <span id="${tooltipId}" class="tt-bubble" data-placement="${props.placement}" style="--tt-max-h: ${props.maxHeight}; visibility: visible; opacity: 1; pointer-events: auto;" role="tooltip" dir="auto">
      ${props.content}
    </span>
  </span>
</div>`;
  },
  css: `
    .tt-wrapper { position: relative; display: inline-flex; align-items: center; gap: .35em; cursor: pointer; color: inherit; z-index: 10; }
    .tt-label { line-height: 1.4; }
    .tt-label-dashed { border-bottom: 1px dashed currentColor; }
    .tt-icon { display: inline-flex; align-items: center; flex-shrink: 0; font-size: 1.3em; color: #9ca3af; transition: color .2s; }
    .tt-wrapper:hover .tt-icon { color: inherit; }
    .tt-bubble { position: absolute; z-index: 100000; min-width: 180px; max-width: min(300px, 90vw); width: max-content; padding: .85em 1.1em; border-radius: .5rem; border: 1px solid #e5e7eb; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .08); background: var(--bs-body-bg); color: inherit; font-size: .875rem; line-height: 1.6; white-space: normal; overflow-wrap: break-word; max-height: var(--tt-max-h, 500px); overflow-y: auto; }
    .tt-bubble::after { content: ""; position: absolute; width: 8px; height: 8px; background: var(--bs-body-bg); border: 1px solid #e5e7eb; transform: rotate(45deg); z-index: 2; }
    .tt-bubble[data-placement="top"] { bottom: calc(100% + 10px); inset-inline-end: 0; }
    .tt-bubble[data-placement="bottom"] { top: calc(100% + 10px); inset-inline-end: 0; }
    .tt-bubble[data-placement="end"] { top: 50%; inset-inline-end: calc(100% + 10px); transform: translateY(-50%); }
    .tt-bubble[data-placement="start"] { top: 50%; inset-inline-start: calc(100% + 10px); transform: translateY(-50%); }
    .tt-bubble[data-placement="top"]::after { bottom: -5px; inset-inline-end: 16px; border-top: none; border-inline-start: none; }
    .tt-bubble[data-placement="bottom"]::after { top: -5px; inset-inline-end: 16px; border-bottom: none; border-inline-end: none; }
    .tt-bubble[data-placement="end"]::after { top: calc(50% - 4px); inset-inline-start: -5px; border-top: none; border-inline-end: none; }
    .tt-bubble[data-placement="start"]::after { top: calc(50% - 4px); inset-inline-end: -5px; border-bottom: none; border-inline-start: none; }
  `,
};
