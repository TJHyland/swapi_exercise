const axios = require('axios')

const getPlanets = (url) => {
  try {
    return axios.get(url)
  } catch (error) {
    console.log(error)
  }
}

const postPlanets = async (url) => {
    getPlanets(url)
    .then(response =>{
      if (response.data) {
        // console.log(response.data.results);
        planetArrayPrep(response.data.results)
      }
      if (response.data.next){
        postPlanets(response.data.next)
      } else {
        // console.log(planetArray);
        // console.log(planetArray.length);
        cleanupPlanetArray(planetArray);
      }
    })
    .catch(error =>{
      console.log(error)
    })
  }

var planetArray = []

function planetArrayPrep(object){ 
  planetArray = planetArray.concat(object);
 }

 const cleanupPlanetArray = (planetArray) => {
  // console.log(planetArray[0]); 
  planetArray.forEach(listResidents);
  // console.log(planetArray[0]);
 }

const listResidents = (planet) => {
  // console.log(planet.name);
  // console.log(planet.residents);
  planet.residents.forEach(replaceResident);
}

const getResident = (resident) => {
  try {
    return axios.get(resident)
  } catch (error) {
    console.log(error)
  } 
}

const replaceResident = (resident) => {
  getResident(resident)
  .then(response =>{ 
    console.log(resident)
    console.log(response.data.name)
  })
  .catch(error =>{
    console.log(error)
  })
}

postPlanets('https://swapi.co/api/planets/')