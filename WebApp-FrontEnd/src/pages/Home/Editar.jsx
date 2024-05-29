import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { urlapi } from '../../Config/urlapi';
import { limpiarObjeto } from '../../Helpers/CleanOject';
import Button from '@mui/material/Button';
import { Eliminar } from './Eliminar';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export const Editar = ({ row, setOpen, setOpen1, setMessage, setRender }) => {


    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogDelete, setOpenDialogDelete] = React.useState(false);

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
        mode: 'onChange', 
    });



    const formattedDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    };
    const formattedDateInput = (date) => new Date(date).toISOString().split('T')[0];

    const onSubmit = async (data) => {
        //console.log(data)
        let obj = limpiarObjeto(data);
        let Send = { ...obj, "idusuario": row.id_usuario,"idmascota":row.id_mascota};
        console.table(Send)
        try {

            const response = await axios.post(`${urlapi}/mascota/Guardar`, Send);
            if (response.status === 200) {
                setMessage(response?.data?.message);
                setOpen(true);
                //reset();
                setRender();
                setOpenDialog(false)
            }

        } catch (error) {
            setOpen1(true);
            if (error?.response?.data?.message?.detail) {
                setMessage(error?.response?.data?.message?.detail);
            } else if (error?.response?.data?.message) {
                setMessage(error?.response?.data?.message);
            } else {
                setMessage('Error desconocido');
            }
        }
    }

    const handleClose = () => {
        setOpenDialog(false);
    };
    React.useEffect(() => {
    }, [setRender])
    return (
        <TableRow
            hover
            role="checkbox"
            key={row?.id_mascota}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell
                component="th"
                scope="row"
                padding="none"
                align="center"
            >
                {row?.nombre}
            </TableCell>
            <TableCell align="center" >{row?.raza}</TableCell>
            <TableCell align="center">{row?.descripcion}</TableCell>
            <TableCell align="center" >{formattedDate(row?.fechanac)}</TableCell>
            <TableCell align="center">{row?.observacion}</TableCell>

            <TableCell align="center">
                    <IconButton  color='inherit' aria-label="delete" size="small" onClick={() => setOpenDialog(true)} >
                        <CreateOutlinedIcon color={"warning"} fontSize="small" />
                    </IconButton>

                    <IconButton  onClick={() => setOpenDialogDelete(true)} aria-label="delete" size="small">
                        <DeleteIcon color={"error"} fontSize="inherit" />
                    </IconButton>
                <Eliminar setDialogOpen={setOpenDialogDelete} dialogOpen={openDialogDelete} row={row} setMessage={setMessage} setOpen={setOpen} setOpen1={setOpen1} setRender={setRender} />

            </TableCell>
            <Dialog
                component={'form'} onSubmit={handleSubmit(onSubmit)}
                open={openDialog}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">ACTUALIZAR MASCOTA</DialogTitle>
                <DialogContent dividers={true}>

                    <FormControl sx={{ minWidth: 400, mb: 4, textAlign: "start" }} >

                        <TextField
                            {...register("nombre", {
                                required: "Es requerido",
                                maxLength: {
                                    value: 200,
                                    message: "Max length 200"
                                },
                                minLength: {
                                    value: 1,
                                    message: "Min length 1"
                                }
                            })}
                            defaultValue={row?.nombre}
                            helperText={errors?.nombre?.message}
                            error={errors?.nombre ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="nombre"
                            variant="outlined"
                        />
                        <TextField
                            {...register("raza", {
                                required: "Es requerido",
                                maxLength: {
                                    value: 200,
                                    message: "Max length 200"
                                },
                                minLength: {
                                    value: 1,
                                    message: "Min length 1"
                                }
                            })}
                            defaultValue={row?.raza}
                            helperText={errors?.raza?.message}
                            error={errors?.raza ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="raza"
                            variant="outlined"
                        />

                        <TextField
                            {...register("descripcion", {
                                required: "Es requerido",
                                maxLength: {
                                    value: 400,
                                    message: "Max length 400"
                                },
                                minLength: {
                                    value: 1,
                                    message: "Min length 1"
                                }
                            })}
                            defaultValue={row?.descripcion}
                            helperText={errors?.descripcion?.message}
                            error={errors?.descripcion ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="descripcion"
                            variant="outlined"
                        />
                        <TextField
                            {...register("fechanac", {
                                required: "Es requerido",
                            })}
                            defaultValue={formattedDateInput(row?.fechanac)}

                            type='date'
                            //focused
                            helperText={errors?.fechanac?.message}
                            error={errors?.fechanac ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="fecha nacimiento"
                            variant="outlined"
                        />
                        <TextField
                            {...register("observacion", {
                                required: "Es requerido",
                                maxLength: {
                                    value: 400,
                                    message: "Max length 400"
                                },
                                minLength: {
                                    value: 1,
                                    message: "Min length 1"
                                }
                            })}
                            defaultValue={row?.observacion}
                            helperText={errors?.observacion?.message}
                            error={errors?.observacion ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="observacion"
                            variant="outlined"
                        />

                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ pr: 3 }}>

                    <Button variant='contained' color='warning' onClick={handleClose}>Cancelar</Button>
                    <Button variant='contained' type='submit'>Guardar</Button>
                </DialogActions>
            </Dialog>
        </TableRow>
    );
}