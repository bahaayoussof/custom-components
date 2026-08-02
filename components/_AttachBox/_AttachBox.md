The `_AttachBox` partial view provides a consistent UI element for displaying and interacting with an attached file. It displays the file's name alongside an automatically determined icon representing its format, and offers standard actions like previewing and downloading the file directly.

## UI Preview

| State   | Preview               |
| ------- | --------------------- |
| Default | ![alt text](image.png) |

---

## Properties

You can use the partial in your views as follows:

```html
<partial name="UI/_AttachBox" model='new { FileId = "12345", FileName = "My Document.pdf" }' />
```

### Model Property Table

| Property | Type   | Required | Default Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| **FileId** | `string` | **Yes** | `""` | The unique ID of the attachment from the database or DMS. E.g., `"27131"`. The download and preview URLs will be built based on this ID. |
| **FileName** | `string` | **Yes** | `""` | The display name of the file (e.g., `"Resume.pdf"`). |
| **Id** | `string` | No | Generated string | The HTML `id` attribute for the container element. If not specified, a unique auto-ID in the format `attach-{random}` will be generated automatically. |

## Feature Set

- **File Icon Autodetection:** The file extension (parsed from `FileName` or `FileId`) determines the file type (e.g., pdf, word, excel, image). The icon is rendered dynamically based on this type, though in the current version, a generic layout applies.
- **Inline Preview:** Clicking the preview (eye) icon will open the file in the shared inline Global Preview Modal (`_FilePreview`). This works seamlessly for images, text, code, PDFs, and Office files across devices.
- **Direct Download:** The download icon constructs the hyperlink using the `FileId` and forces a download via the HTML5 `download` attribute on the anchor tag.

## Examples

### Using only FileId
```html
<partial name="UI/_AttachBox" model='new { FileId = "48392", FileName = "Consultation Summary.docx" }' />
```
*Note: Make sure that `FileId` parses to a meaningful file route or the file name must be supplemented since extracting a name from an ID alone returns the ID itself.*

### Full Example with all arguments
```html
<partial name="UI/_AttachBox"
    model='new {
        FileId = "8582",
        FileName = "Consultation Summary.docx",
        Id = "my-custom-attach-box"
    }'
/>
```
