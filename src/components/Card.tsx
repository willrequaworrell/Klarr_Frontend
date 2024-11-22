import { motion } from "framer-motion"
import { CardType } from "../util/Types"
import DropIndicator from "./DropIndicator"
import { useState } from "react";
import UpdateCardDatePickerModal from "./UpdateCardDatePickerModal";
// import { useCards } from "../context/CardContext";
// import { Dayjs } from "dayjs";

interface DraggableCardType extends CardType {
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
    bgColor: string
    onEdit: (id: string, newTitle: string) => Promise<boolean>
}


const Card = ({title, id, column, dueDate, handleDragStart, bgColor, onEdit, order}: DraggableCardType) => {
    // const {cards, setCards } = useCards();
    const [editedTitle, setEditedTitle] = useState<string>(title)
    const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false)
    // const [editedDate, setEditedDate] = useState<Dayjs | null>(null)
    const [isEditingDate, setIsEditingDate] = useState<boolean>(false)

    const handleDoubleClick = () => {
        setIsEditingTitle(pv => !pv)
    }

    const handleTitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitle(e.target.value)
    }

    const handleSubmitTitleEdit = async (e: React.FormEvent) => {
        e.preventDefault()
        await onEdit(id, editedTitle)
    }

    const handleDateEdit = () => {
        setIsEditingDate(true)
    }

    const formatDate = (date: Date | string): string => {
        let datePassed = date

        if (datePassed instanceof Date) {
            const month = String(datePassed.getMonth() + 1).padStart(2, '0')
            const day = String(datePassed.getDate()).padStart(2, '0');
            return `${month}/${day}`;
        } else {
            const stringToDate = new Date(date)
            const month = String(stringToDate.getMonth() + 1).padStart(2, '0')
            const day = String(stringToDate.getDate()).padStart(2, '0');
            return `${month}/${day}`;
        }
    }
    
    return (
    <>  
        <UpdateCardDatePickerModal id={id} showDatePicker={isEditingDate} setShowDatePicker={setIsEditingDate} />
        <DropIndicator beforeId={id} column={column}/>
        <motion.div 
            layout
            layoutId={id}
            draggable={!isEditingTitle}
            className={`flex relative p-2 rounded-xl cursor-grab  ${bgColor} border-offblack border-l-8 border-b-8 active:cursor-grabbing`}
            onDragStart={(e: any) => handleDragStart(e as React.DragEvent<HTMLDivElement>, {order, title, id, column, dueDate})}
            onDoubleClick={handleDoubleClick}
        >

            {isEditingTitle 
            ?
                <form onSubmit={handleSubmitTitleEdit} className="w-full">
                    <input 
                        autoFocus
                        type="text" 
                        value={editedTitle}
                        onChange={handleTitleEdit}
                        onBlur={() => setIsEditingTitle(false)}
                        className="w-full font-bold bg-transparent border-none outline-none text-md font-Barlow text-offblack" />
                </form>
            :
            <>
                <p className="flex-1 tracking-wide text-md font-Barlow text-offblack">{title}</p>
                {/* {column === "upcoming" && <p className="text-offblack">{formatDate(dueDate)}</p>} */}
                {column === "upcoming" &&
                    <div onClick={handleDateEdit} className="flex items-center justify-center w-12 px-2 py-1 text-sm tracking-widest text-white rounded-full font-Barlow bg-offblack max-h-min">
                        <p >{formatDate(dueDate)}</p>
                    </div>
                }
            </>

            }

        </motion.div>
    </>
    )
}

export default Card
