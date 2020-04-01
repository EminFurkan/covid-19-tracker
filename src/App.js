import React, { useState, useEffect } from 'react';
import './App.css';
import { Graph } from './components/Graph';
import { Search } from './components/Search';
import { Stats } from './components/Stats';
import { getAllData } from './services/ApiData';

function App() {
  const [dataState, setDataState] = useState({});

  useEffect(() => {
    const dataHandler = async () => {
      const { result } = await getAllData();
      setDataState({res:result});
    }
    dataHandler();
  }, []);
  
  const inputHandler = input => {
    // const res = dataState.filter(data => data.country.includes(input));
    const res = dataState.res.filter(data => new RegExp(`${input}`, 'i').test(data.country));
    setDataState(prevState => {return {...prevState, data:res[0]}});
  }

  let displayData;
  
  if (dataState.data !== undefined){
    displayData = (<Stats data={dataState.data} />)
  } else {
    displayData = (<h3>no data</h3>)
  }

  return (
    <div className="App">
      <div className="container">
        <Search inputHandler={ inputHandler } />
        <section className="infograph">
          <Graph data={ dataState.data !== undefined ? dataState.data : null }/>
          { displayData }
        </section>
      </div>
    </div>
  );
}

export default App;