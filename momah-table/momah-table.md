# `MomahTable.js` Documentation

`MomahTable` is a lightweight, dependency-free JavaScript component for rendering dynamic HTML tables from data. It supports pagination, search, and custom filtering controls.

---

## 1. Getting Started

### Include the Script

First, include the `momahTable.js` script in your HTML file.

```html
<!-- incase of pagination include this  -->
<link type="text/css" rel="stylesheet" href="~/assets/css/pagination.css"/>

<link type="text/css" rel="stylesheet" href="~/assets/css/momahTable.css"/>
<script src="/assets/js/momahTable.js"></script>
```

### HTML Structure

Next, create the HTML containers where the table and its controls (like search, filter, and pagination) will be rendered.

```html
// container
<div class="table-container">
  <!-- Container for Search and Filter optional -->
  <div id="tableActions"></div>

  <!-- Container for the table -->
  <div id="ListData"></div>

  <!-- Container for Pagination optional -->
  <div id="pagination"></div>
</div>
```

---

## 2. Basic Usage

The primary function is `MomahTable.render()`. It takes up to four arguments:

1.  `containerSelector` (String|HTMLElement): A CSS selector or a DOM element where the table will be rendered.
2.  `records` (Array): An array of data objects to display in the table rows.
3.  `columns` (Array): An array of objects defining the table columns.
4.  `options` (Object, optional): An object for configuring advanced features like pagination, search, and filtering.

### Simple Example

Here's a basic example of rendering a table with two columns.

```javascript
// Sample data
const myRecords = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
];

// Column definitions
const myColumns = [
    { header: 'ID', field: 'id', width: '10%' },
    { header: 'Full Name', field: 'name' }
];

// Render the table
MomahTable.render('#table-container', myRecords, myColumns);
```

---

## 3. Column Configuration

The `columns` array is the core of your table's structure. Each object in the array can have the following properties:

-   `header` (String): The text to display in the table header (`<th>`).
-   `field` (String): The property name from a record object to display in the cell.
-   `render` (Function): A function that returns the content for a cell. It receives the `record` object and its `index`. This is useful for custom formatting or adding HTML.
-   `width` (String): A CSS width value (e.g., `'20%'`, `'150px'`) for the column.
-   `className` (String): A CSS class to apply to the header cell (`<th>`).
-   `tdClassName` (String): A CSS class to apply to the body cells (`<td>`).

### Example with `render` function

Use the `render` function to create custom content, like action buttons.

```javascript
const columnsWithActions = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    {
        header: 'Actions',
        tdClassName: 'text-center',
        render: function(record) {
            // Note: The returned string is rendered as HTML.
            return `
                <button class="btn btn-sm btn-primary" onclick="editRecord(${record.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteRecord(${record.id})">Delete</button>
            `;
        }
    }
];

// Assuming myRecords is defined
MomahTable.render('#table-container', myRecords, columnsWithActions);

function editRecord(id) {
    console.log('Editing record with ID:', id);
}

function deleteRecord(id) {
    console.log('Deleting record with ID:', id);
}
```

---

## 4. Advanced Options

You can enable pagination, search, and filtering through the `options` object.

### Pagination

To enable pagination, provide a `pagination` object in the options.

-   `containerSelector` (String|HTMLElement): Where to render the pagination controls.
-   `currentPage` (Number): The currently active page number.
-   `totalPages` (Number): The total number of pages available.
-   `onPageChange` (Function): A callback function that is executed when a user clicks a page number. It receives the `newPage` number as an argument. You should use this to fetch new data and re-render the table.

**Example:**

```javascript
function loadPage(page) {
    // In a real application, you would fetch data for the new page via AJAX.
    console.log('Loading page:', page);

    const myRecords = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
    ];
    const myColumns = [
        { header: 'ID', field: 'id' },
        { header: 'Full Name', field: 'name' }
    ];

    const options = {
        pagination: {
            containerSelector: '#pagination',
            currentPage: page,
            totalPages: 10,
            onPageChange: loadPage // The function to call when the page changes
        }
    };

    MomahTable.render('#table-container', myRecords, myColumns, options);
}

// Initial load
loadPage(1);
```

### Search and Filter

You can add a search bar and a filter button. They are rendered together in the same container.

-   **`search` object:**
    -   `containerSelector` (String|HTMLElement): Where to render the search bar.
    -   `inputId` (String, optional): The `id` for the search input field. Defaults to `txtFullName`.
    -   `placeholder` (String, optional): The placeholder text for the search input.

-   **`filter` object:**
    -   `containerSelector` (String|HTMLElement): Where to render the filter button.
    -   `label` (String, optional): The text for the filter button. Defaults to "تصفية البحث".
    -   `targetModalId` (String, optional): The ID of a Bootstrap modal to open when the button is clicked.
    -   `onClick` (Function, optional): A custom function to run when the button is clicked.
    -   `onFilter` (Function, optional): A function that gets called when the user presses "Enter" in the search box.

#### How Search/Filter Events Work

When a user presses "Enter" in the search box or clicks the "clear" (X) button, `MomahTable` will try to call one of the following global functions in this order:
1.  `window.performSearch()`
2.  `window.LoadData()`
3.  The `onFilter` function you provided in the `filterOptions`.

You should define one of these functions on your page to handle the search/filter logic (e.g., make an AJAX call and re-render the table).

**Example:**

```html
<!-- Add a Bootstrap Modal for the filter -->
<div class="modal fade" id="filterModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Filter Options</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Your filter form fields go here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="applyFilters()">Apply</button>
      </div>
    </div>
  </div>
</div>
```

```javascript
// This function will be called when the user searches.
function performSearch() {
    const searchValue = document.getElementById('mySearchInput').value;
    console.log('Searching for:', searchValue);
    // Add your logic to fetch and re-render data here.
}

const tableOptions = {
    search: {
        containerSelector: '#tableActions',
        inputId: 'mySearchInput',
        placeholder: 'Search by name...'
    },
    filter: {
        containerSelector: '#tableActions',
        label: 'Filter Results',
        targetModalId: 'filterModal' // Opens the modal with this ID
    }
};

// Assuming myRecords and myColumns are defined
MomahTable.render('#table-container', myRecords, myColumns, tableOptions);
```

---

## Full Example

This example combines a table, pagination, search, and a filter button.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MomahTable Example</title>
    <!-- Add Bootstrap for styling -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<body>

<div class="container mt-4">
	<h2>User List</h2>

	<!-- 1. Controls Container -->
	<div id="tableActions" class="mb-3"></div>

	<!-- 2. Table Container -->
	<div id="ListData"></div>

	<!-- 3. Pagination Container -->
	<div id="pagination" class="mt-3"></div>
</div>

<!-- Bootstrap Modal for Filtering -->
<div class="modal fade" id="filterModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Filter Options</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>Your filter form fields go here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="applyFilters()">Apply Filters</button>
      </div>
    </div>
  </div>
</div>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="/assets/js/momahTable.js"></script>

<script>
    // Global function for search/filter actions
    function performSearch() {
        const page = 1; // Reset to first page on new search
        const searchTerm = document.getElementById('searchInput').value;
        console.log(`Performing search for: "${searchTerm}" on page ${page}`);
        loadData(page, searchTerm);
    }

    function applyFilters() {
        console.log('Applying filters...');
        // Close the modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('filterModal'));
        modal.hide();
        // Reload data with filter criteria
        performSearch();
    }

    // Main data loading and rendering function
    function loadData(page = 1, searchTerm = '') {
        console.log(`Loading data for page ${page} with search term "${searchTerm}"`);

        // --- In a real app, you would fetch this data from a server ---
        const allRecords = [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com' },
            // ... more records
        ];
        const filteredRecords = allRecords.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const totalPages = Math.ceil(filteredRecords.length / 10); // Assuming 10 items per page
        // --- End of mock data fetching ---

        const columns = [
            { header: '#', field: 'id', width: '5%' },
            { header: 'Name', field: 'name', width: '40%' },
            { header: 'Email', field: 'email' },
            {
                header: 'Actions',
                tdClassName: 'text-center',
                render: (record) => `
                    <button class="btn btn-sm btn-outline-primary">View</button>
                `
            }
        ];

        const options = {
            search: {
                containerSelector: '#tableActions',
                inputId: 'searchInput',
                placeholder: 'Search by name...'
            },
            filter: {
                containerSelector: '#tableActions',
                label: 'Filter',
                targetModalId: 'filterModal'
            },
            pagination: {
                containerSelector: '#pagination',
                currentPage: page,
                totalPages: totalPages,
                onPageChange: (newPage) => loadData(newPage, searchTerm)
            }
        };

        MomahTable.render('#table-container', filteredRecords, columns, options);
    }

    // Initial load on page start
    document.addEventListener('DOMContentLoaded', function() {
        loadData(1);
    });
</script>

</body>
</html>
```
