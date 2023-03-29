import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Divider, CardActions, CardContent, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function PermissionsTransferList(props) {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const { t } = useTranslation()
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (props?.data && props.data?.length > 0) {
            setLeft([...props?.data?.filter(() => {
                if (props?.selectedModuleId) {
                    return (props?.selectedModuleId == l?.module_id) && !l.has_access
                } else {
                    return !l.has_access
                }
            })])
            setRight([...props?.data?.filter(() => {
                if (props?.selectedModuleId) {
                    return (props?.selectedModuleId == l?.module_id) && l.has_access
                } else {
                    return l.has_access
                }
            })])
        }
    }, [props])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = (items) => (
        <Paper sx={{ width: 300, height: 400, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {

                    return (
                        <ListItem
                            key={value.id}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': value.id,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={value.id} primary={`${t(`${value.displayname}`)}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <>
            {
                props?.data && props?.data.length > 0 &&
                <>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <CardContent>
                                <Grid container spacing={2} justifyContent="center" alignItems="center">
                                    <Grid item>{customList(left)}</Grid>
                                    <Grid item>
                                        <Grid container direction="column" alignItems="center">
                                            <Button
                                                sx={{ my: 0.5 }}
                                                variant="outlined"
                                                size="small"
                                                onClick={handleAllRight}
                                                disabled={left.length === 0}
                                                aria-label="move all right"
                                            >
                                                ≫
                                            </Button>
                                            <Button
                                                sx={{ my: 0.5 }}
                                                variant="outlined"
                                                size="small"
                                                onClick={handleCheckedRight}
                                                disabled={leftChecked.length === 0}
                                                aria-label="move selected right"
                                            >
                                                &gt;
                                            </Button>
                                            <Button
                                                sx={{ my: 0.5 }}
                                                variant="outlined"
                                                size="small"
                                                onClick={handleCheckedLeft}
                                                disabled={rightChecked.length === 0}
                                                aria-label="move selected left"
                                            >
                                                &lt;
                                            </Button>
                                            <Button
                                                sx={{ my: 0.5 }}
                                                variant="outlined"
                                                size="small"
                                                onClick={handleAllLeft}
                                                disabled={right.length === 0}
                                                aria-label="move all left"
                                            >
                                                ≪
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item>{customList(right)}</Grid>
                                </Grid>
                            </CardContent>
                            <Divider sx={{ m: 0 }} />
                            <CardActions style={{ width: '100%', justifyContent: 'flex-end' }}>
                                <Box className='demo-space-x'>
                                    {props?.dialogTitle == "Add" ?
                                        <Button size='large' variant='contained' onClick={async () => {
                                            const data = await props?.getValues(["role"])
                                            props?.onSubmit(data, right)
                                        }}>
                                            {`${t('Submit')}`}
                                        </Button>
                                        :
                                        <Button size='large' variant='contained' onClick={async () => {
                                            const data = await props?.getValues(["roleKey", "roleId", "role"])
                                            props?.onEdit(data, right)
                                        }}>
                                            {`${t('Submit')}`}
                                        </Button>
                                    }
                                    <Button size='large' color='secondary' variant='outlined' onClick={props?.handleClose}>
                                        {`${t('Discard')}`}
                                    </Button>
                                </Box>
                            </CardActions>
                        </Grid>
                    </Grid>
                </>
            }</>
    );
}
