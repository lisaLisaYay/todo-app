import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { priorityColors } from "./priorityColors";

const PriorityComponent =({handleInput, priority })=>{

    const [hover, setHover] = useState(0)
    const [rating, setRating] = useState(0)
    useEffect(()=>{
        setHover(priority)
    },[priority])

    return (
        <div className="task-add">
            <p className="pr">Priority:</p>
            <div className="priority-input">
                {priorityColors.map((item)=>{
                    return <label key={item.value}>
                        <input type="radio" name="priority" value={item.value} onClick={handleInput} />
                        <FaCircle 
                        onClick={()=>setRating(item.value)}
                        color={item.value <=(hover || rating)?item.color:"#dfd0c1"} 
                        onMouseEnter={()=>setHover(item.value)}
                        onMouseLeave={()=>setHover(rating)}
                        className="circle"/>
                    </label>
                })}
            </div>
        
    </div>
    )
}

export default PriorityComponent