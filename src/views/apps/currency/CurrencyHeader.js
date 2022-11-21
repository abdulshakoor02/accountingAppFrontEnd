// ** React Imports
import { useState } from 'react'

import { useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
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
import toast from 'react-hot-toast'

import { createCurrency , fetchCurrency } from 'src/store/apps/currency/index.js'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

const CurrencyHeader = props => {
    // ** Props
    const { value, handleFilter } = props

  const dispatch = useDispatch()

  const fetchTableData =  async () => {
      let data = await dispatch(fetchCurrency({}))
    }

    // ** State
    const [open, setOpen] = useState(false)
    const [formValues, setFormValues] = useState({
        currency: '',
    })

    // ** Hooks

    const handleDialogToggle = () => {
        setFormValues({})
        setOpen(!open)
    }

    const handleChange = (e) => {
        setFormValues((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
    }

    const onSubmit = async() => {
        if (formValues.currency=='') { toast.error('Vat cannot be empty'); return }
        let c = await dispatch(createCurrency({name:formValues.currency}))
        toast.success('Currency created');
        setFormValues({})
        fetchTableData()
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
                    placeholder='Search currency'
                    onChange={e => handleFilter(e.target.value)}
                />
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
                    Add currency
                </Button>
            </Box>
            <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
                <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
                    <Typography variant='h4' component='span' sx={{ mb: 2 }}>
                        Add New currency
                    </Typography>
                    {/* <Typography variant='body2'>Permissions you may use and assign to your users.</Typography> */}
                </DialogTitle>
                <DialogContent sx={{ pb: 12, mx: 'auto' }}>
                    <Box component='form' sx={{ mt: 4 }} >
                        <FormGroup sx={{ mb: 1 }}>

                            <TextField
                                fullWidth
                                name="currency"
                                value={formValues.currency}
                                label='currency'
                                onChange={handleChange}
                                placeholder='Enter currency'
                            />
                            
                        </FormGroup>
                        <Box className='demo-space-x' sx={{ '&>:last-child': { mr: 0 } }}>
                            <Button size='large' onClick={onSubmit} type='button' variant='contained'>
                                Create Currency
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

export default CurrencyHeader
