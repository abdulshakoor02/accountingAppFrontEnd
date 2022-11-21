// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchRegion = createAsyncThunk('appRegion/fetchRegion', async (params) => {
    
        let filter = JSON.stringify(params)
        const response = await axios.get(`/region/find?filter=${filter}`)
        return response.data
  
  })

  export const createRegion = createAsyncThunk('appRegion/createRegion', async (params) => {
        const response = await axios.post('/region/create',params)
        return response.data
  
  })

  export const updateRegion = createAsyncThunk('appRegion/updateRegion', async (params) => {
    const response = await axios.post('/region/edit',params)
    return response.data
})

export const deleteRegion = createAsyncThunk('appRegion/deleteRegion', async (params) => {
  const response = await axios.post('/region/delete',params)
  return response.data
})




export const appRegionSlice = createSlice({
  name: 'appRegion',
  initialState: {
    rows: [],
    total: 1,
    params: {},
    allData: [],
    count:0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRegion.fulfilled, (state, action) => {
      state.rows = action.payload.rows
      state.count = action.payload.count
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appRegionSlice.reducer
