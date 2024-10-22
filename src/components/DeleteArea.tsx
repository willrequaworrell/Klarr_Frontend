import React, { useState } from "react"
import { CardType } from "../util/Types"
import { FaTrash } from "react-icons/fa"
import axios from "axios"

interface DeleteAreaType {
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>
}


const DeleteArea = ({setCards}: DeleteAreaType) => {
	const [active, setActive] = useState<boolean>(false)

	const deleteCard = async (id: string) => {
		try {
            const res = await axios.delete(`https://staatlidobackend.onrender.com/api/tasks/${id}`)
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDrop = (e: React.DragEvent) => {
		const cardId = e.dataTransfer.getData("cardId")

		deleteCard(cardId)
		setCards(prev => prev.filter((card) => card.id !== cardId))
		setActive(false)

	}


    return (
		<div
			className={` grid h-1/2 w-full place-content-center  rounded-xl text-6xl 
				${active 
					? "bg-offblack/50 text-red-500" 
					: " bg-offblack text-white"
				}`
			}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
		<FaTrash className={`${active ? "text-white/50 scale-125" : "text-white"}`}/>
			
		</div>
    )
}

export default DeleteArea
