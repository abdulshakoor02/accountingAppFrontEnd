// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from '../../axios'

// ** Role
export const fetchGeneric = createAsyncThunk('appGenericfetchGeneric', async (params) => {

    const response = await axios.post('/generic/find', params)

    return response.data

})

export const createGeneric = createAsyncThunk('appGeneric/createGeneric', async (params) => {
    console.log(params)
    const response = await axios.post('/generic/create', params)

    return response.data

})

export const updateGeneric = createAsyncThunk('appGeneric/updateGeneric', async (params) => {
    const response = await axios.post('/generic/edit', params)

    return response.data
})

export const deleteGeneric = createAsyncThunk('appGeneric/deleteGeneric', async (params) => {
    const response = await axios.post('/generic/delete', params)

    return response.data
})




export const appGenericSlice = createSlice({
    name: 'appGeneric',
    initialState: {
        rows: [],
        total: 1,
        params: {},
        allData: [],
        count: 0
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchGeneric.fulfilled, (state, action) => {
            state.rows = action.payload.rows
            state.count = action.payload.count
            state.params = action.payload.params
            state.allData = action.payload.allData
            state.total = action.payload.total
        })
    }
})

export default appGenericSlice.reducer
