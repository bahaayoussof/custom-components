import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "../index.module.css";

const COMPONENTS_DATA = [
  {
    id: "DualDate",
    name: "DualDate",
    category: "Form Controls",
    desc: "Dual Hijri & Gregorian date selector with C# Model Binding.",
    status: "NEW",
    aria: true,
    path: "/docs/components/DualDate",
  },
  {
    id: "DateInput",
    name: "DateInput",
    category: "Form Controls",
    desc: "Standard single date picker input for ASP.NET MVC views.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/DateInput",
  },
  {
    id: "DateRange",
    name: "DateRange",
    category: "Form Controls",
    desc: "Preset range date selection input with validation.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/DateRange",
  },
  {
    id: "InputField",
    name: "InputField",
    category: "Form Controls",
    desc: "Formatted text input with icon slots and validation feedback.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/InputField",
  },
  {
    id: "SelectInput",
    name: "SelectInput",
    category: "Form Controls",
    desc: "Searchable dropdown selector with option grouping.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/SelectInput",
  },
  {
    id: "MomahSelect",
    name: "MomahSelect",
    category: "Form Controls",
    desc: "Custom styled select control with dynamic AJAX loading.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/MomahSelect",
  },
  {
    id: "FileUpload",
    name: "FileUpload",
    category: "Form Controls",
    desc: "Drag-and-drop file uploader with progress indicators.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/FileUpload",
  },
  {
    id: "AttachBox",
    name: "AttachBox",
    category: "Form Controls",
    desc: "Compact file attachment container widget.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/AttachBox",
  },
  {
    id: "TextArea",
    name: "TextArea",
    category: "Form Controls",
    desc: "Multi-line text input with auto-resize and counter.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/TextArea",
  },
  {
    id: "CkEditor",
    name: "CkEditor",
    category: "Form Controls",
    desc: "Rich text WYSIWYG editor wrapper for Razor.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/CkEditor",
  },
  {
    id: "MomahTable",
    name: "MomahTable Grid",
    category: "Data Display",
    desc: "High-performance server-side datagrid with sorting and pagination.",
    status: "UPDATED",
    aria: true,
    path: "/docs/components/momah-table",
  },
  {
    id: "Badge",
    name: "Badge",
    category: "Data Display",
    desc: "Status tag and category badge component.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/Badge",
  },
  {
    id: "AttachmentCard",
    name: "AttachmentCard",
    category: "Data Display",
    desc: "Document preview card with download actions.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/AttachmentCard",
  },
  {
    id: "Tooltip",
    name: "Tooltip",
    category: "Overlays & Feedback",
    desc: "Contextual popover tooltip with micro-animations.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/Tooltip",
  },
  {
    id: "LabelTip",
    name: "LabelTip",
    category: "Overlays & Feedback",
    desc: "Inline form label hint helper icon.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/LabelTip",
  },
  {
    id: "Banner",
    name: "Banner",
    category: "Overlays & Feedback",
    desc: "Full-width system alert banner.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/Banner",
  },
  {
    id: "Notification",
    name: "Notification",
    category: "Overlays & Feedback",
    desc: "Toast notification manager engine.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/Notification",
  },
  {
    id: "StatusModal",
    name: "StatusModal",
    category: "Overlays & Feedback",
    desc: "State feedback modal dialog with action buttons.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/StatusModal",
  },
  {
    id: "Breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    desc: "Semantic breadcrumb trail component.",
    status: "STABLE",
    aria: true,
    path: "/docs/components/Breadcrumb",
  },
];

export default function ComponentsGallery() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = [
    "All",
    "Form Controls",
    "Data Display",
    "Overlays & Feedback",
    "Navigation",
  ];

  const filtered = COMPONENTS_DATA.filter((item) => {
    const matchesCat = selectedCat === "All" || item.category === selectedCat;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <Layout
      title="Components Gallery — Momah UI Library"
      description="Browse all 19+ ASP.NET MVC UI components with live specs and feature badges."
    >
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1rem" }}
      >
        <div style={{ textAlign: "start", marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontFamily: "var(--momah-font-display)",
              fontSize: "2.5rem",
              fontWeight: "800",
            }}
          >
            Components Gallery
          </h1>
          <p
            style={{ color: "var(--momah-text-secondary)", fontSize: "1.1rem" }}
          >
            Explore {COMPONENTS_DATA.length} ASP.NET MVC components.
          </p>
        </div>

        {/* SEARCH & FILTER BAR */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <input
            type="text"
            placeholder="🔍 Filter components by name or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "0.75rem 1.25rem",
              borderRadius: "var(--momah-radius-md)",
              border: "1px solid var(--momah-border-strong)",
              background: "var(--momah-bg-surface)",
              color: "var(--momah-text-primary)",
              fontFamily: "var(--momah-font-body)",
              fontSize: "0.95rem",
              width: "100%",
              maxWidth: "400px",
            }}
          />

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`${styles.filterBtn} ${selectedCat === cat ? styles.filterBtnActive : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* CARDS GRID */}
        <div className={styles.galleryGrid}>
          {filtered.map((item) => (
            <Link key={item.id} to={item.path} className="momah-card">
              <div>
                <div className="momah-card-header">
                  <h3 className="momah-card-title">{item.name}</h3>
                  <span className="momah-card-status">{item.status}</span>
                </div>
                <p className="momah-card-desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
