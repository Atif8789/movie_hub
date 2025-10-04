import React from 'react'

function Banner() {
  return (
    <div className='flex justify-center items-end h-[70vh] w-full bg-cover bg-center' style={{backgroundImage:`url(https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg)`}}>
      <div className='mb-5 text-2xl text-white font-semibold'>Movie Title Goes here</div>
    </div>
  )
}

export default Banner
