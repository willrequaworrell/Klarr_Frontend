import { motion } from "framer-motion"
import { CardType } from "../util/Types"
import DropIndicator from "./DropIndicator"

interface DraggableCardType extends CardType {
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
    bgColor: string
}


const Card = ({title, id, column, handleDragStart, bgColor}: DraggableCardType) => {
    

    return (
    <>
        <DropIndicator beforeId={id} column={column}/>
        <motion.div 
            layout
            layoutId={id}
            draggable 
            className={`p-2 border rounded-xl cursor-grab  ${bgColor} active:cursor-grabbing`}
            onDragStart={(e: any) => handleDragStart(e as React.DragEvent<HTMLDivElement>, {title, id, column})}
        >
            <p className="text-sm font-bold text-neutral-900">{title}</p>
        </motion.div>
    </>
    )
}

export default Card
