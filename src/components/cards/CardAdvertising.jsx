import video_register_menu from '../../videos/video_register_menu.mp4'

export default function CardAdvertising() {
  return (
    <div className='p-4 mt-2 rounded-md dark:text-white'> 
        <p className='mb-2 text-sm'>Registra tu menú para que otras personas lo vean!!</p>
        <video src={video_register_menu}
            autoPlay="{true}" loop muted 
            className="w-full"> 
        </video> 
    </div> 
  )
}
