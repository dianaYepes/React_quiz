import { useContext } from "react"
import logo from "../assets/quiz-complete.png"
import { AnswersContext } from '../store/AnswersContext.jsx'

export default function Results(){
    const ctx = useContext(AnswersContext)
    let skipped = 0
    let correct = 0
    ctx.data.forEach((result)=>{
        if (result.result==="correct"){
            correct = correct+1
        }
        else if(result.result ===""){
            skipped = skipped + 1
        }
    })

    const skippedPer = Math.round(((skipped/ctx.data.length)*100))
    const answeredCorr = Math.round(((correct/ctx.data.length)*100))
    const answeredIncorr = 100 - answeredCorr

    return(
        <div id="summary">
            <img src={logo}></img>
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <section>
                    <p className="number">{skippedPer.toString()+"%"}</p>
                    <p className="text">SKIPPED</p>
                </section>
                <section>
                    <p className="number">{answeredCorr.toString()+"%"}</p>
                    <p className="text">ANSWERED CORRECTLY</p>
                </section>
                <section>
                    <p className="number">{answeredIncorr.toString()+"%"}</p>
                    <p className="text">ANSWERED INCORRECTLY</p>
                </section>
            </div>
            <ol>
                {ctx.data.map((obj,ind)=>
                <li key={ind}>
                    <h3>{ind+1}</h3>
                    <p className="question">{obj.question}</p>
                    <section className="user-answer">
                        <p className={obj.response === "" ? "skipped" : obj.result}>{obj.yourAnswer}</p>
                    </section>
                </li>  
                )}
            </ol>
        </div>
    )

}