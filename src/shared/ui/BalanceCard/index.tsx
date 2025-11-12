import { IonCard, IonCardContent, IonImg } from '@ionic/react';
import './styles.scss';
import { MoneyHelper } from '../../libs/utils/MoneyHelper';

type Props = {
  logoSrc: string;
  title: string;
  amount: number;
  currency: string;
};

export const BalanceCard = ({ logoSrc, title, amount, currency }: Props) => {
  return (
    <IonCard className="balance-card">
      <IonCardContent className="balance-card__content">
        <IonImg src={logoSrc} className="balance-card__logo" />
        <div>
          <div className="balance-card__title">{title}</div>
          <div className="balance-card__amount">
            {MoneyHelper.toHumanizedSum(amount ?? 0)} {currency}
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};