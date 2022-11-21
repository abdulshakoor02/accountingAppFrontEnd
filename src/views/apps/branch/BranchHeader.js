// ** React Imports
import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import { fetchBranch, createBranch } from 'src/store/apps/branch/index.js'
import { fetchRegion } from 'src/store/apps/region/index.js'

import toast from 'react-hot-toast'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

const BranchHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState({
    branch: ''
  })
  useEffect(() => {
    dispatch(fetchRegion({}))
  }, [])
  // ** Hooks
  const { rows: region, count: regionTotal } = useSelector(state => state.region)

  const handleDialogToggle = () => {
    setOpen(!open)
  }

  const handleChange = e => {
    setFormValues(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const onSubmit = async () => {
    if (
      formValues.branch == '' ||
      typeof formValues.branch == 'undefined' ||
      formValues.region == '' ||
      typeof formValues.region == 'undefined' ||
      formValues.address == '' ||
      typeof formValues.address == 'undefined' ||
      formValues.url == '' ||
      typeof formValues.url == 'undefined' ||
      formValues.email == '' ||
      typeof formValues.email == 'undefined' ||
      formValues.mobile == '' ||
      typeof formValues.mobile == 'undefined'
    ) {
      toast.error('All fields are mandatory')
      return
    }
    await dispatch(
      createBranch({
        name: formValues.branch,
        regionId: formValues.region,
        address: formValues.address,
        url: formValues.url,
        email: formValues.email,
        mobile: formValues.mobile
      })
    )
    dispatch(fetchBranch({}))
    toast.success('Branch Created')
    setOpen(false)
  }

  return (
    <>
      <Box
        sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder='Search branch'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add Branch
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h4' component='span' sx={{ mb: 2 }}>
            Add New Branch
          </Typography>
          {/* <Typography variant='body2'>Permissions you may use and assign to your users.</Typography> */}
        </DialogTitle>
        <DialogContent sx={{ pb: 12, mx: 'auto' }}>
          <Box component='form' sx={{ mt: 4 }}>
            <FormGroup>
              <TextField
                name='branch'
                value={formValues.branch}
                label='branch'
                onChange={handleChange}
                placeholder='Enter Branch Name'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                select
                name='region'
                value={formValues?.region}
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
                value={formValues.address}
                label='Address'
                onChange={handleChange}
                placeholder='Enter Branch Address'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                name='url'
                value={formValues.url}
                label='URL'
                onChange={handleChange}
                placeholder='Enter Company URL'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                name='email'
                value={formValues.email}
                label='Email'
                onChange={handleChange}
                placeholder='Enter Email'
                sx={{ mr: [0, 4], mb: 3 }}
              />
              <TextField
                name='mobile'
                value={formValues.mobile}
                label='Contact Number'
                onChange={handleChange}
                placeholder='Enter Branch Contact number'
                sx={{ mr: [0, 4], mb: 3 }}
              />
            </FormGroup>
            <Box className='demo-space-x' sx={{ '&>:last-child': { mr: 0 } }}>
              <Button size='large' onClick={onSubmit} type='button' variant='contained'>
                Create Branch
              </Button>
              <Button size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
                Discard
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BranchHeader
