# CKEditor Partial Documentation
![_CKEditor](CKEditor.png)

The `_CKEditor.cshtml` is a reusable partial view that integrates CKEditor 5 (Classic Build) into any Razor page with built-in validation, dynamic sizing, and automatic data synchronization.

## Basic Usage

You can use the partial by passing an anonymous object as the model:

```razor
<partial name="UI/_CKEditor"
         model='new { Id = "description", Label = "Description", Required = true }' />
```

## Available Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `Id` | `string` | **Required** | The unique ID for the textarea and editor instance. |
| `Label` | `string` | `""` | The label text displayed above the editor. |
| `Required` | `bool` | `false` | If true, adds a red asterisk and enables built-in validation. |
| `Placeholder`| `string` | `Label` value | The placeholder text inside the editor. |
| `Height` | `string` | `160px` | The fixed height of the editor (e.g., "300px", "50vh"). |
| `Value` | `string` | `""` | The initial HTML content of the editor. |

## Advanced JavaScript API

The partial exposes a global `CKEditorManager` object to interact with editors programmatically.

### 1. Programmatic Validation
The partial automatically intercepts form submissions and "Save" buttons, but you can manually trigger validation:

```javascript
// Validate all CKEditors on the page
const allValid = window.CKEditorManager.validateAll();

// Validate a specific instance
const specificEditor = document.getElementById('myEditorId');
if (specificEditor.validate) {
    const isValid = specificEditor.validate(true); // pass true to focus if invalid
}
```

### 2. Accessing the CKEditor Instance
If you need to use the [CKEditor 5 API](https://ckeditor.com/docs/ckeditor5/latest/api/index.html) (e.g., to set/get data or listen to events):

```javascript
const editorElement = document.getElementById('myEditorId');
const editorInstance = editorElement.ckeditorInstance;

// Example: Manual Get Data
console.log(editorInstance.getData());

// Example: Manual Set Data
editorInstance.setData('<p>Hello World</p>');
```

### 3. Data Syncing
The `textarea` value is automatically kept in sync with the editor content on every change. This ensures that standard form posts and `jQuery.serialize()` work as expected.

## Customization Example

```razor
<div class="col-md-12">
    <partial name="UI/_CKEditor"
             model='new {
                 Id = "notes",
                 Label = "Additional Notes",
                 Placeholder = "Type your notes here...",
                 Height = "400px",
                 Required = true,
                 Value = "<p>Default content</p>"
             }' />
</div>
```

## Styling
The partial uses a CSS variable `--editor-height` to ensure the editor height remains persistent even during focus or state changes. You can override this globally or per container if needed.

```css
.my-custom-container {
    --editor-height: 600px;
}
```
