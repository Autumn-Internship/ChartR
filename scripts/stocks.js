// set API key for the stocks API.
const API_KEY='XaDgjz85YrsHihbcukvR';
let country;
let countryData=[];
// get the name of the stock you want to see details for

const input=document.getElementById('stock_name');

// run fetch for the stock data
function getCountry(){
    country = input.value;
    console.log(input.value)
}

function getData(){
    getCountry();
    fetch(`https://fcsapi.com/api-v3/stock/indices?country=${country}&access_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => console.log(data['response']))
    .catch(err => console.log(err));

    // console.log(countryData);
    return countryData;
}
// parse it in a format easy to use in chartJS