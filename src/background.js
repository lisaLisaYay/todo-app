import moment from "moment";
//ANIMATION
export const container ={
    hidden:{
        transition: {
            staggerChildren:0.02,
            staggerDirection:-1
        }
    },
    show:{
        transition:{
            staggerChildren:0.04
        }
    }
};
export const containerChildren ={
    hidden:{
        opacity:0,
        scale:0.8,
        transition:{type:"spring", bounce:0.4}
    },
    show:{opacity:1, scale:1, transition:{type:"spring", bounce:0.04}}
};

// gets tommorow's date
const today = new Date()
const tomorrow = new Date (today)
tomorrow.setDate(today.getDate()+1)

export const day = moment().format("yyyy-MM-DDTHH:mm")

// sets initial values
export const initialValues = {
    id: "",
    name:"",
    date:moment(tomorrow).format("yyyy-MM-DDTHH:mm"),
    priority:"1",
    order:1,
    done: false,
    finished:"Time's run out"
}