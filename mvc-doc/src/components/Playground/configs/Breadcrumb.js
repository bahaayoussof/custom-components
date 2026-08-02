export const Breadcrumb = {
  title: "_Breadcrumb",
  props: [
    {
      name: "itemsRaw",
      label: "Breadcrumb Items (comma-separated)",
      type: "string",
      default: "الرئيسية, الملف الشخصي, الوثائق",
    },
  ],
  renderRazor: (props) => {
    const items = (props.itemsRaw || "").split(",").map((i) => i.trim());
    const razorItems = items
      .map((item, index) => `    ("${item}", "/Url${index + 1}")`)
      .join(",\n");
    return `@await Html.PartialAsync("~/Views/Shared/UI/_Breadcrumb.cshtml", new List<(string Name, string Url)> {
${razorItems}
})`;
  },
  renderHtml: (props) => {
    const items = (props.itemsRaw || "").split(",").map((i) => i.trim());
    const itemsHtml = items
      .map((item, idx) => {
        const isActive = idx === items.length - 1;
        return `<li class="breadcrumb-item d-flex align-items-center" style="font-size:0.875rem;">
        <a href="#" style="color: ${isActive ? "#9DA4AE" : "#54565B"}; text-decoration:none; font-weight: ${isActive ? "bold" : "normal"}; pointer-events: none;">${item}</a>
        ${!isActive ? `<span style="margin: 0 8px; color: #9DA4AE;">&gt;</span>` : ""}
      </li>`;
      })
      .join("");

    return `<nav class="d-flex" aria-label="breadcrumb">
  <ol dir="rtl" class="breadcrumb" style="list-style: none; display: flex; padding: 0; margin: 0; background: transparent;">
    ${itemsHtml}
  </ol>
</nav>`;
  },
};
