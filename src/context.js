import React, { useContext, useEffect, useState } from "react";
const Moment = require('moment')

const AppContext = React.createContext()



const AppProvider =({children})=>{
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem("taskList")))

    //editing item
    const [editFlag, setEditFlag] = useState(false)
    const [editId, setEditId] = useState(null)
    const [editName, setEditName] = useState({})

    //handles local storage and checks for date
    useEffect(()=>{ 
        localStorage.setItem("taskList",JSON.stringify(taskList.map((item)=>{
            if(new Moment(item.date).format("YYYYMMDDHHmm")< new Moment(new Date).format("YYYYMMDDHHmm")){
                return {...item, done:true}
            } else {
                return item
            }
        })))
    }, [taskList])

    return <AppContext.Provider value={{
        taskList,
        setTaskList,
        setEditFlag,
        setEditId,
        editFlag,
        editId,
        editName, 
        setEditName,
    }}>{children}</AppContext.Provider>
}
 
export const useGlobalContext =()=>{
    return useContext(AppContext)
}

export {AppContext, AppProvider}