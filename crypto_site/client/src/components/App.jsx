import React from 'react';
import CoinCard from './CoinCard.jsx'

let coinAndPrice = [];

//TODO: break-out coinAndPrice logic
//TODO: add key prop
function App(props){
    let match = coinAndPrice.filter(element => {
        if(element.coin == props.coin){
            return element
        }
    });
    if(match.length === 0){
        let componentKey = Math.random() * Math.random();
        coinAndPrice.push({
            key: componentKey,
            coin: props.coin,
            price: props.price
        })
    } else {
        match[0].price = props.price;
    };
    return (
        <div>{coinAndPrice.map(element =>
            <CoinCard
                key={element.key}
                coin={element.coin}
                price={element.price}
            />
        )}</div>
    )
}

export default App;
