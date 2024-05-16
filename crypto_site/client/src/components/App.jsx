import React from 'react';
import CoinCard from './CoinCard.jsx'

let coinAndPrice = [];

//TODO: break-out coinAndPrice logic
function App(props){
        let match = coinAndPrice.filter(element => {
            if(element.coin == props.coin){
                return element
            }
        });
        if(match.length === 0){
            let componentKey = Math.random() * Math.random();
            coinAndPrice.push({
                coin: props.coin,
                price: props.price,
                history: props.history
            })
        } else {
            match[0].price = props.price;
            match[0].history = props.history;
        };
        return (
            <div>{coinAndPrice.map(element =>
                <CoinCard
                    key={element.key}
                    coin={element.coin}
                    price={element.price}
                    history={element.history}
                />
            )} 
            </div>
        )
    }

//     if(props.type == 'history'){
//         let match = coinAndPrice.filter(element => {
//             if(element.coin == props.coin){
//                 return element;
//             }
//         });
//         if(match.length === 0){
//             let componentKey = Math.random() * Math.random();
//             return (
//                 <div>
//                     <Chart
//                         key={componentKey}
//                         coin={props.coin}
//                         history={props.history}
//                     />
//                 </div>
//             )
//         }
        
//     }
   
// }

export default App;
