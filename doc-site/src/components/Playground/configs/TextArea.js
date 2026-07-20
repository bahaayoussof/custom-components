import { requiredLabel } from "./utils";

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
    return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label for="${props.id}" class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${requiredLabel(props.label, props.required)}
  </label>
  <textarea class="form-control" id="${props.id}" placeholder="${props.placeholder}" rows="${props.rows}" ${props.required ? "required" : ""} style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width: 100%;"></textarea>
</div>`;
  },
};
