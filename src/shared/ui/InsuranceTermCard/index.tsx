import "./styles.scss";

interface Item<T> {
  label: string;
  value: T;
}

interface IProps<T> {
  text?: string;
  data?: Item<T>[];
  selectedValue?: T | null; 
  onSelect?: (value: T) => void;
}

export const InsuranceTermCard = <T,>(props: IProps<T>) => {
  const selectedValue = props.selectedValue ?? null;
  return (
    <div className="insurance-term-card">
      {props.text && <div className="insurance-term-card__title">{props.text}</div>}

      {props.data && props.data.length > 0 && (
        <div className="insurance-term-card__list">
          {props.data.map((item, index) => {
            const isSelected = item.value === selectedValue;
            return (
              <div
                key={index}
                className={`insurance-term-card__item ${isSelected ? "selected" : ""}`}
                onClick={() => props.onSelect?.(item.value)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
