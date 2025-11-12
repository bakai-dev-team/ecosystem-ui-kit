import "./styles.scss"
import {SomSpan} from "../SomSpan";
import {numberWithSpaces} from "../../libs/utils/numberWithSpaces";

type IProps = {
    label?: string;
    amount?:number;
};

const AmountLimit = ({ label,amount }: IProps) => {
    return (
        <div className="account_limit">
           <div className="account_limit-label">{label}</div>
            <div className="account_limit-amount">{numberWithSpaces(amount)} <SomSpan/></div>
        </div>
    )
}

export default AmountLimit