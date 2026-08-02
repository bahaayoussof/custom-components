import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to manage Playground prop state, validation errors, direction (RTL/LTR),
 * active code tab, and bidirectional URL search params synchronization.
 */
export function usePlaygroundState(config) {
  // 1. Initialize prop values from URL search params if present, else fallback to defaults
  const getInitialState = () => {
    const initialProps = {};
    if (!config?.props) return initialProps;

    let urlParams = null;
    if (typeof window !== "undefined" && window.location) {
      urlParams = new URLSearchParams(window.location.search);
    }

    config.props.forEach((p) => {
      const fallback = p.default !== undefined ? p.default : (p.type === "boolean" ? false : p.type === "number" ? 0 : "");
      if (urlParams && urlParams.has(p.name)) {
        const rawVal = urlParams.get(p.name);
        if (p.type === "boolean") {
          initialProps[p.name] = rawVal === "true";
        } else if (p.type === "number") {
          const num = Number(rawVal);
          initialProps[p.name] = isNaN(num) ? fallback : num;
        } else {
          initialProps[p.name] = rawVal;
        }
      } else {
        initialProps[p.name] = fallback;
      }
    });

    return initialProps;
  };

  const [propsState, setPropsState] = useState(getInitialState);
  const [errors, setErrors] = useState({});
  const [direction, setDirection] = useState("rtl");
  const [activeTab, setActiveTab] = useState("razor"); // 'razor' | 'html'
  const [copied, setCopied] = useState(false);

  // 2. Validate individual prop
  const validateProp = useCallback((propConfig, value) => {
    if (!propConfig) return null;

    const isRequired = propConfig.required === true;
    if (
      isRequired &&
      (value === undefined || value === null || String(value).trim() === "")
    ) {
      return "هذا الحقل مطلوب (Required)";
    }

    if (propConfig.type === "number" && value !== "" && value !== undefined) {
      const num = Number(value);
      if (isNaN(num)) {
        return "يجب أن يكون رقماً (Must be a number)";
      }
      if (propConfig.min !== undefined && num < propConfig.min) {
        return `الحد الأدنى ${propConfig.min}`;
      }
      if (propConfig.max !== undefined && num > propConfig.max) {
        return `الحد الأقصى ${propConfig.max}`;
      }
    }

    return null;
  }, []);

  // 3. Update single prop value and sync URL search params
  const setPropValue = (name, value) => {
    const propConfig = config.props?.find((p) => p.name === name);
    const errorMsg = validateProp(propConfig, value);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    setPropsState((prev) => {
      const nextState = { ...prev, [name]: value };

      // Sync URL search params silently without reloading page
      if (typeof window !== "undefined" && window.history.replaceState) {
        const url = new URL(window.location.href);
        if (value === undefined || value === null || value === "") {
          url.searchParams.delete(name);
        } else {
          url.searchParams.set(name, String(value));
        }
        window.history.replaceState(null, "", url.toString());
      }

      return nextState;
    });
  };

  // 4. Copy code snippet helper
  const copyToClipboard = (text) => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return {
    propsState,
    errors,
    direction,
    setDirection,
    activeTab,
    setActiveTab,
    copied,
    setPropValue,
    copyToClipboard,
  };
}
