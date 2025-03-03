
const AuthHeader = () => {
    return (
        <header aria-labelledby="title">
            <div className="flex items-center justify-center scale-125 md:scale-150 gap-x-1">
                
                <img 
                    src="klarr.png" 
                    alt="Klarr Logo - overlapping black and white circles & rectangles" 
                    className="object-cover object-center h-[9vh]"
                />

                <h1 className="text-[8vh] tracking-wider text-offblack font-Staat">
                    KLARR
                </h1>
            </div>

        </header>
    )
}

export default AuthHeader
