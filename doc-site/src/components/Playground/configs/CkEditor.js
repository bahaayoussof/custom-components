import { requiredLabel } from "./utils";

export const CkEditor = {
  title: "_CkEditor",
  props: [
    {
      name: "label",
      label: "Editor Label",
      type: "string",
      default: "شرح تفصيلي للمشروع",
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
      label: "Placeholder text",
      type: "string",
      default: "اكتب وصفاً مفصلاً هنا...",
    },
    {
      name: "height",
      label: "Editor Height (px)",
      type: "number",
      default: 250,
    },
    {
      name: "id",
      label: "Editor ID",
      type: "string",
      default: "project-editor",
      required: true,
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_CkEditor.cshtml", new {
    Label = "${props.label}",
    Required = ${props.required},
    Placeholder = "${props.placeholder}",
    Id = "${props.id}",
    Height = ${props.height}
})`,
  renderHtml: (props) => {
    return `<div class="mb-3 w-100" style="text-align:right;" dir="rtl">
  <label class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${requiredLabel(props.label, props.required)}
  </label>
  <div style="border: 1px solid #ced4da; border-radius: 6px; overflow:hidden;">
    <div style="background:#f3f4f6; border-bottom: 1px solid #ced4da; padding: 6px 12px; display:flex; gap:10px; font-size:0.8rem; color: inherit;">
      <i class="bi bi-type-bold"></i><i class="bi bi-type-italic"></i><i class="bi bi-type-underline"></i><span style="border-left: 1px solid #ced4da; margin: 0 4px;"></span>
      <i class="bi bi-list-ul"></i><i class="bi bi-list-ol"></i><span style="border-left: 1px solid #ced4da; margin: 0 4px;"></span>
      <i class="bi bi-link-45deg"></i><i class="bi bi-image"></i>
    </div>
    <div style="padding: 12px; min-height: ${props.height}px; color: #9ca3af; font-size:0.875rem; outline:none; background: var(--bs-body-bg);" contenteditable="true">
      ${props.placeholder}
    </div>
  </div>
</div>`;
  },
};
