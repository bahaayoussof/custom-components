import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
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

            <div className={styles.ctaGroup}>
              <Link to="/components" className={styles.secondaryCta}>
                Components Gallery
              </Link>
            </div>
          </div>
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
          <Link to="/docs/components/DualDate" className="momah-card">
            <div>
              <div className="momah-card-header">
                <h3 className="momah-card-title">DualDate</h3>
                <span className="momah-card-status">NEW</span>
              </div>
              <p className="momah-card-desc">
                Dual Hijri &amp; Gregorian date selector with custom range
                constraints.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/components/momah-table"
            className="momah-card"
          >
            <div>
              <div className="momah-card-header">
                <h3 className="momah-card-title">MomahTable</h3>
                <span className="momah-card-status">UPDATED</span>
              </div>
              <p className="momah-card-desc">
                High performance server-side datagrid with sorting, filtering,
                and pagination.
              </p>
            </div>
          </Link>

          <Link
            to="/docs/components/MomahSelect"
            className="momah-card"
          >
            <div>
              <div className="momah-card-header">
                <h3 className="momah-card-title">MomahSelect</h3>
                <span className="momah-card-status">STABLE</span>
              </div>
              <p className="momah-card-desc">
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
