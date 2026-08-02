Displays a label with an optional help tooltip icon. Supports two modes:

## UI Preview

| State   | Preview               |
| ------- | --------------------- |
| Default | ![alt text](image.png) |

---

1. **Explicit Mode:** Pass `Label` and `Tooltip` explicitly.
2. **Auto-Truncate Mode:** Pass `content` and optional `digits`. It will automatically truncate words (or chars if a single word) and put the full string in the tooltip.

## Props

| Prop    | Type   | Default | Description |
|---------|--------|---------|-------------|
| `Label`   | `string` | `""`      | Explicit label text. (Mode 1) |
| `Tooltip` | `string` | `""`      | Explicit tooltip text, shown when hovering the icon. (Mode 1) |
| `content` | `string` | `""`      | The full text content. (Mode 2) |
| `digits`  | `int`    | `null`    | How many words (or chars if no spaces) to keep from `content`. If omitted, full `content` is shown with no tooltip. (Mode 2) |
| `Class`   | `string` | `""`      | Additional CSS classes appended to the wrapper element. |

## Examples

### Mode 1 (Explicit Label & Tooltip)
```html
@await Html.PartialAsync("UI/_LabelTip", new {
    Label = "Name",
    Tooltip = "Full name as in National ID"
})
```

### Mode 2 (Content only - No Truncation)
```html
@await Html.PartialAsync("UI/_LabelTip", new {
    content = "Very long content that shouldn't be truncated"
})
```

### Mode 2 (Content + Digits - Truncation with Tooltip)
```html
@await Html.PartialAsync("UI/_LabelTip", new {
    content = "Very long content that should be truncated",
    digits = 2
})
```
