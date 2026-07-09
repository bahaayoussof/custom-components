export const MomahSelect = {
  title: "_MomahSelect",
  props: [
    {
      name: "label",
      label: "Select Label",
      type: "string",
      default: "المدينة",
      required: true,
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
      default: "اختر المدينة...",
    },
    {
      name: "searchable",
      label: "Searchable Selection",
      type: "boolean",
      default: true,
    },
    {
      name: "multiSelect",
      label: "Allow Multi-Select",
      type: "boolean",
      default: false,
    },
    {
      name: "optionsRaw",
      label: "Options (comma-separated)",
      type: "string",
      default: "الرياض, جدة, الدمام, مكة المكرمة",
      required: true,
    },
    {
      name: "id",
      label: "Component ID",
      type: "string",
      default: "city-select",
      required: true,
    },
  ],
  renderRazor: (
    props,
  ) => `@await Html.PartialAsync("~/Views/Shared/UI/_MomahSelect.cshtml", new {
    Id = "${props.id}",
    Label = "${props.label}",
    Placeholder = "${props.placeholder}",
    Searchable = ${props.searchable},
    MultiSelect = ${props.multiSelect},
    Options = new List<SelectListItem> {
${props.optionsRaw
  .split(",")
  .map(
    (o) =>
      `        new SelectListItem { Text = "${o.trim()}", Value = "${o.trim()}" }`,
  )
  .join(",\n")}
    }
})`,
  renderHtml: (props) => {
    const opts = props.optionsRaw.split(",").map((o) => o.trim());
    const optsHtml = opts
      .map(
        (o) =>
          `<div style="padding: 6px 12px; cursor: pointer; border-bottom: 1px solid #f3f4f6;">${o}</div>`,
      )
      .join("");
    return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">${props.label}</label>
  <div style="border: 1px solid #ced4da; border-radius: 6px; padding: 8px 12px; position: relative; background: var(--bs-body-bg); cursor: pointer; display: flex; justify-content: space-between; align-items:center;">
    <span style="color:#6b7280;">${props.placeholder}</span>
    <span style="font-size:0.75rem;">▼</span>
  </div>
  ${
    props.searchable
      ? `
  <div style="border: 1px solid #e5e7eb; border-radius: 6px; margin-top:4px; background: var(--bs-body-bg); box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow:hidden;">
    <input type="text" placeholder="بحث..." style="width:100%; border:none; border-bottom: 1px solid #e5e7eb; padding: 8px 12px; outline:none; font-size:0.85rem;">
    <div style="max-height: 150px; overflow-y:auto; font-size:0.85rem;">
      ${optsHtml}
    </div>
  </div>
  `
      : ""
  }
</div>`;
  },
};
