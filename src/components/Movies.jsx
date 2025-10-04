import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import MovieCard from './MovieCard'
import axios from 'axios'
import Pagination from './Pagination'
import WatchList from './WatchList'

function Movies() {
const[movies,setMovies] = useState([])
const[page,setPage] = useState(1)
const[totalPages,setTotalpages] = useState('')

useEffect(()=>{
  async function fetchmovies(){
    const response = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=499ae7fc5c454537ed9a874c393d856c&language=en-US&page=${page}`)
    setMovies(response.data.results)
    setTotalpages(response.data.total_pages)
  }
  fetchmovies()
},[page])

// console.log(movies)
// console.log(totalPages)

function incrementPage(){
  if(page<totalPages){
    setPage(page+1)
  }
}

function decrementPage(){
  if(page>1){
    setPage(page-1)
  }
}

  return (
    <>
       <Banner/>
       <div className='w-full p-8 text-center'>
          <div className='text-2xl font-semibold'>Trending Movies</div>
          <div className='mt-10 flex flex-wrap justify-evenly gap-x-8 gap-y-12'>
            {
              movies && movies.map((movie)=> 
                (<MovieCard key={movie.id} moviename={movie.original_title} movieurl={movie.poster_path} movie={movie}/>)
              )
            }
          </div>
        </div>
        <Pagination incrementPage={incrementPage} decrementPage={decrementPage} page={page}/>
      </>
  )
}

export default Movies
