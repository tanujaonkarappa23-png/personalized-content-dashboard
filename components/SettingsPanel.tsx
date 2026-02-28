'use client'
import { useDispatch, useSelector } from 'react-redux'
import { setCategories } from '../features/preferences/preferencesSlice'
import { RootState } from '../store/store'

export default function SettingsPanel() {
  const dispatch = useDispatch()
  const selectedCategory = useSelector(
    (state: RootState) => state.preferences.categories[0]
  )

  const handleChange = (category: string) => {
    dispatch(setCategories([category]))
  }

  const categories = ["technology", "sports", "business"]

  return (
    <div className="section">
      <h2>⚙ Preferences</h2>

      {categories.map((category) => (
        <button
          key={category}
          className="button"
          onClick={() => handleChange(category)}
          style={{
            background:
              selectedCategory === category
                ? "linear-gradient(90deg, #8b5cf6, #06b6d4)"
                : "#1e293b"
          }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  )
}