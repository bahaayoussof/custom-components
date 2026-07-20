import { requiredLabel } from "./utils";

export const FileUpload = {
  title: "_FileUpload",
  props: [
    {
      name: "label",
      label: "Upload Label",
      type: "string",
      default: "وثيقة إثبات الشخصية",
      required: true,
    },
    {
      name: "required",
      label: "Required Upload",
      type: "boolean",
      default: true,
    },
    {
      name: "multiple",
      label: "Allow Multiple Files",
      type: "boolean",
      default: false,
    },
    { name: "maxFiles", label: "Max File Count", type: "number", default: 3 },
    {
      name: "allowedExtensions",
      label: "Allowed Extensions",
      type: "string",
      default: ".pdf, .png, .jpg",
    },
    {
      name: "maxSizeMb",
      label: "Max File Size (MB)",
      type: "number",
      default: 5,
    },
    {
      name: "id",
      label: "Upload ID",
      type: "string",
      default: "id-doc-upload",
      required: true,
    },
  ],
  renderRazor: (props) => {
    const exts = props.allowedExtensions
      .split(",")
      .map((e) => `"${e.trim()}"`)
      .join(", ");
    const maxFilesVal = props.multiple ? props.maxFiles : "null";
    return `@await Html.PartialAsync("~/Views/Shared/UI/_FileUpload.cshtml", ("${props.label}", ${props.required}, "${props.id}", ${maxFilesVal}, new string[] { ${exts} }, ${props.maxSizeMb}))`;
  },
  renderHtml: (props) => {
    return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${requiredLabel(props.label, props.required)}
  </label>
  <div style="border: 2px dashed #00A79D; border-radius: 8px; padding: 2rem; background: #00A79D05; text-align: center; cursor: pointer;">
    <i class="bi bi-cloud-upload" style="font-size: 2rem; color: #00A79D;"></i>
    <p style="margin: 8px 0 4px 0; font-size: 0.875rem; font-weight: 500; color: inherit;">اسحب الملف هنا أو انقر للاختيار</p>
    <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">الصيغ المدعومة: ${props.allowedExtensions} (بحد أقصى ${props.maxSizeMb} ميجابايت)</p>
  </div>
</div>`;
  },
};
