import { useEffect, useRef, useState } from "react"
import "./styles.scss"

interface IProps {
    data: {
        value: string
        label: string
    }[]
    value: string
    onChange: (value: string) => void
}

export const CustomTabs = ({ data, value, onChange }: IProps) => {
    const [tab, setActiveTab] = useState<string>(value)
    const indicatorRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const activeIndex = data.findIndex((d) => d.value === tab)
        const indicator = indicatorRef.current
        if (indicator) {
            const tabCount = data.length
            const totalWidth = indicator.parentElement?.offsetWidth || 0
            const adjustedWidth = (totalWidth - 8) / tabCount
            indicator.style.width = `${adjustedWidth}px`
            indicator.style.transform = `translateX(calc(${activeIndex * adjustedWidth}px + 4px))`
        }
    }, [tab, data])

    const onTabChange = (value: string): void => {
        setActiveTab(value)
        onChange(value)
    }

    return (
        <div className="custom_tab__container">
            <div className="custom_tab__indicator" ref={indicatorRef} />
            {data.map((item) => (
                <div
                    key={item.value}
                    className={`custom_tab__item ${tab === item.value ? "custom_tab__item-active" : ""}`}
                    onClick={() => onTabChange(item.value)}
                >
                    {item.label}
                </div>
            ))}
        </div>
    )
}
