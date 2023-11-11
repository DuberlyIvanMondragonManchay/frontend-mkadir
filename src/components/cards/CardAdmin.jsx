import { useNavigate } from "react-router-dom"


export default function CardAdmin(props){
    const navigateTo=useNavigate()
    const handleClick=()=> navigateTo(props.card_url)
    return (
        <div onClick={handleClick} className="bg-white dark:bg-gray-950 dark:text-white flex justify-center text-center flex-col w-full shadow-md cursor-pointer mt-2">
            {<props.card_icon style={{ color:"#307A59" }} className="text-4xl m-auto mt-2"/>}
            <p>{props.card_title}</p>
        </div>
    )
}