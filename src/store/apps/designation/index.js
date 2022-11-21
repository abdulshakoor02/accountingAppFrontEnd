// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchDesignation = createAsyncThunk('appDesignation/fetchDesignation', async (params) => {
    
        let filter = JSON.stringify(params)
        const response = await axios.get(`/designation/find?filter=${filter}`)
        return response.data
  
  })

  export const createDesignation = createAsyncThunk('appDesignation/createDesignation', async (params) => {
        const response = await axios.post('/designation/create',params)
        return response.data
  
  })

  export const updateDesignation = createAsyncThunk('appDesignation/updateDesignation', async (params) => {
    const response = await axios.post('/designation/edit',params)
    return response.data
})

export const deleteDesignation = createAsyncThunk('appDesignation/deleteDesignation', async (params) => {
  const response = await axios.post('/designation/delete',params)
  return response.data
})




export const appDesignationSlice = createSlice({
  name: 'appDesignation',
  initialState: {
    rows: [],
    total: 1,
    params: {},
    allData: [],
    count:0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDesignation.fulfilled, (state, action) => {
      state.rows = action.payload.rows
      state.count = action.payload.count
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appDesignationSlice.reducer
