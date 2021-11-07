let arrayExport = [["Country", "Exports"]];

async function fetchExport() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseExport(allCountries);
    drawExportsMap();
  } catch (err) {
    alert("Server connection failed");
  }
}

function parseExport(arr) {
  arr.reduce((arrayExport, elem) => {
    arrayExport.push([elem.id, elem["Exports"]]);
    return arrayExport;
  }, arrayExport);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchExport();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawExportsMap() {
  var data = google.visualization.arrayToDataTable(arrayExport);

  var options = {
    region: "150",
    colorAxis: {
      colors: ["#DF2935", "#E63946", "#F9DC5C", "#8AEA92", "#3F784C"],
      maxValue: 0.8,
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
    document.getElementById("learnEXP")
  );

  chart.draw(data, options);
}
