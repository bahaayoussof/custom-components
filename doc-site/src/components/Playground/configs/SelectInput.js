import { renderFormFieldWrapper } from "./utils";

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
    const inner = `<select class="form-select" id="${props.id}" ${props.required ? "required" : ""} style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width:100%;">
    <option value="" disabled selected>اختر خياراً...</option>
    ${optsHtml}
  </select>`;
    return renderFormFieldWrapper(props.id, props.label, props.required, inner);
  },
};
