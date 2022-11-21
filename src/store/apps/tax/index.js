// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchTax = createAsyncThunk('appTax/fetchTax', async (params) => {
    
        let filter = JSON.stringify(params)
        const response = await axios.get(`/tax/find?filter=${filter}`)
        return response.data
  
  })

  export const createTax = createAsyncThunk('appTax/createTax', async (params) => {
        const response = await axios.post('/tax/create',params)
        return response.data
  
  })

  export const updateTax = createAsyncThunk('appTax/updateTax', async (params) => {
    const response = await axios.post('/tax/edit',params)
    return response.data
})

export const deleteTax = createAsyncThunk('appTax/updateTax', async (params) => {
  const response = await axios.post('/tax/update',params)
  return response.data
})




export const appVatSlice = createSlice({
  name: 'appVat',
  initialState: {
    rows: [],
    total: 1,
    params: {},
    allData: [],
    count:0
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTax.fulfilled, (state, action) => {
      state.rows = action.payload.rows,
      state.count = action.payload.count,
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.total
    })
  }
})

export default appVatSlice.reducer
