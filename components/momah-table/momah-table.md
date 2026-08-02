A lightweight, dependency-free JavaScript component for rendering dynamic HTML tables with pagination, search, and filtering.

## UI Preview

| State         | Preview               |
| ------------- | --------------------- |
| Default Table | ![alt text](image.png)  |
| Filtered View | ![alt text](image-1.png)|

---

## Quick Start (3 Steps)

### 1. Include Files

```html
<link rel="stylesheet" href="~/assets/css/momahTable.css"/>
<script src="/assets/js/momahTable.js"></script>

<!-- incase need pagination include style -->
<link rel="stylesheet" href="/assets/css/pagination.css" />
```

### 2. Create HTML Containers

```html
<div id="tableActions"></div>   <!-- Search/Filter container (optional) -->
<div id="tableContainer"></div> <!-- Table container -->
<div id="pagination"></div>     <!-- Pagination container (optional) -->
```

### 3. Render the Table

```javascript
const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' }
];

MomahTable.render('#tableContainer', columns, data);
```

---

## Basic Usage

### Simple Table (No Options)

```javascript
MomahTable.render('#tableContainer', columns, data);
```

### Table with Pagination

```javascript
MomahTable.render('#tableContainer', columns, data, {
    pagination: {
        containerSelector: '#pagination',
        currentPage: 1,
        totalPages: 5,
        onPageChange: (page) => loadData(page)
    }
});
```

### Table with Search

```javascript
MomahTable.render('#tableContainer', columns, data, {
    search: {
        containerSelector: '#tableActions',
        inputId: 'searchInput',
        placeholder: 'Search...'
    }
});
```

### Table with Filter Button

```javascript
MomahTable.render('#tableContainer', columns, data, {
    filter: {
        containerSelector: '#tableActions',
        label: 'Filter',
        targetModalId: 'filterModal'
    }
});
```

### Table with Column Picker

```javascript
MomahTable.render('#tableContainer', columns, data, {
    columnPicker: {
        containerSelector: '#tableActions'
    }
});
```

---

## Column Configuration

| Property | Type | Description |
|----------|------|-------------|
| `header` | String | Column header text |
| `field` | String | Data property to display |
| `render` | Function | Custom cell content (returns HTML) |
| `width` | String | Column width (e.g., `'100px'`, `'20%'`) |
| `className` | String | CSS class for header |
| `tdClassName` | String | CSS class for cells |
| `hide` | Boolean | Set `true` to hide column (won't show in picker) |

### Using `render` for Custom Content

```javascript
{
    header: 'Actions',
    render: (record) => `
        <button onclick="edit(${record.id})">Edit</button>
        <button onclick="delete(${record.id})">Delete</button>
    `
}
```

---

## Advanced Options

### Full Example with All Features

```javascript
const options = {
    search: {
        containerSelector: '#tableActions',
        inputId: 'searchInput',
        placeholder: 'Search by name...'
    },
    filter: {
        containerSelector: '#tableActions',
        label: 'Filter',
        targetModalId: 'filterModal',
        isIcon: false  // Set true for icon-only button
    },
    columnPicker: {
        containerSelector: '#tableActions'
    },
    pagination: {
        containerSelector: '#pagination',
        currentPage: 1,
        totalPages: 10,
        onPageChange: (page) => loadData(page)
    }
};

MomahTable.render('#tableContainer', columns, data, options);
```

### Search Options

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
| `containerSelector` | Yes | - | Container element selector |
| `inputId` | No | `txtFullName` | Input element ID |
| `placeholder` | No | - | Input placeholder text |

### Filter Options

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
| `containerSelector` | Yes | - | Container element selector |
| `label` | No | `تصفية البحث` | Button text |
| `targetModalId` | No | - | Bootstrap modal ID to open |
| `onClick` | No | - | Custom click handler |
| `isIcon` | No | `false` | Show icon-only button |
| `icon` | No | - | Custom SVG HTML |

### Column Picker Options

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
| `containerSelector` | Yes | - | Container element selector |

### Pagination Options

| Property | Required | Default | Description |
|----------|----------|---------|-------------|
| `containerSelector` | Yes | - | Container element selector |
| `currentPage` | Yes | - | Current page number |
| `totalPages` | Yes | - | Total number of pages |
| `onPageChange` | Yes | - | Function called when page changes |

---

## Handling Search/Filter Events

When the user searches or filters, `MomahTable` will call one of these functions (in order):

1. `window.performSearch()`
2. `window.LoadData()`
3. `filterOptions.onFilter`

Define one of these in your page:

```javascript
function performSearch() {
    const value = document.getElementById('searchInput').value;
    console.log('Search value:', value);
    // Fetch new data and re-render table
}

function LoadData() {
    // Your data loading logic
}
```

---

## Common Patterns

### Pattern 1: Table Only

```javascript
MomahTable.render('#tableContainer', columns, data);
```

### Pattern 2: Table with Search

```javascript
MomahTable.render('#tableContainer', columns, data, {
    search: { containerSelector: '#tableActions' }
});
```

### Pattern 3: Table with Pagination

```javascript
MomahTable.render('#tableContainer', columns, data, {
    pagination: {
        containerSelector: '#pagination',
        currentPage: 1,
        totalPages: 5,
        onPageChange: (page) => loadData(page)
    }
});
```

### Pattern 4: Table with Search + Filter + Pagination

```javascript
MomahTable.render('#tableContainer', columns, data, {
    search: { containerSelector: '#tableActions' },
    filter: {
        containerSelector: '#tableActions',
        label: 'Filter',
        targetModalId: 'filterModal'
    },
    columnPicker: { containerSelector: '#tableActions' },
    pagination: {
        containerSelector: '#pagination',
        currentPage: 1,
        totalPages: 5,
        onPageChange: (page) => loadData(page)
    }
});
```

---

## Hiding Columns

Columns can be hidden in two ways:

### Method 1: Using `hide` property

```javascript
const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Secret', field: 'secret', hide: true }, // Hidden
    { header: 'Name', field: 'name' }
];
```

### Method 2: Using `show` property

```javascript
const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Secret', field: 'secret', show: false }, // Hidden
    { header: 'Name', field: 'name' }
];
```

---

## Notes

- The `render` function returns HTML content for cells
- Hidden columns (with `hide: true`) won't appear in the Column Picker
- Search input automatically triggers `Enter` key to search
- Clear button (X) in search input clears and triggers search
- Pagination shows ellipsis (...) for large page counts
