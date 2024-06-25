import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";
import PriorityComponent from "./Priority";
import {initialValues ,day} from "./background";

const AddTask =()=>{
    const {setTaskList, taskList, editFlag, editId,setEditFlag, editName,} = useGlobalContext()
    const [task, setTask] = useState(initialValues)

    // creates a task
    const handleInput = (e)=>{
        const {name, value} = e.target
        setTask({...task,[name]:value, id:new Date().valueOf(), order:taskList.length+1})
    }
    // adds tasks to the list
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!task.name){
            alert("no value!")
        } else if (editFlag){
            let newitm = taskList.map((item)=>{
                if(item.id===editId){
                    return {...item, name:task.name, date:task.date, priority:task.priority}
                } else {
                    return item
                }})
            setTaskList(newitm)
            setEditFlag(false)
            setTask(initialValues)
            
        }  else {
            //fixes first local storage iteration that returns null
            setTaskList(taskList?[...taskList, task]:[task])
            setTask(initialValues)
        }
    }

    //sets input editing values
    useEffect(()=>{
        if (editFlag) {
            setTask({...editName})

        } else{
            setTask(initialValues)
        }
    }, [editFlag])

    
    return <div className="form-wrap">
        <form onSubmit={handleSubmit} className="form">
            <input type="text" name="name" id="name" value={task.name} onChange={handleInput} placeholder="Your task" className="task-input"/>
            <div className="add-task-specifics">

               <PriorityComponent handleInput={handleInput} {...task}/>
               <div className="data-input">
                    <label htmlFor="date" className="pr">Finish untill:</label>
                    <input type="datetime-local" name="date" id="date" value={task.date} onChange={handleInput} min={day} className="add-date"/>
                </div>
                <button type="submit" className="add-btn">{editFlag?"Edit":"Add task"}</button>
               
            </div>
        </form>
    </div>
}

export default AddTask