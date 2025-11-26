# Status Modal - Usage Guide

## How to Use

### 1. Include the Partial in Your View

Add this line anywhere in your view (typically at the bottom before closing tags):

```cshtml
@await Html.PartialAsync("_StatusModal")
```

Or using the shorter syntax:

```cshtml
<partial name="_StatusModal" />
```

### 2. Call the Modal from JavaScript

Use the `showStatusModal()` function with your desired options:

#### With Action Button

```javascript
showStatusModal({
  type: "success",
  title: "تم الحفظ بنجاح",
  message: "هل تريد الانتقال إلى الصفحة الرئيسية؟",
  showActionButton: true,
  actionButtonText: "تأكيد",
  onConfirm: function () {
    // Handle action logic
  },
  onCancel: function () {
    // Handle cancel action if needed
  },
});
```

## Available Options

| Option             | Type     | Default   | Description                                     |
| ------------------ | -------- | --------- | ----------------------------------------------- |
| `type`             | string   | 'success' | Modal type: 'success', 'info', 'error'          |
| `title`            | string   | 'empty string'| Main title text [bold text]                     |
| `message`          | string   | 'empty string'| Optional message below title [normal text]      |
| `showActionButton` | boolean  | false     | Show/hide the action button                     |
| `actionButtonText` | string   | 'تأكيد'   | Text for action button                          |
| `onConfirm`        | function | null      | Callback when confirm button is clicked         |
| `onCancel`         | function | null      | Callback when [cancel, close] button is clicked |

## Complete Example in a View

```cshtml

<div class="container">
    <h1>My Page Content</h1>

    <button onclick="handleStatusModal()"
    class="btn btn-primary">Test Success</button>
</div>

@* Include the modal partial *@
<partial name="_GenericStatusModal" />

@section Scripts {

    <script>
        function handleStatusModal() {
            showStatusModal({
                type: "info",
                title: "تم الحفظ بنجاح",
                message: "هل تريد الانتقال إلى الصفحة الرئيسية؟",
                showActionButton: true,
                actionButtonText: "تأكيد",
                onConfirm: function () {
                    console.log('onConfirm triggered!');
                },
                onCancel: function () {
                    console.log('onCancel triggered!');
                },
            });
        }
    </script>

}
```

## Screenshots
![alt text](success.png)

![alt text](info.png)

![alt text](error.png)