let arrayHDI = [["Country", "HDI"]];

async function fetchHDI() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseHDI(allCountries);
    drawHDIMap();
  } catch (err) {
    alert("Server connection failed");
  }
}

function parseHDI(arr) {
  arr.reduce((arrayHDI, elem) => {
    arrayHDI.push([elem.id, elem['HDI']]);
    return arrayHDI;
  }, arrayHDI);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchHDI();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawHDIMap() {
  var data = google.visualization.arrayToDataTable(arrayHDI);

  var options = {
    region: "150",
    colorAxis: {
      colors: [  "#DF2935","#E63946", "#F9DC5C","#8AEA92","#3F784C"],
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
    document.getElementById("learnHDI")
  );

  chart.draw(data, options);
}