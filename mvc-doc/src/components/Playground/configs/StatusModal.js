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
    const icons = {
      success: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#ECFDF5"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9987 29.1663C25.0613 29.1663 29.1654 25.0623 29.1654 19.9997C29.1654 14.9371 25.0613 10.833 19.9987 10.833C14.9361 10.833 10.832 14.9371 10.832 19.9997C10.832 25.0623 14.9361 29.1663 19.9987 29.1663Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9987 29.1663C25.0613 29.1663 29.1654 25.0623 29.1654 19.9997C29.1654 14.9371 25.0613 10.833 19.9987 10.833C14.9361 10.833 10.832 14.9371 10.832 19.9997C10.832 25.0623 14.9361 29.1663 19.9987 29.1663ZM15.8739 19.2674C15.5484 19.5929 15.5484 20.1205 15.8739 20.446L18.2309 22.803C18.5563 23.1284 19.084 23.1284 19.4094 22.803L24.1235 18.0889C24.4489 17.7635 24.4489 17.2359 24.1235 16.9104C23.798 16.585 23.2704 16.585 22.9449 16.9104L18.8202 21.0352L17.0524 19.2674C16.727 18.942 16.1993 18.942 15.8739 19.2674Z" fill="#045859"/>
      </svg>`,
      error: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#FEF2F2"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9987 29.1663C25.0613 29.1663 29.1654 25.0623 29.1654 19.9997C29.1654 14.9371 25.0613 10.833 19.9987 10.833C14.9361 10.833 10.832 14.9371 10.832 19.9997C10.832 25.0623 14.9361 29.1663 19.9987 29.1663Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9987 29.1663C25.0613 29.1663 29.1654 25.0623 29.1654 19.9997C29.1654 14.9371 25.0613 10.833 19.9987 10.833C14.9361 10.833 10.832 14.9371 10.832 19.9997C10.832 25.0623 14.9361 29.1663 19.9987 29.1663ZM16.4654 16.4664C16.7908 16.141 17.3185 16.141 17.6439 16.4664L19.9987 18.8212L22.3535 16.4664C22.6789 16.141 23.2066 16.141 23.532 16.4664C23.8575 16.7919 23.8575 17.3195 23.532 17.645L21.1772 19.9997L23.532 22.3545C23.8575 22.68 23.8575 23.2076 23.532 23.5331C23.2066 23.8585 22.6789 23.8585 22.3535 23.5331L19.9987 21.1783L17.6439 23.5331C17.3185 23.8585 16.7908 23.8585 16.4654 23.5331C16.1399 23.2076 16.1399 22.68 16.4654 22.3545L18.8202 19.9997L16.4654 17.645C16.1399 17.3195 16.1399 16.7919 16.4654 16.4664Z" fill="#DC2626"/>
      </svg>`,
      warning: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#FFFAEB"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6363 11.6798C19.5233 11.3854 20.4793 11.3854 21.3663 11.6798C22.2497 11.973 22.9433 12.6685 23.6401 13.6456C24.3346 14.6195 25.102 15.9774 26.0912 17.7277L26.13 17.7965C27.1194 19.5471 27.8867 20.9049 28.3649 22.006C28.8455 23.1126 29.0848 24.0679 28.8938 24.9858C28.7016 25.9099 28.2275 26.7502 27.537 27.3854C26.8482 28.019 25.9103 28.2863 24.7293 28.4147C23.555 28.5423 22.019 28.5423 20.0419 28.5423H19.9607C17.9837 28.5423 16.4476 28.5423 15.2733 28.4147C14.0924 28.2863 13.1545 28.019 12.4656 27.3854C11.7752 26.7502 11.301 25.9099 11.1088 24.9858C10.9178 24.0679 11.1571 23.1126 11.6377 22.006C12.1159 20.9049 12.8833 19.5471 13.8726 17.7964L13.9115 17.7277C14.9006 15.9774 15.668 14.6195 16.3625 13.6456C17.0593 12.6685 17.7529 11.973 18.6363 11.6798ZM19.7362 19.19C19.9421 19.2177 20.2269 19.2918 20.4685 19.5335C20.7102 19.7751 20.7843 20.0599 20.8119 20.2658C20.8349 20.4363 20.8348 20.6346 20.8347 20.8012L20.8346 24.1673C20.8346 24.6276 20.4615 25.0007 20.0013 25.0007C19.5411 25.0007 19.168 24.6276 19.168 24.1673V20.834C18.7077 20.834 18.3346 20.4609 18.3346 20.0007C18.3346 19.5404 18.7077 19.1673 19.168 19.1673L19.2008 19.1673C19.3674 19.1672 19.5657 19.1671 19.7362 19.19ZM19.9975 15.834C19.5393 15.834 19.1679 16.2071 19.1679 16.6673C19.1679 17.1276 19.5393 17.5007 19.9975 17.5007H20.005C20.4631 17.5007 20.8346 17.1276 20.8346 16.6673C20.8346 16.2071 20.4631 15.834 20.005 15.834H19.9975Z" fill="#C05728"/>
      </svg>`,
      info: `<svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z" fill="#F9FAFB"/>
        <path d="M19.1615 22.5003C19.1615 22.0401 19.5346 21.667 19.9948 21.667H20.0023C20.4625 21.667 20.8356 22.0401 20.8356 22.5003C20.8356 22.9606 20.4625 23.3337 20.0023 23.3337H19.9948C19.5346 23.3337 19.1615 22.9606 19.1615 22.5003Z" fill="#161616"/>
        <path d="M19.3763 20.0003C19.3763 20.3455 19.6561 20.6253 20.0013 20.6253C20.3465 20.6253 20.6263 20.3455 20.6263 20.0003V16.667C20.6263 16.3218 20.3465 16.042 20.0013 16.042C19.6561 16.042 19.3763 16.3218 19.3763 16.667V20.0003Z" fill="#161616"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.043 20.0003C11.043 15.0528 15.0538 11.042 20.0013 11.042C24.9489 11.042 28.9596 15.0528 28.9596 20.0003C28.9596 24.9479 24.9489 28.9587 20.0013 28.9587C15.0538 28.9587 11.043 24.9479 11.043 20.0003ZM20.0013 12.292C15.7441 12.292 12.293 15.7431 12.293 20.0003C12.293 24.2575 15.7441 27.7087 20.0013 27.7087C24.2585 27.7087 27.7096 24.2575 27.7096 20.0003C27.7096 15.7431 24.2585 12.292 20.0013 12.292Z" fill="#161616"/>
      </svg>`,
    };
    const icon = icons[props.type] || icons.success;

    return `<div style="background: rgba(0,0,0,0.4); padding: 1.5rem; border-radius: 16px; display: flex; align-items: center; justify-content: center; width: 100%;">
  <div class="modal-dialog modal-dialog-centered w-100" style="max-width: 480px;" dir="rtl">
    <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
      <div class="modal-body p-4" style="text-align: right;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div id="iconContainer">
            ${icon}
          </div>
          <button type="button" class="btn-close" aria-label="Close"></button>
        </div>
        <h5 class="fw-bold mb-2 status-modal-title" style="font-size: 1.15rem; margin: 0;">${props.title}</h5>
        <p class="mb-4 status-modal-msg" style="font-size: 0.9rem; line-height: 1.6; margin-top: 8px;">${props.message}</p>
        <div class="d-flex gap-2 justify-content-start">
          ${props.confirmText ? `<button type="button" class="btn px-4 py-2 text-white btn-confirm" style="background-color: #045859; border: none; font-weight: 600; border-radius: 8px; font-size: 0.875rem;">${props.confirmText}</button>` : ""}
          ${props.cancelText ? `<button type="button" class="btn btn-outline-secondary px-4 py-2 btn-cancel" style="font-weight: 600; border-radius: 8px; font-size: 0.875rem;">${props.cancelText}</button>` : ""}
        </div>
      </div>
    </div>
  </div>
</div>`;
  },
};
