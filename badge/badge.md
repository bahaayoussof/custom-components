# Badge

![Badge](red.png)
![Badge](green.png)

## Implementation

```html
@model object
@{
var (Color, BgColor, Content, Dot) = Model switch
{
(string c, string b, string t, bool d) => (c, b, t, d),
(string c, string b, string t) => (c, b, t, true),
_ => throw new ArgumentException("Invalid model type provided to _CustomBadge")
};
}

<span class="badge d-flex align-items-center gap-2 px-3 py-2 rounded-4"
	style="background-color: @BgColor; color: @Color; font-size: 14px; width: fit-content;">
	@if (Dot)
	{
	<span style="width: 10px; height: 10px; background-color: @Color; border-radius: 50%;"></span>
	}
	@Content
</span>
```

## Usage

```html
<!-- Badge with dot -->
<partial name="_CustomBadge" model='("#912018", "#fef2f2", "حالا")' />

<!-- Badge without dot -->
<partial name="_CustomBadge" model='("#026b66", "#f2f2f2", "عاجل", false)' />
```