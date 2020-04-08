import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryBar } from 'victory';
import '../styles/DynamicGraph.css';

export const DynamicGraph = ({ data }) => {

  const [currentDataSet, setCurrentDataSet] = useState(
    [{
      country:'loading',
      totalCases:'12,12',
      totalDeaths:'12,12'
  }]);

  const [currentIndexGap, setCurrentIndexGap] = useState({
    start: 0,
    finish: 6
  });

  data = data
  .map(item => {
    return Object.entries(item)
    .filter(item => item = [item[0], item[1] = item[1].replace(/,/g, '')])
    .reduce((acc, [k,v]) => {
      acc[k] = v.replace(/,/g, '')
      return acc
    }, {});
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndexGap({
        start: currentIndexGap.finish,
        finish: (currentIndexGap.finish + 6) % data.length
      })
      setCurrentDataSet(data.slice(currentIndexGap.start, currentIndexGap.finish));
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndexGap.start, currentIndexGap.finish, data]);

  return (
    <div className="dynamic">
      {
        currentDataSet.map((item, index) => 
          <VictoryChart
            width={200} height={200}
            theme={VictoryTheme.material}
            key={index}
          >
            <VictoryGroup
              viewBox={"0 0 100 50"}
              offset={20}
              style={{ data: { width: 4 }, labels: { fill: "#ddd", fontSize: 8 } }}
              key={index}
              colorScale={[
                "#375e92",
                "#fb6542",
                "#ffbb00",
              ]}
            >
              <VictoryBar
                data={[
                  { x: item.country, y: Number(item.totalCases), label: item.totalCases },
                ]}
              />
              <VictoryBar
                data={[
                  { x: item.country, y: Number(item.totalRecovered), label: item.totalRecovered },
                ]}
              />
              <VictoryBar
                data={[
                  { x: item.country, y: Number(item.totalDeaths), label: item.totalDeaths },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
        )
      }
    </div>
  )
}