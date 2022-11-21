// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchRole = createAsyncThunk('appRole/fetchRole', async (params) => {
    if(typeof params=="undefined"){
        const response = await axios.get('/role/find')
        return response.data
    }
    else{
        let filter = JSON.stringify(params)
        const response = await axios.get(`/role/find?filter=${filter}`)
        return response.data
    }
  
  })

  export const createRole = createAsyncThunk('appRole/createRole', async (params) => {
        const response = await axios.post('/role/create',params)
        return response.data
  
  })

  export const updateRole = createAsyncThunk('appRole/createRole', async (params) => {
    const response = await axios.post('/role/create',params)
    return response.data
})


//Features
  export const fetchFeatures = createAsyncThunk('appRole/fetchRole', async (params) => {
    if(typeof params=="undefined"){
        const response = await axios.get('/features/find')
        return response.data
    }
    else{
        let filter = JSON.stringify(params)
        const response = await axios.get(`/features/find?filter=${filter}`)
        return response.data
    }
  
  })


  //Role Features

  export const fetchRoleFeatures = createAsyncThunk('appRole/fetchRoleFeatures', async (params) => {
    if(typeof params=="undefined"){
        const response = await axios.get('/roleFeatures/find')
        return response.data
    }
    else{
        let filter = JSON.stringify(params)
        const response = await axios.get(`/roleFeatures/find?filter=${filter}`)
        return response.data
    }
  
  })

  export const createRoleFeatures = createAsyncThunk('appRole/createRoleFeatures', async (params) => {
    const response = await axios.post('/roleFeatures/create',params)
    return response.data
})

export const deleteRoleFeatures = createAsyncThunk('appRole/deleteRoleFeatures', async (params) => {
  const response = await axios.post('/roleFeatures/delete',params)
  return response.data
})



export const appRoleSlice = createSlice({
  name: 'appRole',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.permissions
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appRoleSlice.reducer
