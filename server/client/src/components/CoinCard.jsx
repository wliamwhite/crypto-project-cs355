import React from 'react';

function CoinCard(props) {
    return <div><p>{props.coin}</p><h1>{props.price}</h1></div>
}

export default CoinCard;