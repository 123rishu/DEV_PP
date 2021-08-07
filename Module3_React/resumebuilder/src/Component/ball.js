import React, {useState} from 'react';
import { connect } from 'react-redux';

function Ball(props){
    console.log(props);

    return (
        <div>
            <h1>Number of balls</h1>
                <button onClick={props.buyBall}>Buy Balls</button>
                <button onClick={props.sellBall}>Sell Balls</button>
        </div>
    );
}

const mapStateToProps = (store) => {
    return store;
};

const mapDispatchToProps = (dispatch) => {
    return {
      sellBall: () => {
        dispatch({ type: "sell_ball" });
      },
      buyBall: () => {
        dispatch({ type: "buy_ball" });
      },
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Ball);