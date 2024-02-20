/*
TODO: elastic cases for switch function so I can just add asterisks to the
response server-side and have this dataTransform function handle the rest!
*/
function createTickerInfo(data) {
    let ticker = '', price = '', seenAsterisk = 0;
    for(let x = 0; x < data.length; x++){
        if(data[x] !== '*'){
            switch(seenAsterisk){
                case 0: ticker += data[x];
                break;
                case 1: price += data[x];
                break;
                default: console.log('no case to match seenAsterisk expression');
            }
        } else {
            seenAsterisk += 1;
        }
    }
    return {
        ticker: ticker,
        price: price
    }
};

export { createTickerInfo }