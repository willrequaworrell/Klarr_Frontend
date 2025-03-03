import { useDemoContext } from "../context/DemoContext"
import { IoSettingsSharp } from "react-icons/io5"

interface HomeHeaderPropsType {
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
}


const HomeHeader = ({setShowSettings}: HomeHeaderPropsType) => {

    const {isDemoMode} = useDemoContext()

    return (
        <header aria-labelledby="title">
            <div className="absolute top-0 flex items-center w-full px-8 py-2">
                <div className="flex items-center flex-1 gap-x-1">
                    <img 
                        src="klarr.png" 
                        alt="Klarr Logo - overlapping black and white circles & rectangles" 
                        className="object-cover object-center h-[7vh]"
                    />
                    <h1 aria-label="Klarr Logo Text" className="tracking-wider text-[6vh] text-offblack font-Staat">
                        KLARR {isDemoMode && <span className="text-2xl text-red animate-pulse">DEMO</span>}
                    </h1>
                </div>
                <div onClick={() => setShowSettings(true)} className="text-[4vh] text-offblack">
                    <IoSettingsSharp aria-labelledby="Settings menu button" className="transition-all cursor-pointer hover:text-offblack/50 hover:animate-spin" />
                </div>


            </div>

        </header>
    )
}

export default HomeHeader
