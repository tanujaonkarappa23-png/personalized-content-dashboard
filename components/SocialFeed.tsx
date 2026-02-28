'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, likePost } from '../features/social/socialSlice'
import { RootState, AppDispatch } from '../store/store'
import Link from 'next/link'

export default function SocialFeed() {
  const dispatch = useDispatch<AppDispatch>()
  const { posts, loading } = useSelector(
    (state: RootState) => state.social
  )

  const [search, setSearch] = useState('')
  const [activeStory, setActiveStory] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const filteredPosts = posts.filter((post: any) =>
    post.body.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="section">
      <h2>📸 Social Feed</h2>

      {/* ================= STORIES ================= */}
      <h3 style={{ marginTop: '20px' }}>🔥 Stories</h3>

      <div
        style={{
          display: 'flex',
          gap: '15px',
          overflowX: 'auto',
          marginBottom: '25px'
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div
            key={id}
            onClick={() => setActiveStory(id)}
            style={{
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <img
              src={`https://i.pravatar.cc/100?img=${id}`}
              style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                border: '3px solid #22d3ee'
              }}
            />
            <p style={{ fontSize: '12px' }}>user{id}</p>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {activeStory && (
        <div
          onClick={() => setActiveStory(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#1e293b',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
              maxWidth: '350px'
            }}
          >
            <img
              src={`https://picsum.photos/400/600?random=${activeStory}`}
              style={{
                width: '100%',
                borderRadius: '10px'
              }}
            />
            <h4 style={{ marginTop: '10px' }}>
              Story from user{activeStory}
            </h4>
            <button
              onClick={() => setActiveStory(null)}
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                borderRadius: '10px',
                border: 'none',
                background: '#22d3ee',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px',
          width: '100%',
          border: 'none'
        }}
      />

      {loading && <p>Loading feed...</p>}

      {/* ================= POSTS ================= */}
      {filteredPosts.map((post: any) => (
        <div key={post.id} className="card">

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={`https://i.pravatar.cc/150?img=${post.userId}`}
              style={{ width: '40px', borderRadius: '50%' }}
            />
            <Link
              href={`/user/${post.userId}`}
              style={{ textDecoration: 'none', color: '#22d3ee' }}
            >
              <strong>User {post.userId}</strong>
            </Link>
          </div>

          {/* Medium Image */}
          <img
            src={`https://picsum.photos/600/400?random=${post.id}`}
            style={{
              width: '100%',
              maxHeight: '350px',
              objectFit: 'cover',
              marginTop: '10px',
              borderRadius: '10px'
            }}
          />

          {/* Caption */}
          <Link
            href={`/social/${post.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <p style={{ marginTop: '10px' }}>{post.body}</p>
          </Link>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginTop: '10px'
            }}
          >
            <button
              onClick={() => dispatch(likePost(post.id))}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer'
              }}
            >
              ❤️ {post.likes}
            </button>

            <span>💬 Comment</span>
            <span>🔁 Share</span>
          </div>

          <CommentBox />
        </div>
      ))}
    </div>
  )
}

/* ================= COMMENT COMPONENT ================= */
function CommentBox() {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])

  const addComment = () => {
    if (!comment.trim()) return
    setComments([...comments, comment])
    setComment('')
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        style={{
          padding: '6px',
          borderRadius: '6px',
          width: '70%',
          border: 'none'
        }}
      />
      <button
        onClick={addComment}
        style={{
          marginLeft: '5px',
          padding: '6px 10px',
          borderRadius: '6px',
          border: 'none',
          background: '#22d3ee'
        }}
      >
        Post
      </button>

      {comments.map((c, i) => (
        <p key={i} style={{ fontSize: '13px', opacity: 0.8 }}>
          💬 {c}
        </p>
      ))}
    </div>
  )
}