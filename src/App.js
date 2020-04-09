import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { getCountriesData, getTotalData } from './services/ApiData';
import { Graph } from './components/Graph';
import { Search } from './components/Search';
import { Stats } from './components/Stats';
import { Loader } from './components/Loader';
import { TotalGraph } from './components/TotalGraph';
import { DynamicGraph } from './components/DynamicGraph';

function App() {
  const [dataState, setDataState] = useState({});
  const [totalState, setTotalState] = useState({});

  useEffect(() => {
    const dataHandler = async () => {
      const { result } = await getCountriesData();
      setDataState({res:result});
    }
    dataHandler();
  }, []);

  useEffect(() => {
    const dataHandler = async () => {
      const { result } = await getTotalData();
      setTotalState({res:result});
    }
    dataHandler();
  }, [])

  const inputHandler = input => {
    const res = dataState.res
    .filter(data => new RegExp(`${input}`, 'i')
    .test(data.country));
    setDataState(prevState => {return {...prevState, data:res[0]}});
  }

  let displayData;
  let displayGraph;
  let displayDynamicData;

  if (dataState.data !== undefined){
    displayGraph = (
      <Graph data={ dataState.data }/>
    )
    displayData = (
    <Stats data={ dataState.data } />
    )
  } else {
    displayGraph = (
      totalState.res === undefined ? <Loader /> : <TotalGraph res={ totalState.res } />
    )
    displayData = (
    totalState.res === undefined ? <Loader /> : <Stats data={ totalState.res } />);
  }

  dataState.res !== undefined ? 
  displayDynamicData = (<DynamicGraph data={ dataState.res } />) 
  : displayDynamicData = (<Loader />);

  return (
    <div className="App">
      <div className="container">
        <Search inputHandler={ inputHandler } />
        <section className="infograph">
          { displayGraph }
          { displayData }
        </section>
      </div>
      { displayDynamicData }
    </div>
  );
}

export default App;