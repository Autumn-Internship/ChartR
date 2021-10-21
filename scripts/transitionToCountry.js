
let index = 0;
const countries = [
[0, 'imagini/germany.jpg', 'Germany', 'imagini/germanyFlag.png', 'Capital: Berlin', 'Official Language: German', 'Government: Federal parliamentary republic', 
'Area: 357.022 km<sup>2</sup>', 'Population: 83.190.556', 'HDI: 0.947', 'Inflation: 0.5%', 'Average Gross Salary: 4.450 $ (monthly)', 'GDP (PPP): 4,743 trillion $', 
'Per Capita: 56.956 $', 'GDP (Nominal): 4,319 trillion $', 'Per Capita: 51.860 $', 'GINI: 29.7 (low)', 'Currency: Euro ($)', 'Unemployment: 4.4%', 
'Average Net Salary: 2.705 $ (monthly)'], 
[1, 'imagini/france.jpg', 'France', 'imagini/franceFlag.png', 'Capital: Paris', 'Official Language: French', 'Government: Federal parliamentary republic', 
'Area: 357.022 km<sup>2</sup>', 'Population: 83.190.556', 'HDI: 0.947', 'Inflation: 0.5%', 'Average Gross Salary: 4.450 $ (monthly)', 'GDP (PPP): 4,743 trillion $', 
'Per Capita: 56.956 $', 'GDP (Nominal): 4,319 trillion $', 'Per Capita: 51.860 $', 'GINI: 29.7 (low)', 'Currency: Euro ($)', 'Unemployment: 4.4%', 
'Average Net Salary: 2.705 $ (monthly)'],
[2, 'imagini/italy.png', 'Italy', 'imagini/italyFlag.png', 'Capital: Rome', 'Official Language: Italian', 'Government: Federal parliamentary republic', 
'Area: 357.022 km<sup>2</sup>', 'Population: 83.190.556', 'HDI: 0.947', 'Inflation: 0.5%', 'Average Gross Salary: 4.450 $ (monthly)', 'GDP (PPP): 4,743 trillion $', 
'Per Capita: 56.956 $', 'GDP (Nominal): 4,319 trillion $', 'Per Capita: 51.860 $', 'GINI: 29.7 (low)', 'Currency: Euro ($)', 'Unemployment: 4.4%', 
'Average Net Salary: 2.705 $ (monthly)']
];

function nextCountry() {
if(index<countries.length-1) {
index++;

document.querySelector('.currentCountry').style.opacity = 0;
document.querySelector('.currentCountry').style.transition = '.5s';
setTimeout(function() {
document.querySelector('.currentCountry').style.display = 'none';
document.querySelectorAll('.currentCountry h1')[0].innerHTML = countries[index][2];
document.querySelectorAll('.currentCountry img')[0].src = countries[index][1];
document.querySelectorAll('.currentCountry img')[1].src = countries[index][3];
for (let i=4; i<countries[index].length;i++) 
    document.querySelectorAll('.currentCountry h2')[i-4].innerHTML = countries[index][i];
}, 500);

setTimeout(function() {
document.querySelector('.currentCountry').style.display = 'block';
document.querySelector('.currentCountry').style.opacity = 1;
}, 500);
}
}

function prevCountry() {
if(index>0) {
index--;

document.querySelector('.currentCountry').style.opacity = 0;
document.querySelector('.currentCountry').style.transition = '.5s';
setTimeout(function() {
document.querySelector('.currentCountry').style.display = 'none';
document.querySelectorAll('.currentCountry h1')[0].innerHTML = countries[index][2];
document.querySelectorAll('.currentCountry img')[0].src = countries[index][1];
document.querySelectorAll('.currentCountry img')[1].src = countries[index][3];
for (let i=4; i<countries[index].length;i++) 
    document.querySelectorAll('.currentCountry h2')[i-4].innerHTML = countries[index][i];
}, 500);

setTimeout(function() {
document.querySelector('.currentCountry').style.display = 'block';
document.querySelector('.currentCountry').style.opacity = 1;
}, 500);
}
}