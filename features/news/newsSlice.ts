
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (category: string) => {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=3868ecd7274e46628738f5d2f83eccff`
    )
    return res.data.articles
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.loading = false
      state.articles = action.payload
    })
    builder.addCase(fetchNews.rejected, (state) => {
      state.loading = false
    })
  }
})

export default newsSlice.reducer
