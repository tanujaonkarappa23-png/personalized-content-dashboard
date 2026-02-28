'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../features/news/newsSlice'
import { RootState, AppDispatch } from '../store/store'

export default function NewsFeed() {
  const dispatch = useDispatch<AppDispatch>()

  const { articles, loading } = useSelector(
    (state: RootState) => state.news
  )

  const categories = useSelector(
    (state: RootState) => state.preferences.categories
  )

  useEffect(() => {
    if (categories && categories.length > 0) {
      dispatch(fetchNews(categories[0]))
    }
  }, [dispatch, categories])

  return (
    <div id="news" className="section">
      <h2>📰 Latest News</h2>

      {loading && <p>Loading...</p>}

      {!loading && articles.length === 0 && (
        <p>No articles found.</p>
      )}

      <div className="news-grid">
        {articles.map((a: any, i: number) => (
          <div key={i} className="card">

            {/* News Image */}
            {a.urlToImage && (
              <img
                src={a.urlToImage}
                alt={a.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              />
            )}

            <h4>{a.title}</h4>

            <p style={{ fontSize: "14px", opacity: 0.8 }}>
              {a.description}
            </p>

            {a.url && (
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#22d3ee", fontWeight: "bold" }}
              >
                Read More →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}