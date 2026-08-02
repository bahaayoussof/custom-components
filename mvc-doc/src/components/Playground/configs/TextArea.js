import { renderFormFieldWrapper } from "./utils";

export const TextArea = {
  title: "_TextArea",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Label Text",
      type: "string",
      default: "ملاحظات إضافية",
      required: true,
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
      default: "اكتب أي تفاصيل أخرى هنا...",
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: false,
    },
    {
      name: "id",
      label: "TextArea ID",
      type: "string",
      default: "notes-field",
      required: true,
    },
  ],
  renderRazor: (props) =>
    `@await Html.PartialAsync("~/Views/Shared/UI/_TextArea.cshtml", ("${props.label}", ${props.required}, "${props.id}", "${props.placeholder}"))`,
  renderHtml: (props) => {
    const inner = `<textarea class="form-control" id="${props.id}" placeholder="${props.placeholder}" rows="${props.rows || 3}" ${props.required ? "required" : ""} style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width: 100%;"></textarea>`;
    return renderFormFieldWrapper(props.id, props.label, props.required, inner);
  },
};
