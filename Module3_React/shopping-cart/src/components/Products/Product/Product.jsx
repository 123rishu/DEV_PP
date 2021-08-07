import React from 'react';
import {connect} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useHistory } from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Product.css';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginBottom:'5%'
      
    },
    media: {
      height: '40vh',
    },
});

const Product = (props) => {
    const history = useHistory();
    let product = props.product;
    const classes = useStyles();
    const handleOnClick = () => {
        props.loadCurrentItem(product);
        history.push(`/product/${product.id}`);
    }
    return (
        <Card className={classes.root}>
      
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.title}
            
          />
          <CardContent className={classes.cardstyle}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{height: '26vh'}}>
              {product.description}
            </Typography>
            <br/>
            <Typography variant="h5" align='center' color="textPrimary" >
              {product.price}&nbsp;₹
            </Typography>
          </CardContent>
       
        <CardActions >
      
          <Button  size="small" color="primary" onClick={handleOnClick}>
            View Item
          </Button>
          
          <Button size="small" color="primary" onClick={()=>props.addToCart(product)}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCurrentItem: (item) => {
            dispatch({
                type: "SET_CURRENT",
                payload: item,
            })
        },
        addToCart: (item) => {
            dispatch({
                type: "ADD_TO_CART",
                payload: item,
            })
        }
    }
}
 
export default connect(null, mapDispatchToProps)(Product);