import React from "react";
import "./styles.scss";
import  {Icon} from "../../assets/icons/Icon"
import {ICON_TYPES} from "@/shared/assets/icons/types";
import {MoneyHelper}  from "../../libs/utils/MoneyHelper"

export interface IData {
    title: string;
    sum: number;
    value: string;
}

export interface IProps {
    data: IData[];
    onClick?: (value: string) => void;
    selected:string | null;
}

export const NumberCategoryOptions: React.FC<IProps> = ({ data = [], onClick, selected }) => {
    return (
        <div className="number-category">
            {data.map((item) => (
                <div
                    key={item.value}
                    className={`number-category__item ${selected === item?.value ? "active" : ""}`}
                    onClick={() => onClick?.(item.value)}
                >
                    <div className="number-category__item__content">
                        <div className="number-category__item__title">{item.title}</div>
                        <div className="number-category__item__sum">{MoneyHelper.toHumanizedSum(item.sum)}</div>
                    </div>
                   <div className="number-category__item__icon">
                       {selected === item?.value && <Icon type={ICON_TYPES.check}/>}
                   </div>
                </div>
            ))}
        </div>
    );
};
