import React, { Component, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Edit } from '@material-ui/icons';
import studentService from "../services/student.service";
import Students from "../modals/students";
import { Student } from "./student-form.component";
import Swal from 'sweetalert2';

interface Column {
    id: any;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    format?: (value: number) => string;
}

const columns: Column[] = [
    { id: 'name', align: 'left', label: 'Student Name', minWidth: 100 },
    { id: 'edit', align: 'center', label: 'Edit', minWidth: 50 },
    { id: 'delete', align: 'center', label: 'Delete', minWidth: 50 },
    { id: 'details', align: 'center', label: 'View Details', minWidth: 50 },
]

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    }
});

type studentData = {
    _id: string;
    birthDate: Date;
    createdAt: Date;
    _v: number;
} & Student;

export default function StudentTable() {
    const history = useHistory();

    const [students, setStudents] = React.useState<studentData[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [show, setShow] = React.useState(false);
    const [student, setStudent] = React.useState<Student>();

    const classes = useStyles();

    const fetchStudents = async () => {
        setStudents(await studentService.getAll());
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editRow = (i: number) => {
        history.push(`/edit/${i}`)
    };

    const deleteRow = async (i: string) => {
        await studentService.delete(i);
        fetchStudents();
        Swal.fire('Student deleted correctly', '', 'success')
    };

    const showRow = async (i: string) => {
        const student = await studentService.get(i);
        const birthDate = student.birthDate.split('T')[0];
        setStudent({ 
            firstName: student.firstName,
            lastName: student.lastName,
            birthDate,
            email: student.email,
            address: student.address,
            gender: student.gender
        })
        setShow(true);
    }
    const renderRow = (column: any, row: any) => {
        const value = row[column.id];
        if (column.id == "name") {
            return value !== null ? `${row['firstName']} ${row['lastName']}` : 'Null';
        } else if (column.id === 'edit') {
            return (<IconButton aria-label="edit" onClick={() => editRow(row._id)}>
                <Edit />
            </IconButton>);
        } else if (column.id == 'delete') {
            return (<IconButton aria-label="delete" onClick={() => deleteRow(row._id)}>
                <Delete />
            </IconButton>);
        } else if (column.id == 'details') {
            return (<button className="btn" onClick={() => showRow(row._id)}>Details</button>);
        }
    };

    useEffect(() => {
        fetchStudents()
    }, []);

    return (
        <div style={{display: "flex",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
            <h1>Student's Table</h1>
            <div className="mt-4 col-md-10">
                <Students open={show} defaultValues={student} handleClose={() => { setShow(!show) }} />
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: 10 }}>
                                    #
                                </TableCell>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, index) => {
                                return (
                                    <TableRow key={student._id} hover role="checkbox" tabIndex={-1}>
                                        <TableCell align="left">
                                            {page * rowsPerPage + (index + 1)}
                                        </TableCell>

                                        {columns.map((column) => {
                                            return (
                                                <TableCell key={`${student._id}-${column.id}`} align={column.align}>
                                                    {renderRow(column, student)}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>

                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1, 10, 25, 100]}
                    component="div"
                    count={students.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}