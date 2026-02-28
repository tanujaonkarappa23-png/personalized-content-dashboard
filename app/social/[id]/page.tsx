'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
  }, [id])

  if (!post) return <p>Loading...</p>

  return (
    <div className="section">
      <div className="card">
        <img
          src={`https://i.pravatar.cc/150?img=${post.userId}`}
          style={{ width: '60px', borderRadius: '50%' }}
        />
        <h3>User {post.userId}</h3>
        <p style={{ marginTop: '15px' }}>{post.body}</p>
      </div>

      <h3 style={{ marginTop: '30px' }}>💬 Comments</h3>

      {comments.map(comment => (
        <div key={comment.id} className="card">
          <strong>{comment.email}</strong>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  )
}