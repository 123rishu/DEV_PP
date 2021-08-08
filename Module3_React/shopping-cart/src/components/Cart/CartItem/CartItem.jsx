import React, { useState } from 'react'
import './CartItem.css';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';

const CartItem = (props) => {
    const [input, setInput] = useState(props.item.qty);
    const onChangeHandler = (e) => {
        if (e.target.value > 0) {
            setInput(e.target.value);
            props.adjustQty(props.item.id, Number(e.target.value));
        }

    };
    let currItem = props.item;
    return (
        <>
            <hr />
            <div className='itemContainer'>
                <div className='imgc'>
                    <img src={currItem.image} alt={currItem.title}></img>
                </div>

                <div className='desc'>
                    <div className='itemName'>
                        <h3>{currItem.title}</h3>
                    </div>

                    <div
                        className='itemQuantity'>
                        <label htmlFor="qty">Qty</label>
                        <input
                            min="1"
                            type="number"
                            id="qty"
                            name="qty"
                            value={input}
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className='itemdesc'>
                        <p style={{ color: "#222f3e", fontFamily: "cursive", textAlign: 'justify' }}>{currItem.description}</p>
                    </div>

                    <div className='pc'>
                        <Button variant="contained" color="secondary" onClick={()=>{props.removeFromCart(currItem.id)}}>
                            <DeleteIcon />Delete
                        </Button>
                        <h3 style={{ marginTop: '1%', marginLeft: '4%' }}>$ {currItem.price}</h3>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        adjustQty: (id, value) => {
            dispatch({
                type: "ADJUST_QTY",
                payload: {
                    id: id,
                    value: value,
                }
            })
        },
        removeFromCart: (id) => {
            dispatch({
                type: "REMOVE_FROM_CART",
                payload: id,
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(CartItem);