
import questions from '../questions.js'
import { useState ,useEffect, useRef, useContext} from 'react'
import CardAnswers from './CardAnswers.jsx'
import { AnswersContext } from '../store/AnswersContext.jsx'

export default function QuizCard({handleFinish}){
    const [currQuestion,setCurrQuestion] = useState(0)
    const [currTime,setCurrTime] = useState(100)
    const [style,setStyle] = useState(['',''])

    const ctx = useContext(AnswersContext)
    const interval = useRef()
    let milis = 100

    function updateStyle(newstyle,answer=''){
        setStyle((prevStyle)=>{
            const changedStyle = [...prevStyle]
            changedStyle[0] = newstyle
            changedStyle[1] = answer
            return changedStyle
        })
    }

    if (style[0]==="wrong" || style[0]==="correct"){
        milis = 5
    }
    
    //run it once each time we change the current question or milis changes (speeds up)
    useEffect(()=>{
        interval.current = setInterval(() => {
            setCurrTime((prevcurrTime) =>{
                return (prevcurrTime-1)
            })
        }, milis);
        //include cleanup function if for anyreason someone navigates to another page and we need interval to clear
        return () => {
            clearInterval(interval.current);
          };
    },[currQuestion,milis])

    //run this whenever currTime updates since we need to clear the interval
    useEffect(()=>{
        if (currTime==0){
            clearInterval(interval.current)
            let temp = style[0]!=='selected' ? style[0] : ''
            ctx.addAnswersToData(questions[currQuestion].text,questions[currQuestion].answers[0],temp,style[1])
            if (currQuestion === questions.length - 1){
                handleFinish()
            }
            setCurrTime(100)
            setCurrQuestion((prevCurrQuestion)=>prevCurrQuestion+1)
            setStyle('')

        }
    },[currTime])

    return(
        <div id="quiz"> 
        <section id="question">
            <progress id="progress" max={100} value={currTime} ></progress>
            <h2>{questions[currQuestion].text}</h2>
            <CardAnswers answers={questions[currQuestion].answers} style={style} updateStyle={updateStyle}></CardAnswers>
        </section>
    </div>
    )
}