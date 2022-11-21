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
import { fetchVat , createTax , updateVat , deleteVat } from 'src/store/apps/tax/index.js'


// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

const TaxHeader = props => {
    // ** Props
    const { value, handleFilter } = props

  const dispatch = useDispatch()

    // ** State
    const [open, setOpen] = useState(false)
    const [formValues, setFormValues] = useState({
        vat: ''
    })

    // ** Hooks
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { name: '' } })

    const handleDialogToggle = () => {
        setOpen(!open)
    }

    const handleChange = (e) => {
        setFormValues((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
    }

    const onSubmit = async() => {
        if (isNaN(formValues.vat)) { toast.error('Vat can only be a number'); return }
        if (formValues.vat=='') { toast.error('Vat cannot be empty'); return }
        let tax = await dispatch(createTax({amount:formValues.vat}))
        toast.success('Tax created');
        setOpen(false)
        return
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
                    placeholder='Search Tax'
                    onChange={e => handleFilter(e.target.value)}
                />
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleDialogToggle}>
                    Add Tax
                </Button>
            </Box>
            <Dialog fullWidth maxWidth='sm' onClose={handleDialogToggle} open={open}>
                <DialogTitle sx={{ pt: 12, mx: 'auto', textAlign: 'center' }}>
                    <Typography variant='h4' component='span' sx={{ mb: 2 }}>
                        Add New Tax
                    </Typography>
                    {/* <Typography variant='body2'>Permissions you may use and assign to your users.</Typography> */}
                </DialogTitle>
                <DialogContent sx={{ pb: 12, mx: 'auto' }}>
                    <Box component='form' sx={{ mt: 4 }} >
                        <FormGroup sx={{ mb: 1 }}>

                            <TextField
                                fullWidth
                                name="vat"
                                value={formValues.vat}
                                label='Vat %'
                                onChange={handleChange}
                                error={Boolean(errors.name)}
                                placeholder='Enter Vat'
                            />
                            {errors.name && (
                                <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid permission name</FormHelperText>
                            )}
                        </FormGroup>
                        <Box className='demo-space-x' sx={{ '&>:last-child': { mr: 0 } }}>
                            <Button size='large' onClick={onSubmit} type='button' variant='contained'>
                                Create Tax
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

export default TaxHeader
