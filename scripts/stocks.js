// set API key for the stocks API.
const API_KEY='XaDgjz85YrsHihbcukvR';

const cmp1 = document.getElementById(`cmp1`);
const cmp2 = document.getElementById(`cmp2`);

let country;
let compared1;
let compared2;
let data1;
let high1=[];
let data2;
let high2=[];
// get the name of the stock you want to see details for

function getCMP(){
    compared1 = cmp1.options[select.selectedIndex].value;
    compared2 = cmp2.options[select.selectedIndex].value;
}


async function getData(){
    //set1
    await fetch(`https://fcsapi.com/api-v3/forex/history?id=9&period=month&access_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        data1= data['response'];
    })
    .catch(err => console.log(err));


    // parse it in a format easy to use in chartJS
    // took the data from each candle and saved the high value in conversion_high
    for(const [key, value] of Object.entries(data1)){
        high1= [...high1, value.h];
    }

    //set2
    await fetch(`https://fcsapi.com/api-v3/forex/history?id=629&period=month&access_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        data2= data['response'];
    })
    .catch(err => console.log(err));


    for(const [key, value] of Object.entries(data2)){
        high2= [...high2, value.h];
    }

}
