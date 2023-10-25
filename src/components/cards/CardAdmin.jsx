import { useNavigate } from "react-router-dom"


export default function CardAdmin(props){
    const navigateTo=useNavigate()
    const handleClick=()=> navigateTo(props.card_url)
    return (
        <div onClick={handleClick} className="flex justify-center text-center flex-col w-full shadow-md cursor-pointer mt-2">
            <img className="m-auto" style={{width:"50px",height:"50px"}} src={props.card_img} alt={`image logo` + props.card_title} />
            <p>{props.card_title}</p>
        </div>
    )
}