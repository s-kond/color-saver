import "./ColorCard.css"

export function ColorCard({codes}) {
    function copyCode(input){
        try {
            navigator.clipboard.writeText(input);
         } catch (error) {
             console.log(error.message)
         }
    }
    
    return (
        codes.map((code) => {
            return (
                <article className='color-container__card' style={{backgroundColor: code.color}}>
                    <button type="button" className="colorText-button" onClick={()=> copyCode(code.color)} >{code.color}</button>
                </article>
            )
        })
    )
}