import React, { useState } from "react";
import { useGlobalContext } from "./context";
import moment from "moment";

const value = {time: false,priority:false,order: false}

const Filter =()=>{

    const {taskList, setTaskList} = useGlobalContext()

    const [color, setColor] =useState(value)
    const [flip, setFlip] = useState(value)

    const  reverseArr = (sortedArr, flipFlag)=>{
        if (flipFlag) {
            const flipparr = sortedArr.reverse()
            setTaskList(flipparr)
        } else {
            setTaskList(sortedArr)
        }
    }

    const handleTime=()=>{
        setFlip({...flip, time:!flip.time})
        const sortedArray  = taskList.sort((prev, next) => new moment(prev.date).format("YYYYMMDDHHmm") - new moment(next.date).format("YYYYMMDDHHmm")).map((item)=>item)
        reverseArr(sortedArray, flip.time)
        setColor({time: true,priority:false,order: false})
    }

    const hanslePriority =()=>{
        setFlip({...flip, priority:!flip.priority})
        const sortedPri = taskList.sort((prev, next)=> prev.priority - next.priority).map((item)=>item)
        reverseArr(sortedPri, flip.priority)
        setColor({time: false,priority:true,order: false})
    }

    const handleOrder = ()=>{
        setFlip({...flip, order:!flip.order})
        const sortOrder = taskList.sort((prev, next) => prev.order - next.order).map((item)=>item)
        reverseArr(sortOrder, flip.order)
        setColor({time: false,priority:false,order: true})
    }

    return <div className="filter">
        <p className="pr">Filter by:</p>
        <div className="filter-btn-cintainer">
            <button onClick={handleTime} className="filter-btn" style={{backgroundColor: color.time?"#ce5854":"#857973"}}>Due</button>
            <button onClick={hanslePriority} className="filter-btn" style={{backgroundColor: color.priority?"#ce5854":"#857973"}} >Priority</button>
            <button onClick={handleOrder} className="filter-btn" style={{backgroundColor: color.order?"#ce5854":"#857973"}} >Added</button>
        </div>
    </div>
}

export default Filter