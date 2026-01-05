(function (global) {
	"use strict";

	function createElement(tagName, className, html) {
		var el = document.createElement(tagName);
		if (className) el.className = className;
		if (html !== undefined) el.innerHTML = html;
		return el;
	}

	function renderPagination(currentPage, totalPages, onPageChange) {
		let container = createElement("div", {});
		let html =
			'<ul class="pagination justify-content-start custom-pagination">';

		// Previous
		html += `
      <li class="page-item${currentPage === 1 ? " disabled" : ""}">
          <a class="page-link" href="#" aria-label="Previous"><img class="" src="/assets/images/arrow-back.svg" /></a>
        </li>`;

		if (totalPages <= 5) {
			for (var i = 1; i <= totalPages; i++) {
				html += `
          <li class="page-item${i === currentPage ? " active" : ""}">
            <a class="page-link" href="#">${i}</a>
          </li>`;
			}
		} else {
			// First page
			html += `
        <li class="page-item${currentPage === 1 ? " active" : ""}">
            <a class="page-link" href="#">1</a>
          </li>`;

			// Left ellipsis
			if (currentPage > 3) {
				html += `
          <li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
			}

			// Middle pages
			for (
				var m = Math.max(2, currentPage - 1);
				m <= Math.min(totalPages - 1, currentPage + 1);
				m++
			) {
				html += `
          <li class="page-item${m === currentPage ? " active" : ""}">
            <a class="page-link" href="#">${m}</a>
          </li>`;
			}

			// Right ellipsis
			if (currentPage < totalPages - 2) {
				html += `
          <li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
			}

			// Last page
			html += `
        <li class="page-item${currentPage === totalPages ? " active" : ""}">
          <a class="page-link" href="#">${totalPages}</a>
        </li>`;
		}

		// Next
		html += `
      <li class="page-item${currentPage === totalPages ? " disabled" : ""}">
        <a class="page-link" href="#" aria-label="Next"><img class="" src="/assets/images/arrow-Next.svg" /></a>
      </li>`;

		html += "</ul>";
		container.innerHTML = html;

		container.addEventListener("click", function (e) {
			if (!e.target.classList.contains("page-link")) return;
			e.preventDefault();
			let a = e.target;
			let li = a.parentElement;
			if (li.classList.contains("disabled")) return;

			var newPage = currentPage;
			var label = a.getAttribute("aria-label");
			if (label === "Previous") {
				if (currentPage > 1) newPage = currentPage - 1;
			} else if (label === "Next") {
				if (currentPage < totalPages) newPage = currentPage + 1;
			} else {
				var num = parseInt(a.textContent, 10);
				if (!isNaN(num)) newPage = num;
			}

			if (newPage !== currentPage && typeof onPageChange === "function")
				onPageChange(newPage);
		});

		return container;
	}

	function renderTableActions(searchOptions, filterOptions) {
		// Only return if both are missing
		if (!searchOptions && !filterOptions) return;

		// Use the correct containerSelector
		var hostSelector =
			(searchOptions && searchOptions.containerSelector) ||
			(filterOptions && filterOptions.containerSelector);
		if (!hostSelector) return;
		var host =
			typeof hostSelector === "string"
				? document.querySelector(hostSelector)
				: hostSelector;
		if (!host) return;

		var wrapper = createElement("div", "d-flex align-items-center gap-2");

		var inputId, placeholder;
		if (searchOptions && searchOptions.inputId) inputId = searchOptions.inputId;
		else inputId = "txtFullName";
		if (searchOptions && searchOptions.placeholder)
			placeholder = searchOptions.placeholder;
		else placeholder = "";

		// Render search input if searchOptions is present
		if (searchOptions?.containerSelector) {
			// Prevent duplicate rendering if the search input already exists
			if (document.getElementById(inputId)) return;

			let container = createElement(
				"div",
				"search-container position-relative flex-grow-1"
			);

			let searchHtml = `
        <input type="text" id="${inputId}" class="form-control search-input momah-search-input" placeholder="${placeholder || ""
				}"/>
        <button type="button" class="btn-clear momah-btn-clear position-absolute" onclick="clearSearchInput()" aria-label="Clear search input">
          <i class="fas fa-times momah-btn-clear-icon"></i>
        </button>
        <div class="search-icon-text momah-search-icon position-absolute d-flex align-items-center" onclick="performSearch()" role="button" tabindex="0" aria-label="Search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="momah-search-icon-svg">
            <path
              d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      `;

			container.innerHTML = searchHtml.trim();
			wrapper.appendChild(container);
		}

		// Render filter button if filterOptions is present
		if (filterOptions) {
			let fb = filterOptions || {};

			let btn = createElement(
				"button",
				"btn filter-btn momah-filter-btn d-flex align-items-center justify-content-center gap-2 ms-auto"
			);

			btn.type = "button";
			btn.innerHTML = `
        <span>${fb.label || "تصفية البحث"}</span>
        <i class="fas fa-chevron-down momah-filter-btn-icon"></i>
      `;

			// Handle Bootstrap modal trigger if configured
			if (fb.targetModalId) {
				btn.dataset.bsToggle = "modal";
				btn.dataset.bsTarget = `#${fb.targetModalId}`;
			}

			// Attach click handler safely
			if (typeof fb.onClick === "function") {
				btn.addEventListener("click", fb.onClick);
			}

			wrapper.appendChild(btn);
		}

		host.innerHTML = "";
		host.appendChild(wrapper);

		// Reinitialize page-level search bindings if provided by host page
		if (typeof window.initializeSearchInput === "function") {
			try {
				window.initializeSearchInput();
			} catch (e) { }
		}

		// Attach Enter key and X button for search or filter
		let inputEl = document.getElementById(inputId);
		if (!inputEl) return;

		// --- Helper function to safely trigger available search logic ---
		let triggerSearch = () => {
			try {
				if (typeof window.performSearch === "function") {
					window.performSearch();
				} else if (typeof window.LoadData === "function") {
					window.LoadData();
				} else if (
					filterOptions?.onFilter &&
					typeof filterOptions.onFilter === "function"
				) {
					filterOptions.onFilter();
				}
			} catch (err) {
				console.error("Error performing search:", err);
			}
		};

		// --- Handle Enter key ---
		inputEl.addEventListener("keydown", (e) => {
			if (e.key === "Enter" || e.keyCode === 13) {
				e.preventDefault();
				triggerSearch();
			}
		});

		// --- Handle clear button click (filter-only mode) ---
		let clearBtn = host.querySelector(".btn-clear");
		if (clearBtn) {
			clearBtn.addEventListener("click", () => {
				inputEl.value = "";
				triggerSearch();
			});
		}
	}

	/**
	 * Renders a dynamic table into target container.
	 * @param {string|HTMLElement} containerSelector - CSS selector or element to host the table.
	 * @param {Array} columns - [{ header, width, className, render(rec, index) | field }]
	 * @param {Array} records - array of row objects
	 * @param {Object} options - { striped, hover, bordered, pagination: { currentPage, totalPages, onPageChange } }
	 */
	function render(containerSelector, columns, records = [], options = {}) {
		var container =
			typeof containerSelector === "string"
				? document.querySelector(containerSelector)
				: containerSelector;
		if (!container) return;

		try {
			let { search, filter } = options;
			if (search || filter) {
				renderTableActions(search || null, filter || null);
			}
		} catch (e) {
			console.error("Error rendering table actions:", e);
		}

		// Clear target container
		container.innerHTML = "";

		// Clear pagination container if it exists
		if (options.pagination && options.pagination.containerSelector) {
			let paginationContainer = document.querySelector(
				options.pagination.containerSelector
			);
			if (paginationContainer) {
				paginationContainer.innerHTML = "";
			}
		}

		// From this point on, we know `records` has data.
		let wrapper = createElement("div", "table-wrapper");
		let responsive = createElement("div", "table-responsive");
		let table = createElement("table", "table align-middle mb-0");

		// ======== Table Head =======
		let thead = createElement("thead");
		let headRow = createElement("tr");

		columns.forEach(function (col) {
			let th = createElement("th");
			if (col.width) th.style.width = col.width;
			if (col.className) th.className = col.className;
			th.textContent = col.header || "";
			headRow.appendChild(th);
		});
		thead.appendChild(headRow);

		// ======== Table Body =======
		let tbody = createElement("tbody");

		if (!records || records.length === 0) {
			let tr = createElement("tr");
			let td = createElement("td", "text-center text-muted p-3");
			td.setAttribute("colspan", columns.length);
			td.textContent = "لا توجد بيانات";
			tr.appendChild(td);
			tbody.appendChild(tr);
		} else {
			records.forEach(function (rec, index) {
				let tr = createElement("tr");

				columns.forEach(function (col) {
					let td = createElement("td");
					if (col.width) td.style.width = col.width;
					if (col.tdClassName) td.className = col.tdClassName;

					let value = "";
					if (typeof col.render === "function") {
						value = col.render(rec, index);
					} else if (col.field) {
						value = rec[col.field];
					}

					if (value === null || value === undefined) value = "";

					if (typeof value === "string" && value.indexOf("<") >= 0) {
						td.innerHTML = value;
					} else {
						td.textContent = String(value);
					}
					tr.appendChild(td);
				});
				tbody.appendChild(tr);
			});
		}

		// ======== Assemble Table =======
		table.appendChild(thead);
		table.appendChild(tbody);
		responsive.appendChild(table);
		wrapper.appendChild(responsive);
		container.appendChild(wrapper);

		// ======== Pagination =======
		var pagination = options.pagination;
		if (pagination && pagination.totalPages > 1) {
			var currentPage = pagination.currentPage || 1;
			var totalPages = Math.max(1, pagination.totalPages || 1);
			var paginationEl = renderPagination(
				currentPage,
				totalPages,
				pagination.onPageChange
			);

			var host =
				typeof pagination.containerSelector === "string"
					? document.querySelector(pagination.containerSelector)
					: pagination.containerSelector;

			if (host) {
				host.innerHTML = "";
				host.appendChild(paginationEl);
			} else {
				container.appendChild(paginationEl);
			}
		}
	}

	global.MomahTable = {
		render: render,
	};
})(window);
