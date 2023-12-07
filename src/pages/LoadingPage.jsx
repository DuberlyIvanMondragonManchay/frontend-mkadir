import React from 'react'
import SpinerComponent from '../components/SpinerComponent'

export default function LoadingPage() {
  return (
    <div className='flex mt-24'>
        <div className='m-auto text-center'>
            <SpinerComponent/>
        </div>
    </div>
  )
}
