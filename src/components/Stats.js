import React from 'react';
import '../styles/Stats.css';

export const Stats = ({ data }) => {

  return (
    <div className="stats">
      <h3>{ data.country }</h3>
      <ul>
        <li><span></span> Total Cases &nbsp;{ data.totalCases }</li>
        <li><span></span> Total Deaths &nbsp;{ data.totalDeaths }</li>
        <li><span></span> Total Recovered &nbsp;{ data.totalRecovered }</li>
        <li><span></span> New Cases &nbsp;{ data.newCases }</li>
        <li><span></span> Active Cases &nbsp;{ data.activeCases }</li>
      </ul>
    </div>
  )
}