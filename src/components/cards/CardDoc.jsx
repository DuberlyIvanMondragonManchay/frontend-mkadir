import React from 'react'

export default function CardDoc(props) {
  return (
  <div className='flex flex-row justify-center mt-2 border border-red-600 w-full'>
    <div className='rounded-l-lg border pt-3 pb-3 bg-teal-600 text-white px-2 flex items-center '>{props.cardIcon}</div>
    <div className='text-start rounded-r-lg pt-3 pb-3 px-2 bg-teal-600 text-white'>
      <p className='font-bold text-md'>{props.cardTitle}</p>
      <p className='bg-white text-teal-600 rounded p-1'>{props.cardText}</p>
    </div>
  </div>
  )
}
