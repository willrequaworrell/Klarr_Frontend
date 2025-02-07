import React, { useState } from "react"
import { IconBaseProps } from "react-icons"

import axios from "axios"
import { useToast } from "../context/ToastContext"
import { useCards } from "../context/CardContext"
import { useDemoContext } from "../context/DemoContext"

interface RemoveAreaPropsType {
	Icon: React.ComponentType<IconBaseProps>,
	type: 'delete' | 'complete'
}


const RemoveArea = ({Icon, type}: RemoveAreaPropsType) => {
	const [active, setActive] = useState<boolean>(false)
	const {setShowToast, setToastMessage } = useToast();
	const {setCards} = useCards();
	const {isDemoMode} = useDemoContext()

	const deleteCard = async (id: string): Promise<boolean> => {
		let success = false
		try {
			if (!isDemoMode) {
				await axios.delete(`https://staatlidobackend.onrender.com/api/tasks/${id}`)
			}
			setToastMessage("success/delete-task")
			setShowToast(true)
			success = true
        } catch (error) {
            console.log(error)
			setToastMessage("error/delete-task")
			setShowToast(true)
        } finally {
			setTimeout(() => setShowToast(false), 3000)
			return success
		}
	}
	
	const completeCard = async (id: string): Promise<boolean> => {
		let success = false
		
		try {
			if (!isDemoMode) {
				await axios.delete(`https://staatlidobackend.onrender.com/api/tasks/${id}`)
			}
			setToastMessage("success/complete-task")
			setShowToast(true)
			success = true
        } catch (error) {
            console.log(error)
			setToastMessage("error/complete-task")
			setShowToast(true)
        } finally {
			setTimeout(() => setShowToast(false), 3000)
			return success
		}
	}


	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		setActive(true)
	}

	const handleDragLeave = () => {
		setActive(false)
	}

	const handleDrop = async (e: React.DragEvent) => {
		const cardId = e.dataTransfer.getData("cardId")
		let success = false
		if (type === "complete") {
			success = await completeCard(cardId)
		} else {
			success = await deleteCard(cardId)
		}
		
		if (success) {
			setCards(prev => prev.filter((card) => card.id !== cardId))	
		}

		setActive(false)
	}


    return (
		<div
			className={` hidden md:grid h-full w-full place-content-center rounded-xl text-[8vh]  
				${active 
					? "bg-offblack/50 text-red-500" 
					: " bg-offblack text-white"
				}`
			}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
		<Icon className={`${active ? "text-white/50 scale-125" : "text-white"}`}/>

			
		</div>
    )
}

export default RemoveArea
