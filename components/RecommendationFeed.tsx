'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../features/recommendation/recommendationSlice'
import { RootState, AppDispatch } from '../store/store'

export default function RecommendationFeed() {
  const dispatch = useDispatch<AppDispatch>()

  const { movies, loading } = useSelector(
    (state: RootState) => state.recommendations
  )

  const [favorites, setFavorites] = useState<number[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(f => f !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const filteredMovies = movies
    .filter((movie: any) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 10)

  return (
    <div id="recommendations" className="section">
      <h2>🎬 Recommended Movies</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '8px',
          marginBottom: '15px',
          width: '100%',
          border: 'none'
        }}
      />

      {loading && <p>Loading movies...</p>}

      <div
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          paddingBottom: '20px'
        }}
      >
        {filteredMovies.map((movie: any) => (
          <a
            key={movie.id}
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              minWidth: '250px'
            }}
          >
            <div
              className="card"
              style={{
                position: 'relative',
                borderRadius: '15px',
                overflow: 'hidden'
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover'
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  padding: '15px',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                }}
              >
                <h4 style={{ margin: 0 }}>{movie.title}</h4>
                <p style={{ fontSize: '13px', opacity: 0.8 }}>
                  ⭐ {movie.vote_average}
                </p>
              </div>

              {/* Favorite Button */}
              <span
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(movie.id)
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                {favorites.includes(movie.id) ? '❤️' : '🤍'}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}