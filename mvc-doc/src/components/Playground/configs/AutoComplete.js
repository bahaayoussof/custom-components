import { renderFormFieldWrapper } from "./utils";

export const AutoComplete = {
  title: "_AutoComplete",
  props: [
    {
      name: "label",
      label: "Label Text",
      type: "string",
      default: "المحامي المسؤول",
      required: true,
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: true,
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
      default: "اختر المحامي...",
    },
    {
      name: "id",
      label: "Component ID",
      type: "string",
      default: "lawyerSelect",
      required: true,
    },
  ],
  renderRazor: (props) => {
    return `@await Html.PartialAsync("~/Views/Shared/UI/_AutoComplete.cshtml", new {
    id = "${props.id}",
    name = "LawyerId",
    label = "${props.label}",
    required = ${props.required},
    placeholder = "${props.placeholder}",
    items = new[] {
        new { value = "1", label = "أحمد محمود الإبراهيم" },
        new { value = "2", label = "خالد عبدالله الفهد" },
        new { value = "3", label = "سارة محمد العتيبي" }
    }
})`;
  },
  renderHtml: (props) => {
    const inner = `<div class="position-relative" id="${props.id}">
      <input type="text" class="form-control" placeholder="${props.placeholder}" value="أحمد محمود الإبراهيم" style="padding: 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width:100%;" />
    </div>`;
    return renderFormFieldWrapper(props.id, props.label, props.required, inner);
  },
};
