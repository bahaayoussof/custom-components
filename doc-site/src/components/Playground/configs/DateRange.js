import { renderDateFieldHtml } from "./utils";

export const DateRange = {
  title: "_DateRange",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Label Text",
      type: "string",
      default: "فترة الإجازة",
      required: true,
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
      default: "من تاريخ - إلى تاريخ",
    },
    {
      name: "required",
      label: "Required Range",
      type: "boolean",
      default: true,
    },
    {
      name: "dateType",
      label: "Calendar System",
      type: "select",
      options: ["ummalqura", "gregorian"],
      default: "gregorian",
    },
    {
      name: "id",
      label: "Component ID",
      type: "string",
      default: "vacation-period",
      required: true,
    },
  ],
  renderRazor: (props) =>
    `@await Html.PartialAsync("~/Views/Shared/UI/_DateRange.cshtml", ("${props.label}", ${props.required}, "${props.id}", "${props.placeholder}", "${props.dateType}"))`,
  renderHtml: (props) => renderDateFieldHtml(props, true),
};
