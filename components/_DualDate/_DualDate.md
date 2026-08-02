Dual-segment date picker. Displays Hijri and Gregorian dates side by side. Supports optional date range limits.

## UI Preview

| State            | Preview                  |
| ---------------- | ------------------------ |
| Default          | ![alt text](image.png)   |
| Calendar Popover | ![alt text](image-1.png) |

---

## Usage

### Option 1: Tuple Model (Classic)

```cshtml
<partial name="UI/_DualDate" model='("Label Text", isRequired, "uniqueId")' />
```

### Option 2: Anonymous Object Model (Recommended)

```cshtml
<partial name="UI/_DualDate" model='new {
    id          = "editor1",
    label       = "وصف الحالة",
    required    = true,
    placeholder = "",
    minDate     = "today",
    maxDate     = "+2m"
}' />
```

---

## Parameters

### Tuple Model

| Index | Type     | Required | Description                                    |
| ----- | -------- | -------- | ---------------------------------------------- |
| `[0]` | `string` | Yes      | Label text                                     |
| `[1]` | `bool`   | Yes      | Required validator toggle                      |
| `[2]` | `string` | Yes      | Unique ID (used as Hijri input name and ID)    |
| `[3]` | `string` | No       | Placeholder text (defaults to `"يوم/شهر/سنة"`) |

### Anonymous Object Model

| Property      | Type     | Required | Description                                    |
| ------------- | -------- | -------- | ---------------------------------------------- |
| `id`          | `string` | Yes      | Unique ID for the component                    |
| `label`       | `string` | Yes      | Label text displayed above the picker          |
| `required`    | `bool`   | No       | Enables required validation (default: `false`) |
| `placeholder` | `string` | No       | Placeholder text (default: `"يوم/شهر/سنة"`)   |
| `minDate`     | `string` | No       | Earliest selectable date (see formats below)   |
| `maxDate`     | `string` | No       | Latest selectable date (see formats below)     |

> **Note:** `id` must be unique per page.

---

## Date Limit Formats (`minDate` / `maxDate`)

Both accept the same formats. Auto-detected — no flag needed.

| Format         | Example          | Description                                      |
| -------------- | ---------------- | ------------------------------------------------ |
| `"today"`      | `"today"`        | Current date (Hijri)                             |
| `"+Nm"`        | `"+1m"`, `"+2m"` | N months **after** today (Hijri calendar)        |
| `"-Nm"`        | `"-1m"`, `"-3m"` | N months **before** today (Hijri calendar)       |
| Hijri date     | `"1448-02-01"`   | Fixed Hijri date (`yyyy-MM-dd`, year ≤ 1600)     |
| Gregorian date | `"2026-07-01"`   | Fixed Gregorian date (`yyyy-MM-dd`, year ≥ 1800) |

### Examples

```cshtml
{{-- Last month to next 2 months --}}
minDate="-1m"  maxDate="+2m"

{{-- From today forward only --}}
minDate="today"

{{-- Fixed Hijri range --}}
minDate="1448-01-01"  maxDate="1448-06-30"

{{-- Fixed Gregorian range --}}
minDate="2026-01-01"  maxDate="2026-12-31"

{{-- Mix: Gregorian min, relative max --}}
minDate="2026-06-01"  maxDate="+1m"
```

### Edge Cases

| Scenario               | Behavior                                              |
| ---------------------- | ----------------------------------------------------- |
| `minDate` > `maxDate`  | Both limits ignored; console warning emitted          |
| Invalid format         | Limit ignored (treated as no limit)                   |
| `null` / empty         | No restriction on that side                           |
| Month-end day clamp    | If today = day 30 and target month has 29 days → 29  |

---

## Validation

- Calendar UI: disabled cells are greyed out and unclickable
- Form submit: hooks automatically; shows red border + error message
- Error messages:
  - Required + empty → `"{Label} مطلوب"`
  - Out of range → `"{Label} خارج النطاق المسموح"`

### Manual validate

```js
var isValid = window.validateDDate["myDateId"]();
```

---

## Form Submission Values

Two hidden inputs submitted with the form:

| Name        | Format       | Description         |
| ----------- | ------------ | ------------------- |
| `{id}`      | `yyyy/mm/dd` | Selected Hijri date |
| `{id}-greg` | `yyyy/mm/dd` | Auto Gregorian date |

---

## JavaScript API

### `getDualDate(id)`

```js
var dates = getDualDate("receiptDate");
// { hijri: "1447/06/22", gregorian: "2025/12/12" }  or  null
```

### `window.__ddDates[id]`

Same object, direct access:

```js
window.__ddDates["receiptDate"]; // { hijri, gregorian } or null
```

---

## Style Override

```css
/* Selected day color */
.double-date-wrapper .day-cell.selected {
  background-color: #YOUR_COLOR !important;
  border-color: #YOUR_COLOR;
}
/* Today indicator */
.double-date-wrapper .day-cell.today {
  border-color: #YOUR_COLOR;
}
/* Disabled day (out of range) */
.double-date-wrapper .day-cell.disabled {
  opacity: 0.35;
}
```

---

## Dependencies

Load before the partial:

- jQuery
- `jquery.calendars.js`
- `jquery.calendars.ummalqura.js`
