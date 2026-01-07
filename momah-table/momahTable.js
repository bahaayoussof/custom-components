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
			let a = e.target.closest(".page-link");
			if (!a) return;
			e.preventDefault();
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
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M0.183058 0.183058C0.427136 -0.0610194 0.822864 -0.0610194 1.06694 0.183058L6.45833 5.57445L11.8497 0.183058C12.0938 -0.0610194 12.4895 -0.0610194 12.7336 0.183058C12.9777 0.427136 12.9777 0.822864 12.7336 1.06694L7.34222 6.45833L12.7336 11.8497C12.9777 12.0938 12.9777 12.4895 12.7336 12.7336C12.4895 12.9777 12.0938 12.9777 11.8497 12.7336L6.45833 7.34222L1.06694 12.7336C0.822864 12.9777 0.427136 12.9777 0.183058 12.7336C-0.0610194 12.4895 -0.0610194 12.0938 0.183058 11.8497L5.57445 6.45833L0.183058 1.06694C-0.0610194 0.822864 -0.0610194 0.427136 0.183058 0.183058Z" fill="#161616"/>
					</svg>
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

			// 1. Determine classes based on whether it's Icon Only or a Styled Button
			let btnClasses = "d-flex align-items-center justify-content-center ms-auto";

			if (fb.isIcon) {
				// Strip all button styles: no border, no background, no padding
				btnClasses += " p-0 border-0 bg-transparent momah-icon-trigger";
			} else {
				// Standard button styling
				btnClasses += " btn filter-btn momah-filter-btn gap-2";
			}

			let btn = createElement("button", btnClasses);
			btn.type = "button";

			// Default SVG if none provided
			const defaultIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M3.93213 1.58e-06C3.94946 2.35486e-06 3.96686 3.12972e-06 3.98431 3.12972e-06L15.5678 1.58e-06C16.3384 -3.38252e-05 16.9926 -6.38664e-05 17.5087 0.0703036C18.0549 0.144785 18.5773 0.312914 18.9772 0.753097C19.3806 1.19714 19.491 1.73226 19.4994 2.27927C19.5073 2.79013 19.4257 3.42472 19.3305 4.16461L19.3235 4.2185C19.2899 4.48033 19.2393 4.73356 19.134 4.98711C19.0271 5.24453 18.8798 5.46377 18.6964 5.68165C17.7167 6.84554 15.8954 8.9489 13.3314 10.8644C13.29 10.8954 13.2376 10.9688 13.2276 11.079C12.9785 13.8319 12.7594 15.2885 12.6013 16.1323C12.4303 17.0448 11.7343 17.6764 11.1341 18.1112C10.8201 18.3388 10.4867 18.5437 10.1898 18.7244C10.166 18.7389 10.1425 18.7532 10.1193 18.7673C9.84191 18.936 9.6061 19.0794 9.409 19.2187C8.86849 19.6009 8.24491 19.5741 7.76827 19.2964C7.31847 19.0344 7.00196 18.5565 6.93796 18.016C6.7975 16.8296 6.54286 14.5069 6.26176 11.0726C6.25274 10.9624 6.23553 10.9305 6.2341 10.9278C6.23311 10.9259 6.23058 10.9213 6.22219 10.9121C6.2128 10.9017 6.19403 10.8835 6.15835 10.8568C3.59952 8.94368 1.78182 6.844 0.803507 5.68162C0.620802 5.46453 0.46921 5.25051 0.361123 4.99022C0.255311 4.73541 0.210192 4.48089 0.17644 4.21849C0.174121 4.20047 0.171809 4.18251 0.169505 4.1646C0.0742886 3.42472 -0.00737744 2.79013 0.000530313 2.27927C0.00899769 1.73226 0.119419 1.19714 0.522804 0.753097C0.922685 0.312914 1.44502 0.144785 1.9913 0.0703036C2.50741 -6.38664e-05 3.16157 -3.38252e-05 3.93213 1.58e-06ZM2.19394 1.55655C1.80984 1.60892 1.69414 1.69449 1.63307 1.76171C1.57551 1.82507 1.50601 1.93665 1.50035 2.30249C1.49432 2.69212 1.56012 3.21812 1.66418 4.02712C1.693 4.25193 1.71843 4.34754 1.74643 4.41496C1.77215 4.47691 1.81773 4.55722 1.95114 4.71572C2.90942 5.85431 4.63846 7.84756 7.05654 9.65542C7.25081 9.80066 7.42905 9.98047 7.558 10.2226C7.68505 10.4612 7.73704 10.7094 7.75676 10.9502C8.03632 14.3658 8.28914 16.6704 8.42756 17.8396C8.43178 17.8753 8.44476 17.9104 8.46474 17.9411C8.48518 17.9724 8.50789 17.9913 8.52333 18.0003C8.5253 18.0015 8.52703 18.0024 8.52851 18.0031C8.53207 18.0012 8.53688 17.9983 8.54298 17.994C8.78509 17.8228 9.0661 17.652 9.33133 17.4909C9.35774 17.4748 9.38398 17.4589 9.41002 17.443C9.70883 17.2612 9.99461 17.0845 10.254 16.8966C10.8008 16.5003 11.069 16.1651 11.1269 15.8561C11.2734 15.0743 11.4872 13.6681 11.7337 10.9438C11.7789 10.4447 12.024 9.9688 12.4337 9.66271C14.8567 7.85253 16.5892 5.85571 17.5488 4.7157C17.6652 4.57745 17.7169 4.48831 17.7488 4.4116C17.7823 4.33102 17.8104 4.2244 17.8358 4.02712C17.9399 3.21812 18.0057 2.69212 17.9996 2.30249C17.994 1.93665 17.9245 1.82507 17.8669 1.76171C17.8058 1.69449 17.6901 1.60892 17.306 1.55655C16.9034 1.50165 16.3527 1.5 15.5157 1.5H3.98431C3.14726 1.5 2.5966 1.50165 2.19394 1.55655ZM8.52065 18.0066C8.52069 18.0066 8.52118 18.0064 8.52211 18.0062L8.52065 18.0066Z" fill="#161616"/>
					</svg>`;

			let iconHtml = fb.icon ? fb.icon : defaultIcon;

			// 2. Render Content
			if (fb.isIcon) {
				btn.innerHTML = iconHtml;

				// For accessibility, if there's no visible label, add aria-label
				if (fb.label) btn.setAttribute("aria-label", fb.label);
			} else {
				btn.innerHTML = `
					<span>${fb.label || ""}</span>
					${iconHtml}
				`;
			}

			// 3. Handle Bootstrap Modal & Events
			if (fb.targetModalId) {
				btn.dataset.bsToggle = "modal";
				btn.dataset.bsTarget = `#${fb.targetModalId}`;
			}

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
