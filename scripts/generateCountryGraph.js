//DECLARE ARRAYS
let allCountry = [],
  allHDI = [],
  allInflation = [],
  allAGS = [],
  allGDP = [],
  allPerCapita = [],
  allGINI = [],
  allUnemployment = [],
  allANS = [];

async function fetchAll() {
  //FETCHING ALL DATA AND ADDING IT INTO THE ALLCOUNTRY ARRAY
  try {
    const response = await fetch("http://localhost:3000/countriesData");
    const data = await response.json();
    allCountry = data;
  } catch (err) {
    alert("Server connection failed");
  }
}

async function fetchNow() {
  //USING THE ABOVE-FETCHED DATA TO EXTRACT ITS FIELDS INTO SPECIALIZED ARRAYS
  await fetchAll();
  for (let i = 0; i < allCountry.length; i++) {
    allHDI.push(allCountry[i]["HDI"]);
    allInflation.push(allCountry[i]["Inflation"]);
    allAGS.push(allCountry[i]["Average Gross Salary"]);
    allGDP.push(allCountry[i]["GDP (PPP)"]);
    allPerCapita.push(allCountry[i]["Per Capita (PPP)"]);
    allGINI.push(allCountry[i]["GINI"]);
    allUnemployment.push(allCountry[i]["Unemployment"]);
    allANS.push(allCountry[i]["Average Net Salary"]);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  //POPULATE THE ARRAYS WHEN PAGE LOADS
  fetchNow();
});

function percentile(arr, n, pos) {
  //CALCULATE THE NORMAL PERCENTILE
  let count = 0;
  for (let j = 0; j < n; j++) {
    if (pos > arr[j]) {
      count++;
    }
  }
  let percent = (count * 100) / (n - 1);

  return percent;
}

function percentileInv(arr, n, pos) {
  //CALCULATE THE INVERSE PERCENTILE, FOR STATS WHERE WE WANT LOWER VALUES (E.G. INFLATION, UNEMPLOYMENT)
  let count = 0;
  for (let j = 0; j < n; j++) {
    if (pos < arr[j]) {
      count++;
    }
  }
  let percent = (count * 100) / (n - 1);

  return percent;
}

let firstCountry = [],
  secondCountry = [];

async function fetchIt() {
  //FETCH DATA FOR THE TWO USER-SELECTED COUNTRIES AND POPULATING OTHER ARRAYS
  try {
    let select = document.getElementById("country1");
    const callCountry1 = select.options[select.selectedIndex].text;
    let response = await fetch(
      `http://localhost:3000/countriesData/${callCountry1}`
    );
    let data = await response.json();
    firstCountry = data;

    select = document.getElementById("country2");
    const callCountry2 = select.options[select.selectedIndex].text;
    response = await fetch(
      `http://localhost:3000/countriesData/${callCountry2}`
    );
    data = await response.json();
    secondCountry = data;
  } catch (err) {
    alert("Server connection failed");
  }
}

async function generateCountryGraph() {
  //MAIN FUNCTION WHERE WE DRAW THE CHARTS
  await fetchIt();

  if (typeof radarChart !== "undefined") radarChart.destroy();

  const data = {
    labels: [
      "HDI",
      "Inflation",
      "Average Gross Salary",
      "GDP",
      "GDP per Capita",
      "GINI",
      "Unemployment",
      "Average Net Salary",
    ],
    datasets: [
      {
        label: firstCountry["id"],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        data: [
          percentile(allHDI, allHDI.length, firstCountry["HDI"]),
          percentileInv(
            allInflation,
            allInflation.length,
            firstCountry["Inflation"]
          ),
          percentile(
            allAGS,
            allAGS.length,
            firstCountry["Average Gross Salary"]
          ),
          percentile(allGDP, allGDP.length, firstCountry["GDP (PPP)"]),
          percentile(
            allPerCapita,
            allPerCapita.length,
            firstCountry["Per Capita (PPP)"]
          ),
          percentileInv(allGINI, allGINI.length, firstCountry["GINI"]),
          percentileInv(
            allUnemployment,
            allUnemployment.length,
            firstCountry["Unemployment"]
          ),
          percentile(allANS, allANS.length, firstCountry["Average Net Salary"]),
        ],
      },
      {
        label: secondCountry["id"],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
        data: [
          percentile(allHDI, allHDI.length, secondCountry["HDI"]),
          percentileInv(
            allInflation,
            allInflation.length,
            secondCountry["Inflation"]
          ),
          percentile(
            allAGS,
            allAGS.length,
            secondCountry["Average Gross Salary"]
          ),
          percentile(allGDP, allGDP.length, secondCountry["GDP (PPP)"]),
          percentile(
            allPerCapita,
            allPerCapita.length,
            secondCountry["Per Capita (PPP)"]
          ),
          percentileInv(allGINI, allGINI.length, secondCountry["GINI"]),
          percentileInv(
            allUnemployment,
            allUnemployment.length,
            secondCountry["Unemployment"]
          ),
          percentile(
            allANS,
            allANS.length,
            secondCountry["Average Net Salary"]
          ),
        ],
      },
    ],
  };

  const config = {
    type: "radar",
    data: data,
    options: {
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 25,
        },
      },
    },
  };

  radarChart = new Chart(myChart, config);
}
