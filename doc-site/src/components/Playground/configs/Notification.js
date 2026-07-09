export const Notification = {
  title: "_Notification",
  useGeneratedMarkup: true,
  props: [
    {
      name: "title",
      label: "Notification Title",
      type: "string",
      default: "تم إرسال الطلب بنجاح",
      required: true,
    },
    {
      name: "content",
      label: "Notification Content",
      type: "string",
      default: "تم استلام طلبك رقم #4829 وسيقوم النظام بمراجعته قريباً.",
      required: true,
    },
    {
      name: "icon",
      label: "Icon HTML",
      type: "string",
      default: '<i class="bi bi-check-circle-fill text-success fs-4"></i>',
    },
    {
      name: "titleColor",
      label: "Title/Theme Color",
      type: "color",
      default: "#198754",
    },
    {
      name: "borderColor",
      label: "Right Border Color",
      type: "color",
      default: "#198754",
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_Notification.cshtml", new {
    Icon = "${props.icon.replace(/"/g, '\\"')}",
    Title = "${props.title}",
    Content = "${props.content}",
    TitleColor = "${props.titleColor}",
    BorderColor = "${props.borderColor}"
})`,
  renderHtml: (props) => {
    return `<div class="d-flex align-items-start gap-3 p-3 rounded bg-white shadow-sm"
     style="border: 1px solid #e4e7ea; border-right: 6px solid ${props.borderColor}; color: inherit; min-width: 320px;">
    <div style="flex-shrink:0;">
        ${props.icon || `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#F9FAFB"/><path d="M20 12v10M20 28h.01" stroke="${props.titleColor}" stroke-width="2" stroke-linecap="round"/></svg>`}
    </div>
    <div>
        ${props.title ? `<h6 class="mb-1 fw-bold" style="color: ${props.titleColor}; margin: 0 0 6px 0; font-size: 0.95rem;">${props.title}</h6>` : ""}
        ${props.content ? `<p class="mb-0" style="line-height: 1.6; font-size: 0.85rem; color:#6b7280; margin:0;">${props.content}</p>` : ""}
    </div>
</div>`;
  },
};
