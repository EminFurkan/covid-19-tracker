import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryBar } from 'victory';

export const DynamicGraph = ({ data }) => {
  
  const [currentDataSet, setCurrentDataSet] = useState([{country:'Loading', totalCases:'loading', totalDeaths:'loading' }]);
  const [currentIndexGap, setCurrentIndexGap] = useState({
    start: 0,
    finish: 5
  });

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndexGap({
        start: currentIndexGap.finish,
        finish: (currentIndexGap.finish + 5) % data.length
      })
      setCurrentDataSet(data.slice(currentIndexGap.start, currentIndexGap.finish));
    }, 6000)
  }, [currentIndexGap.start, currentIndexGap.finish, data]);

  return (
    <div className="dynamic">
      <VictoryChart
        theme={VictoryTheme.material}
        width={500} height={350}
      >
        {
          currentDataSet.map((item,index) =>
            <VictoryGroup
            viewBox={"0 0 500 350"}
            offset={20}
            style={{ data: { width: 6 }, labels: { fill: "#ddd", fontSize: 10 } }}
            key={index}
            colorScale={[
              "rgb(255, 244, 137)",
              "rgb(250, 87, 193)",
              "rgb(177, 102, 204)",
            ]}
          >
            <VictoryBar
              data={[
                { x: item.country, y: item.totalDeaths , label: item.totalDeaths},
            ]}
            />
            <VictoryBar
              data={[
                { x: item.country, y: item.totalRecovered, label: item.totalRecovered },
              ]}
            />
            <VictoryBar
              data={[
                { x: item.country, y: item.totalCases, label: item.totalCases },
              ]}
            />
          </VictoryGroup>
          )
        }
      </VictoryChart>
    </div>
  )
}