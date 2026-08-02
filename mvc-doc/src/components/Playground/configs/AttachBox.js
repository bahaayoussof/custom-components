export const AttachBox = {
  title: "_AttachBox",
  useGeneratedMarkup: true,
  props: [
    {
      name: "fileName",
      label: "File Name",
      type: "string",
      default: "السجل_التجاري.pdf",
      required: true,
    },
    {
      name: "fileId",
      label: "File ID / Url",
      type: "string",
      default: "27131",
      required: true,
    },
    {
      name: "actionUrl",
      label: "Preview Action URL",
      type: "string",
      default: "/Common/PreviewAttachment",
    },
    { name: "id", label: "Box ID", type: "string", default: "comm-reg-box", required: true },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_AttachBox.cshtml", new {
    FileName = "${props.fileName}",
    FileId = "${props.fileId}",
    ActionUrl = "${props.actionUrl}",
    Id = "${props.id}"
})`,
  renderHtml: (props) => {
    return `<div class="ab-card d-flex align-items-center justify-content-between p-2 mb-2 w-100" id="${props.id}" style="background: #F3F4F6; border: 1px solid #e5e7eb; border-radius: 4px; max-width:400px; text-align:right;" dir="rtl">
    <div class="ab-info text-truncate" style="flex: 1; font-size: 0.85rem; font-weight: 500; color: inherit;">
        <i class="bi bi-file-earmark-pdf-fill text-danger me-1"></i> ${props.fileName}
    </div>
    <div class="ab-actions d-flex gap-2">
        <button type="button" class="btn btn-sm btn-light py-1 px-2 border" style="font-size:0.75rem;"><i class="bi bi-eye"></i> معاينة</button>
        <button type="button" class="btn btn-sm btn-light py-1 px-2 border" style="font-size:0.75rem;"><i class="bi bi-download"></i></button>
    </div>
</div>`;
  },
};
