# _InputField

![input-field](input-field.png)

```html
@model (string Label, bool Required, string Id, string Placeholder)
@{
var placeholder = string.IsNullOrEmpty(Model.Placeholder) ? "يكتب النص هنا" : Model.Placeholder;
}
<div class="mb-4">
	<label class="form-label text-gray-700" for="@Model.Id">
		@if (Model.Required)
		{
		<span class="text-danger">*</span>
		}
		@Model.Label
	</label>
	<input id="@Model.Id" name="@Model.Id" class="form-control" placeholder="@placeholder" @(Model.Required ? "required"
		: "" )></input>
</div>
```

### How to use

```cshtml
<partial name="_InputField" model='("اسم الحقل", true, "field-id", "نص توضيحي")' />
<partial name="_InputField" model='("اسم الحقل الاختياري", false, "field-id2", "")' />
```
