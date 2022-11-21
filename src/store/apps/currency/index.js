// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchCurrency = createAsyncThunk('appCurrency/fetchCurrency', async (params) => {
    
        let filter = JSON.stringify(params)
        const response = await axios.get(`/currency/find?filter=${filter}`)
        return response.data
  
  })

  export const createCurrency = createAsyncThunk('appCurrency/createCurrency', async (params) => {
        const response = await axios.post('/currency/create',params)
        return response.data
  
  })

  export const updateCurrency = createAsyncThunk('appCurrency/updateCurrency', async (params) => {
    const response = await axios.post('/currency/edit',params)
    return response.data
})

export const deleteCurrency = createAsyncThunk('appCurrency/deleteCurrency', async (params) => {
  const response = await axios.post('/currency/delete',params)
  return response.data
})




export const appCurrencySlice = createSlice({
  name: 'appCurrency',
  initialState: {
    rows: [],
    total: 1,
    params: {},
    allData: [],
    count:0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrency.fulfilled, (state, action) => {
      state.rows = action.payload.rows
      state.count = action.payload.count
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appCurrencySlice.reducer
