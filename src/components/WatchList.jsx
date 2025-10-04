import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { genreids } from "../utilities";
import { MovieContext } from "./MovieContext";

function WatchList() {

  const { watchlist,setWatchList,removewatchlistFn } = useContext(MovieContext)

  const[search,setSearch] = useState('')
  const[genrelist,setGenrelist] = useState([])
  const[currgenre,setCurrentgenre] = useState("All movies")
  
  useEffect(()=>{
    let data = watchlist.map((movie)=> genreids[movie.genre_ids[0]])
    setGenrelist(["All movies",...new Set(data)])
    
  },[watchlist])
  

  function ascendingRating(){
    let ascList = watchlist.sort((movieobjA,movieobjB)=>{
      return movieobjA.vote_average - movieobjB.vote_average
    })
    setWatchList([...ascList])
  }

  function descendingRating(){
    let descList = watchlist.sort((movieobjA,movieobjB)=>{
      return movieobjB.vote_average - movieobjA.vote_average
    })
    setWatchList([...descList])
  }

  return (
    <>
      <div className="flex flex-wrap justify-center mt-10">
        {
          genrelist.map((genre)=>(
            <button key={genre} onClick={()=>setCurrentgenre(genre)} className={currgenre===genre?"bg-blue-400 hover:bg-blue-400 text-white font-bold py-2 px-4 mr-6 mb-6 rounded":"bg-gray-300 hover:bg-blue-400 text-white font-bold py-2 px-4 mr-6 mb-6 rounded"}>
                {genre}
              </button>
          ))
        }
             
      </div>
      <div className="text-center mt-8">
        <input
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Movies"
          className="h-10 w-60 border-2 border-gray-500 bg-gray-200 px-4"
        />
      </div>
      <div className="m-8">
        <table className="w-full border-gray-400">
          <thead className="text-gray-600 text-[14px] bg-gray-300 ">
            <tr className="text-center">
              <th className="rounded-tl-[8px] py-2">POSTER</th>
              <th>NAME</th>
              <th><i onClick={ascendingRating} className="fa-solid fa-arrow-up"></i> RATINGS <i onClick={descendingRating} className="fa-solid fa-arrow-down"></i></th>
              <th>POPULARITY</th>
              <th>GENRE</th>
              <th className="rounded-tr-[8px]">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {
              watchlist && watchlist.filter((movie)=> {
                if(currgenre === 'All movies'){
                  return true
                }
                else{
                  return (genreids[movie.genre_ids[0]] === currgenre)
                }
              }) 
              .filter((movie)=> movie.title.toLowerCase().includes(search.toLowerCase()))
              .map((movie)=>(
                <tr className="text-center font-medium text-gray-600 border-gray-400 border-b-2" key={movie.id}>
                <td className='py-6'><img className='w-[120px] h-[160px] m-auto' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/></td>
                <td>{movie.original_title}</td>
                <td>{movie.vote_average}</td>
                <td>{movie.popularity}</td>
                <td>{genreids[movie.genre_ids[0]]} {genreids[movie.genre_ids[1]]}</td>
                <td onClick={()=>removewatchlistFn(movie)} className="text-red-600">Delete</td>
            </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;

// adult: false;
// backdrop_path: "/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg";
// genre_ids: (2)[(27, 9648)];
// id: 1078605;
// original_language: "en";
// original_title: "Weapons";
// overview: "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.";
// popularity: 355.6318;
// poster_path: "/cpf7vsRZ0MYRQcnLWteD5jK9ymT.jpg";
// release_date: "2025-08-04";
// title: "Weapons";
// video: false;
// vote_average: 7.392;
// vote_count: 1399;
