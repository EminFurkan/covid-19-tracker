import React from 'react';
import { VictoryPie } from 'victory';
import '../styles/TotalGraph.css';

export const TotalGraph = ({ res }) => {

  res = Object.entries(res)
  .map(item => item = [item[0] ,item[1] = item[1].replace(/,/g, '')])
  .reduce((acc, [k,v]) => {
    acc[k] = v;
    return acc
  }, {});

  let totalData = [
    { x: 1, y: Number(`${res.totalDeaths}`), label: "Total Deaths" },
    { x: 2, y: Number(`${res.totalCases}`), label: "Total Cases" },
    { x: 3, y: Number(`${res.totalRecovered}`), label: "Total Recovered" }
  ];

  return (
    <div className="total">
      <VictoryPie
        animate={{
          duration: 2000
        }}
        style={{ labels: { fill: "#ddd", fontSize: 12 } }}
        // innerRadius={100}
        data={ totalData }
      />
    </div>
  )
}