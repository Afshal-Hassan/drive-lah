import { memo } from "react";
import { useAppSelector } from "@/shared/hooks";
import List from "./List";

function Sidebar() {
  const steps = useAppSelector((state) => state.sidebar.steps);

  return (
    <div className="sidebar" aria-label="Sidebar" role="navigation">
      <ul className="sidebar__list" role="list" aria-label="steps-list">
        <List
          items={steps}
          renderItem={(step, index) => {
            const itemClass = `
              sidebar__item
              ${step.status === "completed" ? "sidebar__item--completed" : ""}
              ${step.status === "active" ? "sidebar__item--active" : ""}
              ${step.status === "disabled" ? "sidebar__item--disabled" : ""}
            `.trim();

            return (
              <li
                key={index}
                className={itemClass}
                aria-current={step.status === "active" ? "step" : undefined}
                aria-disabled={step.status === "disabled"}
                tabIndex={0}
              >
                <span>{step.label}</span>

                {step.status === "completed" && (
                  <span className="sidebar__icon" aria-hidden="true">
                    ✔
                  </span>
                )}
              </li>
            );
          }}
        />
      </ul>
    </div>
  );
}

export default memo(Sidebar);
