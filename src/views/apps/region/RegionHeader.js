// ** React Imports
import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/MenuItem'
import { fetchRegion, createRegion } from 'src/store/apps/region/index.js'
import { fetchTax } from 'src/store/apps/tax/index.js'
import { fetchCurrency } from 'src/store/apps/currency/index.js'

import toast from 'react-hot-toast'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

const RegionHeader = props => {
  // ** Props
  const { value, handleFilter } = props

  const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState({
    region: ''
  })
    
  useEffect(() => {
    dispatch(fetchTax({}))
    dispatch(fetchCurrency({}))
  }, [])

  const { rows: tax, count: taxTotal } = useSelector(state => state.tax)
  const { rows: currency, count: currencyTotal } = useSelector(state => state.currency)
  // ** Hooks
  const handleDialogToggle = () => {
    setFormValues({})
    setOpen(!open)
  }

  const handleChange = e => {
    setFormValues(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const onSubmit = async () => {
    if(formValues.region =='' || typeof formValues.region =="undefined" || formValues.tax =='' || typeof formValues.tax =="undefined" || formValues.currency =='' || typeof formValues.currency =="undefined"){
      toast.error('Values cannot be empty')
      return
    }
    let r = await dispatch(createRegion({name:formValues.region,currencyId:formValues.currency,taxId:formValues.tax}))
    dispatch(fetchRegion({}))
    toast.success('Region Created')
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
          placeholder='Search region'
          onChange={e => handleFilter(e.target.value)}
        />
        <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
          Add Region
        </Button>
      </Box>
      <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
        <DialogTitle sx={{  mx: 'auto', textAlign: 'center' }}>
          <Typography variant='h4' component='span' sx={{ mb: 2 }}>
            Add New region
          </Typography>
          {/* <Typography variant='body2'>Permissions you may use and assign to your users.</Typography> */}
        </DialogTitle>
        <DialogContent sx={{ mx: 'auto' }}>
        <Box component='form' sx={{ mt: 8 }}>
        <FormGroup sx={{ mb: 2, alignItems: 'center', flexDirection: 'row', flexWrap: ['wrap', 'nowrap'] }}>
          
                <TextField
                  name='region'
                  value={formValues.region}
                  label='region'
                  onChange={handleChange}
                  placeholder='Enter region'
                  sx={{ mr: [0, 4], mb: [3, 0] }}
                />
              <TextField
                select
                name='tax'
                value={formValues?.tax}
                onChange={handleChange}
                label='Taxs'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                required
              >
                {tax.map((e, key) => {
                  return (
                    <MenuItem key={key + e.id} value={e.id}>
                      {e.amount}
                    </MenuItem>
                  )
                })}
              </TextField>
              <TextField
                select
                name='currency'
                value={formValues?.tax}
                onChange={handleChange}
                label='Currency'
                sx={{ mr: [0, 4], mb: [3, 0] }}
                required
              >
                {currency.map((e, key) => {
                  return (
                    <MenuItem key={key + e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  )
                })}
              </TextField>
              </FormGroup>
              </Box>
          <Box className='demo-space-x' sx={{ mx: 'auto', textAlign:'center' }}>
            <Button size='large' onClick={onSubmit} type='button' variant='contained'>
              Create Region
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleDialogToggle}>
              Discard
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RegionHeader
