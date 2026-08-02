export const Banner = {
  title: "_Banner",
  useGeneratedMarkup: true,
  props: [
    {
      name: "title",
      label: "Title",
      type: "string",
      default: "مذكرة توضيحية",
      required: true,
    },
    {
      name: "content",
      label: "Content Text",
      type: "string",
      default: "يرجى تعبئة كافة الحقول المطلوبة لضمان معالجة الطلب بسرعة.",
      required: true,
    },
    {
      name: "icon",
      label: "Icon Class / HTML",
      type: "string",
      default: "bi-info-circle-fill",
    },
    {
      name: "titleColor",
      label: "Title Color",
      type: "color",
      default: "#00A79D",
    },
    {
      name: "isSmall",
      label: "Small Version",
      type: "boolean",
      default: false,
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_Banner.cshtml", new {
    Icon = "${props.icon}",
    Title = "${props.title}",
    Content = "${props.content}",
    TitleColor = "${props.titleColor}",
    IsSmall = ${props.isSmall}
})`,
  renderHtml: (props) => {
    const isSmallClass = props.isSmall ? "small" : "";
    const iconHtml = (props.icon || "").startsWith("<")
      ? props.icon
      : `<i class="bi ${props.icon}" style="font-size:1.25rem;"></i>`;
    return `<div class="info-banner mb-3" style="--banner-title-color: ${props.titleColor}; border: 1px solid #CCFBF1; border-radius: 12px; padding: 1.5rem; background: #00A79D0D; position: relative; overflow: hidden; display: flex; align-items: center; color: ${props.titleColor};">
  <div class="d-flex align-items-center gap-3">
    ${props.icon ? `<div class="banner-icon-wrapper" style="width: 44px; height: 44px; background: #E0F2F1; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #00A79D; flex-shrink: 0;">${iconHtml}</div>` : ""}
    <div class="banner-content-wrapper">
      ${props.title ? `<h6 class="fw-bold mb-1" style="margin:0 0 4px 0; color: ${props.titleColor}; font-size: 1rem;">${props.title}</h6>` : ""}
      <div class="info-banner-content text-muted ${isSmallClass}" style="font-size: 0.875rem;">${props.content}</div>
    </div>
  </div>
</div>`;
  },
};
