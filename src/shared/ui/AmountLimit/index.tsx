import "./styles.scss"
import {SomSpan} from "../SomSpan";
import {MoneyHelper} from "../../libs/utils/MoneyHelper";

type IProps = {
    label?: string;
    amount?:number;
};

export const AmountLimit = ({ label,amount }: IProps) => {
    return (
        <div className="account_limit">
           <div className="account_limit-label">{label}</div>
            <div className="account_limit-amount">{MoneyHelper.toHumanizedSum(amount ?? 0)} <SomSpan/></div>
        </div>
    )
}