import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryTheme, VictoryGroup, VictoryBar } from 'victory';

export const DynamicGraph = ({ data }) => {

  const [currentDataSet, setCurrentDataSet] = useState([]);

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
    <>
    <ul className="list">
      <li>Total Cases</li>
      <li>Total Recovered</li>
      <li>Total Deaths</li>
    </ul>
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
              offset={30}
              style={{
                data: { width: 6 },
                labels: { fill: "#ddd", fontSize: 10 }
              }}
              key={index}
              colorScale={[
                "#375e92",
                "#fb6542",
                "#ffbb00",
              ]}
            >
              <VictoryBar
                data={[
                  { x: item.country,
                    y: Number(item.totalCases),
                    label: item.totalCases 
                  },
                ]}
              />
              <VictoryBar
                data={[
                  { x: item.country,
                    y: Number(item.totalRecovered),
                    label: item.totalRecovered
                  },
                ]}
              />
              <VictoryBar
                data={[
                  { x: item.country,
                    y: Number(item.totalDeaths),
                    label: item.totalDeaths
                  },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
        )
      }
    </div>
    </>
  )
}