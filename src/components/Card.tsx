import { motion } from "framer-motion"
import { CardType } from "../util/Types"
import DropIndicator from "./DropIndicator"

interface DraggableCardType extends CardType {
    handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: CardType) => void;
}


const Card = ({title, id, column, handleDragStart}: DraggableCardType) => {
    

    return (
    <>
        <DropIndicator beforeId={id} column={column}/>
        <motion.div 
            layout
            layoutId={id}
            draggable 
            className="p-3 border rounded cursor-grab border-neutral-700 bg-neutral-800 active:cursor-grabbing"
            onDragStart={(e: any) => handleDragStart(e as React.DragEvent<HTMLDivElement>, {title, id, column})}
        >
            <p className="text-sm text-neutral-100">{title}</p>
        </motion.div>
    </>
    )
}

export default Card
