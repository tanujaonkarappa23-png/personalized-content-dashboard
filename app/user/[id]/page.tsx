'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function UserProfilePage() {
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      )
      const data = await res.json()
      setUser(data)
      setLoading(false)
    }

    fetchUser()
  }, [id])

  if (loading) return <p>Loading user...</p>

  return (
    <div className="section">
      <div className="card">
        <h2>👤 {user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Company:</strong> {user.company?.name}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>City:</strong> {user.address?.city}</p>
      </div>
    </div>
  )
}