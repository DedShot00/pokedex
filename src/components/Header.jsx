import React from 'react'
import { useDispatch } from 'react-redux'
import { setTrainerName } from '../store/slices/trainerName.slice'

const Header = () => {
  const dispatch = useDispatch()
  
  const logOut = () => { 
    dispatch(setTrainerName(''))
  
  }
  return (
    <section className='relative'>
      <div className=' w-full pl-3 bg-red-700 h-16 flex items-end '>
        <img className='max-h-full max-w-[70%]' src="/images/pokedex.png" alt="" />
      </div>
      <div className=' h-10 bg-black relative'>
        <div className='h-20 aspect-square bg-white border-[10px] border-black rounded-full absolute bottom-1/2 translate-y-1/2 right-2'>
          <div className=' h-10 aspect-square  border-[8px] bg-gray-900 border-black rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 '>
            <span onClick={logOut} className='text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>X</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header