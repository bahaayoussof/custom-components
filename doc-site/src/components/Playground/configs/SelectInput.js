export const SelectInput = {
  title: "_SelectInput",
  props: [
    {
      name: "label",
      label: "Label Text",
      type: "string",
      default: "نوع الهوية",
      required: true,
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: true,
    },
    {
      name: "optionsRaw",
      label: "Options (comma-separated)",
      type: "string",
      default: "هوية وطنية, إقامة, جواز سفر",
      required: true,
    },
    {
      name: "id",
      label: "Select ID",
      type: "string",
      default: "identity-type",
      required: true,
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_SelectInput.cshtml", ("${props.label}", ${props.required}, "${props.id}", new List<SelectListItem> {
${props.optionsRaw
  .split(",")
  .map(
    (o) =>
      `    new SelectListItem { Text = "${o.trim()}", Value = "${o.trim()}" }`,
  )
  .join(",\n")}
}))`,
  renderHtml: (props) => {
    const opts = props.optionsRaw.split(",").map((o) => o.trim());
    const optsHtml = opts
      .map((o) => `<option value="${o}">${o}</option>`)
      .join("");
    return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label for="${props.id}" class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${props.required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ""}${props.label}
  </label>
  <select class="form-select" id="${props.id}" ${props.required ? "required" : ""} style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width:100%;">
    <option value="" disabled selected>اختر خياراً...</option>
    ${optsHtml}
  </select>
</div>`;
  },
};
