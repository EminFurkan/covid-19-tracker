import axios from 'axios';
const API_KEY = process.env.REACT_APP_API_KEY

export const getTotalData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': API_KEY,
    }
  }
  try {
    const res = await axios.get('https://api.collectapi.com/corona/totalData', config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const getAllData = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': API_KEY,
    }
  }
  try {
    const res = await axios.get('https://api.collectapi.com/corona/countriesData', config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}