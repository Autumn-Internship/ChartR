function generateBarChart() {
  let labels = [];
  let sortedGDP = allGDP.sort();
  let highestGDPs = sortedGDP
    .slice(sortedGDP.length - 5, sortedGDP.length)
    .reverse();
  console.log(highestGDPs);
  for (i = 0; i < allCountry.length; i++)
    for (j = 0; j < highestGDPs.length; j++)
      if (allCountry[i]["GDP (PPP)"] === highestGDPs[j])
        labels.push(allCountry[i]["id"]);

  if (typeof chart !== "undefined") chart.destroy();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "GDP (PPP - Trillion $)",
        data: highestGDPs,
        backgroundColor: [
          "rgba(255, 99, 132, 0.25)",
          "rgba(255, 159, 64, 0.25)",
          "rgba(255, 205, 86, 0.25)",
          "rgba(75, 192, 192, 0.25)",
          "rgba(54, 162, 235, 0.25)",
          "rgba(153, 102, 255, 0.25)",
          "rgba(201, 203, 207, 0.25)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  };

  chart = new Chart(barChart, config);
}
