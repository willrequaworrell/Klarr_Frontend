import { useEffect, useState } from "react"

interface TimeType {
    hour: string, 
    minute: string,
    seconds: string,
    ampm: "A" | "P"
}

const Clock = () => {
    const [colonBg, setColonBg] = useState<"text-white" | "text-offblack">("text-offblack")
    const [userLocalTime, setUserLocalTime] = useState<TimeType | null>(() => {
        const currentTime = new Date()
        const hour = currentTime.getHours()
        const minute = currentTime.getMinutes()
        const seconds = currentTime.getSeconds()
        return {
            hour: hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
            minute: minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
            seconds: seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
            ampm: hour > 11 ? "P" : "A"
        }
    })

    useEffect(() => {

        const updateTime = () => {
            const currentTime = new Date()
            const hour = currentTime.getHours()
            const minute = currentTime.getMinutes()
            const seconds = currentTime.getSeconds()
            setColonBg((prev) => {
                if (prev == "text-offblack") {
                    return "text-white"
                } else {
                    return "text-offblack"
                }
            })
            setUserLocalTime({
                hour: (hour === 0 || hour === 12) ? "12" : (hour % 12).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
                minute: minute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
                seconds: seconds.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
                ampm: hour > 11 ? "P" : "A"
            })
        }

        const clockRefreshInterval = setInterval(updateTime, 500)

        return () => clearInterval(clockRefreshInterval)
    }, [])

    return (
        <div className="hidden md:flex items-center justify-center w-full text-white p-2 font-Barlow text-[15vh] bg-offblack h-1/2 rounded-xl ">
            <div className="flex items-baseline gap-4">
                <p>
                    <span>{userLocalTime?.hour}</span>
                    <span className={`${colonBg} transition-all duration-300`}>:</span>
                    <span>{userLocalTime?.minute}</span>
                </p>
                <div className="flex-col my-auto text-[4vh]">
                        <p >{userLocalTime?.ampm}</p>
                        <p >M</p>
                </div>
            </div>
            
        </div>
    )
}

export default Clock
