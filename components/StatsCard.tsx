'use client'

interface StatsCardProps {
  title: string
  value: string | number
  icon: string
  targetId?: string
}

export default function StatsCard({
  title,
  value,
  icon,
  targetId
}: StatsCardProps) {

  const handleClick = () => {
    if (!targetId) return

    const section = document.getElementById(targetId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      onClick={handleClick}
      style={{
        background: '#d6dce5',
        padding: '20px',
        borderRadius: '15px',
        minWidth: '200px',
        flex: 1,
        cursor: 'pointer',
        transition: '0.3s',
        boxShadow: '0 5px 15px rgba(224, 214, 214, 0.2)'
      }}
    >
      <h4 style={{ margin: 0, opacity: 0.7 }}>{title}</h4>
      <h2 style={{ margin: '10px 0' }}>
        {icon} {value}
      </h2>
    </div>
  )
}