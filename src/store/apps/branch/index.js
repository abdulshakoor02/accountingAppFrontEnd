// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchBranch = createAsyncThunk('appBranch/fetchBranch', async (params) => {
    
        let filter = JSON.stringify(params)
        const response = await axios.get(`/branch/find?filter=${filter}`)
        return response.data
  
  })

  export const createBranch = createAsyncThunk('appBranch/createBranch', async (params) => {
        const response = await axios.post('/branch/create',params)
        return response.data
  
  })

  export const updateBranch = createAsyncThunk('appBranch/updateBranch', async (params) => {
    const response = await axios.post('/branch/edit',params)
    return response.data
})

export const deleteBranch = createAsyncThunk('appBranch/deleteBranch', async (params) => {
  const response = await axios.post('/branch/delete',params)
  return response.data
})




export const appBranchSlice = createSlice({
  name: 'appBranch',
  initialState: {
    rows: [],
    total: 1,
    params: {},
    allData: [],
    count:0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBranch.fulfilled, (state, action) => {
      state.rows = action.payload.rows
      state.count = action.payload.count
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appBranchSlice.reducer
