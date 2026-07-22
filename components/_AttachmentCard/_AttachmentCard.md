# Attachment Card `_AttachmentCard`
![Attachment Card](image.png)


A UI component used to display a standardized card for a file attachment, showing its details and providing a built-in "preview" (عرض) button. It integrates directly with the generic `_FilePreview` modal for seamless viewing of supported document types (PDFs, Images, Word, Excel, etc.).

## Location
`Views/Shared/UI/_AttachmentCard.cshtml`

## Usage Examples

### Basic Usage
The simplest way to use the component is by passing the minimal required fields, `FileName` and `FileId`. The component will infer the file type from the extension in the `FileName` (or `FileId` if provided as a URL).

```html
@await Html.PartialAsync("UI/_AttachmentCard", new {
    FileName = "Contract.pdf",
    Details = "Signed copy of the main contract.",
    FileId = "15243"
})
```

### Advanced Usage
You can optionally provide a hardcoded `Id` for the DOM element and override the backend endpoint that fetches the file using `ActionUrl`.

```html
@await Html.PartialAsync("UI/_AttachmentCard", new {
    Id = "custom-contract-card",
    FileName = "Project_Requirements.docx",
    Details = "Initial drafted requirements.",
    FileId = "99824",
    ActionUrl = "/CustomController/DownloadAttachment" // Overrides default API
})
```

## Properties

The component accepts an anonymous object with the following properties.

| Property    | Type   | Default Value                    | Description |
| :---------- | :----- | :------------------------------- | :---------- |
| `Id`        | string | Auto-generated (`attachCard-{Guid}`) | The internal DOM ID for the outermost container div. If not provided, a unique ID is automatically generated. |
| `FileName`  | string | Inferred from `FileId`           | The main title of the file displayed in the card. Used to infer the preview `FileType`. If omitted, it will try to extract the file name from `FileId`. |
| `Details`   | string | `""`                             | The subtitle or brief description shown right below the file name. |
| `FileId`    | string | `""`                             | The unique identifier used to fetch the file from the backend, appended to the `ActionUrl`. It can also be a full direct URL to a file. |
| `ActionUrl` | string | `"/Common/PreviewAttachment"`    | The base endpoint called to fetch the file stream for the preview modal. By default, relies on the `PreviewAttachment` endpoint in the `Common` controller, but it can be overridden. |

## Dependencies
This component relies on two other standard partial views to render previews and handle errors gracefully:
1. `UI/_FilePreview`: Handles displaying the preview overlay over the page.
2. `UI/_StatusModal`: Triggers an info/warning popup if the requested file is missing.

*(Both are automatically included at the bottom of the partial block).*
