// set API key for the stocks API.
const API_KEY='XaDgjz85YrsHihbcukvR';
let country;
let euro_dnk;
let euro_dnk_high=[];
// get the name of the stock you want to see details for


async function getData(){
    await fetch(`https://fcsapi.com/api-v3/forex/history?id=9&period=month&access_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        euro_dnk= data['response'];
    })
    .catch(err => console.log(err));

    for(const [key, value] of Object.entries(euro_dnk)){
        euro_dnk_high= [...euro_dnk_high, value.h];
    }
    console.log(euro_dnk_high);
}
// parse it in a format easy to use in chartJS