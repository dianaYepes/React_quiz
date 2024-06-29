import { createContext, useState } from "react"

export const AnswersContext = createContext({
    data:[],
    addAnswersToData: ()=>{}
     //really both this and the items are for the purpose of autocompletion, as they really get initialized in the App.jsx when we provide the value property to the <CartContext>
  })
  

export default function AnswersContextProvider({children}){

    const [data,setData] = useState([])
  
  
    function addAnswers(question, rightAnswer,result,yourAnswer) {
      let toAdd = {
        question:question,
        rightAnswer:rightAnswer,
        yourAnswer: yourAnswer,
        result: result
      }
      setData((prevData)=>{
         let updatedData = [...prevData]
         updatedData.push(toAdd)
         return updatedData
      })
    }
  
    const ctxValue = {
      data:data,
      addAnswersToData: addAnswers
    }
  
    return <AnswersContext.Provider value={ctxValue}>
      {children}
    </AnswersContext.Provider>
  }