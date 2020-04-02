import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme} from 'victory';
import '../styles/Graph.css';

export const Graph = ({ data }) => {

  let countryData;

  data = Object.entries(data)
  .filter(item => item[1].match(/(\d+(\.\d+)?)/))
  .reduce((acc, [k,v]) => {
    acc[k] = Number(v.replace(',', ''));
    return acc
  }, {});

  data.newCases === undefined ? data.newCases = 0 : data.newCases = data.newCases;

  countryData = [
    { x: 1, y: Number(`${data.totalCases}`), fill: "rgb(255, 244, 137)"},
    { x: 2, y: Number(`${data.totalDeaths}`), fill: "rgb(250, 87, 193)"},
    { x: 3, y: Number(`${data.totalRecovered}`), fill: "rgb(177, 102, 204)" },
    { x: 4, y: Number(`${data.newCases}`), fill: "rgb(117, 114, 255)"},
    { x: 5, y: Number(`${data.activeCases}`), fill: "rgb(105, 166, 249)" }
  ];

  return (
    <div className='graph'>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={ 10 }
      >
      <VictoryBar
      barWidth={ 8 }
      animate={{duration: 500}}
      style={{
        data: {
          fill: ({ datum }) => datum.fill
        }
      }}
      data= { countryData }
      />
      </VictoryChart>
    </div>
  )
}