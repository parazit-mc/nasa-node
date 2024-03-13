/**
 * counts asteroids seen in certain period of time
**/
const buildUri = require('./helpers');

const uri = buildUri();

fetch(uri)
.then(response=>response.json())
.then(data => 
    console.log(`Asteroid number is ${data.element_count}`)
)
.catch(error => console.log(error.message))


