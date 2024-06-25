import React from "react";
import { FaGripLines } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { priorityColors } from "./priorityColors";
import { FaRegCheckCircle } from "react-icons/fa";

const Task =({id, name, date, priority, finished, handleEdit, handleDelete, taskList, setTaskList, taskSwitch})=>{
    const handelTask = ()=>{
        setTaskList(taskList.map((item)=>{
            if(item.id === id){
                return {...item, done:true, finished:"Done"} 
            } else {
                return item
            }
        }))
    }

    const formatedData = moment(date, "YYYY-MM-DD, h:mm")
    const weekDay = formatedData.format("dddd").substring(0,3)
    const month = formatedData.format("MMM")
    const day = formatedData.format("D")
    const hours = formatedData.format("HH:mm")

    const color = priorityColors.find((item)=>item.value===priority).color

    return <div className="task-container" style={{backgroundColor:taskSwitch && color}}>
        <div className="task">
            {!taskSwitch && <button className="check" onClick={handelTask}><FaRegCheckCircle color={color}/></button>}
            <div className="date-container">
                <p className="weekday">{weekDay}</p> 
                <div className="date">
                    <p className="day">{day}</p>
                    <p>{month}</p> 
                </div> 
            </div>
           
            <div className="task-hours">
                <p>{hours}</p>
                <FaGripLines color={color} className="line"/>
                </div>
                {taskSwitch && <p className="finished">{finished}</p>}
                <p className="task-name">{name}</p>
        </div>
        
        <div className="btn-task-container-wrap">
            <div className="task-btn-container">
                {!taskSwitch && <button onClick={()=>handleEdit(id)} className="task-btn"><AiFillEdit /></button>}
                <button onClick={()=> handleDelete(id)} className="task-btn"style={{color:taskSwitch && "#dfd0c1"}}><MdOutlineDelete  /></button>
            </div>
        </div>
    </div>
}

export default Task