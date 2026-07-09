export const DateInput = {
  title: "_DateInput",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Date Field Label",
      type: "string",
      default: "تاريخ الميلاد",
      required: true,
    },
    {
      name: "placeholder",
      label: "Placeholder Text",
      type: "string",
      default: "اختر التاريخ...",
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: true,
    },
    {
      name: "dateType",
      label: "Calendar System",
      type: "select",
      options: ["ummalqura", "gregorian"],
      default: "ummalqura",
    },
    { name: "id", label: "Input ID", type: "string", default: "birth-date", required: true },
  ],
  renderRazor: (props) =>
    `@await Html.PartialAsync("~/Views/Shared/UI/_DateInput.cshtml", ("${props.label}", ${props.required}, "${props.id}", "${props.placeholder}", "${props.dateType}"))`,
  renderHtml: (props) => {
    const calIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); pointer-events: none;"><path d="M6.66 9.99h.01M9.99 9.99h.01M13.32 9.99h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`;
    return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label for="${props.id}" class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${props.required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ""}${props.label}
    <span style="font-size:0.75rem; color:#6b7280; font-weight:normal; margin-right:6px;">(${props.dateType === "ummalqura" ? "هجري" : "ميلادي"})</span>
  </label>
  <div class="position-relative">
    <input type="text" class="form-control" id="${props.id}" placeholder="${props.placeholder}" readonly style="padding: 8px 35px 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width: 100%; cursor:pointer; background: var(--bs-body-bg);">
    ${calIcon}
  </div>
</div>`;
  },
};
