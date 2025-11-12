import { useState, useEffect, useRef, useCallback } from "react"
import "./styles.scss"

interface IProps {
    // количество табов
    amount: number
    activeTab: number
    // коллбэк при окончании сторисов
    onTabsOver: () => void
    // коллбэк при окончании сториса
    onTabOver: () => void
    // продолжительность сториса
    duration?: number
}

export const StoryTabs =
    (
        {
            amount,
            onTabsOver,
            onTabOver,
            activeTab = 0,
            duration = 5000,
        }: IProps) => {
        const [currentTab, setCurrentTab] = useState(0)
        const [progress, setProgress] = useState(0)
        const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
        const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

        const clearTimers = useCallback(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
                progressIntervalRef.current = null
            }
        }, [])

        const nextTab = useCallback(() => {
            setCurrentTab(prev => {
                if (prev < amount - 1) {
                    onTabOver()
                    return prev + 1
                } else {
                    setTimeout(onTabsOver, 100)
                    return prev
                }
            })
        }, [amount, onTabsOver])

        const startProgress = useCallback(() => {
            setProgress(0)
            const startTime = Date.now()
            progressIntervalRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime
                const progressPercent = (elapsed / duration) * 100
                if (progressPercent >= 100) {
                    setProgress(100)
                    clearInterval(progressIntervalRef.current!)
                    progressIntervalRef.current = null
                } else {
                    setProgress(progressPercent)
                }
            }, 50)
        }, [duration])

        // const goToTab = useCallback((index: number) => {
        //   clearTimers()
        //   setCurrentTab(index)
        //   setProgress(0)
        // }, [clearTimers])

        useEffect(() => {
            clearTimers()
            startProgress()

            intervalRef.current = setInterval(() => {
                nextTab()
            }, duration)

            return clearTimers
        }, [currentTab, duration, startProgress, nextTab, clearTimers])
        useEffect(() => {
            setCurrentTab(activeTab)
        }, [activeTab])
        return (
            <div className="story-tabs">
                {Array.from({ length: amount }, (_, i) => {
                    let tabProgress = 0
                    if (i < currentTab) {
                        tabProgress = 100
                    } else if (i === currentTab) {
                        tabProgress = progress
                    } else {
                        tabProgress = 0
                    }
                    return (
                        <div
                            key={i}
                            className="story-tab__wrapper"
                        >
                            <div className="story-tab">
                                <div
                                    className="story-tab__progress"
                                    style={{
                                        width: `${tabProgress}%`,
                                        transition: i === currentTab ? "none" : "width 0.3s ease",
                                    }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }