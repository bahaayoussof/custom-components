import { renderDateFieldHtml } from "./utils";

export const DateInput = {
  title: "_DateInput",
  useGeneratedMarkup: true,
  props: [
    {
      name: "label",
      label: "Date Field Label",
      type: "string",
      default: "تاريخ الميلاد",
      required: true,
    },
    {
      name: "placeholder",
      label: "Placeholder Text",
      type: "string",
      default: "اختر التاريخ...",
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: true,
    },
    {
      name: "dateType",
      label: "Calendar System",
      type: "select",
      options: ["ummalqura", "gregorian"],
      default: "ummalqura",
    },
    { name: "id", label: "Input ID", type: "string", default: "birth-date", required: true },
  ],
  renderRazor: (props) =>
    `@await Html.PartialAsync("~/Views/Shared/UI/_DateInput.cshtml", ("${props.label}", ${props.required}, "${props.id}", "${props.placeholder}", "${props.dateType}"))`,
  renderHtml: (props) => renderDateFieldHtml(props, false),
  iframeHeadExtra: `
    <script src="https://cdn.jsdelivr.net/npm/jquery-calendars@2.1.0/dist/js/jquery.plugin.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-calendars@2.1.0/dist/js/jquery.calendars.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-calendars@2.1.0/dist/js/jquery.calendars.plus.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-calendars@2.1.0/dist/js/jquery.calendars.ummalqura.min.js"></script>
  `,
};
