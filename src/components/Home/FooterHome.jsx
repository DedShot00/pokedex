import React from 'react'

const FooterHome = () => {
  return (
    <section className='relative'>
      <div className=' w-screen bg-red-700 h-16'></div>
      <div className=' h-12 bg-black'></div>
      <div className='h-20 aspect-square bg-white border-[10px] border-black rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 '>
        <div className=' h-10 aspect-square  border-[8px] bg-gray-900 border-black rounded-full absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 '></div>
      </div>
    </section>
  )
}

export default FooterHome