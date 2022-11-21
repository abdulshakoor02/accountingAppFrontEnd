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
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import toast from 'react-hot-toast'
import FormControlLabel from '@mui/material/FormControlLabel'

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
import BranchHeader from 'src/views/apps/branch/BranchHeader'

// ** Actions Imports
import { fetchData } from 'src/store/apps/permissions'
import { fetchRegion } from 'src/store/apps/region/index.js'
import { fetchBranch } from 'src/store/apps/branch/index.js'
import { updateBranch } from './../../../store/apps/branch/index'

const colors = {
  support: 'info',
  users: 'success',
  manager: 'warning',
  administrator: 'primary',
  'restricted-user': 'error'
}

const Branch = props => {
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
  console.log(props)
  const dispatch = useDispatch()
  const { rows, count } = useSelector(state => state.branch)
  const { rows: region, count: regionTotal } = useSelector(state => state.region)

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
      field: 'region',
      minWidth: 240,
      headerName: 'Region',
      renderCell: ({ row }) => <Typography>{row.region.name}</Typography>
    },
    {
      flex: 0.25,
      field: 'mobile',
      minWidth: 240,
      headerName: 'Contact',
      renderCell: ({ row }) => <Typography>{row.mobile}</Typography>
    },
    {
      flex: 0.25,
      field: 'email',
      minWidth: 240,
      headerName: 'Email',
      renderCell: ({ row }) => <Typography>{row.email}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 215,
      field: 'createdDate',
      headerName: 'Created Date',
      renderCell: ({ row }) => <Typography>{row.createdAt}</Typography>
    }
  ]

  const fetchTableData = async (sort, column) => {
    let q = {}
    if (value == '') {
      q = {
        offset: page * pageSize,
        limit: pageSize
      }
    } else {
      q = {
        where: {
          name: value
        },
        offset: page * pageSize,
        limit: pageSize
      }
    }
    let data = await dispatch(fetchBranch(q))
  }

  useEffect(() => {
    fetchTableData(sort, sortColumn)
    dispatch(fetchRegion({}))
  }, [value, page, pageSize])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handleEditPermission = row => {
    setformValue({
      branch: row.name,
      region: row.region.id,
      address: row.address,
      url: row.url,
      mobile: row.mobile,
      email: row.email,
      id: row.id
    })
    setEditDialogOpen(true)
  }

  const handleDialogToggle = () => {
    setformValue({})
    setEditDialogOpen(!editDialogOpen)
  }

  const handleChange = e => {
    setformValue(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const onSubmit = async () => {
    await dispatch(
      updateBranch({
        name: formValue.branch,
        regionId: formValue.region,
        address: formValue.address,
        url: formValue.url,
        mobile: formValue.mobile,
        email: formValue.email,
        id: formValue.id
      })
    )
    toast.success('Branch Updated')
    fetchTableData(sort, sortColumn)
    setEditDialogOpen(false)
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
          <IconButton onClick={() => handleEditPermission(row)}>
            <PencilOutline fontSize='small' />
          </IconButton>
          <IconButton>
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
            title={<Typography variant='h5'>Branch List</Typography>}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <BranchHeader value={value} handleFilter={handleFilter} />

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
            Edit Branch
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ mx: 'auto' }}>
          <Box component='form' sx={{ mt: 4 }}>
            <FormGroup>
              <TextField
                name='branch'
                value={formValue.branch}
                label='branch'
                onChange={handleChange}
                placeholder='Enter Branch Name'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                select
                name='region'
                value={formValue?.region}
                onChange={handleChange}
                label='Region'
                sx={{ mr: [0, 4], mb: 3 }}
                required
              >
                {region.map((e, key) => {
                  return (
                    <MenuItem key={key + e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  )
                })}
              </TextField>
              <TextField
                name='address'
                multiline={true}
                value={formValue.address}
                label='Address'
                onChange={handleChange}
                placeholder='Enter Branch Address'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                name='url'
                value={formValue.url}
                label='URL'
                onChange={handleChange}
                placeholder='Enter Company URL'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                name='email'
                value={formValue.email}
                label='Email'
                onChange={handleChange}
                placeholder='Enter Email'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                name='mobile'
                value={formValue.mobile}
                label='Contact Number'
                onChange={handleChange}
                placeholder='Enter Branch Contact number'
                sx={{ mr: [0, 4], mb: 3 }}
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

export default Branch
