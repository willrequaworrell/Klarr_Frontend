import { useEffect, useState } from "react"
import axios from "axios"

import { useAuthState } from "react-firebase-hooks/auth"
import { fireAuth } from "../util/firebase"
import { DEFAULT_CARDS } from "../util/DummyData"

import Column from "./Column"
import { CardType } from "../util/Types"
import DeleteArea from "./DeleteArea"
import Clock from "./Clock"




// https://play.tailwindcss.com/2INd20Fvl0


const Board = () => {
    const [user, loading] = useAuthState(fireAuth)
    const [cards, setCards] = useState<CardType[]>(DEFAULT_CARDS)


    useEffect( () => {

        if (user) {
            const fetchAPI = async () => {
                try {
                    const res = await axios.get(`https://staatlidobackend.onrender.com/api/tasks/${user.uid}`)
                    console.log(res.data)
                    // setCards(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            fetchAPI()

        }
    },[user, loading])

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
