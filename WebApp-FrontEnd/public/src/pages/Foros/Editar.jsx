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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const Editar = ({ row, setOpen, setOpen1, setMessage, setRender }) => {

    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
    const [data_dos, set_data_dos] = React.useState([]);
    const [data_tres, set_data_tres] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

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
        let Send = { ...obj, "id_usuario": row.id_usuario, "id_foro": row.id_foro };
        console.table(Send)
        try {

            const response = await axios.post(`${urlapi}/foro/Guardar`, Send);
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
    const loadData = async () => {
        setLoading(true);
        try {
            const response_dos = await axios.get(`${urlapi}/anuncio/obtener`);
            set_data_dos(response_dos.data.results);
        } catch (error) {
            console.error("Error loading anuncio:", error);
        }
        try {
            const response_tres = await axios.get(`${urlapi}/consejo/obtener`);
            set_data_tres(response_tres.data.results);
        } catch (error) {
            console.error("Error loading consejo:", error);
        }
        setLoading(false);
    };

    React.useEffect(() => {
        loadData();

    }, [setRender])
    return (
        <TableRow
            hover
            role="checkbox"
            key={row?.id_foro}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell
                component="th"
                scope="row"
                padding="none"
                align="center"
            >
                {row?.tipo}
            </TableCell>
            <TableCell align="center">{row?.descripcion}</TableCell>
            <TableCell align="center" >{formattedDate(row?.fecha)}</TableCell>

            <TableCell align="center">
                <IconButton color='inherit' aria-label="delete" size="small" onClick={() => setOpenDialog(true)} >
                    <CreateOutlinedIcon color={"warning"} fontSize="small" />
                </IconButton>

                <IconButton onClick={() => setOpenDialogDelete(true)} aria-label="delete" size="small">
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
                <DialogTitle id="scroll-dialog-title">ACTUALIZAR FORO</DialogTitle>
                <DialogContent dividers={true}>

                    <FormControl sx={{ minWidth: 400, mb: 4, textAlign: "start" }} >

                        <TextField
                            {...register("tipo", {
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
                            defaultValue={row?.tipo}
                            helperText={errors?.tipo?.message}
                            error={errors?.tipo ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="titulo"
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
                            {...register("fecha", {
                                required: "Es requerido",
                            })}
                            defaultValue={formattedDateInput(row?.fecha)}

                            type='date'
                            //focused
                            helperText={errors?.fecha?.message}
                            error={errors?.fecha ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="fecha"
                            variant="outlined"
                        />
                        {loading === true ? null : <>
                            <FormControl  >
                                <InputLabel >anuncio</InputLabel>
                                <Select
                                    label="anuncio"
                                    name='id_noticias'
                                    labelId='id_noticias'
                                    {...register("id_noticias", {
                                        required: "Es requerido",
                                    })}
                                    error={errors?.id_noticias ? true : false}
                                    defaultValue={row?.id_noticias}
                                    sx={{ mb: 1, mt: 1 }}

                                >
                                    <MenuItem value="" disabled>
                                        <em>None</em>
                                    </MenuItem>
                                    {data_dos?.map(item => (
                                        <MenuItem key={item?.id_noticias} value={item?.id_noticias}>{item?.titulo} </MenuItem>

                                    )
                                    )}

                                </Select>
                            </FormControl>
                            <FormControl >
                                <InputLabel >consejo</InputLabel>
                                <Select
                                    labelId='id_consejo'
                                    label="consejo"
                                    name='id_consejo'
                                    {...register("id_consejo", {
                                        required: "Es requerido",
                                    })}
                                    defaultValue={row?.id_consejo}
                                    error={errors?.id_consejo ? true : false}
                                >
                                    <MenuItem disabled value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {data_tres?.map(item => (
                                        <MenuItem key={item?.id_consejo} value={item?.id_consejo}>{item?.titulo} </MenuItem>
                                    )
                                    )}
                                </Select>
                            </FormControl>
                        </>}

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