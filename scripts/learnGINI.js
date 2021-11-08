let arrayGINI = [["Country", "GINI"]];
let width = window.innerWidth;

async function fetchGINI() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseGINI(allCountries);
    drawGINIMap();
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

function parseGINI(arr) {
  arr.reduce((arrayGINI, elem) => {
    arrayGINI.push([elem.id, elem.GINI]);
    return arrayGINI;
  }, arrayGINI);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchGINI();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawGINIMap() {
  var data = google.visualization.arrayToDataTable(arrayGINI);
  var options = {
    region: "150",
    colorAxis: {
      colors: ["#3F784C", "#8AEA92", "#F9DC5C", "#E63946", "#DF2935"],
    },
    legend: "none",
    width: 0.4 * width,
    backgroundColor: {
      stroke: "black",
      strokeWidth: 5,
    },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("learnGINI")
  );

  chart.draw(data, options);
}
