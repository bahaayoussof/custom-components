export const requiredLabel = (label, required) =>
  `${required ? '<span class="text-danger" style="margin-left:4px;">*</span>' : ""}${label}`;

/**
 * Renders a standard RTL form field wrapper with label.
 * Eliminates duplicated outer-wrapper HTML across InputField, TextArea, SelectInput, FileUpload.
 */
export const renderFormFieldWrapper = (id, label, required, innerHtml, forAttr = true) => {
  const labelFor = forAttr ? ` for="${id}"` : '';
  return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label${labelFor} class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${requiredLabel(label, required)}
  </label>
  ${innerHtml}
</div>`;
};

export const renderDateFieldHtml = (props, isRange = false) => {
  const calIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); pointer-events: none;"><path d="M6.66 9.99h.01M9.99 9.99h.01M13.32 9.99h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/></svg>`;
  const iconHtml = isRange
    ? `<span id="${props.id}-icon" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); cursor: pointer; z-index: 2;">${calIcon}</span>`
    : calIcon;

  return `<div class="mb-3 w-100" style="max-width:400px; text-align:right;" dir="rtl">
  <label for="${props.id}" class="form-label fw-bold" style="font-size:0.9rem; color: inherit;">
    ${requiredLabel(props.label, props.required)}
    <span style="font-size:0.75rem; color:#6b7280; font-weight:normal; margin-right:6px;">(${props.dateType === "ummalqura" ? "هجري" : "ميلادي"})</span>
  </label>
  <div class="position-relative">
    <input type="text" class="form-control" id="${props.id}" placeholder="${props.placeholder}" readonly style="padding: 8px 35px 8px 12px; border-radius: 6px; border: 1px solid #ced4da; width: 100%; cursor:pointer; background: var(--bs-body-bg);">
    ${iconHtml}
  </div>
</div>`;
};
