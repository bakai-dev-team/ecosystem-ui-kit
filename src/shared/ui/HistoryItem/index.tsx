import  "./styles.scss"
import {AnimatedStatusImg, TAnimatedStatusImgType} from "../../../widgets/AnimatedStatusImg";
import {MoneyHelper}  from "../../libs/utils/MoneyHelper"
import {IonImg} from "@ionic/react";
import {formatTime,formatDateLabel} from "../../libs/utils/time"

export  interface  IData {
    id:string;
    logo:string;
    name:string;
    text:string;
    sum:number;
    time:any;
    status?: TAnimatedStatusImgType | undefined;
    type?: "income" | "outcome";
}

interface IProps {
    item: IData[];
    onClick:(id:string) => void;
}

export  const HistoryItem: React.FC<IProps> = ({item,onClick}:IProps)  => {
    const groupedItems: { [key: string]: IData[] } = {};
    item.forEach((transaction) => {
        const label = formatDateLabel(transaction.time);
        if (!groupedItems[label]) groupedItems[label] = [];
        groupedItems[label].push(transaction);
    });

    return (
        <div className="history-wrapper">
            {Object.keys(groupedItems).map((label) => (
                <div key={label}>
                    <div className="history-label">{label}</div>
                    <div className="history-item">
                        {groupedItems[label].map((transaction) => (
                            <div
                                onClick={() => onClick(transaction.id)}
                                key={transaction.id}
                                className="history-item__row"
                            >
                                <div className="history-item__left">
                                    <div className="history-item__icon-wrapper">
                                        <IonImg
                                            className="history-item__icon"
                                            src={transaction.logo}
                                            alt={transaction.name}
                                        />
                                        {transaction.status && transaction.status !== "success" && (
                                            <div className="history-item__status">
                                                <AnimatedStatusImg
                                                    size="sm"
                                                    status={transaction.status}
                                                />
                                            </div>
                                        )}

                                    </div>

                                    <div className="history-item__info">
                                        <div className="history-item__title">{transaction.name}</div>
                                        <div className="history-item__subtitle">{transaction.text}</div>
                                    </div>
                                </div>

                                <div className="history-item__meta">
                                    <div
                                        className={`history-item__amount
                                        ${transaction.status === "in_progress" || transaction.status === "error" ? "gray" : ""}
                                        ${transaction.type === "income" ? "green" : ""}
                                        ${transaction.type === "outcome" ? "black" : ""}`}
                                         >
                                        {transaction.status === "in_progress" || transaction.status === "error"
                                            ? MoneyHelper.toHumanizedSum(transaction.sum) + " c"
                                            : transaction.type === "income"
                                                ? "+" + MoneyHelper.toHumanizedSum(transaction.sum) + " c"
                                                : "-" + MoneyHelper.toHumanizedSum(transaction.sum) + " c"}
                                         </div>

                                    <div className="history-item__time">
                                        {formatTime(transaction?.time)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}