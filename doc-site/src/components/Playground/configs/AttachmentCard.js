export const AttachmentCard = {
  title: "_AttachmentCard",
  useGeneratedMarkup: true,
  props: [
    {
      name: "fileName",
      label: "File Name",
      type: "string",
      default: "الهوية الوطنية.png",
      required: true,
    },
    {
      name: "details",
      label: "Details / Size",
      type: "string",
      default: "حجم الملف: 1.4 ميجابايت · تم الرفع بواسطة المستخدم",
    },
    {
      name: "fileId",
      label: "File ID / Url",
      type: "string",
      default: "15243",
      required: true,
    },
    {
      name: "actionUrl",
      label: "Preview Action URL",
      type: "string",
      default: "/Common/PreviewAttachment",
    },
    { name: "id", label: "Card ID", type: "string", default: "id-card-view", required: true },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_AttachmentCard.cshtml", new {
    FileName = "${props.fileName}",
    Details = "${props.details}",
    FileId = "${props.fileId}",
    ActionUrl = "${props.actionUrl}",
    Id = "${props.id}"
})`,
  renderHtml: (props) => {
    return `<div id="${props.id}" class="attachment-card p-3 d-flex flex-column gap-2" style="border: 2px solid #E2ECF9; border-radius: 12px; background: white; width: 100%; max-width: 320px; text-align:right;" dir="rtl">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
        <circle cx="24" cy="24" r="24" fill="#045859" fill-opacity=".05" />
        <path fill="#00a79d" fill-rule="evenodd" d="M21.5 15.75A4.25 4.25 0 0 0 17.25 20v5.5a6.75 6.75 0 0 0 13.5 0V24a.75.75 0 0 1 1.5 0v1.5a8.25 8.25 0 0 1-16.5 0V20a5.75 5.75 0 0 1 11.5 0v5.5a3.25 3.25 0 0 1-6.5 0v-4a.75.75 0 0 1 1.5 0v4a1.75 1.75 0 1 0 3.5 0V20a4.25 4.25 0 0 0-4.25-4.25" clip-rule="evenodd" />
    </svg>
    <div class="my-2 d-flex flex-column gap-1">
        <h6 class="text-dark fw-bold" style="margin: 0; font-size: 0.95rem;">${props.fileName}</h6>
        <p class="text-muted small" style="margin:0; font-size: 0.75rem;">${props.details}</p>
    </div>
    <button type="button" class="btn btn-sm" style="background-color: #F9FAFB; border: 1px solid #E2ECF9; font-weight: bold; font-size:0.8rem; padding: 6px 12px; width: 80px; align-self: flex-start; border-radius:6px;">عرض</button>
</div>`;
  },
};
