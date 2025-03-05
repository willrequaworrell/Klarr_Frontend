import { CardType } from "../util/Types"

interface ColumnTitlePropsType {
    title: string
    headingColor: string
    filteredCards: CardType[]
}

const ColumnTitle = ({title, headingColor, filteredCards}: ColumnTitlePropsType) => {
    return (
        <div className="flex items-center justify-between mb-[1vh]">
            <h2 className={`font-bold text-[3vh] tracking-wider  ${headingColor}`}>
                <span className="text-[4vh]">{title.slice(0,1)}</span>{title.slice(1)}
            </h2>
            <span className="flex items-center justify-center p-2 text-[3vh] font-bold text-center rounded-full font-Barlow size-[5vh] bg-offblack">{filteredCards.length}</span>
        </div>
    )
}

export default ColumnTitle
