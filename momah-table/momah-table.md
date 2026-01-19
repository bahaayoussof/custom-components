# MomahTable Documentation

`MomahTable` is a lightweight, dynamic table rendering utility designed for the Momah Legal Cases project. it supports custom columns, data binding, pagination, search, and filtering.

## Installation

Ensure `momahTable.js` and `momah-table.css` are included in your page:

```html
<link rel="stylesheet" href="/assets/css/momah-table.css" />
<script src="/assets/scripts/momahTable.js"></script>

<!-- incase need pagination include style -->
<link rel="stylesheet" href="/assets/css/pagination.css" />
```

## API Reference

### `MomahTable.render(containerSelector, columns, records, options)`

Renders a table into the specified container.

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `containerSelector` | `string` \| `HTMLElement` | Table container selector eg. #id (Adds `.momah-table-host`) |
| `columns` | `Array<Object>` | Configuration for table columns. |
| `records` | `Array<Object>` | Array of data objects to display. Defaults to `[]`. |
| `options` | `Object` | Optional configuration for pagination, search, and filtering. |

---

## Column Configuration

Each object in the `columns` array can have the following properties:

| Property | Type | Description |
| :--- | :--- | :--- |
| `header` | `string` | The text to display in the table header (`<th>`). |
| `field` | `string` | The key in the record object to display in this column. |
| `width` | `string` | CSS width (e.g., `"150px"`, `"20%"`). |
| `className` | `string` | CSS class to apply to the header cell (`<th>`). |
| `tdClassName` | `string` | CSS class to apply to the body cells (`<td>`). |
| `render` | `Function` | Custom render function: `(record, index) => string \| HTMLElement`. Overrides `field`. |
| `hide` | `boolean` \| `string` \| `number` | Hides the column if `true`, `"true"`, or `1`. |
| `show` | `boolean` \| `string` \| `number` | Shows the column (default). Hides if `false`, `"false"`, or `0`. |

---

## Options Configuration

### 1. Pagination
Configures the table's pagination controls.

```javascript
options: {
    pagination: {
        containerSelector: "#pagination-container", // Optional. Adds .momah-pagination-host
        currentPage: 1,                             // Default: 1
        totalPages: 10,                            // Default: 1
        onPageChange: function(newPage) { ... }    // Callback when a page is clicked.
    }
}
```

### 2. Search
Renders a search input field. Adds `.momah-actions-host` to the container.

```javascript
options: {
    search: {
        containerSelector: "#search-host", // Required. Adds .momah-actions-host
        inputId: "txtFullName",            // Default: "txtFullName"
        placeholder: "Search...",           // Default: ""
    }
}
```
> [!NOTE]
> The search logic automatically tries to call `window.performSearch()`, `window.LoadData()`, or `filterOptions.onFilter()` when Enter is pressed or the search icon is clicked.

### 3. Filter
Renders a filter button (can be a standard button or icon-only).

```javascript
options: {
    filter: {
        containerSelector: "#filter-host", // Required. Adds .momah-actions-host
        label: "Filter",                   // Text label for the button.
        icon: '<svg>...</svg>',            // Custom SVG icon. Defaults to a funnel icon.
        isIcon: false,                     // If true, renders only the icon without border/background.
        targetModalId: "filterModal",      // If provided, adds data-bs-toggle="modal".
        onClick: function(e) { ... },      // Click handler.
        onFilter: function() { ... }       // Logic trigger for search/filter events.
    }
}
```

---

## Usage Example

```javascript
const columns = [
    { header: "ID", field: "id", width: "50px" },
    { header: "Name", field: "name" },
    {
        header: "Actions",
        render: (rec) => `<button onclick="edit(${rec.id})">Edit</button>`
    }
];

const data = [
    { id: 1, name: "Case A" },
    { id: 2, name: "Case B" }
];

MomahTable.render("#table-container", columns, data, {
    pagination: {
        currentPage: 1,
        totalPages: 5,
        onPageChange: (p) => console.log("Navigating to page", p)
    },
    search: {
        containerSelector: "#controls-container",
        placeholder: "Find legal case..."
    }
});
```
