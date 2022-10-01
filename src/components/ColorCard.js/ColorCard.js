import "./ColorCard.css"

export function ColorCard({colors, onHandleDelete, onHandleEdit}) {
    function copyCode(event, input){
        try {
            console.log(input);
            navigator.clipboard.writeText(input);
            showCopiedTag(event);
         } catch (error) {
             console.log(error.message)
         }
    }

    //Funktion von MDN adaptiert: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
    function showCopiedTag(event) {
        //hiermit wird das p-element "copied!" angesteuert:
        event.target.children[3].classList = "copied-message";
        requestAnimationFrame((time) => {
          requestAnimationFrame((time) => {
            event.target.children[3].classList = "copied-message hidden";
          });
        });
      }

    return (
        colors.map((entry) => {
            return (
                <button className='color-container__card' onClick={(event)=> copyCode(event, entry.color)} style={{backgroundColor: entry.color}}>
                    <p className="colorName">{entry.name}</p>
                    <input type="text" className="colorText-input" 
                        value={entry.color} onInput={(event)=>onHandleEdit(event, entry.id, event.target.value)} 
                        maxLength="7" minLength="4" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" title="3- or 6-digit hexcode. Only numbers and letters from A-F."/>
                    <button type="button" className="delete-button" 
                        onClick={(event)=>onHandleDelete(event, entry.id)}
                    >X</button>
                    <p className="copied-message hidden">copied!</p>
                </button>
            )
        })
    )
}