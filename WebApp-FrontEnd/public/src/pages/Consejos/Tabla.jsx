import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { Editar } from './Editar';

export const Tabla = ({data,setOpen,setOpen1,setMessage,setRender}) => {

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'small'}
                    >

                        <TableHead>
                            <TableCell
                                component="th"
                                padding="none"
                                align='center'
                            >Titulo
                            </TableCell>
                            <TableCell
                                component="th"
                                padding="none"
                                align='center'
                            >Descripcion
                            </TableCell>
                            <TableCell
                                component="th"
                                padding="none"
                                align='center'
                            >Fecha
                            </TableCell>
                            <TableCell
                                component="th"
                                padding="none"
                                align="center"
                            >Action
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {data?.map((row, index) => {
                                return (
                                    <Editar key={index} row={row} setMessage={setMessage} setOpen={setOpen} setOpen1={setOpen1} setRender={setRender} />
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                
            </Paper>
        </Box>
    );
}