import React from "react";
import  "./styles.scss"
import  {Icon} from "../../assets/icons/Icon"

interface ItemProps {
    label:string;
    value:string;
    checked:boolean;

}
export  interface  IProps {
    item:ItemProps[];
    onActionClick?:() => void;
    className?:string;
    onChange:(id: string, value: boolean ) => void;
}


export  const Checkbox = ({item,onActionClick,onChange,className}:IProps) => {
    return (
        <div className={`checkbox ${className}`}>
            {item?.map((item, index) => (
                <div key={index} className="checkbox__option">
                        <div className="checkbox__option__text">
                        <input
                            type="checkbox"
                            checked={item?.checked}
                            onChange={(e) => onChange?.(item?.value ?? "", e.target.checked)}
                        />
                        <div className="checkbox__option__text__label">{item.label}</div>
                    </div>
                    {onActionClick &&
                        <div onClick={onActionClick} className={"checkbox__option__icon"}>
                            <Icon type={'arrowRight'}/>
                        </div>
                    }

                </div>
            ))}
        </div>

    )
}