import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faCircleHalfStroke,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";

const ThemeDropdown = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const label =
    theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  const icon =
    theme === "dark" ? faSun : theme === "light" ? faMoon : faCircleHalfStroke;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 lg:p-2 lg:hover:bg-surface-2 lg:w-full text-sm rounded-lg transition"
      >
        <FontAwesomeIcon icon={icon} />
        {label}
        <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
      </button>

      {open && (
        <div className="absolute left-0 lg:left-0 -top-12 mt-2 w-40 bg-surface border border-border rounded-xl shadow-lg overflow-hidden text-sm">
          <button
            onClick={() => {
              setTheme("light");
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-surface-2"
          >
            Light
          </button>

          <button
            onClick={() => {
              setTheme("dark");
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-surface-2"
          >
            Dark
          </button>

          <button
            onClick={() => {
              setTheme("system");
              setOpen(false);
            }}
            className="w-full text-left px-3 py-2 hover:bg-surface-2"
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeDropdown;
