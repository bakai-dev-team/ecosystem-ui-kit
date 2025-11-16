import { Icon } from "../../assets/icons/Icon";
import "./styles.scss";
import { IonImg } from "@ionic/react";
import { useTranslation } from "react-i18next";

export interface ItemProps {
  icon: any;
  title: string;
  description: string;
  image: string;
}

interface IProps {
  goToProduct: () => void;
  item: ItemProps[];
}

export const CardWithImage = ({ goToProduct, item }: IProps) => {
  const { t } = useTranslation();
  console.log(item)
  return (
    <div className="home__body-stack">

      {item.length > 0 &&
        item?.map((item, index) => (
          <div key={index} onClick={goToProduct} className="home__body-item">
            <div className="home__body-item__info">
              <div className="home__body-item__info-icon">
                <Icon type={item?.icon} />
              </div>
              <div className="home__body-item__info-title">
                {t(item?.title)}
              </div>
              <div className="home__body-item__info-description">
                {t(item?.description)}
              </div>
            </div>
            <div className="home__body-item__image">
              <IonImg src={item?.image} alt={t("imageAlt.auto")} />
            </div>
          </div>
        ))}
    </div>
  );
};
