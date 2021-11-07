let arrayExtDebt = [["Country","External Debt"]];

async function fetchExtDebt() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseExtDebt(allCountries);
    drawExtDebtMap();
  } catch (err) {
    alert("Server connection failed");
  }
}

function parseExtDebt(arr) {
  arr.reduce((arrayExtDebt, elem) => {
    arrayExtDebt.push([elem.id, elem["External Debt"]]);
    return arrayExtDebt;
  }, arrayExtDebt);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchExtDebt();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawExtDebtMap() {
  var data = google.visualization.arrayToDataTable(arrayExtDebt);

  var options = {
    region: "150",
    colorAxis: {
      colors: ["#DF2935","#E63946", "#F9DC5C","#8AEA92","#3F784C"],
    },
    legend: "none",
    keepAspectRatio: false,
    height: 400,
    width: 625,
    backgroundColor: {
      stroke: "black",
      strokeWidth: 5,
    },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("learnEXTDEB")
  );

  chart.draw(data, options);
}