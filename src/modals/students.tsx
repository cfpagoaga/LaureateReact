import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Student } from "../components/student-form.component";

interface Props {
    open: boolean;
    defaultValues?: Student;
    handleClose: () => void;
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        margin: '0 auto',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #E5E7EB',
        borderRadius: '0.375em',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}))

export default function Students({ open, defaultValues,handleClose }: Props) {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                    <p>First Name: </p>
                    <p>{(defaultValues)?defaultValues.firstName:''}</p>
                    <p>Last Name: </p>
                    <p>{(defaultValues)?defaultValues.lastName:''}</p>
                    <p>Birth Date: </p>
                    <p>{(defaultValues)?defaultValues.birthDate:''}</p>
                    <p>Email: </p>
                    <p>{(defaultValues)?defaultValues.email:''}</p>
                    <p>Gender: </p>
                    <p>{(defaultValues)?defaultValues.gender:''}</p>
                </div>
            </div>
        </Modal>
    )
}