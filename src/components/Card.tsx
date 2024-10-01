import { motion } from "framer-motion"
import { CardType } from "../util/Types"
import DropIndicator from "./DropIndicator"
import { useState } from "react";

interface DraggableCardType extends CardType {
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
    bgColor: string
    onEdit: (id: string, newTitle: string) => void
}


const Card = ({title, id, column, handleDragStart, bgColor, onEdit}: DraggableCardType) => {
    const [editedTitle, setEditedTitle] = useState<string>(title)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const handleDoubleClick = () => {
        setIsEditing(pv => !pv)
    }

    const handleTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value)
    }

    const handleSubmitEdit = (e: React.FormEvent) => {
        e.preventDefault()
        onEdit(id, editedTitle)
        setIsEditing(false)
    }

    return (
    <>
        <DropIndicator beforeId={id} column={column}/>
        <motion.div 
            layout
            layoutId={id}
            draggable={!isEditing}
            className={`flex relative p-2 rounded-xl cursor-grab  ${bgColor} border-offblack border-l-8 border-b-8 active:cursor-grabbing`}
            onDragStart={(e: any) => handleDragStart(e as React.DragEvent<HTMLDivElement>, {title, id, column})}
            onDoubleClick={handleDoubleClick}
        >

            {isEditing 
            ?
                <form onSubmit={handleSubmitEdit} className="w-full">
                    <input 
                        autoFocus
                        type="text" 
                        value={editedTitle}
                        onChange={handleTitleEdit}
                        onBlur={() => setIsEditing(false)}
                        className="w-full font-bold bg-transparent border-none outline-none text-md font-Barlow text-offblack" />
                </form>
            :
            <p className="flex-1 text-md font-Barlow text-offblack">{title}</p>

            }

        </motion.div>
    </>
    )
}

export default Card
