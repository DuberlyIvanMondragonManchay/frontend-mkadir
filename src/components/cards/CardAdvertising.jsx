import video_register_menu from '../../videos/video_register_menu.mp4'

export default function CardAdvertising() {
  return (
    <div className='border p-4 mt-2 rounded-md shadow-md shadow-gray-300'> 
        <p className='mb-2 text-sm'>Registra tu menú para que otras personas lo vean!!</p>
        <video src={video_register_menu}
            autoplay="{true}" loop muted 
            className="w-full"> 
        </video> 
    </div> 
  )
}
