export const InputField = {
  title: "_InputField",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Label Text",
      type: "string",
      default: "البريد الإلكتروني",
      required: true,
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
      default: "example@domain.com",
    },
    {
      name: "type",
      label: "Input Type",
      type: "select",
      options: ["text", "number", "email", "password"],
      default: "email",
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: true,
    },
    { name: "id", label: "Input ID", type: "string", default: "user-email", required: true },
  ],
  renderRazor: (props) =>
    `@await Html.PartialAsync("~/Views/Shared/UI/_InputField.cshtml", ("${props.label}", ${props.required}, "${props.id}", "${props.placeholder}", "${props.type}"))`,
  renderHtml: (props) => {
    return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label for="${props.id}" class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${props.required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ""}${props.label}
  </label>
  <input type="${props.type}" class="form-control" id="${props.id}" placeholder="${props.placeholder}" ${props.required ? "required" : ""} style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da;">
</div>`;
  },
};
