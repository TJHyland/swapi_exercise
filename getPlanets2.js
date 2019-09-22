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
        planetArrayPrep(response.data.results)
      }
      if (response.data.next){
        postPlanets(response.data.next)
      } else {
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
  planetArray.forEach(planet => {
    planet.residents.forEach(resident => {
      getResident(resident)
      .then(response => {
        // console.log(resident);
        // console.log(response.data.name);
        resident = response.data.name
      })
      .catch(error => {
        console.log(error)
      })
    });
  });
  displayPlanetArray();
}

const getResident = (resident) => {
  try {
    return axios.get(resident)
  } catch (error) {
    console.log(error)
  } 
}

const displayPlanetArray = () => {
  console.log(planetArray)
}

postPlanets('https://swapi.co/api/planets/')