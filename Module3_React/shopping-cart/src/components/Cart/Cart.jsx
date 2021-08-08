import React, { useState, useEffect } from 'react'
import './Cart.css';
import { connect } from "react-redux";
import CartItem from './CartItem/CartItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const coupons = {
    SAVE10: {
        name: 'SAVE10',
        discount: 10
    },
    SAVE20: {
        name: 'SAVE20',
        discount: 20
    },
    ABCD: {
        name: 'ABCD',
        discount: 15
    }
}

const Cart = (props) => {
    let cart = props.cart;
    console.log(cart);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [oldPrice, setOldPrice] = useState(null);

    const getText = (e) => {
        setCoupon(e.target.value)
    }

    const ApplyCoupon = () => {
        console.log(coupon);

        let couponUpper = coupon.trim().toUpperCase();
        let obj = coupons[couponUpper];
        console.log(obj);

        if (obj == undefined) {
            console.log('Coupon is not applicable');
            setLoading(false);
            setSuccess(false);
        }
        else {
            setLoading(false);
            setSuccess(true);
            console.log(obj.discount);
            let discount = (totalPrice / 100) * (obj.discount);
            let newPrice = Math.trunc(totalPrice - discount);
            setOldPrice(totalPrice);
            setTotalPrice(newPrice);
        }
    }

    const revert = () => {
        setTotalPrice(oldPrice);
        setOldPrice(null);
        setSuccess(null);
        setLoading(true);
        setCoupon('');
    }

    const tryAgain = () => {
        setSuccess(null);
        setLoading(true);
        setCoupon('');
    }

    useEffect(() => {
        let items = 0;
        let price = 0;

        cart.forEach((item) => {
            items += item.qty;
            price += item.qty * item.price;
        });

        setTotalItems(items);
        setTotalPrice(price);
    }, [cart]);
    return (
        <>
            {
                cart.length == 0 ? <><h1>Your cart is empty</h1></> :
                    <div className='container-div'>
                        <div className='items'>
                            <div className='header'>
                            <h3 style={{paddingTop: '2%',paddingLeft: '2%',marginBottom:'3%'}}>Shopping Cart</h3>
                            </div>

                            <div className='added'>
                                {
                                    cart.map((item) => {
                                        return <CartItem key={item.id} item={item}></CartItem>
                                    })
                                }
                            </div>
                        </div>

                        <div className='details-c'>

                            <div className='details'>
                                <h4 style={{ textAlign: 'center', paddingTop: '5%' }}>Cart Summary</h4>

                                <div style={{ textAlign: 'center', marginBottom: '5%', marginTop: '5%' }}>
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span style={{ fontWeight: 'bold' }}>$ {totalPrice}</span>
                                </div>


                                <>
                                    {
                                        loading == true ?
                                            <div className='coupon'>

                                                <TextField value={coupon} onChange={getText} style={{ marginRight: '2%' }} id="standard-basic" label="Enter Code" ></TextField>

                                                <Button variant="outlined" size="small" onClick={ApplyCoupon}>
                                                    Apply
                                                </Button>

                                            </div>

                                            :

                                            <>
                                                {
                                                    success == true ?

                                                        <div className='smsg'>
                                                            <h4>Code Applied</h4>

                                                            <div className='revert'>
                                                                <Button onClick={revert} size='small' variant="contained" color="secondary"
                                                                >
                                                                    Revert
                                                                </Button>
                                                            </div>


                                                        </div>

                                                        :

                                                        <div className='fmsg'>
                                                            <h4>Not Valid</h4>

                                                            <div className='revert'>
                                                                <Button onClick={tryAgain} size='small' variant="contained" color="secondary"
                                                                >
                                                                    Try Again
                                                                </Button>
                                                            </div>

                                                        </div>
                                                }
                                            </>
                                    }
                                </>


                                <div className='checkout'>
                                    <Button variant="contained" color="primary">
                                        Proceed To Buy
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

const mapStateToProps = (store) => {
    return {
        cart: store.shop.cart,
    }
}

export default connect(mapStateToProps)(Cart);