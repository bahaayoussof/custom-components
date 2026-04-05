# Date Input Component Usage Guide

![input-field](gregorian.png)
![input-field](hijri.png)


## Overview

The `_DateInput.cshtml` is a reusable Razor partial view component that creates a styled date input field with calendar popup functionality. It supports both Ummalqura (Hijri) and Gregorian calendar systems.

## Component Features

- ✅ Calendar popup with date selection
- ✅ Support for Ummalqura (Hijri) and Gregorian calendars
- ✅ Required field validation
- ✅ Custom SVG calendar icon
- ✅ Modal-compatible (auto-reinitializes in modals)
- ✅ Responsive Bootstrap styling

---

## Model Parameters

The component accepts a tuple with the following parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `Label` | `string` | Yes | The label text displayed above the input |
| `Required` | `bool` | Yes | Whether the field is required (shows red asterisk) |
| `Id` | `string` | Yes | Unique ID for the input element |
| `Placeholder` | `string` | Yes | Placeholder text shown when empty |
| `DateType` | `string` | No | Calendar type: `"ummalqura"` (default) or `"gregorian"` |

---

## Usage Examples

### Basic Usage (Ummalqura Calendar)

```csharp
@await Html.PartialAsync("_DateInput", new {
    "تاريخ الميلاد",  // Label
    true,             // Required
    "BirthDate",      // Id
    "اختر التاريخ"    // Placeholder
})
```

### With Gregorian Calendar

```csharp
@await Html.PartialAsync("_DateInput", new
{
    "تاريخ التسجيل",  // Label
    true,             // Required
    "RegistrationDate", // Id
    "Select Date",    // Placeholder
    "gregorian"       // DateType
})
```

### Optional Field (Not Required)

```csharp
@await Html.PartialAsync("_DateInput", new
{
    "تاريخ الإنهاء",  // Label
    false,            // Required (false = optional)
    "EndDate",        // Id
    "اختر التاريخ"    // Placeholder
})
```

## Integration Notes

### Required JavaScript Functions

This component depends on the `createCalendersWithRang` function which should be available globally:

```javascript
function createCalendersWithRang(selector, minRange, maxRange, dateType, rangeString)
```

**Parameters:**
- `selector`: CSS selector for the input element
- `minRange`: Minimum date range (e.g., `"-100y"` for 100 years back)
- `maxRange`: Maximum date range (e.g., `"+2y"` for 2 years forward)
- `dateType`: Calendar type (`""` for Gregorian, `"ummalqura"` for Hijri)
- `rangeString`: Range string for validation

### Modal Support

The component automatically reinitializes when used inside Bootstrap modals. No additional code is required.

### Form Validation

When `Required` is set to `true`:
- A red asterisk (*) appears next to the label
- The input has the `required` attribute
- An error message appears below the input if validation fails

---

## CSS Classes Used

- `form-control` - Bootstrap input styling
- `form-label` - Bootstrap label styling
- `text-danger` - Red text for required indicator/error
- `small` - Small text size for error messages
