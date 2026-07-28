import React, { useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

const HERO_PREVIEWS = {
  DualDate: {
    title: "DualDate Picker",
    render: (
      <div
        style={{
          background: "var(--momah-bg-app)",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid var(--momah-border-subtle)",
          width: "100%",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            color: "var(--momah-text-secondary)",
            display: "block",
            marginBottom: "0.5rem",
          }}
        >
          Birth Date Selection
        </span>
        <div
          style={{
            background: "var(--momah-bg-surface)",
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            border: "1px solid var(--momah-brand-primary)",
            color: "var(--momah-text-primary)",
            fontWeight: "600",
            fontSize: "0.95rem",
          }}
        >
          📅 1445-09-15 Hijri &nbsp;|&nbsp; 2024-03-25 Gregorian
        </div>
      </div>
    ),
    code: `@Html.Momah().DualDateFor(m => m.BirthDate)\n    .SetMode(DualDateMode.HijriGregorian)\n    .SetRtl(true)\n    .Render()`,
  },
  MomahTable: {
    title: "MomahTable Grid",
    render: (
      <div
        style={{
          background: "var(--momah-bg-app)",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid var(--momah-border-subtle)",
          width: "100%",
        }}
      >
        <table
          style={{
            width: "100%",
            fontSize: "0.85rem",
            borderCollapse: "collapse",
            color: "var(--momah-text-primary)",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--momah-border-strong)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "0.4rem" }}>ID</th>
              <th style={{ padding: "0.4rem" }}>User</th>
              <th style={{ padding: "0.4rem" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.4rem" }}>#101</td>
              <td style={{ padding: "0.4rem" }}>Bahaa Youssof</td>
              <td
                style={{
                  padding: "0.4rem",
                  color: "var(--momah-status-success)",
                  fontWeight: "600",
                }}
              >
                ● Active
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    code: `@Html.Momah().MomahTableFor(m => m.UserList)\n    .SetServerSorting(true)\n    .SetPagination(pageSize: 20)\n    .Render()`,
  },
  SelectInput: {
    title: "SelectInput Dropdown",
    render: (
      <div
        style={{
          background: "var(--momah-bg-app)",
          padding: "1rem",
          borderRadius: "8px",
          border: "1px solid var(--momah-border-subtle)",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "var(--momah-bg-surface)",
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            border: "1px solid var(--momah-border-strong)",
            color: "var(--momah-text-primary)",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.9rem",
          }}
        >
          <span>Searchable Select Option...</span>
          <span>▼</span>
        </div>
      </div>
    ),
    code: `@Html.Momah().SelectInputFor(m => m.DepartmentId)\n    .SetOptions(ViewBag.Departments)\n    .EnableSearch(true)\n    .Render()`,
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("DualDate");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("dotnet add package Momah.Components");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout
      title="Momah Components — ASP.NET MVC UI Library"
      description="Enterprise ASP.NET MVC UI Components Library built for performance, RTL, Dark Mode, and developer experience."
    >
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div>
            <h1 className={styles.heroTitle}>
              Enterprise ASP.NET MVC <br />
              <span className={styles.heroGradient}>UI Components Library</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Clean, fast, and accessible ASP.NET MVC Razor components.
              Engineered with native LTR/RTL support, and
              zero-friction ViewModel bindings.
            </p>

            {/* <div className={styles.installBox}>
              <span>$ dotnet add package Momah.Components</span>
              <button onClick={handleCopy} className={styles.copyBtn}>
                {copied ? "Copied! ✓" : "Copy"}
              </button>
            </div> */}

            <div className={styles.ctaGroup}>
              {/* <Link to="/docs/intro" className={styles.primaryCta}>
                Get Started →
              </Link> */}
              <Link to="/components" className={styles.secondaryCta}>
                Components Gallery
              </Link>
            </div>
          </div>

          {/* LIVE HERO WIDGET */}
          {/* <div className={styles.heroWidget}>
            <div className={styles.widgetHeader}>
              {Object.keys(HERO_PREVIEWS).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`${styles.widgetTab} ${activeTab === key ? styles.widgetTabActive : ""}`}
                >
                  {HERO_PREVIEWS[key].title}
                </button>
              ))}
            </div>
            <div className={styles.widgetStage}>
              {HERO_PREVIEWS[activeTab].render}
            </div>
            <pre className={styles.widgetCode}>
              <code>{HERO_PREVIEWS[activeTab].code}</code>
            </pre>
          </div> */}
        </div>
      </section>


      {/* POPULAR COMPONENTS GRID */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Components</h2>
          <p className={styles.sectionSubtitle}>
            Explore our top production-ready UI components.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          <Link to="/docs/components/DualDate" className={styles.componentCard}>
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.cardName}>DualDate</span>
                <span className={styles.badge}>NEW</span>
              </div>
              <p className={styles.cardDesc}>
                Dual Hijri & Gregorian date selector with custom range
                constraints.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/components/momah-table"
            className={styles.componentCard}
          >
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.cardName}>MomahTable</span>
                <span className={styles.badge}>UPDATED</span>
              </div>
              <p className={styles.cardDesc}>
                High performance server-side datagrid with sorting, filtering,
                and pagination.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/components/MomahSelect"
            className={styles.componentCard}
          >
            <div>
              <div className={styles.cardHeader}>
                <span className={styles.cardName}>MomahSelect</span>
                <span className={styles.badge}>STABLE</span>
              </div>
              <p className={styles.cardDesc}>
                Select input component with remote data fetching and
                multi-select.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
