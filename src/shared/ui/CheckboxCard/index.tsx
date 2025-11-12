import React from "react";
import "./styles.scss";

type TItem = {
  id?: string;
  label?: string;
  subtitle?: string;
  checked?: boolean;
};

interface CheckboxCardProps {
  item?: TItem[];
  onChange?: (id:string,checked: boolean) => void;
  className?: string;
}

export const CheckboxCard: React.FC<CheckboxCardProps> = ({
  item,
  onChange,
  className = "",   
}) => {
  return (
    <div className={`checkbox-card ${className}`}>
      {item?.map((item, index) => (
        <div key={index} className="checkbox-card__option">
          <div className="checkbox-card__option__text">
            <div className="checkbox-card__option__text__label">{item.label}</div>
            {item.subtitle && <div className="checkbox-card__option__text__subtitle">{item.subtitle}</div>}
          </div>
          <input
            type="checkbox"
            checked={item?.checked}
            onChange={(e) => onChange?.(item?.id ?? "", e.target.checked)}
          />
        </div>
      ))}
    </div>
  );
};
