// ** React Imports
import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Tooltip from '@mui/material/Tooltip'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import DialogTitle from '@mui/material/DialogTitle'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import FormHelperText from '@mui/material/FormHelperText'
import TableContainer from '@mui/material/TableContainer'
import FormControlLabel from '@mui/material/FormControlLabel'

import toast from 'react-hot-toast'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

import { fetchRole, fetchFeatures, createRole, createRoleFeatures, fetchRoleFeatures, updateRole, deleteRoleFeatures } from 'src/store/apps/role/index.js'

// ** Icons Imports
import ContentCopy from 'mdi-material-ui/ContentCopy'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import { EmailNewsletter } from 'mdi-material-ui'

const cardData = [
  { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 7, title: 'Manager', avatars: ['5.png', '6.png', '7.png', '8.png', '1.png', '2.png', '3.png'] },
  { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] },
  { totalUsers: 3, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
  { totalUsers: 2, title: 'Restricted User', avatars: ['4.png', '5.png'] }
]

const rolesArr = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RolesCards = () => {

  const dispatch = useDispatch()
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')
  const [role, setRole] = useState([''])
  const [features, setFeatures] = useState([''])
  const [roleFeatures, setRoleFeatures] = useState()
  const [formValues, setFormValues] = useState({})

  // ** Hooks
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: '' } })
  const handleClickOpen = () => setOpen(true)

  const handleCheckBox = (e) => {
    setFormValues((prevstate) => ({ ...prevstate, [e.target.name]: e.target.checked }))
  }

  const handleChange = (e) => {
    setFormValues((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
  }

  const handleClose = () => {
    setOpen(false)
    setFormValues('')
  }

  const submit = async () => {
    if (formValues.roleName == '') { toast.error('Role name cannot be empty'); return }
    let check = await dispatch(fetchRole({ name: formValues.roleName }))
    if (check.payload.length > 0) { toast.error('Role name already exists'); return }
    let role = await dispatch(createRole({ name: formValues.roleName }))

    for (let i in formValues) {
      if (i == "roleName") continue;
      let data = {}
      if (formValues[i] == true) {
        data.roleId = role.payload.id
        data.featureName = i
        let feature = await dispatch(createRoleFeatures(data))
      }
    }
    toast.success('Role created and features added')
    handleClose()
  }

  const edit = async () => {
    console.log(formValues)
    let role = await dispatch(updateRole({ id: formValues.roleId, name: formValues.roleName }))
    let res = await dispatch(deleteRoleFeatures({ roleId: formValues.roleId }))
    let id = formValues.roleId
    for (let i in formValues) {
      if (i == "roleName" || i == "roleId") continue;
      let data = {}
      if (formValues[i] == true) {
        data.roleId = id
        data.featureName = i
        let feature = await dispatch(createRoleFeatures(data))
      }
    }
    toast.success('Role & Features updated')
    handleClose()
  }

  useEffect(() => {
    dispatch(fetchRole()).then((data) => { if (data.payload && data.payload.length > 0) { setRole(data.payload) } })
    dispatch(fetchFeatures()).then((data) => { if (data.payload && data.payload.length > 0) { setFeatures(data.payload) } })
  }, [open])
  const renderCards = () =>
    role.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            {/* <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body2'>Total {item.totalUsers} users</Typography>
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatarGroup-avatar': { fontSize: '.875rem' },
                  '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 32, height: 32 }
                }}
              >
                {item.avatars.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box> */}
            <Box>
              <Typography variant='h6'>{item.name}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography
                variant='body2'
                sx={{ color: 'primary.main', cursor: 'pointer' }}
                onClick={async () => {
                  let filter = {
                    roleId: item.id
                  }
                  let rf = await dispatch(fetchRoleFeatures(filter))
                  let data = {}
                  for (let i in features) {
                    let add = 0
                    for (let k in rf.payload) {
                      if (features[i].name == rf.payload[k].featureName) {
                        add = 1
                      }
                    }
                    if (add == 1) {
                      data[features[i].name] = true
                    }
                    else {
                      data[features[i].name] = false
                    }
                  }
                  data.roleName = item.name
                  data.roleId = item.id
                  setFormValues(data)
                  handleClickOpen()
                  setDialogTitle('Edit')
                }}
              >
                Edit Role
              </Typography>
              {/* <IconButton size='small' sx={{ color: 'text.primary' }}>
                <ContentCopy fontSize='small' />
              </IconButton> */}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))
  const onSubmit = () => handleClose()
  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            let data = {}
            data.roleName = ''
            for (let i in features) {
              data[`${features[i].name}`] = false
            }
            setFormValues(data)
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add Role
                  </Button>
                  <Typography>Add role, if it doesn't exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h4' component='span'>
              {`${dialogTitle} Role`}
            </Typography>
            <Typography variant='body2'>Set Role Permissions</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>

                <TextField
                  name="roleName"
                  value={formValues.roleName != "undefined" ? formValues.roleName : ''}
                  label='Role Name'
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  placeholder='Enter Role Name'
                />

                {errors.name && (
                  <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid role name</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Typography variant='h6'>Role Permissions</Typography>
            <TableContainer>
              <Table size='small'>
                {/* <TableHead>
                  <TableRow>
                    <TableCell sx={{ pl: '0 !important' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          fontSize: '0.875rem',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                      >
                        Administrator Access
                        <Tooltip placement='top' title='Allows a full access to the system'>
                          <InformationOutline sx={{ ml: 1, fontSize: '1rem' }} />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControlLabel
                        label='Select All'
                        control={<Checkbox size='small' />}
                        sx={{ '& .MuiTypography-root': { textTransform: 'capitalize' } }}
                      />
                    </TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {features.map((i, index) => {
                    return (
                      <TableRow key={index} sx={{ '& .MuiTableCell-root:first-of-type': { pl: 0 } }}>
                        {/* <TableCell sx={{ fontWeight: 600, color: theme => `${theme.palette.text.primary} !important` }}>
                          {i}
                        </TableCell> */}
                        <TableCell>
                          <FormControlLabel control={<Checkbox name={i.name} onChange={handleCheckBox} checked={formValues[`${i.name}`]} size='small' />} label={i.name} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
            <Box className='demo-space-x'>
              {
                dialogTitle == 'Edit' ?
                  <>
                    <Button size='large' onClick={edit} variant='contained'>
                      Submit
                    </Button>
                  </>
                  :
                  <>
                    <Button size='large' onClick={submit} variant='contained'>
                      Submit
                    </Button>
                  </>
              }
              <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                Discard
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
