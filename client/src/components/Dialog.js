import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        name: props.name,
        cost: props.cost,
        category: props.category
    });

    const handleEditGame = () => {
        Axios.put("http://localhost:5000/edit", {
            id: editValues.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category,
        }).then(() => {
            props.setListGames(
                props.listGames.map((value) => {
                    return value.id == editValues.id ? {
                            id: editValues.id,
                            name: editValues.name,
                            cost: editValues.cost,
                            category: editValues.category,
                        } : value;
                })
            );
        });
        handleClose();
    };

    const handleDeleteGame = () => {
        Axios.delete(`http://localhost:5000/delete/${editValues.id}`).then(() => {
            props.setListGames(
                props.listGames.filter((value) => {
                    return value.id != editValues.id;
                })
            );
        });
        handleClose();
    };

    const handleClose = () => {
        props.setOpen(false);
    }

    const handleChangeValues = value => {
        setEditValues(prevValues => ({
            ...prevValues,
            [value.target.id]: value.target.value
        }))
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nome do jogo"
                        defaultValue={props.name}
                        onChange={handleChangeValues}
                        type="text"
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="cost"
                        label="Preço do jogo"
                        defaultValue={props.cost}
                        onChange={handleChangeValues}
                        type="text"
                        fullWidth
                    />
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="category"
                        label="Categoria do jogo"
                        defaultValue={props.category}
                        onChange={handleChangeValues}
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditGame} color="primary">Salvar</Button>
                    <Button onClick={handleDeleteGame} color="secondary">Deletar</Button>
                    <Button onClick={handleClose} >Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}