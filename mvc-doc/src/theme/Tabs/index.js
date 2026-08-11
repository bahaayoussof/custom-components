import React, { useEffect } from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useScrollPositionBlocker,
  useTabsContextValue,
  useTabs,
  sanitizeTabsChildren,
  TabsProvider,
} from "@docusaurus/theme-common/internal";
import useIsBrowser from "@docusaurus/useIsBrowser";
import styles from "./styles.module.css";

function TabsTocController() {
  const isBrowser = useIsBrowser();
  const { selectedValue } = useTabs();

  useEffect(() => {
    if (!isBrowser) return;

    const isGuide = !selectedValue || selectedValue === "guide";
    if (isGuide) {
      document.body.classList.remove("hide-toc-sidebar");
      document.documentElement.setAttribute("data-tab-value", "guide");
    } else {
      document.body.classList.add("hide-toc-sidebar");
      document.documentElement.setAttribute("data-tab-value", selectedValue);
    }

    return () => {
      document.body.classList.remove("hide-toc-sidebar");
      document.documentElement.removeAttribute("data-tab-value");
    };
  }, [selectedValue, isBrowser]);

  return null;
}

function TabList({ className }) {
  const { selectedValue, selectValue, tabValues, block } = useTabs();
  const tabRefs = [];
  const { blockElementScrollPositionUntilNextRender } =
    useScrollPositionBlocker();

  const handleTabChange = (event) => {
    const newTab = event.currentTarget;
    const newTabIndex = tabRefs.indexOf(newTab);
    const newTabValue = tabValues[newTabIndex].value;
    if (newTabValue !== selectedValue) {
      blockElementScrollPositionUntilNextRender(newTab);
      selectValue(newTabValue);
    }
  };

  const handleKeydown = (event) => {
    let focusElement = null;
    switch (event.key) {
      case "Enter": {
        handleTabChange(event);
        break;
      }
      case "ArrowRight": {
        const nextTab = tabRefs.indexOf(event.currentTarget) + 1;
        focusElement = tabRefs[nextTab] ?? tabRefs[0];
        break;
      }
      case "ArrowLeft": {
        const prevTab = tabRefs.indexOf(event.currentTarget) - 1;
        focusElement = tabRefs[prevTab] ?? tabRefs[tabRefs.length - 1];
        break;
      }
      default:
        break;
    }
    focusElement?.focus();
  };

  return (
    <ul
      role="tablist"
      aria-orientation="horizontal"
      className={clsx(
        "tabs",
        {
          "tabs--block": block,
        },
        className,
      )}
    >
      {tabValues.map(({ value, label, attributes }) => (
        <li
          role="tab"
          tabIndex={selectedValue === value ? 0 : -1}
          aria-selected={selectedValue === value}
          key={value}
          ref={(ref) => {
            if (ref) tabRefs.push(ref);
          }}
          onKeyDown={handleKeydown}
          onClick={handleTabChange}
          {...attributes}
          className={clsx("tabs__item", styles.tabItem, attributes?.className, {
            "tabs__item--active": selectedValue === value,
          })}
        >
          {label ?? value}
        </li>
      ))}
    </ul>
  );
}

function TabContent({ children }) {
  return <div className="margin-top--md">{children}</div>;
}

function TabsContainer({ className, children }) {
  return (
    <div
      className={clsx(
        ThemeClassNames.tabs.container,
        "tabs-container",
        styles.tabList,
      )}
    >
      <TabsTocController />
      <TabList className={className} />
      <TabContent>{children}</TabContent>
    </div>
  );
}

export default function Tabs(props) {
  const isBrowser = useIsBrowser();
  const value = useTabsContextValue(props);
  return (
    <TabsProvider value={value} key={String(isBrowser)}>
      <TabsContainer className={props.className}>
        {sanitizeTabsChildren(props.children)}
      </TabsContainer>
    </TabsProvider>
  );
}
