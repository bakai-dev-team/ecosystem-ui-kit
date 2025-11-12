import "./styles.scss"

interface IData{
    label:string;
    value:string;
}


interface IProps{
    data:IData[];
}

export const DocumentsCard = (props:IProps) => {

    return (
        <div className="documents-card">
            {
                props.data.map((item, index) => (
                    <div key={index} className="documents-card__item">
                        <div className="documents-card__item__label">{item.label}</div>
                        <div className="documents-card__item__value">{item.value}</div>
                    </div>
                ))
            }
        </div>
    )
}