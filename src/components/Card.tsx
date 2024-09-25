import { CardType } from "../util/Types"

const Card = ({title, id, column}: CardType) => {
    return (
    <>
        <div 
            draggable 
            className="p-3 border rounded cursor-grab border-neutral-700 bg-neutral-800 active:cursor-grabbing"
        >
            <p className="text-sm text-neutral-100">{title}</p>
        </div>
    </>
    )
}

export default Card
