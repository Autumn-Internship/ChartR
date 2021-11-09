let drawCityArray = [["City", "GMP", "Population"]];

async function fetchAll() {
  try {
    const response = await fetch("https://chart-r.herokuapp.com/citiesData");
    const data = await response.json();
    allCities = data;
    parseCities(allCities);
    drawMarkersMap();
  } catch (err) {
    alert("Connection timed out. Please refresh the page!");
  }
}

function parseCities(arr) {
  arr.reduce((drawCityArray, elem) => {
    drawCityArray.push(Object.values(elem));
    return drawCityArray;
  }, drawCityArray);
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
    width: 650,
    height: 425,
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
