import { Icon } from "../../assets/icons/Icon";
import "./styles.scss";
import { ICON_TYPES } from "../../assets/icons/types";

export interface Option {
  value: string;
  label: string;
  icon?: any;
}

interface OwnerSelectorProps {
  options?: Option[];
  icon_color?: string;
  onClick?: (value: string) => void;
}

export const ChoiceCard = ({
  options,
  icon_color = "rgba(0, 122, 255, 1)",
  onClick,
}: OwnerSelectorProps) => {
  return (
    <div className="choice-card">
      {options?.map((option) => (
        <div
          className={`choice-card__option`}
          key={option.value}
          onClick={() => onClick?.(option.value)}
        >
          <div className="choice-card__option__content">
            <div className="choice-card__option__content__icon">
              <Icon
                style={{ color: icon_color }}
                className="choice-card__option__content__icon__svg"
                type={option.icon}
              />
            </div>
            <p>{option.label}</p>
          </div>
          <Icon className="choice-card__option__arrowRight" type={ICON_TYPES.arrowRight} />
        </div>
      ))}
    </div>
  );
};
