import React from 'react';
import '../styles/Search.css';

export const Search = ({ inputHandler }) => {

  const onSubmit = e => {
    if (e.key === 'Enter'){
      inputHandler(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
      e.target.value = '';
    }
  }

  return (
    <input type="text" placeholder="Enter the country name" onKeyPress={onSubmit} />
  )
}