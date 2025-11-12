import { useTranslation } from "react-i18next"
import { formatizeObjectToArray } from "./model/utils"
import "./styles.scss"

interface IProps {
    data: Record<string, any>
}

export const CheckData = ({ data}: IProps) => {
    const { t } = useTranslation()
    return (
        <div className="check-table" style={{paddingBottom:"30px"}}>
            {formatizeObjectToArray(data).map((item, index) => (
                <div className="check-table___item" key={index}>
                    <span className="check-table___item-label">{t(item.label)}</span>
                    <span className="check-table___item-value">{item.value}</span>
                </div>
            ))}
        </div>
    )
}