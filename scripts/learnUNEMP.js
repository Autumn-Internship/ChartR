let arrayUnemp = [["Country", "Unemployment"]];

async function fetchUnemp() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/countriesData");
    const data = await response.json();
    allCountries = data;
    parseUnemp(allCountries);
    drawUnempMap();
  } catch (err) {
    alert("Server connection failed");
  }
}

function fetchUnemp(arr) {
  arr.reduce((arrayUnemp, elem) => {
    arrayUnemp.push([elem.id, elem['Unemployment']]);
    return arrayUnemp;
  }, arrayUnemp);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchUnemp();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawUnempMap() {
  var data = google.visualization.arrayToDataTable(arrayUnemp);

  var options = {
    region: "150",
    colorAxis: {
      colors: ["#3F784C", "#8AEA92", "#F9DC5C", "#E63946", "#DF2935"],
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
    document.getElementById("learnUNEMP")
  );

  chart.draw(data, options);
}
