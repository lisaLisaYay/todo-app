import Task from "./Task";
import { useGlobalContext } from "./context";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { container, containerChildren } from "./background";
import moment from "moment";

const TaskList =()=>{
    const {taskList, setTaskList, setEditFlag, setEditName, setEditId} = useGlobalContext()

    const [taskSwitch, setTaskSwitch] = useState(false)
    const [shownList, setShownList] = useState([])

    const handleEdit = (id)=>{
        setEditId(id)
        let editim = taskList.find((item)=>item.id===id)
        setEditName(editim)
       setEditFlag(true)
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    }

    const handleDelete =(id)=>{
        let newTasklist = taskList.filter((item)=>item.id!==id)
        setTaskList(newTasklist)
        setEditFlag(false)

    }

    const handleClear =()=>{
        setEditFlag(false)
        setTaskList([])
        setTaskSwitch(false)
    }

    useEffect(()=>{
        const newTask = taskList.map((item)=>{
            if(new moment(item.date).format("YYYYMMDDHHmm")< new moment().format("YYYYMMDDHHmm")){
                return {...item, done:true}
            } else {
                return item
            }
        })
        setShownList(newTask.filter((item)=>{
            if(!taskSwitch){
                return !item.done
            } else {
                return item.done
            }
        }))
    },[taskSwitch, taskList])

    if(taskList && !taskList.length<=0){
        return <div className="tasklist">
                    <Filter/>
                    <div className="finished-btn-container">
                    <button className="finished-btn" onClick={()=>setTaskSwitch(!taskSwitch)}>{taskSwitch?"Finished:":"Unfinished:"}</button>
                    </div>
                    <AnimatePresence>
                        <motion.div variants={container} initial="hidden" animate="show"exit="hidden">
                            {shownList.map((item)=>{
                                return <motion.div  key={item.id}  variants={containerChildren}> <Task {...item} handleEdit={handleEdit}  handleDelete={ handleDelete} taskList={taskList} setTaskList={setTaskList}taskSwitch={taskSwitch}/></motion.div>
                            })}
                        </motion.div>
                    </AnimatePresence>
                    <button onClick={handleClear} className="clear-taslist-btn">Clear tasks</button>
               </div>    
    } 
}

export default TaskList