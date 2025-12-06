import { useState } from "react";
import { useClickOutside } from "@/shared/hooks";
import { Link, useLocation } from "react-router-dom";
import List from "./List";

const ROUTES = [
  { path: "/device", label: "Device" },
  { path: "/", label: "Subscription" },
];

export default function Select() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  const activeRoute =
    ROUTES.find((r) => location.pathname.startsWith(r.path)) || ROUTES[0];

  return (
    <div className="mobile-select-nav" ref={dropdownRef}>
      <button
        type="button"
        className={`trigger-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="label">{activeRoute.label}</span>
        <span className={`chevron ${isOpen ? "open" : ""}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className="dropdown-menu" role="listbox">
          <List
            items={ROUTES}
            renderItem={(route, index) => {
              const isSelected = activeRoute.path === route.path;
              return (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    onClick={() => setIsOpen(false)}
                    className={isSelected ? "selected" : ""}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span>{route.label}</span>
                    {isSelected && (
                      <span className="checkmark">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </Link>
                </li>
              );
            }}
          />
        </ul>
      )}
    </div>
  );
}
