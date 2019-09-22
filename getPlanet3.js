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

 const cleanupPlanetArray = (planArray) => { 
  planArray.forEach(function(planet, index) {
    var planetIndex = index
    planet.residents.forEach(function(resident, index) {
      var residentIndex = index
      getResident(resident)
      .then(response => {
        planetArray[planetIndex].residents[residentIndex] = response.data.name
      })
      .catch(error => {
        console.log(error)
      })
    });
  });
  // I'm unhappy using a timeout function here, however I can't seem to get the planet array to display until after I make all the resident API calls. I tried using promises and .then() but the display function would still call instantly. I think it has something to do with the resident API call being in the middle of a function. Depending on the speed of your machine you may have to adjust the delay for the names to display properly.
  setTimeout(function() {
    displayPlanetArray()
  }, 5000);
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