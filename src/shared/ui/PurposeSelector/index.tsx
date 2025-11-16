import clsx from "clsx";
import "./styles.scss";
import { Icon } from "../../assets/icons/Icon";
import { ICON_TYPES } from "../../assets/icons/types";

export interface Option {
  value: string;
  label: string;
}

interface UsagePurposeSelectorProps {
  options: Option[];
  selected?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

export const  PurposeSelector = ({
  options,
  selected,
  onSelect,
  className,
}: UsagePurposeSelectorProps) => {
  console.log(options)
  return (
    <div className={clsx("usage-purpose-selector", className)}>
      <div className="usage-purpose-selector-options">
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => onSelect?.(opt.value)}
            className={clsx("usage-purpose-selector-option", {
              active: selected === opt.value,
            })}
          >
            <span>{opt.label}</span>
            {selected === opt.value && (
              <Icon
                className="usage-purpose-selector-icon"
                type={ICON_TYPES.check}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
