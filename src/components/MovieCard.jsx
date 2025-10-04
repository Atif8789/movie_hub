import React, { useContext, useState } from 'react'
import { MovieContext } from './MovieContext'
import { Link } from "react-router-dom";
import { getMovieVideos } from '../services/movieService.js';
import TrailerModal from './TrailerModal';

function MovieCard({moviename,movieurl,movie}) {
  
const{isinWatchlist,addwatchlistFn,removewatchlistFn} = useContext(MovieContext)
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const handleWatchTrailer = async (e) => {
    e.preventDefault(); // Prevent any parent click events
    e.stopPropagation();
    
    setLoadingTrailer(true);
    
    try {
      const videos = await getMovieVideos(movie.id);
      console.log("videos ",videos)
      
      if (videos.length > 0) {
        setTrailerKey(videos[0].key);
      } else {
        setTrailerKey(null);
      }
      
      setShowTrailer(true);
    } catch (error) {
      console.error('Error fetching trailer:', error);
      setTrailerKey(null);
      setShowTrailer(true);
    } finally {
      setLoadingTrailer(false);
    }
  };
  return (
    <>
        <div className='relative content-center h-[45vh] w-[200px] rounded-2xl bg-cover bg-center' style={{backgroundImage:`url(https://image.tmdb.org/t/p/original/${movieurl})`}}>
          {
            isinWatchlist(movie) ?
            (<div onClick={()=>removewatchlistFn(movie)} className='absolute top-2 left-4 w-10 rounded-4xl p-1 text-[1.3rem] bg-gray-800/50'>&#10060;</div>)
            :
            (<div onClick={()=>addwatchlistFn(movie)} className='absolute top-2 left-4 w-10 rounded-4xl p-1 text-[1.3rem] bg-gray-800/50'>&#128525;</div>)
          }

            <div className='text-[18px] text-white leading-6 px-5 py-2 bg-gray-800/50'>{moviename}</div>
            {/* Action Buttons Container */}
          <div className="absolute bottom-2 right-4 flex gap-2 mb-2">
          <Link to={`/details/${movie?.id}`}>
            <i className="fa-solid fa-circle-info text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2"></i>
          </Link>
          
          <button
            onClick={handleWatchTrailer}
            disabled={loadingTrailer}
            className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-1 flex items-center"
            title="Watch Trailer"
          >
            {loadingTrailer ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              "▶️"
            )}
          </button>
        </div>
      </div>  
         {/* Trailer Modal */}
      <TrailerModal
        isOpen={showTrailer}
        onClose={() => setShowTrailer(false)}
        trailerKey={trailerKey}
        movieTitle={movie?.title}
      />
      </>
  )
}

export default MovieCard
