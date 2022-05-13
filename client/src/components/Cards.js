import React, { useState } from 'react';
import FormDialog from './Dialog';
import './Cards.css';

export default function Cards(props) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <FormDialog 
                open={open} 
                setOpen={setOpen}
                id={props.id}
                name={props.name}
                cost={props.cost}
                category={props.category}
                listGames={props.listGames}
                setListGames={props.setListGames}
            />
            <div className='Card-container' onClick={() => setOpen(true)}>
                <h2 className='Card-title'>Nome do jogo: <b>{props.name}</b></h2>
                <p className='Card-cost'>Valor do jogo: <b>{props.cost}</b></p>
                <p className='Card-category'>Categoria do jogo: {props.category}</p>
            </div>
        </div>
    )
}