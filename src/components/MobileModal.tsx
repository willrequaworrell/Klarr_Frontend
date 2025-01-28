import { Modal } from "@mui/material"
import { useState } from "react"
// import { IoMdCloseCircle } from "react-icons/io"

const MobileModal = () => {
	const [showModal, setShowModal] = useState<boolean>(true)

	return (
		<Modal 
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="settings-menu"
            aria-describedby="Menu to adjust user settings or logout"
			className="lg:hidden"
        >
            <div className="absolute flex flex-col justify-center w-3/5 px-4 py-4 -translate-x-1/2 -translate-y-1/2 border-t-4 border-b-8 border-l-8 border-r-4 gap-y-2 bg-offwhite top-1/2 left-1/2 border-offblack rounded-xl font-Barlow text-offblack">
				{/* <IoMdCloseCircle className="absolute text-2xl top-4 right-4" /> */}
				<h3 className={`font-bold text-[3vh] tracking-wider font-Staat`}>
                    <span className="text-[4vh]">N</span>ote
                </h3>
				<div>
					<p>Functionality is currently limited on mobile. For the best experience, use Klarr on your computer!</p>
				</div>

				<div className="flex justify-center w-full">
					<button 
						onClick={() => setShowModal(false)}
						className="flex w-1/2 items-center justify-center p-[1vh] text-[2vh] text-white rounded-lg bg-offblack hover:bg-offblack/50"
					>
						<p className="flex-1">Close</p>
					</button>

				</div>
            </div>
        </Modal>
	)
}

export default MobileModal
