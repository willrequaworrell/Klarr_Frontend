import React, { useState } from "react"
import { CardType } from "../util/Types"
import { FaFire, FaTrash } from "react-icons/fa"


interface DeleteAreaType {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}


const DeleteArea = ({setCards}: DeleteAreaType) => {
	const [active, setActive] = useState<boolean>(false)

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDrop = (e: React.DragEvent) => {
		const cardId = e.dataTransfer.getData("cardId")
		setCards(prev => prev.filter((card) => card.id !== cardId))
		setActive(false)

	}


    return (
		<div
			className={` grid h-1/2 w-full place-content-center  rounded-xl text-6xl 
				${active 
					? "border-red bg-red/20 text-red-500" 
					: " bg-offblack text-offwhite"
				}`
			}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			{active
			? <FaFire className="animate-bounce"/>
			: <FaTrash/>
			}
			
		</div>
    )
}

export default DeleteArea
