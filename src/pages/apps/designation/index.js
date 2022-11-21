// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { DataGrid } from '@mui/x-data-grid'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import toast from 'react-hot-toast'


// ** Icons Imports
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import PageHeader from 'src/@core/components/page-header'
import DesignationHeader from 'src/views/apps/currency/CurrencyHeader'

// ** Actions Imports
import { fetchData } from 'src/store/apps/permissions'
import { fetchCurrency , updateCurrency , deleteCurrency } from 'src/store/apps/currency/index.js'

const colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const defaultColumns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 240,
    headerName: 'Name',
    renderCell: ({ row }) => <Typography>{row.name}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 215,
    field: 'createdDate',
    headerName: 'Created Date',
    renderCell: ({ row }) => <Typography>{row.createdAt}</Typography>
  }
]

const Designation = () => {
  // ** State
  const [value, setValue] = useState('')
  const [formValue, setformValue] = useState({})
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [sortColumn, setSortColumn] = useState('')
  const [sort, setSort] = useState('asc')
  const [pageSize, setPageSize] = useState(10)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // ** Hooks

  const dispatch = useDispatch()
  const {rows,count} = useSelector(state => state.currency)


  const fetchTableData =  async (sort, column ) => {
    let q = {}
    if(value==""){
       q={
        offset:page*pageSize,
        limit:pageSize
      }
    }
    else{
       q={
        where:{
          name:value
        },
        offset:page*pageSize,
        limit:pageSize
      }
    }
      let data = await dispatch(fetchCurrency(q))
    }

    useEffect(()=>{
      fetchTableData(sort,sortColumn)
    },[value,page,pageSize])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleEditPermission = (name,id) => {
    setformValue({ currency: name ,id})
    setEditDialogOpen(true)
  }
  const handleDialogToggle = () => setEditDialogOpen(!editDialogOpen)

  const handleChange = e => {
    setformValue(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const onSubmit = async () => {
    setEditDialogOpen(false)
    await dispatch(updateCurrency({name:formValue.currency,id:formValue.id}))
    fetchTableData()
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.15,
      minWidth: 115,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => handleEditPermission(row.name,row.id)}>
            <PencilOutline fontSize='small' />
          </IconButton>
          <IconButton onClick={async ()=>{
            await dispatch(deleteCurrency({name:row.name}))
            toast.success('currency deleted')
            fetchTableData()
          }}>
            <DeleteOutline fontSize='small' />
          </IconButton>
        </Box>
      )
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <PageHeader
            title={<Typography variant='h5'>Currency List</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <DesignationHeader value={value} handleFilter={handleFilter} />

             {/* onSortModelChange={handleSortModel} */}

            <DataGrid
              autoHeight
              pagination
              rowCount={count}
              rows={rows}
              columns={columns}
              pageSize={pageSize}
              paginationMode='server'
              disableSelectionOnClick
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={newPage => setPage(newPage)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
      <Dialog maxWidth='sm' fullWidth onClose={handleDialogToggle} open={editDialogOpen}>
        <DialogTitle sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h4' component='span' sx={{ mb: 2 }}>
            Edit Currency
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mx: 'auto' }}>
          <Box component='form' sx={{ mt: 8 }}>
            <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
              <TextField
                fullWidth
                size='small'
                name='currency'
                value={formValue.currency}
                label='Currency'
                onChange={handleChange}
                placeholder='Enter Permission Name'
                sx={{ mr: [0, 4], mb: [3, 0] }}
              />

              <Button type='button' onClick={onSubmit} variant='contained'>
                Update
              </Button>
            </FormGroup>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Designation
