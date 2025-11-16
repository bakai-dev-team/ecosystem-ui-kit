import "./styles.scss";
import { TAnimatedStatusImgType, AnimatedStatusImg } from "../../../widgets/AnimatedStatusImg";
import {MoneyHelper} from "../../libs/utils/MoneyHelper"
interface IProps {
  status: TAnimatedStatusImgType;
  text: string;
  amount: number;
  type?: string;
  number?: string;
  date?: string;
}

export const CheckCard = (props: IProps) => {
  const {
    status = "error",
    text = "Исполнен!",
    amount = 2465,
    type = "ОСАГО",
    number = "2835001982815540",
    date = "11.03.25 15:12",
  } = props;


  return (
    <div className="check-card">
      <div className="check-card__header">
        <AnimatedStatusImg status={status} />
        <div className="check-card__status">{text}</div>
        <div className="check-card__amount">{MoneyHelper.toHumanizedSum(amount ?? 0)} с</div>
      </div>
      <div className="check-card__dividers">
        {[...Array(18)].map((_, index) => (
          <div key={index} className="check-card__divider"></div>
        ))}
      </div>
      
      <div className="check-card__details">
        <div className="check-card__type">{type}</div>
        <div className="check-card__number">{number}</div>
        <div className="check-card__date">{date}</div>
      </div>
    </div>
  );
};
