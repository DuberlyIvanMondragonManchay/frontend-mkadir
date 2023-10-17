import { Link } from "react-router-dom"


export default function CardAdmin(props){
    return (
        <Link to={`/admin/${props.to_url}`} className="flex justify-center text-center flex-col w-full shadow-md cursor-pointer mt-2">
            <img className="m-auto" style={{width:"50px",height:"50px"}} src={props.car_img} alt={`image logo` + props.card_title} />
            <p>{props.card_title}</p>
        </Link>
    )
}