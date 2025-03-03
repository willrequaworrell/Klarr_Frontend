

import Column from "./Column"
import RemoveArea from "./RemoveArea"

import Clock from "./Clock"
import { FaTrash } from "react-icons/fa"
import { PiCheckFatFill } from "react-icons/pi";


import { useCards } from "../context/CardContext"
import Spinner from "./Spinner";
import BoardRow from "./BoardRow";



const Board = () => {

    const {fetchLoading, columnColors } = useCards();

    return (
        
        <main className="flex size-full">

            <div className="flex flex-wrap justify-center gap-8 p-[4vh] pt-[10vh] md:p-[10vh] size-full">
                
                <BoardRow styles="md:gap-8">
                    <Column
                        title="TODAY"
                        column="today"
                        headingColor="text-offblack"
                        bgColor={columnColors.today}
                        width="w-full md:w-3/4"
                    />
                    <div className="flex flex-col items-center justify-center flex-1 gap-8">
                        <Clock/>
                        <div className="flex items-center justify-center size-full gap-x-8">
                            <RemoveArea Icon={PiCheckFatFill} type="complete"/>
                            <RemoveArea Icon={FaTrash} type="delete"/>
                        </div>
                    </div>

                </BoardRow>
                <BoardRow styles="flex-col gap-8 md:flex-row">
                    <Column
                        title="UPCOMING"
                        column="upcoming"
                        headingColor="text-offblack"
                        bgColor={columnColors.upcoming}
                        width="w-full md:flex-1"
                    />
                    <Column
                        title="OPTIONAL"
                        column="optional"
                        headingColor="text-offblack"
                        bgColor={columnColors.optional}
                        width="w-full md:w-2/5"
                    />
                </BoardRow>
                
                {fetchLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center transition-all bg-opacity-50 bg-offblack">
                        <Spinner size="size-16" color="text-offwhite" borderWidth="border-8"/>
                    </div>
                )}
            </div>
        </main> 
        
    )
}

export default Board
