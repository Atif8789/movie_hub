import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Movies from './components/Movies'
import WatchList from './components/WatchList'
import { MovieContext } from './components/MovieContext'
import MoodSelector from './components/MoodSelector'



function App() {
  const [count, setCount] = useState(0)
  const [watchlist,setWatchList] = useState([])
  
  console.log("watchlist ",watchlist)
  function isinWatchlist(favourite){
    // let checkexist = watchlist.some((movie)=>(movie.id === favourite.id))
    // we can also use some method like above line which returns true or false if condtion match
    // I'm using basic loop
    
    for(let i=0; i<watchlist.length;i++){
      if(watchlist[i].id === favourite.id){
        return true
      }
    }
    return false
  }


  function addwatchlistFn(favourite){ 
    let checkexist = watchlist.some((movie)=>(movie.id === favourite.id))
    if(!checkexist){
      let mylist = [...watchlist,favourite]
      setWatchList(mylist)
      localStorage.setItem('watchlist',JSON.stringify(mylist))
    }
  }

  function removewatchlistFn(favourite){
    let arraylist = watchlist.filter((movie)=> movie.id !== favourite.id)
    setWatchList(arraylist)
    localStorage.setItem('watchlist',JSON.stringify(arraylist))
  }

  useEffect(()=>{
    const data = localStorage.getItem('watchlist')
    setWatchList(JSON.parse(data)|| [])
  },[])
  
  return (
    <>
    <MovieContext.Provider value={{isinWatchlist,addwatchlistFn,removewatchlistFn,watchlist,setWatchList}}>
    <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Movies/>}/>
          <Route path='/watch' element={<WatchList/>}/>
          <Route path='/mood' element={<MoodSelector/>}/>
        </Routes>
    </BrowserRouter>
    </MovieContext.Provider>
    </>
  )
}

export default App
