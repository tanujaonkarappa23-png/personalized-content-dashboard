'use client'

import { Provider } from 'react-redux'
import { store } from '../store/store'
import { useState } from 'react'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const [dark, setDark] = useState(true)

  return (
    <Provider store={store}>
      <div className={dark ? 'dark' : 'light'} style={{ minHeight: '100vh', padding: '20px' }}>
        <button
          onClick={() => setDark(!dark)}
          style={{
            marginBottom: '20px',
            padding: '8px 15px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          {dark ? '🌙 Dark Mode' : '☀ Light Mode'}
        </button>

        {children}
      </div>
    </Provider>
  )
}