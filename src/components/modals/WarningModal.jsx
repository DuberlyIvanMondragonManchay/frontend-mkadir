import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function WarningModal(props) {
    const [isVisible,setIsVisible] = useState(false)
    const navigateTo = useNavigate()
    const handleFunction=()=>{
        props.handleFunctionModal()
        if(props.navigateToModal){
            return navigateTo(props.navigateToModal)
        }else{
            setIsVisible(false)
        }
    }
  return (
    <div>
      <button onClick={()=>setIsVisible(!isVisible)} className="block text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
       {props.titleButtonModal}
      </button>

      <div className={`${isVisible?"flex bg-gray-400/50":"hidden"} fixed inset-0 items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
          <div className="relative w-full max-w-md max-h-full">
              <div className="bg-white rounded-lg shadow dark:bg-gray-700">

                <div className="flex justify-between border">
                    <div>{props.textHeaderComponent}</div>
                    <button onClick={() => setIsVisible(!isVisible)} type="button" className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md w-10 h-10 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>

                  <div className="p-6 text-center">

                      {/*------- Modal component------ */}
                      {props.textModalComponent}
                      {/*------- Modal component------ */}
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

