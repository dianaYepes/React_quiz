import QuizCard from "./components/QuizCard";
import logo from './assets/quiz-logo.png'
import { useCallback, useState } from "react";
import AnswersContextProvider from "./store/AnswersContext";
import Results from "./components/Results";

function App() {
    const [takingTest, setTakingTest] = useState(true)

    const handleFinishedTest = useCallback(()=> {
        setTakingTest(false)
    },[])

    return(
        <AnswersContextProvider>
        <header>
            <img src={logo}></img>
            <h1>ReactQuiz</h1>
        </header>
        {takingTest ? <QuizCard handleFinish={handleFinishedTest}></QuizCard>:<Results></Results> }
        </AnswersContextProvider>
)
}

export default App;
