import "./ColorCard.css"

export function ColorCard({codes, onHandleDelete, onHandleEdit}) {
    function copyCode(input){
        try {
            console.log(input);
            navigator.clipboard.writeText(input);
         } catch (error) {
             console.log(error.message)
         }
    }
    
    return (
        codes.map((code) => {
            return (
                <button className='color-container__card' onClick={()=> copyCode(code.color)} style={{backgroundColor: code.color}}>
                    <input type="text" className="colorText-input" 
                        value={code.color} onInput={(event)=>onHandleEdit(event, code.id, event.target.value)} 
                        maxLength="7"/>
                    <button type="button" className="delete-button" 
                        onClick={(event)=>onHandleDelete(event, code.id)}
                    >X</button>
                </button>
            )
        })
    )
}