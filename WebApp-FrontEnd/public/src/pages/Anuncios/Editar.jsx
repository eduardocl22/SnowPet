import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, Controller } from "react-hook-form";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { urlapi } from '../../Config/urlapi';
import { limpiarObjeto } from '../../Helpers/CleanOject';
import Button from '@mui/material/Button';
import { Eliminar } from './Eliminar';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


//imagen
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


export const Editar = ({ row, setOpen, setOpen1, setMessage, setRender }) => {


    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogDelete, setOpenDialogDelete] = React.useState(false);
    const [mascotas, setMascotas] = React.useState([]);
    const [selectedMascotas, setSelectedMascotas] = React.useState(row.mascotas.map(m => m.id_mascota));
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setSelectedMascotas(typeof value === 'string' ? value.split(',') : value);
    };

    const { register, handleSubmit, formState: { errors, isValid }, watch, control } = useForm({
        mode: 'onChange',
    });

    const loadData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${urlapi}/mascota/obtener`);
            setMascotas(response.data.results);
        } catch (error) {
            console.error("Error loading mascotas:", error);
        }
        setLoading(false);
    };

    const formattedDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    };
    const formattedDateInput = (date) => new Date(date).toISOString().split('T')[0];

    const onSubmit = async (data) => {
        //console.log(data)
        let obj = limpiarObjeto(data);
        let Send = { ...obj, "idusuario": row.id_usuario, "idconsejo": row.id_consejo };
        console.table(Send)
        try {

            const response = await axios.post(`${urlapi}/consejo/Guardar`, Send);
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
        loadData();
    }, [setRender])
    return (
        <TableRow
            hover
            role="checkbox"
            key={row?.id_noticias}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell
                component="th"
                scope="row"
                padding="none"
                align="center"
            >
                {row?.titulo}
            </TableCell>
            <TableCell align="center">{row?.descripcion}</TableCell>
            <TableCell align="center" >{formattedDate(row?.fecha)}</TableCell>
            <TableCell align="center">{row?.observacion}</TableCell>
            <TableCell align="center">{row?.telefono}</TableCell>

            <TableCell align="center">
                <IconButton color='inherit' aria-label="delete" size="small" onClick={() => setOpenDialog(true)} >
                    <RemoveRedEyeOutlinedIcon color={"success"} fontSize="small" />
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
                <DialogTitle id="scroll-dialog-title">VISTA ANUNCIO</DialogTitle>
                <DialogContent dividers={true}>

                    <FormControl sx={{ minWidth: 400, mb: 4, textAlign: "start" }} >
                        <Card sx={{ maxWidth: 400 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`${urlapi}/anuncios/${row?.foto}`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Titulo: {row.titulo}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Informacion :
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Fecha :{formattedDate(row?.fecha)}
                                        <br />
                                        Telefono :{row?.telefono}
                                        <br />
                                        Descripcion : {row.descripcion}
                                        <br />
                                        Direccion : {row.direccion}
                                        <br />
                                        Observacion : {row.observacion}
                                        <br />
                                        Recompensa : {row.recompensa}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lista Mascotas :
                                    </Typography>
                                    {row.mascotas.map(item => (
                                        <Typography key={item.id_mascota} variant="body2" color="text.secondary">
                                            {item.id_mascota} - {item.nombre} -{item.raza}
                                        </Typography>
                                    ))}

                                </CardContent>
                            </CardActionArea>
                        </Card>
                        {/*<TextField
                            {...register("titulo", {
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
                            disabled
                            defaultValue={row?.titulo}
                            helperText={errors?.titulo?.message}
                            error={errors?.titulo ? true : false}
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
                            disabled
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
                            disabled
                            type='date'
                            helperText={errors?.fecha?.message}
                            error={errors?.fecha ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="fecha"
                            variant="outlined"
                        />
                        <TextField
                            {...register("telefono", {
                                required: "Es requerido",
                                maxLength: {
                                    value: 30,
                                    message: "Max length 30"
                                },
                                minLength: {
                                    value: 1,
                                    message: "Min length 1"
                                }
                            })}
                            disabled
                            defaultValue={row?.telefono}
                            helperText={errors?.telefono?.message}
                            error={errors?.telefono ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="telefono"
                            variant="outlined"
                        />


                        <TextField
                            {...register("direccion", {
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
                            disabled
                            defaultValue={row?.direccion}
                            helperText={errors?.direccion?.message}
                            error={errors?.direccion ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="direccion"
                            variant="outlined"
                        />
                        <TextField
                            {...register("recompensa", {
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
                            disabled
                            defaultValue={row?.recompensa}
                            helperText={errors?.recompensa?.message}
                            error={errors?.recompensa ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="recompensa"
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
                            disabled
                            defaultValue={row?.observacion}
                            helperText={errors?.observacion?.message}
                            error={errors?.observacion ? true : false}
                            sx={{ mb: 1, mt: 1 }}
                            label="observacion"
                            variant="outlined"
                        />
                        {loading === true ? null : <Controller
                            name="list_dataD"
                            control={control}
                            defaultValue={row.mascotas.map(m => m.id_mascota)}
                            rules={{
                                validate: value => value.length > 0 || 'Debes seleccionar al menos una mascota'
                            }}
                            render={({ field }) => (
                                <FormControl error={!!errors.list_dataD}>
                                    <InputLabel id="demo-multiple-checkbox-label">mascotas</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        multiple
                                        disabled
                                        fullWidth
                                        value={field.value}
                                        onChange={(event) => {
                                            handleChange(event);
                                            field.onChange(event.target.value);
                                        }}
                                        input={<OutlinedInput label="mascotas" />}
                                        renderValue={(selected) => selected.map(id => {
                                            const mascota = mascotas.find(m => m.id_mascota === id);
                                            return mascota ? `(${mascota.id_mascota} - ${mascota.nombre})` : id;
                                        }).join(', ')}
                                        MenuProps={MenuProps}
                                    >
                                        {mascotas.map((mascota) => (
                                            <MenuItem key={mascota.id_mascota} value={mascota.id_mascota}>
                                                <Checkbox checked={selectedMascotas.indexOf(mascota.id_mascota) > -1} />
                                                <ListItemText primary={`(${mascota.nombre} - ${mascota.id_mascota})`} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.list_dataD && <p style={{ color: 'red' }}>{errors.list_dataD.message}</p>}
                                </FormControl>
                            )}
                        />}*/}

                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ pr: 3 }}>

                    <Button variant='contained' color='success' onClick={handleClose}>Cerrar ventana</Button>
                    {/*<Button variant='contained' type='submit'>Guardar</Button>*/}
                </DialogActions>
            </Dialog>
        </TableRow>
    );
}