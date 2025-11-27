import "./styles.scss";
import { Icon } from "../../shared/assets/icons/Icon";
import { ICON_TYPES } from "../../shared/assets/icons/types";
import {MoneyHelper}  from "../../shared/libs/utils/MoneyHelper"
import {SomSpan} from "../../shared/ui/SomSpan";

export interface IData {
    id: string;
    name: string;
    sum: number;
    logo: any;
}

interface IProps {
    data: IData[];
    onClick: (value: string) => void;
    selectable?: boolean;
    checkedItems?: string[];
    onCheckChange?: (id: string, checked: boolean) => void;
}

export const AccountCard = ({
                                data,
                                onClick,
                                selectable = false,
                                checkedItems = [],
                                onCheckChange,
                            }: IProps) => {

    const toggleCheck = (id: string) => {
        const isChecked = checkedItems.includes(id);
        onCheckChange?.(id, !isChecked);
    };

    return (
        <div className={"account-card-container"}>
            {data?.map((item: IData) => {
                const isChecked = checkedItems.includes(item.id);
                return (
                    <div
                        key={item.id}
                        className="account-card"
                        onClick={(e) => {
                            onClick(item.id)
                            e.stopPropagation();
                            toggleCheck(item.id);
                        }}
                    >
                        <div className="account-card__content">
                            <div className="account-card__logo">
                                <Icon className="account-card__logo__icon" type={item?.logo} />
                            </div>

                            <div className="account-card__info">
                                <div className="account-card__name">{item.name}</div>
                                <div className="account-card__sum">{MoneyHelper.toHumanizedSum(item.sum)}  <SomSpan/></div>
                            </div>
                        </div>

                        <div className="account-card__action">
                            {selectable ? (
                                <div
                                    className={`custom-checkbox ${isChecked ? "checked" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCheck(item.id);
                                    }}
                                >
                                    {isChecked && <Icon className={"checked-icon"} type={ICON_TYPES.check} />}
                                </div>
                            ) : (
                                <Icon type={ICON_TYPES.arrowRight} />
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
