'use client'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import StatsCard from './StatsCard'

interface Props {
  newsCount: number
  socialCount: number
}

export default function DashboardStats({ newsCount, socialCount }: Props) {
  const likes = useSelector(
    (state: RootState) => state.social.notifications
  )

  const activeCategory = useSelector(
    (state: RootState) => state.preferences.categories[0]
  )

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        marginBottom: '40px'
      }}
    >
      <StatsCard
        title="News Articles"
        value={newsCount}
        icon="📰"
        targetId="news"
      />

      <StatsCard
        title="Social Posts"
        value={socialCount}
        icon="💬"
        targetId="social"
      />

      <StatsCard
        title="Total Likes"
        value={likes}
        icon="❤️"
        targetId="social"
      />

      <StatsCard
        title="Recommendations"
        value="Explore"
        icon="🎬"
        targetId="recommendations"
      />
    </div>
  )
}