import { useEffect, useState } from "react"
import axios from "axios"

import { useAuthState } from "react-firebase-hooks/auth"
import { fireAuth } from "../util/firebase"
// import { DEFAULT_CARDS } from "../util/DummyData"

import { CardType } from "../util/Types"
import { TaskFromBackend } from "../util/Types"
import Column from "./Column"
import RemoveArea from "./RemoveArea"
import Clock from "./Clock"
import { FaTrash } from "react-icons/fa"
import { PiCheckFatFill } from "react-icons/pi";




// https://play.tailwindcss.com/2INd20Fvl0


const Board = () => {
    const [user] = useAuthState(fireAuth)
    const [cards, setCards] = useState<CardType[]>([])
    const [fetchLoading, setFetchLoading] = useState<boolean>(true)

    useEffect(() => {
        console.log('Board component mounted');
        return () => console.log('Board component unmounted');
    }, []);

    useEffect( () => {

        if (user) {
            console.log('Effect running, user:', user);
            const fetchAPI = async () => {
                console.log('Fetching API for user:', user.uid);
                setFetchLoading(true)
                try {
                    const res = await axios.get(`https://staatlidobackend.onrender.com/api/tasks/${user.uid}`)
                    const tasks = res.data.map(({_id, ...rest}: TaskFromBackend) => ({
                        ...rest,
                        id: _id,
                    }))
                    
                    setCards(tasks)
                    setFetchLoading(false)
                } catch (error) {
                    console.log(error)
                } 
            }
            fetchAPI()

        }
    },[user])

    // useEffect( () => {
        
    // }, [cards])

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
                    <div className="flex items-center justify-center size-full gap-x-8">
                        <RemoveArea Icon={PiCheckFatFill} setCards={setCards}/>
                        <RemoveArea Icon={FaTrash} setCards={setCards}/>
                    </div>
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
            {fetchLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center transition-all bg-opacity-50 bg-offblack">
                <div className="animate-spin inline-block size-16 border-[8px] border-current border-t-transparent text-offwhite rounded-full dark:text-white" role="status" aria-label="loading"/>
            </div>
      )}
        </div>
    )
}

export default Board
