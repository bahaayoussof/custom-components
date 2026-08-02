import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <Layout
      title="Momah Components — ASP.NET MVC UI Library"
      description="Enterprise ASP.NET MVC UI Components Library built for performance, Dark Mode, and developer experience."
    >
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Enterprise ASP.NET MVC <br />
              <span className={styles.heroGradient}>UI Components Library</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Clean, fast, and accessible ASP.NET MVC Razor components.
              Engineered with native Razor helpers and zero-friction ViewModel bindings.
            </p>

            <div className={styles.ctaGroup}>
              <Link to="/docs/intro" className={styles.primaryCta}>
                Getting Started
              </Link>
              <Link to="/components" className={styles.secondaryCta}>
                Components Gallery
              </Link>
            </div>
          </div>

          {/* RAZOR C# CODE SNIPPET SHOWCASE */}
          <div className={styles.heroPreview}>
            <div className={styles.codeSnippetCard}>
              <div className={styles.codeSnippetHeader}>
                <div className={styles.previewDots}>
                  <span className={styles.dotRed} />
                  <span className={styles.dotYellow} />
                  <span className={styles.dotGreen} />
                </div>
                <span className={styles.codeSnippetTab}>Views/Shared/_Example.cshtml</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={(e) => {
                    const codeText = `@await Html.PartialAsync("UI/_Badge", new {\n    label = "Active Order",\n    bgColor = "#e6f2f2",\n    labelColor = "#0d5f59",\n    dot = true,\n    radius = 4\n})`;
                    navigator.clipboard.writeText(codeText);
                    const btn = e.currentTarget;
                    btn.innerText = "Copied!";
                    setTimeout(() => { btn.innerText = "Copy"; }, 2000);
                  }}
                >
                  Copy
                </button>
              </div>
              <pre className={styles.codeSnippetBody}>
                <code>
                  <span className={styles.codeComment}>@* Render Momah Badge *@</span>{'\n'}
                  <span className={styles.codeKeyword}>@await</span> <span className={styles.codeClass}>Html</span>.<span className={styles.codeMethod}>PartialAsync</span>(<span className={styles.codeString}>"UI/_Badge"</span>, <span className={styles.codeKeyword}>new</span> &#123;{'\n'}
                  {'    '}<span className={styles.codeProp}>label</span> = <span className={styles.codeString}>"Active Order"</span>,{'\n'}
                  {'    '}<span className={styles.codeProp}>bgColor</span> = <span className={styles.codeString}>"#e6f2f2"</span>,{'\n'}
                  {'    '}<span className={styles.codeProp}>labelColor</span> = <span className={styles.codeString}>"#0d5f59"</span>,{'\n'}
                  {'    '}<span className={styles.codeProp}>dot</span> = <span className={styles.codeBool}>true</span>,{'\n'}
                  {'    '}<span className={styles.codeProp}>radius</span> = <span className={styles.codeNum}>4</span>{'\n'}
                  &#125;)
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>19+</span>
            <span className={styles.statLabel}>UI Components</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>ASP.NET MVC Native</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>V 1.0</span>
            <span className={styles.statLabel}>Production Ready</span>
          </div>
        </div>
      </section>

      {/* WHY MOMAH COMPONENTS */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Momah Components</h2>
          <p className={styles.sectionSubtitle}>
            Built specifically for enterprise ASP.NET MVC Razor workflows.
          </p>
        </div>

        <div className={styles.pillarsGrid}>
          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>⚡</div>
            <h3 className={styles.pillarTitle}>Enterprise Ready</h3>
            <p className={styles.pillarDesc}>
              Battle-tested UI components for mission-critical enterprise applications.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>💎</div>
            <h3 className={styles.pillarTitle}>Razor Native</h3>
            <p className={styles.pillarDesc}>
              Seamless HTML Helpers &amp; TagHelpers integration out of the box.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>🎯</div>
            <h3 className={styles.pillarTitle}>ViewModel Friendly</h3>
            <p className={styles.pillarDesc}>
              Direct data-binding compatibility with standard C# ViewModels.
            </p>
          </div>

          <div className={styles.pillarCard}>
            <div className={styles.pillarIcon}>🎨</div>
            <h3 className={styles.pillarTitle}>Bootstrap Integration</h3>
            <p className={styles.pillarDesc}>
              Matches Bootstrap 5 styling tokens and responsive utility classes.
            </p>
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

