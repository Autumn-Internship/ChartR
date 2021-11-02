// set API key for the stocks API.
const API_KEY='XaDgjz85YrsHihbcukvR';

const cmp1 = document.getElementById(`cmp1`);
const cmp2 = document.getElementById(`cmp2`);
const dummy = new Array(300);
let country;
let compared1;
let compared2;
let lbl1, lbl2;
let data1;
let data2;
let currentData;
let high1=[];
let high2=[];
let currentHigh=[];
let myChart;
let currentValuesChart;
let min=[], max=[];



for(i=0; i<300;i++){
    dummy[i]='';
}

// get the name of the stock you want to see details for

function getCMP(){
    compared1 = cmp1.value;
    compared2 = cmp2.value;
}

document.addEventListener("DOMContentLoaded", function() {
    plotCurrent();
});

async function plotCurrent(){
        await fetch(`https://fcsapi.com/api-v3/forex/latest?id=629,659,645,9,661,704,707,68&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            currentData= data['response'];
        })
        .catch(err => console.log(err));

        for(const [key, value] of Object.entries(currentData)){
            currentHigh= [...currentHigh, parseFloat(value.h)];
            // currencies in order: DKK(danish krone), SEK(sweedish krona), BGN(bulgarian lev), CZK(czech krouna), HRK(croatian kuna), HUF(hungarian forint), PLN(polish zolty), RON(romanian leu)
        }
    drawPlot();
}

function drawPlot(){
    if(currentValuesChart != undefined) currentValuesChart.destroy();
    curChart = document.getElementById('currentCmpChart');
    currentValuesChart = new Chart(curChart,{
        type: 'bar',
        data: {
            labels: ['DKK','SEK','BGN', 'CZK', 'HRK', 'PLN', 'RON'],
            datasets: [{
                label: 'Values in comparison to Euro',
                data: [currentHigh[0],currentHigh[1],currentHigh[2],currentHigh[3],currentHigh[4],currentHigh[6],currentHigh[7],],
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255,243,194, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,243,194, 1)'
                ],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


function getLabels(){
    switch(compared1){
        case "629": lbl1 = 'Bulgarian lev';
        case "659": lbl1 = 'Croation Kuna';
        case "645": lbl1 = 'Check Krouna';
        case "9": lbl1 = 'Danish Krone';
        case "661": lbl1 = 'Hungarian Forint';
        case "704": lbl1 = 'Polish Zolty';
        case "707": lbl1 = 'Romanian Ley';
        case "68": lbl1 = 'Sweedish Krona';
    }
    switch(compared2){
        case "629": lbl2 = 'Bulgarian lev';
        case "659": lbl2 = 'Croation Kuna';
        case "645": lbl2 = 'Check Krouna';
        case "9": lbl2 = 'Danish Krone';
        case "661": lbl2 = 'Hungarian Forint';
        case "704": lbl2 = 'Polish Zolty';
        case "707": lbl2 = 'Romanian Ley';
        case "68": lbl2 = 'Sweedish Krona';
    }
    

}


async function getData(){
    getCMP();
    high1=[];
    high2=[];
    //set1
    if(compared1!=""){
        await fetch(`https://fcsapi.com/api-v3/forex/history?id=${compared1}&period=month&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            data1= data['response'];
        })
        .catch(err => console.log(err));


        // parse it in a format easy to use in chartJS
        // took the data from each candle and saved the high value in conversion_high
        for(const [key, value] of Object.entries(data1)){
            high1= [...high1, parseFloat(value.o)];
        }
    }

    //set2
    if(compared2!=""){
        await fetch(`https://fcsapi.com/api-v3/forex/history?id=${compared2}&period=month&access_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            data2= data['response'];
        })
        .catch(err => console.log(err));


        for(const [key, value] of Object.entries(data2)){
            high2= [...high2, parseFloat(value.h)];
        }
    }

    min=[...min,Math.min(...high1),Math.min(...high2)];
    max=[...max,Math.max(...high1),Math.max(...high2)];
    getLabels();
    plot();
}


function plot(){
    if (myChart!=undefined) myChart.destroy();
    const ctx = document.getElementById('CmpChart');
    myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dummy,
        datasets: [{
            label:lbl1,
            data: high1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },
        {
            label: lbl2,
            data: high2,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y:{
                min: Math.min(...min)-0.5,
                max: Math.max(...max)+0.5
            }
        }
    }
});
}

// limited by the ammount of requests/min the api allows (5 req/min)
// after those 5 are made you need to wait to make more