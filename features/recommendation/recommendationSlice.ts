import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
}

interface RecommendationState {
  movies: Movie[]
  loading: boolean
}

const initialState: RecommendationState = {
  movies: [],
  loading: false
}

export const fetchMovies = createAsyncThunk(
  'recommendations/fetchMovies',
  async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
    return res.data.results
  }
)

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false
      state.movies = action.payload
    })
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false
    })
  }
})

export default recommendationSlice.reducer