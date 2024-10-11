import { useState } from "react"
import Column from "./Column"
import { DEFAULT_CARDS } from "../util/DummyData"
import { CardType } from "../util/Types"
import DeleteArea from "./DeleteArea"
import Clock from "./Clock"




// https://play.tailwindcss.com/2INd20Fvl0


const Board = () => {
    const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS)

    return (
        <div className="flex flex-wrap justify-center gap-8 p-20 size-full">

            <div className="flex w-full gap-8 h-1/2">
                <Column
                    title="TODAY"
                    column="today"
                    headingColor="text-offblack"
                    bgColor="bg-red"
                    cards={cards}
                    setCards={setCards}
                    width="w-3/4"
                />
                <div className="flex flex-col items-center justify-center flex-1 gap-8">
                    <Clock/>
                    <DeleteArea setCards={setCards}/>
                </div>

            </div>
            <div className="flex w-full gap-8 h-1/2">
                <Column
                    title="UPCOMING"
                    column="upcoming"
                    headingColor="text-offblack"
                    bgColor="bg-yellow"
                    cards={cards}
                    setCards={setCards}
                    width="flex-1"
                />
                <Column
                    title="OPTIONAL"
                    column="optional"
                    headingColor="text-offblack"
                    bgColor="bg-blue"
                    cards={cards}
                    setCards={setCards}
                    width="w-2/5"
                />
            
            </div>
            
        </div>
    )
}

export default Board
