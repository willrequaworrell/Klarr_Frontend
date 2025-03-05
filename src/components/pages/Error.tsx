import Background from "../Background"


const Error = () => {
    return (
        <Background>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="flex items-center justify-center">
                    <img 
                        src="klarr.png" 
                        alt="Klarr Logo - overlapping black and white circles & rectangles" 
                        className="object-cover object-center h-[7vh]"
                    />
                    <h1 aria-label="Klarr Logo Text" className="tracking-wider text-[6vh] text-offblack font-Staat">
                        KLARR
                    </h1>
                </div>
                <p className="font-bold text-offblack text-[2vw]">Whoops! Looks like we can't find what you're looking for</p>
            </div>
        </Background>
    )
}

export default Error
