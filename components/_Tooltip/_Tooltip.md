# `_Tooltip.cshtml` — Reusable Tooltip Partial

> **Location:** `Views/Shared/UI/_Tooltip.cshtml`

A self-contained hover tooltip for ASP.NET Core Razor views.
Supports rich HTML content, multiple placements, RTL/LTR layouts, and auto viewport-aware flipping.

---

## Visual Preview

![alt text](image.png)
![alt text](image-1.png)

---

## How It Works

- **Trigger** — an inline element (`<span>`) containing an optional text label and/or an icon.
- **Bubble** — appears on `:hover` or `:focus-within` of the trigger.
- **Smart positioning** — on hover the JS measures viewport space and automatically **flips** the bubble to the opposite side if there is not enough room.
- **Horizontal shift** — if the bubble would overflow the left/right viewport edge it is shifted in-place.
- **Shared assets** — the `<style>` and `<script>` blocks are injected **only once per page** regardless of how many tooltips are on the page (tracked via `ViewData`).

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | *(empty)* | Trigger label text. HTML is allowed (e.g. `<span class='text-danger'>*</span>`). Omit for icon-only triggers. |
| `content` | `string` | *(empty)* | Tooltip body. Accepts any HTML — plain text, `<ul>`, `<ol>`, `<strong>`, links, etc. **Required.** |
| `icon` | `string` | *(empty)* | Full HTML for the trigger icon, e.g. `<i class="bi bi-info-circle"></i>`. At least one of `label` or `icon` must be provided. |
| `placement` | `string` | `"top"` | Preferred bubble direction: `"top"` · `"bottom"` · `"start"` · `"end"`. The JS may flip this at runtime based on available space. |
| `maxHeight` | `string` | `"500px"` | Maximum height of the bubble before it becomes scrollable. Any valid CSS length (`px`, `rem`, `vh`). |
| `cssClass` | `string` | *(empty)* | Extra CSS class(es) appended to the outer wrapper `<span>`. |
| `id` | `string` | *(auto)* | Stable id suffix used to build `tip-{id}`. Auto-generated (`Guid`) when omitted. Provide a value when you need a predictable DOM id (e.g. for testing or ARIA). |

> [!NOTE]
> The partial renders **nothing** if `content` is empty, or if both `label` and `icon` are empty.

---

## Basic Usage

```cshtml
@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    label   = "اقرأ المزيد",
    icon    = "<i class=\"bi bi-question-circle-fill\"></i>",
    content = "هذا نص تلميح بسيط يشرح العنصر."
})
```

---

## Examples

### 1 — Label + Icon, top placement (default)

```cshtml
@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    label   = "مذكرة توضيحية <span class='text-danger'>*</span>",
    icon    = "<i class=\"bi bi-question-circle-fill text-secondary\"></i>",
    content = @"<ol>
                  <li>بيان السند النظامي للاختصاص.</li>
                  <li>الهدف من المشروع المقترح.</li>
                  <li>العناصر الرئيسية للمشروع.</li>
               </ol>"
})
```

---

### 2 — Icon-only trigger

```cshtml
@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    icon    = "<i class=\"bi bi-info-circle text-primary fs-5\"></i>",
    content = "يمكنك رفع ملفات PDF أو Word فقط."
})
```

---

### 3 — Bottom placement with plain text

```cshtml
@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    label     = "رسوم الخدمة",
    icon      = "<i class=\"bi bi-currency-dollar\"></i>",
    placement = "bottom",
    content   = "الرسوم غير قابلة للاسترداد بعد تقديم الطلب."
})
```

---

### 4 — Side placement (start / end) with custom height

```cshtml
@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    label     = "متطلبات المستند",
    icon      = "<i class=\"bi bi-paperclip\"></i>",
    placement = "start",
    maxHeight = "200px",
    content   = @"<ul>
                    <li>الهوية الوطنية سارية المفعول</li>
                    <li>عقد العمل موثق</li>
                    <li>كشف الراتب لآخر 3 أشهر</li>
                  </ul>"
})
```

---

### 5 — Stable id (for testing / ARIA references)

```cshtml
@await Html.PartialAsync("~/Views/Shared/UI/_Tooltip.cshtml", new {
    id      = "docs-tip",
    label   = "وثائق مطلوبة",
    content = "الوثيقة الرسمية مطلوبة للمراجعة."
})
```

Rendered DOM id will be `tip-docs-tip`.

---

## CSS Helper Classes

These classes are available inside tooltip content and on the wrapper:

| Class | Where to use | Effect |
|---|---|---|
| `tt-highlight` | Inside `content` HTML | Yellow highlight badge — `<span class="tt-highlight">keyword</span>` |
| `tt-label-dashed` | Add to wrapper via `cssClass` | Adds a dashed underline to the label text |

**Highlight example:**

```cshtml
content = "يجب أن تكون <span class='tt-highlight'>الهوية الوطنية</span> سارية المفعول."
```

---

## Placement Reference

```
        [top]          ← default
          ↑
[end] ←  TRIGGER  → [start]
          ↓
       [bottom]
```

> [!IMPORTANT]
> `start` and `end` are **logical** (RTL-aware), not physical:
> - In **RTL** pages: `start` = right side, `end` = left side.
> - In **LTR** pages: `start` = left side, `end` = right side.

The JS will automatically flip `top ↔ bottom` or `start ↔ end` when the preferred side lacks viewport space.

---

## Scrollable Content

When the content height exceeds `maxHeight`, the bubble becomes vertically scrollable automatically.
A thin, styled scrollbar appears on overflow. Set `maxHeight` to control the threshold:

```cshtml
maxHeight = "300px"   @* default is 500px *@
```

---

## Accessibility

- The wrapper renders with `tabindex="0"` and `role="button"` — keyboard users can focus it with **Tab**.
- The bubble carries `role="tooltip"` and is linked via `aria-describedby` to the trigger.
- `dir="auto"` on the bubble ensures correct bidirectional text rendering inside mixed-language content.

---

## Notes & Gotchas

> [!WARNING]
> The partial renders **nothing silently** if `content` is blank. Always pass a non-empty `content` value.

> [!TIP]
> If multiple tooltips appear on the same page, you do **not** need to worry about duplicate `<style>` or `<script>` tags — the partial injects them only once via `ViewData`.

> [!NOTE]
> The outer wrapper uses `position: relative` and `z-index: 10` at rest, rising to `99999` on hover. Make sure parent containers do **not** have `overflow: hidden` or a lower `z-index` that clips the bubble.
