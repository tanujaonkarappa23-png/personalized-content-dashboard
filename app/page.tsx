'use client'

import NewsFeed from '../components/NewsFeed'
import SocialFeed from '../components/SocialFeed'
import RecommendationFeed from '../components/RecommendationFeed'
import DashboardStats from '../components/DashboardStats'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

export default function Home() {
  const news = useSelector((state: RootState) => state.news.articles)

  return (
    <div className="container">
      <h1 className="title">📊 Personalized Content Dashboard</h1>

      <DashboardStats
        newsCount={news.length}
        socialCount={5}
      />

      <NewsFeed />
      <RecommendationFeed />
      <SocialFeed />
    </div>
  )
}