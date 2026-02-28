import { configureStore } from '@reduxjs/toolkit'
import newsReducer from '../features/news/newsSlice'
import preferencesReducer from '../features/preferences/preferencesSlice'
import socialReducer from '../features/social/socialSlice'
import recommendationReducer from '../features/recommendation/recommendationSlice'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    preferences: preferencesReducer,
    social: socialReducer,
    recommendations: recommendationReducer   // ADD THIS
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch