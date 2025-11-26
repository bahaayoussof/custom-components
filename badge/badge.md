# Badge

![Badge](red.png)
![Badge](green.png)

## Implementation

```html
@model (string Color, string BgColor, string Content, bool Dot)

<span class="badge d-flex align-items-center gap-2 px-3 py-2 rounded-5"
      style="background-color: @Model.BgColor; color: @Model.Color; font-size: 14px; width: fit-content;">
    @if (Model.Dot)
    {
        <span style="width: 10px; height: 10px; background-color: @Model.Color; border-radius: 50%;"></span>
    }
    @Model.Content
</span>
```

## Usage

```html
<!-- Badge with dot -->
<partial name="_CustomBadge" model='("#912018", "#fef2f2", "حالا")' />

<!-- Badge without dot -->
<partial name="_CustomBadge" model='("#026b66", "#f2f2f2", "عاجل", false)' />
```