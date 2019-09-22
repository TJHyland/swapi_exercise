const axios = require('axios')

const getPeople = (url) => {
  try {
    return axios.get(url)
  } catch (error) {
    console.log(error)
  }
}

const postPeople = async (url) => {
  const people = getPeople(url)
    .then(response =>{
      if (response.data) {
        peopleArrayPrep(response.data.results)
      }
      if (response.data.next){
        postPeople(response.data.next)
      } else {
        // all sort operations are below. Uncomment and run to view lists sorted accordingly.
        // console.log(peopleArray) //unsorted original API call.
        // sortByName(peopleArray)
        // sortByHeight(peopleArray)
        // sortByMass(peopleArray)
      }
    })
    .catch(error =>{
      console.log(error)
    })
  }

function peopleArrayPrep(object){ 
  peopleArray = peopleArray.concat(object);
  }

var peopleArray = []

const sortByName = (peopleArray) => {
  let nameArray = peopleArray.sort( (a, b)  => {
      var A = a.name.toUpperCase();
      var B = b.name.toUpperCase();
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
  console.log(nameArray)
}

const sortByHeight = (peopleArray) => {
  let heightArray = peopleArray.sort( (a, b)  => {
    var A = a.height;
    var B = b.height;
    if (A-B < 0) {
      return -1;
    }
    if (A-B > 0) {
      return 1;
    }
    if (isNaN(A) && isNaN(B)) {
      return 0;
    }
    if (isNaN(A-B) && isNaN(A)) {
      return 1;
    }
    if (isNaN(A-B) && isNaN(B)) {
      return -1;
    }
    return 0;
  });
  console.log(heightArray)
}

const sortByMass = (peopleArray) => {
  let massArray = peopleArray.sort( (a, b)  => {
    var A = a.mass.replace(/,\s?/g, ""); //curse jabba the hut and the comma in his mass
    var B = b.mass.replace(/,\s?/g, "");
    if (A-B < 0) {
      return -1;
    }
    if (A-B > 0) {
      return 1;
    }
    if (isNaN(A) && isNaN(B)) {
      return 0;
    }
    if (isNaN(A-B) && isNaN(A) && !isNaN(B)) {
      return 1;
    }
    if (isNaN(A-B) && isNaN(B) && !isNaN(A)) {
      return -1;
    }
    return 0;
  });
  console.log(massArray)
}

postPeople('https://swapi.co/api/people/')