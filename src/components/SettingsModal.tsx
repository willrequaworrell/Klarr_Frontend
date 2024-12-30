import { Modal } from "@mui/material"
import ColorPicker from "./ColorPicker"
import { fireAuth } from "../util/firebase"
import { useCards } from "../context/CardContext"
import { RiPaintFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

interface SettingsModalPropsType {
    showSettings: boolean
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsModal = ({showSettings, setShowSettings}: SettingsModalPropsType) => {

    const  {updateColumnColor} = useCards()

    const handleResetColors = () => {
        updateColumnColor({
            today: "#e66642",
            upcoming: "#ffc849",
            optional: "#4b87b4"
        });
    }

    return (
        <Modal 
            open={showSettings}
            onClose={() => setShowSettings(false)}
            aria-labelledby="settings-menu"
            aria-describedby="Menu to adjust user settings or logout"
        >
            <div className="absolute flex flex-col justify-center w-1/5 px-4 py-4 -translate-x-1/2 -translate-y-1/2 border-t-4 border-b-8 border-l-8 border-r-4 gap-y-2 bg-offwhite top-1/2 left-1/2 border-offblack rounded-xl font-Barlow text-offblack">
                <h3 className={`font-bold text-[3vh] tracking-wider font-Staat`}>
                    <span className="text-[4vh]">S</span>ettings
                </h3>
                <div className="flex flex-col gap-y-4">
                    <div>
                        <div className="flex items-baseline gap-x-2">
                            <RiPaintFill className="text-[2.5vh]" />
                            <p className="text-[2.5vh] ">Theme</p>
                        </div>
                        <div className="text-offblack/70">

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
                            <button onClick={handleResetColors} className="hover:text-offblack/50">Reset</button>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-baseline gap-x-2">
                            <FaUser className="text-[2.5vh]"/>
                            <p className="text-[2.5vh] ">User</p>
                        </div>
                        {/* <button 
                            onClick={() => fireAuth.signOut()}
                            className="flex items-center p-1 text-white rounded-lg w-min bg-offblack hover:bg-offblack/50"
                        >
                            <p className="flex-1">Logout</p>
                        </button> */}
                        <div className="text-offblack/70">
                            <button className="hover:text-offblack/50" onClick={() => fireAuth.signOut()}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default SettingsModal
