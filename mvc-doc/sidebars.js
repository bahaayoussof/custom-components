// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: "doc",
      id: "intro",
      label: "🚀 Overview",
    },
    {
      type: "category",
      label: "📝 Form Controls",
      collapsed: false,
      items: [
        { type: "doc", id: "components/DualDate/index", label: "DualDate" },
        { type: "doc", id: "components/DateInput/index", label: "DateInput" },
        { type: "doc", id: "components/DateRange/index", label: "DateRange" },
        { type: "doc", id: "components/InputField/index", label: "InputField" },
        { type: "doc", id: "components/AutoComplete/index", label: "AutoComplete" },
        { type: "doc", id: "components/SelectInput/index", label: "SelectInput" },
        { type: "doc", id: "components/MomahSelect/index", label: "MomahSelect" },
        { type: "doc", id: "components/ChipSelect/index", label: "ChipSelect" },
        { type: "doc", id: "components/FileUpload/index", label: "FileUpload" },
        { type: "doc", id: "components/AttachBox/index", label: "AttachBox" },
        { type: "doc", id: "components/TextArea/index", label: "TextArea" },
        { type: "doc", id: "components/CkEditor/index", label: "CkEditor" },
      ],
    },
    {
      type: "category",
      label: "📊 Data Display",
      collapsed: false,
      items: [
        { type: "doc", id: "components/momah-table/index", label: "MomahTable Grid" },
        { type: "doc", id: "components/Badge/index", label: "Badge" },
        { type: "doc", id: "components/AttachmentCard/index", label: "AttachmentCard" },
      ],
    },
    {
      type: "category",
      label: "💬 Overlays & Feedback",
      collapsed: false,
      items: [
        { type: "doc", id: "components/Tooltip/index", label: "Tooltip" },
        { type: "doc", id: "components/LabelTip/index", label: "LabelTip" },
        { type: "doc", id: "components/Banner/index", label: "Banner" },
        { type: "doc", id: "components/Notification/index", label: "Notification" },
        { type: "doc", id: "components/StatusModal/index", label: "StatusModal" },
      ],
    },
    {
      type: "category",
      label: "🧩 Navigation",
      collapsed: false,
      items: [
        { type: "doc", id: "components/Breadcrumb/index", label: "Breadcrumb" },
      ],
    },
  ],
};

export default sidebars;
