# Momah Component Doc-Site — Code Review

> Date: 2026-07-09 · Scope: `doc-site/`

---

## Finding 1

**Category** Architecture / Clean Code
**Severity** 🔴 High
**Location** `src/components/Playground/configs.js`

**Problem**
2031-line monolithic file. Config + CSS blobs + JS blobs + HTML templates for 17+ components in one place. Merge conflicts guaranteed when two devs edit simultaneously.

**Recommendation**
Split into per-component files:
```
src/components/Playground/configs/
  Badge.js
  Tooltip.js
  Banner.js
  ...
  index.js   ← export { Badge, Tooltip, ... }
```

**Benefit** Isolated changes, clean diffs, parallel work without conflicts.

---

## Finding 2

**Category** Clean Code
**Severity** 🔴 High
**Location** `configs.js` L995

**Problem**
Inconsistent key casing. All components use `PascalCase` except one:
```js
"momah-table": { ... }   // ← quoted kebab
```
The whitelist in `index.jsx` L179 also uses `"momah-table"` — inconsistent with all other entries (`"Badge"`, `"Tooltip"`, …).

**Recommendation**
Normalize to `MomahTable` in both `configs.js` and the whitelist.

**Benefit** Consistent, predictable lookups. No silent key-miss bugs.

---

## Finding 3

**Category** CSS
**Severity** 🔴 High
**Location** `configs.js` L1110, L1185, L1250, L1367

**Problem**
Four CSS syntax errors in the momah-table CSS blob:

```css
/* L1110 — garbage suffix */
background: var(--bs-body-bg);3cd;

/* L1185 — garbage suffix */
background: var(--bs-body-bg);fff;

/* L1367 — garbage suffix */
background: var(--bs-body-bg);fff;

/* L1250 — semicolon before !important */
color: inherit;!important;
```
These silently drop the CSS rule entirely.

**Recommendation**
```css
background: var(--bs-body-bg);
color: inherit !important;
```

**Benefit** Rules actually apply. No silent rendering failures.

---

## Finding 4

**Category** JavaScript
**Severity** 🔴 High
**Location** `index.jsx` L165–L181

**Problem**
Hard-coded `whitelist` array inside render function. Re-created every render. Adding a new component requires editing two files.

```js
// inside component body — runs every render
const whitelist = ["Tooltip", "Badge", "Banner", ...];
```

**Recommendation**
Derive at module load from `generatedComponents` keys:
```js
// top of file
const GENERATED_KEYS = new Set(Object.keys(generatedComponents));

// inside component
const gen = GENERATED_KEYS.has(componentName) ? generatedComponents[componentName] : null;
```

**Benefit** Zero maintenance. Auto-discovers new components. No re-allocation per render.

---

## Finding 5

**Category** JavaScript
**Severity** 🔴 High
**Location** `index.jsx` L73–L87

**Problem**
`isPropRequired` uses a magic name list to auto-trigger required:
```js
const reqNames = ["content","label","title","fileName","fileId","id","optionsRaw","columnsRaw","message"];
return reqNames.includes(prop.name);
```
A new prop named `"title"` becomes required with no explicit declaration. Invisible behavior.

**Recommendation**
Remove name-based fallback. Require explicit `required: true`:
```js
const isPropRequired = (prop) => prop.required === true;
```
Then audit all configs and add `required: true` where needed.

**Benefit** Explicit over implicit. Self-documenting config.

---

## Finding 6

**Category** JavaScript / Security
**Severity** 🔴 High
**Location** `index.jsx` L29

**Problem**
`new Function("props", ...)` executes arbitrary expressions from template strings. Runs in page context with access to all globals. No sandboxing.

**Recommendation**
This is an internal-only doc-site so risk is limited. Ensure:
1. Always `try/catch` every call (already done ✅).
2. Document explicitly as internal tool only.
3. Consider replacing with a simple key-path resolver for 90% of use cases.

**Benefit** Reduced attack surface. Easier to audit.

---

## Finding 7

**Category** JavaScript
**Severity** 🟡 Medium
**Location** `index.jsx` L194–L346

**Problem**
Race condition in iframe effect. `ResizeObserver` created before `onload` fires:
```js
doc.open(); doc.write(srcDoc); doc.close();
const resizeObserver = new ResizeObserver(...);   // ← created
iframeRef.current.onload = () => {                // ← attached after
  resizeObserver.observe(body);                   // may never fire
};
```

**Recommendation**
Create observer inside `onload`:
```js
doc.open(); doc.write(srcDoc); doc.close();
iframeRef.current.onload = () => {
  const resizeObserver = new ResizeObserver(...);
  const body = doc.querySelector("body");
  if (body) resizeObserver.observe(body);
};
```

**Benefit** Observer always initialized after document ready. No race condition.

---

## Finding 8

**Category** JavaScript / DRY
**Severity** 🟡 Medium
**Location** `generated.js` — AttachBox and AttachmentCard `js` fields

**Problem**
`openAttachmentFromUrl` function copy-pasted verbatim in both components. Any fix must be applied twice.

**Recommendation**
Extract to shared constant:
```js
const SHARED_PREVIEW_JS = `function openAttachmentFromUrl(id, fileName, fileType) { ... }`;
// reference in both components
```

**Benefit** Single source of truth.

---

## Finding 9

**Category** Clean Code / DRY
**Severity** 🟡 Medium
**Location** `configs.js` L630–695 — DateInput and DateRange `renderHtml`

**Problem**
Near-identical render functions. Same `calIcon` SVG. Same label markup. Same wrapper. Only difference: DateRange adds an extra `<span>` icon wrapper.

**Recommendation**
```js
function renderDateFieldHtml(props, isRange = false) {
  const calIcon = `...`; // one definition
  const iconEl = isRange
    ? `<span id="${props.id}-icon" style="...">${calIcon}</span>`
    : calIcon;
  return `<div ...>${iconEl}</div>`;
}
```

**Benefit** 40+ duplicate lines → ~10. One bug fix applies to both.

---

## Finding 10

**Category** Clean Code / DRY
**Severity** 🟡 Medium
**Location** `configs.js` — InputField, TextArea, SelectInput, DateInput, DateRange `renderHtml`

**Problem**
Required-star + label pattern repeated 5 times:
```js
`${props.required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ''}${props.label}`
```

**Recommendation**
```js
const requiredLabel = (label, required) =>
  `${required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ''}${label}`;
```

**Benefit** Change asterisk styling in one place.

---

## Finding 11

**Category** JavaScript / Performance
**Severity** 🟡 Medium
**Location** `index.jsx` L90–L98

**Problem**
`initialValues` computed in component body, not inside lazy initializer. Runs every render even though only used once.
```js
const initialValues = {};
config.props.forEach((p) => { initialValues[p.name] = p.default; });
const [propsState, setPropsState] = useState(initialValues);
```

**Recommendation**
```js
const [propsState, setPropsState] = useState(() => {
  const vals = {};
  config.props.forEach((p) => { vals[p.name] = p.default; });
  return vals;
});
```

**Benefit** Init runs once only.

---

## Finding 12

**Category** CSS
**Severity** 🟡 Medium
**Location** `index.jsx` L397–L406, L461–L483, L537–L542

**Problem**
Inline styles mixed with CSS classes. `h6` "Properties" heading has 5 inline declarations. Color input wrapper has inline styles. `pre` block has 3. Prevents theming without `!important`.

**Recommendation**
Move all to `styles.css`:
```css
.pg-controls-heading { margin: 0 0 1rem 0; font-weight: bold; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; }
.pg-color-input-wrapper { display: flex; gap: 8px; }
.pg-code-preview { margin: 0; padding: 1rem; overflow-x: auto; max-height: 200px; }
```

**Benefit** All styling in one place. Theme-safe.

---

## Finding 13

**Category** CSS
**Severity** 🟢 Low
**Location** `configs.js` momah-table CSS L1135

**Problem**
Magic Figma-copied fractional pixel value:
```css
width: 91.14283752441406px;
```

**Recommendation**
```css
width: 91px;
```

**Benefit** Clean. Same visual result.

---

## Finding 14

**Category** Architecture / Maintainability
**Severity** 🟡 Medium
**Location** `src/components/Playground/generated.js`

**Problem**
138 KB machine-generated file checked into source control. Duplicates markup/CSS/JS from actual `.cshtml` files. If Razor files change, this silently drifts. No CI enforcement.

**Recommendation**
1. Add `generated.js` to `.gitignore`.
2. Auto-run sync before dev/build:
```json
"scripts": {
  "presync": "node scripts/sync-docs.js",
  "start": "npm run presync && docusaurus start",
  "build": "npm run presync && docusaurus build"
}
```
3. Add CI step that regenerates and diffs; fail on drift.

**Benefit** Docs always reflect real component state.

---

## Finding 15

**Category** Architecture
**Severity** 🟡 Medium
**Location** `docusaurus.config.js` L17

**Problem**
```js
onBrokenLinks: "warn",
```
Broken links ship to users silently.

**Recommendation**
```js
onBrokenLinks: "throw",
```

**Benefit** Build fails on broken links. Production always has valid nav.

---

## Finding 16

**Category** Architecture
**Severity** 🟡 Medium
**Location** `docusaurus.config.js` L14

**Problem**
```js
url: "https://momah-components.example.com",
```
Placeholder URL in production config. Canonical links, sitemap, OG tags all point to non-existent domain.

**Recommendation**
Set real production URL before deploying.

**Benefit** Correct SEO. Correct sitemap.

---

## Finding 17

**Category** Documentation
**Severity** 🟡 Medium
**Location** `docs/components/InputField/index.mdx`

**Problem**
Guide tab shows raw Razor source before any explanation. Properties table missing `Value` parameter (passed via `view-data`).

**Recommendation**
Reorder: description → properties table → code examples. Add missing row:

| Value | string | No | `""` | Pre-filled value. Pass via `view-data='new ViewDataDictionary(ViewData) { { "Value", "..." } }'`. |

**Benefit** Better dev onboarding. Complete API reference.

---

## Finding 18

**Category** Documentation
**Severity** 🟢 Low
**Location** `docs/components/AttachBox/index.mdx` L37

**Problem**
`ActionUrl` parameter exists in configs and Razor source but is missing from the properties table.

**Recommendation**
Add row:

| ActionUrl | string | No | `"/Common/PreviewAttachment"` | Override the preview/download action URL. |

**Benefit** Complete docs.

---

## Finding 19

**Category** Documentation
**Severity** 🟢 Low
**Location** All `.mdx` `_Component.cshtml` tabs

**Problem**
Razor code shown with no explanation. Developers copy without understanding why `RouteValueDictionary` is used, why `@Html.Raw` is needed, etc.

**Recommendation**
Add a 2–3 sentence explanation above each code block.

**Benefit** Reduces questions. Explains non-obvious patterns.

---

## Finding 20

**Category** Maintainability
**Severity** 🟢 Low
**Location** `index.jsx` L347

**Problem**
`useEffect` dependency array includes both `propsState` and `htmlCode`. Since `htmlCode` is derived from `propsState`, this is redundant and risks double-fire.

**Recommendation**
```js
}, [htmlCode, direction, colorMode]);
```

**Benefit** Correct dependency list.

---

## Finding 21

**Category** JavaScript
**Severity** 🟢 Low
**Location** `index.jsx` L104–L122 and L213–L227

**Problem**
`ResizeObserver loop` suppression duplicated: parent window effect uses `includes()`, iframe head script uses `indexOf() >= 0`. Inconsistent.

**Recommendation**
Standardize both to `includes()`.

**Benefit** Consistent code. One change point.

---

## Finding 22

**Category** JavaScript / Clean Code
**Severity** 🟢 Low
**Location** `configs.js` momah-table JS blob L1409

**Problem**
600+ lines of JavaScript stored as a template literal string. No syntax highlighting, no linting, no IDE intellisense. CSS bugs (Finding 3) were invisible because of this.

**Recommendation**
Wire `sync-docs.js` to also read from `momah-table/momahTable.js` and `momah-table/momah-table.css` — not maintained as strings inside `configs.js`.

**Benefit** Linting works. IDE supports editing. Bugs caught before review.

---

## Scores

| Dimension | Score | Notes |
|---|---|---|
| Architecture | **6/10** | Good Docusaurus setup, but monolithic configs and generated file drift risk |
| Maintainability | **5/10** | 2000-line config, CSS bugs in strings, duplication |
| Reusability | **5/10** | Good Playground abstraction, DRY violations in renderHtml helpers |
| Documentation | **7/10** | Good coverage, clear examples, missing params and ordering issues |
| Clean Code | **5/10** | Magic required-names, inline styles, CSS syntax errors, whitelist coupling |

---

## Top 10 Improvements

| # | Finding | Impact |
|---|---|---|
| 1 | Fix 3 CSS syntax bugs in momah-table blob | Immediate visual bug fix |
| 2 | Derive `gen` from `Object.keys(generatedComponents)` — remove whitelist | Remove two-place maintenance |
| 3 | Split `configs.js` into per-component files | Biggest maintainability gain |
| 4 | Replace magic `reqNames` with explicit `required: true` | Eliminate hidden behavior |
| 5 | Use lazy `useState` initializer for `initialValues` | Correctness + minor perf |
| 6 | Add `ActionUrl` to AttachBox docs property table | Complete API docs |
| 7 | Move inline styles from `index.jsx` to `styles.css` | Theming + readability |
| 8 | Set `onBrokenLinks: "throw"` in docusaurus config | Safety net for production |
| 9 | Extract `openAttachmentFromUrl` shared JS | One fix covers all components |
| 10 | Normalize `"momah-table"` key to `MomahTable` | Consistency |

---

## Quick Wins

- Fix CSS syntax errors (Finding 3) — **3 lines changed**
- Change `onBrokenLinks` to `"throw"` (Finding 15) — **1 line**
- Set real production URL (Finding 16) — **1 line**
- Remove `propsState` from `useEffect` deps (Finding 20) — **1 line**
- Add missing `ActionUrl` row to AttachBox docs (Finding 18) — **5 lines**

---

## Long-term Improvements

- Split `configs.js` into per-component modules with index re-export
- Wire `sync-docs.js` into `npm run start` / `npm run build` via `pre` hook
- Add CI step to detect `generated.js` drift from Razor files
- Extract shared `renderDateFieldHtml`, `requiredLabel`, `openAttachmentFromUrl` helpers
- Replace `new Function` interpolation with a safer expression resolver
- Move momah-table CSS/JS to read from actual source files at sync time

---

## Must Fix Before Adding New Features

| Priority | Finding | Reason |
|---|---|---|
| 1 | CSS syntax errors | Silent rendering bugs exist now |
| 2 | Whitelist coupling | Every new component requires two edits |
| 3 | Magic required names | Hidden unexpected required behavior |
| 4 | `generated.js` drift risk | Docs can silently lie about component markup |
| 5 | Monolithic `configs.js` | All concurrent work causes merge conflicts |
