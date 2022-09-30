import "./ColorCard.css"

export function ColorCard({colors, onHandleDelete, onHandleEdit}) {
    function copyCode(input){
        try {
            console.log(input);
            navigator.clipboard.writeText(input);
         } catch (error) {
             console.log(error.message)
         }
    }
    
    return (
        colors.map((entry) => {
            return (
                <button className='color-container__card' onClick={()=> copyCode(entry.color)} style={{backgroundColor: entry.color}}>
                    <p className="colorName">{entry.name}</p>
                    <input type="text" className="colorText-input" 
                        value={entry.color} onInput={(event)=>onHandleEdit(event, entry.id, event.target.value)} 
                        maxLength="7"/>
                    <button type="button" className="delete-button" 
                        onClick={(event)=>onHandleDelete(event, entry.id)}
                    >X</button>
                </button>
            )
        })
    )
}