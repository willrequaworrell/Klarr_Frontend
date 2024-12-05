

import Column from "./Column"
import RemoveArea from "./RemoveArea"

import Clock from "./Clock"
import { FaTrash } from "react-icons/fa"
import { PiCheckFatFill } from "react-icons/pi";


import { useCards } from "../context/CardContext"
import Spinner from "./Spinner";



const Board = () => {
    // const [user] = useAuthState(fireAuth)
    // const [cards, setCards] = useState<CardType[]>([])
    // const [fetchLoading, setFetchLoading] = useState<boolean>(true)

    const {setCards, fetchLoading } = useCards();

    return (
        
            
        <div className="flex flex-wrap justify-center gap-8 p-[10vh] size-full">

            <div className="flex w-full gap-8 h-1/2">
                <Column
                    title="TODAY"
                    column="today"
                    headingColor="text-offblack"
                    bgColor="bg-red"
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
                    width="flex-1"
                />
                <Column
                    title="OPTIONAL"
                    column="optional"
                    headingColor="text-offblack"
                    bgColor="bg-blue"
                    width="w-2/5"
                />
            
            </div>
            {fetchLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center transition-all bg-opacity-50 bg-offblack">
                <Spinner size="size-16" color="text-offwhite" borderWidth="border-8"/>
                {/* <div className="animate-spin inline-block size-16 border-[8px] border-current border-t-transparent text-offwhite rounded-full dark:text-white" role="status" aria-label="loading"/> */}
            </div>
    )}
        </div>
    )
}

export default Board
