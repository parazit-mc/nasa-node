/**
 * counts asteroids seen in specified period of time
 * moving envs to a .env file
**/

const buildUri = require('../helpers/helpers');

const uri = buildUri();

fetch(uri)
.then(response=>response.json())
.then(data => 
    console.log(`Asteroid number is ${data.element_count}`)
)
.catch(error => console.log(error.message))

