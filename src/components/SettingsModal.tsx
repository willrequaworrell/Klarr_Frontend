import { Modal } from "@mui/material"
import ColorPicker from "./ColorPicker"
import { fireAuth } from "../util/firebase"
import { useCards } from "../context/CardContext"

interface SettingsModalPropsType {
    showSettings: boolean
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsModal = ({showSettings, setShowSettings}: SettingsModalPropsType) => {

    const  {updateColumnColor} = useCards()

    const handleResetColors = () => {
        updateColumnColor("today", "#e66642")
        updateColumnColor("upcoming", "#ffc849")
        updateColumnColor("optional", "#4b87b4")
    }

    return (
        <Modal 
            open={showSettings}
            onClose={() => setShowSettings(false)}
            aria-labelledby="settings-menu"
            aria-describedby="Menu to adjust user settings or logout"
        >
            <div className="absolute flex flex-col justify-center px-8 py-4 -translate-x-1/2 -translate-y-1/2 border-t-4 border-b-8 border-l-8 border-r-4 gap-y-2 bg-offwhite top-1/2 left-1/2 border-offblack rounded-xl font-Barlow text-offblack">
                <h3 className={`font-bold text-[3vh] tracking-wider font-Staat`}>
                    <span className="text-[4vh]">S</span>ettings
                </h3>
                <div className="flex flex-col ">
                    <div className="flex gap-x-2">
                        <p>Today Color:</p>
                        <ColorPicker column="today"/>
                    </div>
                    <div className="flex gap-x-2">
                        <p>Upcoming Color:</p>
                        <ColorPicker column="upcoming" />
                    </div>
                    <div className="flex gap-x-2">
                        <p>Optional Color:</p>
                        <ColorPicker column="optional" />
                    </div>
                    <p onClick={handleResetColors}>Reset Colors</p>
                    <p onClick={() => fireAuth.signOut()}>Logout</p>
                </div>
            </div>
        </Modal>
    )
}

export default SettingsModal
