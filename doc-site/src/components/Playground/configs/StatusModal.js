export const StatusModal = {
  title: "_StatusModal",
  useGeneratedMarkup: true,
  props: [
    {
      name: "type",
      label: "Modal Type",
      type: "select",
      options: ["success", "error", "warning", "info"],
      default: "success",
    },
    {
      name: "title",
      label: "Modal Title",
      type: "string",
      default: "تأكيد الحفظ",
      required: true,
    },
    {
      name: "message",
      label: "Modal Body Message",
      type: "string",
      default: "هل أنت متأكد من حفظ كافة التعديلات التي قمت بها على الطلب؟",
      required: true,
    },
    {
      name: "confirmText",
      label: "Confirm Button Text",
      type: "string",
      default: "حفظ التغييرات",
    },
    {
      name: "cancelText",
      label: "Cancel Button Text",
      type: "string",
      default: "تراجع",
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_StatusModal.cshtml")
// Invoke in JS via:
// showStatusModal({
//     type: '${props.type}',
//     title: '${props.title}',
//     message: '${props.message}',
//     confirmText: '${props.confirmText}',
//     cancelText: '${props.cancelText}'
// })`,
  renderHtml: (props) => {
    const typeColors = {
      success: "#198754",
      error: "#dc3545",
      warning: "#ffc107",
      info: "#0dcaf0",
    };
    const typeIcons = {
      success: '<i class="bi bi-check-circle-fill fs-1 text-success"></i>',
      error: '<i class="bi bi-x-circle-fill fs-1 text-danger"></i>',
      warning:
        '<i class="bi bi-exclamation-triangle-fill fs-1 text-warning"></i>',
      info: '<i class="bi bi-info-circle-fill fs-1 text-info"></i>',
    };
    const color = typeColors[props.type];
    return `<div style="background: rgba(0,0,0,0.5); padding: 2rem; border-radius: 12px; display: flex; align-items:center; justify-content:center; width:100%;">
  <div style="background: var(--bs-body-bg); border-radius: 12px; max-width: 420px; width:100%; box-shadow: 0 10px 25px rgba(0,0,0,0.25); text-align:center; padding: 24px; direction: rtl;">
    <div style="margin-bottom: 12px;">${typeIcons[props.type]}</div>
    <h5 class="fw-bold" style="color: inherit; margin: 0 0 12px 0; font-size: 1.15rem;">${props.title}</h5>
    <p style="color: inherit; font-size: 0.875rem; line-height: 1.5; margin: 0 0 20px 0;">${props.message}</p>
    <div style="display:flex; gap:10px; justify-content:center;">
      <button type="button" class="btn btn-sm text-white px-3 py-2" style="background-color: ${color}; border:none; font-weight:600; border-radius:6px; font-size:0.8rem;">${props.confirmText}</button>
      <button type="button" class="btn btn-sm btn-light border px-3 py-2" style="font-weight:600; border-radius:6px; font-size:0.8rem;">${props.cancelText}</button>
    </div>
  </div>
</div>`;
  },
};
