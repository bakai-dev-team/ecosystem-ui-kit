import React from 'react';
import { IonCard, IonCardContent } from '@ionic/react';
import './styles.scss';
import { ICON_TYPES } from '../../shared/assets/icons/types';
import { Icon } from '../../shared/assets/icons/Icon';

interface IProps {
  value: number;
  icon: keyof typeof ICON_TYPES;
  title: string;
  subtitle: string;
  total?: string;
}
/* eslint-disable react/prop-types */


export const InfoCard: React.FC<IProps> = ({ value: _value, icon, title, subtitle, total }) => {
  // const { animatedValue, isDark } = useInfoCard(value);
  //
  // const progressStyles = useMemo(() => buildStyles({
  //   rotation: 0.62,
  //   pathColor: '#2787E8',
  //   trailColor: isDark ? '#2B3645 ' : '#DBDFE5',
  //   strokeLinecap: 'round',
  // }), [isDark]);

  return (
    <IonCard className="info-card bg">
      <IonCardContent className="info-card__content">
        <div className="progress">
          {/*<CircularProgressbar*/}
          {/*  circleRatio={0.75}*/}
          {/*  value={animatedValue}*/}
          {/*  styles={progressStyles}*/}
          {/*/>*/}
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