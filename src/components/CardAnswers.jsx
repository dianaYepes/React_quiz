import { useState } from "react"


export default function CardAnswers({answers, updateStyle, style}){
    const [selected,setSelected] = useState()
    let copy = [...answers]
    copy = copy.sort()

    function handleClick(questionInd){
        if (selected!== questionInd){
            setSelected(questionInd)
            updateStyle('selected')
        }
        else{
            if (copy[questionInd]===answers[0]){
                updateStyle('correct',copy[questionInd])
            }
            else{
                updateStyle('wrong',copy[questionInd])
            }
        }
    }

    return(
        <ul id="answers">
                {copy.map((answer,answerInd)=>
                        <li key={answerInd} className="answer">
                                <button className={selected===answerInd ? style[0] : ''} onClick={()=>handleClick(answerInd)}>{answer}</button>
                        </li> 
                    )}
            </ul>
    )
}