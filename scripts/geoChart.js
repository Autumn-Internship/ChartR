var allCities = [];
let drawCityArray = [["City", "GMP", "Population"]];

async function fetchAll() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/citiesData");
    const data = await response.json();
    allCities = data;
    parseCities();
    drawMarkersMap();
  } catch (err) {
    alert("Server connection failed");
  }
}

function parseCities() {
  allCities.reduce((allCities, elem) => {
    drawCityArray.push(Object.values(elem));
  }, []);
}

window.addEventListener("DOMContentLoaded", () => {
  fetchAll();
});

google.charts.load("current", {
  packages: ["geochart"],
  mapsApiKey: "AIzaSyCFI15YTgkjpnyxsiPzvteXXWn3Gge4G4s",
});

function drawMarkersMap() {
  var data = google.visualization.arrayToDataTable(drawCityArray);

  var options = {
    region: "150",
    displayMode: "markers",
    colorAxis: {
      colors: ["royalblue", "crimson"],
      maxValue: 300,
    },
    keepAspectRatio: false,
    backgroundColor: {
      stroke: "black",
      strokeWidth: 5,
    },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("citiesDiv")
  );

  chart.draw(data, options);
}
