export const MomahSelect = {
  title: "_MomahSelect",
  props: [
    {
      name: "label",
      label: "Select Label",
      type: "string",
      default: "المدينة",
      required: true,
    },
    {
      name: "required",
      label: "Required Field",
      type: "boolean",
      default: false,
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "string",
      default: "اختر المدينة...",
    },
    {
      name: "searchable",
      label: "Searchable Selection",
      type: "boolean",
      default: true,
    },
    {
      name: "multiSelect",
      label: "Allow Multi-Select",
      type: "boolean",
      default: false,
    },
    {
      name: "optionsRaw",
      label: "Options (comma-separated)",
      type: "string",
      default: "الرياض, جدة, الدمام, مكة المكرمة",
      required: true,
    },
    {
      name: "id",
      label: "Component ID",
      type: "string",
      default: "city-select",
      required: true,
    },
  ],
  css: `
    .cs-container { position: relative; width: 100%; text-align: right; }

    .cs-trigger {
        display: flex; align-items: center; width: 100%; min-height: 44px;
        padding: 6px 14px; border: 1px solid var(--bs-border-color, #dee2e6); border-radius: 8px;
        background: var(--bs-body-bg, #fff); cursor: pointer; user-select: none;
        transition: border-color .2s, box-shadow .2s; gap: 8px;
        color: var(--bs-body-color, inherit);
    }
    .cs-trigger.cs-open { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }

    .cs-chevron {
        width: 18px; height: 18px; margin-right: 4px; flex-shrink: 0;
        transition: transform .2s; fill: currentColor; opacity: 0.7;
    }
    .cs-open .cs-chevron { transform: rotate(180deg); }

    .cs-dropdown {
        display: none; position: absolute; left: 0; right: 0; top: 100%;
        background: var(--bs-body-bg, #fff); border: 1px solid var(--bs-border-color, #dee2e6);
        border-top: none; border-radius: 0 0 8px 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,.15); z-index: 999;
        max-height: 280px; flex-direction: column; overflow: hidden;
    }
    .cs-dropdown.cs-visible { display: flex; }

    .cs-search-row {
        display: flex; align-items: center; gap: 8px;
        padding: 8px 12px; border-bottom: 1px solid var(--bs-border-color, #f0f0f0);
    }
    .cs-search-wrap { flex: 1; position: relative; display: flex; align-items: center; }
    .cs-search-input {
        width: 100%; border: 1px solid var(--bs-border-color, #e5e7eb); border-radius: 6px;
        padding: 6px 14px 6px 30px; font-size: .875rem; outline: none;
        background: var(--bs-body-bg, #fff); color: var(--bs-body-color, inherit);
    }
    .cs-search-icon {
        position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
        width: 16px; height: 16px; fill: none; stroke: currentColor; opacity: 0.5;
        stroke-width: 2; pointer-events: none;
    }

    .cs-options { overflow-y: auto; flex: 1; padding: 4px 0; max-height: 200px; }
    .ss-display-text {
        flex: 1; font-size: .9rem; color: var(--bs-body-color, inherit);
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .ss-display-text.ss-placeholder { opacity: 0.6; }

    .ss-option {
        display: flex; align-items: center; justify-content: space-between; padding: 10px 14px;
        cursor: pointer; font-size: .9rem; color: var(--bs-body-color, inherit); transition: background .1s;
    }
    .ss-option:hover { background: rgba(0, 167, 157, 0.1); }
    .ss-option.ss-selected { background: rgba(0, 167, 157, 0.2); color: #00a79d; font-weight: 600; }

    /* Multi-select chips & checkboxes */
    .ms-chips {
        flex: 1; display: flex; flex-wrap: wrap; align-items: center;
        gap: 6px; overflow: hidden; min-width: 0;
    }
    .ms-placeholder-text { opacity: 0.6; font-size: .9rem; white-space: nowrap; }

    .ms-chip {
        display: inline-flex; align-items: center; gap: 4px;
        background: rgba(0, 167, 157, 0.15); border: 1px solid rgba(0, 167, 157, 0.3); border-radius: 14px;
        padding: 2px 8px 2px 10px; font-size: .82rem; color: #00a79d;
        white-space: nowrap; line-height: 1.4;
    }
    .ms-chip-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .ms-chip-remove {
        cursor: pointer; opacity: 0.7; font-size: .95rem; line-height: 1;
        font-weight: bold; transition: opacity .1s; display: flex; align-items: center; margin-right: 2px;
    }
    .ms-chip-remove:hover { opacity: 1; color: #dc3545; }

    .ms-option {
        display: flex; align-items: center; gap: 10px; padding: 10px 14px;
        cursor: pointer; font-size: .9rem; color: var(--bs-body-color, inherit); transition: background .1s;
    }
    .ms-option:hover { background: rgba(0, 167, 157, 0.08); }
    .ms-option.ms-selected { background: rgba(0, 167, 157, 0.15); }

    .ms-option-check {
        width: 18px; height: 18px; border-radius: 4px; border: 2px solid var(--bs-border-color, #d1d5db);
        flex-shrink: 0; display: flex; align-items: center; justify-content: center;
        transition: all .15s; background: var(--bs-body-bg, #fff);
    }
    .ms-option.ms-selected .ms-option-check { background: #00a79d; border-color: #00a79d; }
    .ms-option-check svg { display: none; }
    .ms-option.ms-selected .ms-option-check svg { display: block; }
    .ms-option-text { flex: 1; }

    [data-bs-theme="dark"] .cs-trigger,
    [data-bs-theme="dark"] .cs-dropdown,
    [data-bs-theme="dark"] .cs-search-input {
        background-color: #1e293b !important;
        color: #f8fafc !important;
        border-color: #334155 !important;
    }
    [data-bs-theme="dark"] .ss-display-text,
    [data-bs-theme="dark"] .cs-trigger span,
    [data-bs-theme="dark"] .ss-option,
    [data-bs-theme="dark"] .ms-option {
        color: #f8fafc !important;
    }
    [data-bs-theme="dark"] .ss-display-text.ss-placeholder,
    [data-bs-theme="dark"] .ms-placeholder-text {
        color: #94a3b8 !important;
    }
    [data-bs-theme="dark"] .cs-chevron {
        fill: #f8fafc !important;
    }
  `,
  js: (props) => {
    const id = props.id || "city-select";

    return `
(function() {
  var trigger = document.getElementById("${id}-trigger");
  var dropdown = document.getElementById("${id}-dropdown");
  var display = document.getElementById("${id}-display");
  var chipsContainer = document.getElementById("${id}-chips");
  var searchInput = document.getElementById("${id}-search");
  var optionsContainer = document.getElementById("${id}-options");
  var isMulti = ${Boolean(props.multiSelect)};
  var placeholder = "${props.placeholder}";

  if (!trigger || !dropdown) return;

  // Toggle dropdown
  trigger.addEventListener("click", function(e) {
    if (e.target.closest(".ms-chip-remove")) return;
    e.stopPropagation();
    var isOpen = dropdown.classList.contains("cs-visible");
    if (isOpen) {
      dropdown.classList.remove("cs-visible");
      trigger.classList.remove("cs-open");
    } else {
      dropdown.classList.add("cs-visible");
      trigger.classList.add("cs-open");
      if (searchInput) searchInput.focus();
    }
  });

  // Close on outside click
  document.addEventListener("click", function(e) {
    if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("cs-visible");
      trigger.classList.remove("cs-open");
    }
  });

  function updateChips() {
    if (!chipsContainer) return;
    var selectedOpts = optionsContainer.querySelectorAll(".ms-option.ms-selected");
    if (selectedOpts.length === 0) {
      chipsContainer.innerHTML = '<span class="ms-placeholder-text">' + placeholder + '</span>';
    } else {
      var html = "";
      selectedOpts.forEach(function(el) {
        var val = el.getAttribute("data-value");
        html += '<span class="ms-chip" data-value="' + val + '"><span class="ms-chip-text">' + val + '</span><span class="ms-chip-remove" title="حذف">&times;</span></span>';
      });
      chipsContainer.innerHTML = html;
    }
  }

  // Remove chip click
  if (chipsContainer) {
    chipsContainer.addEventListener("click", function(e) {
      var removeBtn = e.target.closest(".ms-chip-remove");
      if (!removeBtn) return;
      e.stopPropagation();
      var chip = removeBtn.closest(".ms-chip");
      var val = chip.getAttribute("data-value");
      var optEl = optionsContainer.querySelector('.ms-option[data-value="' + val + '"]');
      if (optEl) optEl.classList.remove("ms-selected");
      updateChips();
    });
  }

  // Option selection
  if (optionsContainer) {
    optionsContainer.addEventListener("click", function(e) {
      var optEl = e.target.closest(".ss-option, .ms-option");
      if (!optEl) return;

      if (isMulti) {
        optEl.classList.toggle("ms-selected");
        updateChips();
      } else {
        var val = optEl.getAttribute("data-value");
        if (display) {
          display.textContent = val;
          display.classList.remove("ss-placeholder");
        }
        var allOpts = optionsContainer.querySelectorAll(".ss-option");
        allOpts.forEach(function(o) { o.classList.remove("ss-selected"); });
        optEl.classList.add("ss-selected");
        dropdown.classList.remove("cs-visible");
        trigger.classList.remove("cs-open");
      }
    });
  }

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("keyup", function() {
      var term = searchInput.value.toLowerCase();
      var optEls = optionsContainer.querySelectorAll(".ss-option, .ms-option");
      optEls.forEach(function(el) {
        var text = el.textContent.toLowerCase();
        el.style.display = text.includes(term) ? "flex" : "none";
      });
    });
  }
})();
    `;
  },
  renderRazor: (props) => `@await Html.PartialAsync("~/Views/Shared/UI/_MomahSelect.cshtml", new {
    Id = "${props.id}",
    Label = "${props.label}",
    Required = ${props.required},
    Placeholder = "${props.placeholder}",
    Searchable = ${props.searchable},
    MultiSelect = ${props.multiSelect},
    Options = new List<SelectListItem> {
${(props.optionsRaw || "")
  .split(",")
  .map((o) => `        new SelectListItem { Text = "${o.trim()}", Value = "${o.trim()}" }`)
  .join(",\n")}
    }
})`,
  renderHtml: (props) => {
    const id = props.id || "city-select";
    const opts = (props.optionsRaw || "الرياض, جدة, الدمام, مكة المكرمة")
      .split(",")
      .map((o) => o.trim());

    const isMulti = props.multiSelect;

    const checkSvg = `<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M11.6666 3.5L5.24998 9.91667L2.33331 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const optsHtml = isMulti
      ? opts
          .map(
            (o) =>
              `<div class="ms-option" data-value="${o}"><div class="ms-option-check">${checkSvg}</div><span class="ms-option-text">${o}</span></div>`
          )
          .join("")
      : opts
          .map(
            (o, idx) =>
              `<div class="ss-option ${idx === 0 ? "ss-selected" : ""}" data-value="${o}">${o}</div>`
          )
          .join("");

    return `
<div class="mb-3 w-100" style="max-width: 400px; text-align: right;" dir="rtl">
  ${
    props.label
      ? `<label class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
          ${props.required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ""}
          ${props.label}
        </label>`
      : ""
  }
  <div class="cs-container" id="${id}-cs">
    <div class="cs-trigger" id="${id}-trigger">
      ${
        isMulti
          ? `<div class="ms-chips" id="${id}-chips"><span class="ms-placeholder-text">${props.placeholder}</span></div>`
          : `<span class="ss-display-text" id="${id}-display">${opts[0] || props.placeholder}</span>`
      }
      <svg class="cs-chevron" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
      </svg>
    </div>
    <div class="cs-dropdown" id="${id}-dropdown">
      ${
        props.searchable
          ? `<div class="cs-search-row">
              <div class="cs-search-wrap">
                <input type="text" class="cs-search-input" id="${id}-search" placeholder="بحث..." autocomplete="off" />
                <svg class="cs-search-icon" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>`
          : ""
      }
      <div class="cs-options" id="${id}-options">
        ${optsHtml}
      </div>
    </div>
  </div>
</div>
`;
  },
};
