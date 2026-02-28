import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

/* ================= TYPES ================= */

interface Comment {
  id: number
  text: string
}

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  likes: number
  shares: number
  tags: string[]
  comments: Comment[]
}

interface SocialState {
  posts: Post[]
  loading: boolean
  error: string | null
}

/* ================= INITIAL STATE ================= */

const initialState: SocialState = {
  posts: [],
  loading: false,
  error: null
}

/* ================= FETCH POSTS (DummyJSON) ================= */

export const fetchPosts = createAsyncThunk(
  'social/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        'https://dummyjson.com/posts?limit=8'
      )

      return res.data.posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId,

        // ✅ FIXED HERE
        likes: post.reactions?.likes ?? 0,

        shares: Math.floor(Math.random() * 50),
        tags: post.tags || [],
        comments: []
      }))
    } catch (error) {
      return rejectWithValue('Failed to fetch posts')
    }
  }
)

/* ================= SLICE ================= */

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {

    /* LIKE */
    likePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload)
      if (post) post.likes += 1
    },

    /* SHARE */
    sharePost: (state, action: PayloadAction<number>) => {
      const post = state.posts.find(p => p.id === action.payload)
      if (post) post.shares += 1
    },

    /* ADD COMMENT */
    addComment: (
      state,
      action: PayloadAction<{ postId: number; text: string }>
    ) => {
      const post = state.posts.find(p => p.id === action.payload.postId)
      if (post) {
        post.comments.push({
          id: Date.now(),
          text: action.payload.text
        })
      }
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

/* ================= EXPORTS ================= */

export const { likePost, sharePost, addComment } = socialSlice.actions
export default socialSlice.reducer