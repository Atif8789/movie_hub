import React from 'react'

function Pagination({incrementPage,decrementPage,page}) {
  return (
    <div className='w-full bg-gray-800/50 py-5 flex justify-center'>
      <div onClick={decrementPage} className='cursor-pointer'><i className="fa-solid fa-arrow-left"></i></div>
      <div className='px-6'>{page}</div>
      <div onClick={incrementPage} className='cursor-pointer'><i className="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default Pagination
