import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonText,
  IonSkeletonText,
  IonChip,
} from "@ionic/react";

import "./styles.scss";
import { useTranslation } from "react-i18next";
import { MoneyHelper } from "../../shared/libs/utils/MoneyHelper";
import {getIcon} from "../../shared/libs/utils/getIcon"
import { SomSpan } from "../../shared/ui/SomSpan";

export type IAccountCard = {
  name: string;
  imageName: string;
  accountNo?: string;
  currencyID?: number;
  cardPan?: string;
  balance?: number;
};

type IProps = {
  accounts: IAccountCard[];
  selectedId: string | null;
  onSelect: (account: IAccountCard) => void;
  hideBalance?: boolean;
  isLoading?: boolean;
};

export const CardSelect = ({
  accounts,
  selectedId,
  onSelect,
  hideBalance = false,
  isLoading = false,
}: IProps) => {
  const { t } = useTranslation();
  const isExternalCard = (name: string) =>
    name.toLowerCase().includes("visa") ||
    name.toLowerCase().includes("элкарт");

  const renderAccountLabel = (account: IAccountCard) => {
    const isExternal = isExternalCard(account.imageName);
    if (isExternal) {
      return (
        <>
          <p className="account-modal__text">{account.name}</p>
          <p className="account-modal__cardPan">{(account?.cardPan ?? "").slice(-4)}</p>
        </>
      );
    }
    return hideBalance ? (
      <>
        <h2 className="account-modal__text">{account.name}</h2>
        <p className="account-modal__cardPan">{account.cardPan}</p>
      </>
    ) : (
      <>
        <p className="account-modal__text">{account.name}</p>
        <p className="account-modal__cardPan">{(account?.cardPan ?? "").slice(-4)}</p>
      </>
    );
  };

  return (
    <div className="account_select_container">
      {isLoading ? (
        <IonItem lines="none">
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <p>
              <IonSkeletonText animated />
            </p>
            <h2>
              <IonSkeletonText animated />
            </h2>
          </IonLabel>
          <IonSkeletonText slot="end" animated />
        </IonItem>
      ) : accounts.length === 0 ? (
        <IonItem color="danger">
          <IonLabel>
            <h2>{t("no_available_account")}</h2>
          </IonLabel>
        </IonItem>
      ) : (
        <IonList className="account_select_container_list">
          {accounts.map((account) => (
            <IonItem
              key={account.accountNo}
              className={account.accountNo === selectedId ? "active" : ""}
              onClick={() => onSelect(account)}
            >
              <IonChip slot="start" className="account-modal__icon">
                <img src={getIcon(account.imageName)} alt="" />
              </IonChip>

              <IonLabel className="account-modal__label">
                {renderAccountLabel(account)}
              </IonLabel>

              {!hideBalance && account.cardPan && (
                <IonText slot="end" className="number">
                    {MoneyHelper.toHumanizedSum(account.balance ?? 0)}
                    {account.currencyID === 417 && (
                      <>
                        {" "}
                        <SomSpan />
                      </>
                    )}
                </IonText>
              )}
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  );
};
