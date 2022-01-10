import { useState, useEffect } from 'preact/hooks'
import { fetchNasaData, ApiResponse } from './api/nasa'
import Card from './components/Card'
import Loader from './components/Loader'
import Navigation from './components/Navigation'
import { useLocation } from 'react-router-dom'

export function App() {
  const { pathname } = useLocation()
  const home = pathname === '/'

  const [newFavourite, setNewFavourite] = useState(false)
  const [favourites, setFavourites] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [apiResults, setApiResults] = useState([])

  useEffect(() => {
    if (home) {
      fetchNasaData(setApiResults)
    }
  }, [home])

  useEffect(() => {
    if (apiResults.length !== 0) {
      setIsLoading(false)
    }
  }, [apiResults])

  useEffect(() => {
    if (localStorage.getItem('nasaFavorites')) {
      const localFavourites = JSON.parse(localStorage.getItem('nasaFavorites'))
      setFavourites(localFavourites)
    }
  }, [])

  const addToFavourite = (itemUrl: string) => {
    apiResults.forEach((item) => {
      if (item.url.includes(itemUrl) && !favourites[itemUrl]) {
        favourites[itemUrl] = item
        // Show Save Confirmation for 2 seconds
        setNewFavourite(true)
        setTimeout(() => {
          setNewFavourite(false)
        }, 2000)
        // Set Favorites in localStorage
        localStorage.setItem('nasaFavorites', JSON.stringify(favourites))
      }
    })
  }

  const removeFavorite = (itemUrl: string) => {
    if (favourites[itemUrl]) {
      delete favourites[itemUrl]
      // Set Favorites in localStorage
      localStorage.setItem('nasaFavorites', JSON.stringify(favourites))
      setFavourites({ ...favourites })
    }
  }

  if (home && isLoading) {
    return <Loader />
  }

  return (
    <>
      <div className="container">
        <Navigation homePage={home} />
        <div className="images-container">
          {pathname === '/favourites' &&
            Object.values(favourites).map((el: any) => (
              <Card
                hdurl={el['hdurl']}
                url={el['url']}
                title={el['title']}
                explanation={el['explanation']}
                date={el['date']}
                copyright={el['copyright']}
                onClick={removeFavorite}
                favourites={true}
              />
            ))}

          {pathname !== '/favourites' &&
            apiResults &&
            apiResults.map((el) => (
              <Card
                hdurl={el['hdurl']}
                url={el['url']}
                title={el['title']}
                explanation={el['explanation']}
                date={el['date']}
                copyright={el['copyright']}
                onClick={addToFavourite}
              />
            ))}
        </div>
      </div>
      {newFavourite && (
        <div className="save-confirmed">
          <h1>ADDED!</h1>
        </div>
      )}
    </>
  )
}
