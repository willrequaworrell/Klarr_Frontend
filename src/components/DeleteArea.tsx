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
			className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl 
				${active 
					? "border-red-800 bg-red-800/20 text-red-500" 
					: "border-neutral-500 bg-neutral-500/20 text-neutral-500"
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
