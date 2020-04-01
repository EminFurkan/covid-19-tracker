import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryArea, VictoryStack } from 'victory';
import '../styles/Graph.css';

export const Graph = ({ data }) => {

  let countryData;
  
  if (data !== null){
    
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

  } else {
    countryData = [
      { x: 1, y: 90000, fill: "rgb(255, 244, 137)"},
      { x: 2, y: 55000, fill: "rgb(250, 87, 193)"},
      { x: 3, y: 35000, fill: "rgb(177, 102, 204)" },
      { x: 4, y: 73600, fill: "rgb(117, 114, 255)"},
      { x: 5, y: 82600, fill: "rgb(105, 166, 249)" },
    ];
  }

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
      
      {/* <VictoryChart>
        <VictoryStack>
          <VictoryArea
            data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}]}
          />
          <VictoryArea
            data={[{x: "a", y: 1}, {x: "b", y: 4}, {x: "c", y: 5}]}
          />
          <VictoryArea
            data={[{x: "a", y: 3}, {x: "b", y: 2}, {x: "c", y: 6}]}
          />
        </VictoryStack>
      </VictoryChart> */}
    </div>
  )
}