import React from "react"
import {
    IonItem,
    IonLabel,
    IonInput,
} from "@ionic/react"


import "./styles.scss"
import {SomSpan} from "../SomSpan";

type IProps = {
    label?: string;
    amount: string | number;
    onAmountChange: (value: string) => void;
    error?: boolean;
};

export const AmountInput: React.FC<IProps> = (
    {
        label,
        amount,
        onAmountChange,
        error,
    },
) => {
    return (
        <IonItem className={`wrapper ${error && "error"}`}>

            <div className="amount-wrapper">
                <IonInput
                    className="amount-input"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={amount}
                    min={0}
                    placeholder=""
                    onIonInput={(e: any) => onAmountChange(e.target.value)}
                />
            </div>
                <IonLabel className="label">
                    <p>{label} {amount} {<SomSpan/>}</p>
                </IonLabel>

        </IonItem>
    )
}