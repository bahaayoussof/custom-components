export const LabelTip = {
  title: "_LabelTip",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Label Text",
      type: "string",
      default: "الهوية الوطنية",
      required: true,
    },
    {
      name: "tooltip",
      label: "Tooltip Help Text",
      type: "string",
      default:
        "يجب أن تكون الهوية الوطنية سارية المفعول وصادرة من الأحوال المدنية.",
    },
    {
      name: "cssClass",
      label: "Wrapper CSS Class",
      type: "string",
      default: "lbt-wrapper d-inline-flex align-items-center gap-1 fw-bold",
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_LabelTip.cshtml", new {
    Label = "${props.label}",
    Tooltip = "${props.tooltip}",
    Class = "${props.cssClass}"
})`,
  renderHtml: (props) => {
    const hasTooltip = !!props.tooltip;
    return `<div class="d-flex justify-content-center align-items-end" style="min-height: 180px; padding-bottom: 20px;">
  <span class="${props.cssClass}" style="position: relative; cursor: default;">
    <span class="lbt-label" style="font-size:0.9rem; color: inherit;">${props.label}</span>
    ${
      hasTooltip
        ? `
    <span class="lbt-icon" tabindex="0" role="button" aria-label="${props.tooltip}" style="display: inline-flex; align-items:center; width: 1.1em; height: 1.1em; color: #a8a8a8; cursor: help; margin-right: 4px; vertical-align: middle;">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
    </span>
    <span class="lbt-tip" role="tooltip" style="visibility: visible; opacity: 1; position: absolute; bottom: calc(100% + 8px); right: 0; width: max-content; max-width: 250px; padding: .5em .8em; border-radius: .4em; box-shadow: 0 4px 14px rgba(0,0,0,0.15); background: var(--bs-body-bg); color: inherit; font-size: .8rem; font-weight: 400; line-height: 1.5; white-space: normal; z-index:99;">
      ${props.tooltip}
      <span style="content: ''; position: absolute; top: 100%; right: 10px; border: 6px solid transparent; border-top-color: #fff;"></span>
    </span>
    `
        : ""
    }
  </span>
</div>`;
  },
};
