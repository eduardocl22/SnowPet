import * as React from 'react';
import axios from 'axios';
import { urlapi } from '../../Config/urlapi';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Eliminar = ({dialogOpen,setDialogOpen,setOpen,setOpen1,setMessage,row,setRender }) => {
    const onSubmit = async () => {
        try {
            const response = await axios.delete(`${urlapi}/foro/Eliminar/${row?.id_foro}`,);
            if (response.status === 200) {
                setMessage(response?.data?.message);
                setOpen(true);
                setDialogOpen(false);
                setRender();
            }

        } catch (error) {
            console.warn(error)
            setOpen1(true);
            if (error?.response?.data?.message?.detail) {
                setMessage(error?.response?.data?.message?.detail);
            } else if (error?.response?.data?.message) {
                setMessage(error?.response?.data?.message);
            } else {
                setMessage('Error desconocido');
            }
            setDialogOpen(false);

        }
    }

    return (
        <div >
            <Dialog
                open={dialogOpen}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                onClose={()=>setDialogOpen(false)}
            >
                <DialogTitle>{"Estas seguro de eliminar ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Se va eliminar el foro {row?.tipo}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='warning' onClick={()=>setDialogOpen(false)}>Cancelar</Button>
                    <Button variant='contained' color='primary' onClick={onSubmit}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
