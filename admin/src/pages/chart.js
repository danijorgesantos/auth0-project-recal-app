import React from "react";

//import the desired component from the Chart.js library
import { Line } from "react-chartjs-2";

//construct the data object using the appropriate properties and data set 
const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Items returned',
      fill: false,
      backgroundColor: '#8C1919',
      borderColor: '#8C1919',
      pointBorderColor: '#8C1919',
      pointRadius: 1,
      data: [100, 200, 300, 400, 200, 300, 600, 800, 500, 400, 500, 800]
    }
  ]
}


let hello = {
  legend: {
    display: false
  },
  scales:
  {
    xAxes: [{
      gridLines: {
        display: false,
        color: "black"
      },
      scaleLabel: {
        display: true,
        labelString: "Months",
        fontColor: "#b30000"
      }
    }],
    yAxes: [{
      gridLines: {
        display: false
      },
      scaleLabel: {
        display: false,
        labelString: "Speed in Miles per Hour",
        fontColor: "#b30000"
      }
    }]
  }
}

const ChartPage = () => {

  return (
    <div>
      <Line options={hello} data={lineData} />
    </div>
  )
}

export default ChartPage