import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './styles.scss';
import { ICON_TYPES } from '../../shared/assets/icons/types';
import { Icon } from '../../shared/assets/icons/Icon';

interface IProps {
  icon: keyof typeof ICON_TYPES;
  title: string;
  subtitle: string;
  total?: string;
}

export const InfoCard: React.FC<IProps> = ({ icon, title, subtitle, total }) => {
  return (
    <IonCard className="info-card bg">
      <IonCardContent className="info-card__content">
        <div className="progress">
          <div className="info-card__icon">
            <Icon type={icon} className="info-card__icon__element" />
          </div>
        </div>
        <div className="info-card__title">{title}</div>
        <div className="info-card__subtitle">
          {subtitle} {total && <span className="info-card__total">{total}</span>}
        </div>
      </IonCardContent>
    </IonCard>
  );
};