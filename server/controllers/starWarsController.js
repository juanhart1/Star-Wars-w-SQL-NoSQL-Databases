const db = require('../models/starWarsModels');

const starWarsController = {};

const parser = JSON.stringify;

// this is where we create a piece of middleware that pulls all of our character information from the 'people' table as well as any matching data from the 'species' table & the 'planets', based on the '_id', 
starWarsController.getCharacters = (req, res, next) => {
  // create a variable to store my SQL query
  const query = `
    SELECT people.*, species.name AS species, planets.name AS homeworld
    FROM people LEFT OUTER JOIN species
    ON people.species_id = species._id
    LEFT OUTER JOIN planets
    ON people.homeworld_id = planets._id
  `;
  // send above query to the database
  db.query(query)
    // use .then handler to handle successful resolution of Promise returned from db.query
    .then(characters => {
      //assign the result of the query to the res.locals object at a property named 'characters'
      res.locals.characters = characters.rows;
      // use return keyword to end the thread of execution and move on to the next piece of middleware
      return next();
    })
    // use .catch handler to handle the unsuccessful resolution of Promise returned from db.query
    .catch(error => {
      // create error object specific to this error in this middleware
      const errorObj = {
        log: `starWarsController.getMoreCharacters: ${error.message}`,
        message: { err: 'starWarsController.getMoreCharacters: ERROR: Check server logs for details' }
      };
      // use return keyword to end the thread of execution and invoke the next piece of middleware with the error object, causing Express to invoke the global error handler with that error object
      return next(errorObj);
    })
};

// this is where we create a piece of middleware that will retrieve the species of a certain character by querying the database at the 'species' table, looking for a specific row where the '_id' matches the one received as a route parameter
starWarsController.getSpecies = (req, res, next) => {
  // Due to 'id' coming over in the actual 'url' quering string, it is available in req.query as opposed to req.param
  const { id } = req.query;
  // create a variable to store my SQL query
  const query = `
    SELECT species.*, planets.name
    FROM species LEFT OUTER JOIN planets
    ON species.homeworld_id = planets._id
    WHERE species._id = $1;
  `;
  //create a 'values' array to store parameters for parameterirzed query
  const values = [id];
  // send above query to the database with necessary parameters
  db.query(query, values)
  // use .then handler to handle successful resolution of Promise returned from db.query
    .then(species => {
      //assign the result of the query to the res.locals object at a property named 'species'
      res.locals.species = species.rows[0];
      // use return keyword to end the thread of execution and move on to the next piece of middleware
      return next();
    })
    // use .catch handler to handle the unsuccessful resolution of Promise returned from db.query
    .catch(error => {
      // create error object specific to this error in this middleware
      const errorObj = {
        log: `starWarsController.getSpecies: ${error.message}`,
        message: { err: 'starWarsController.getSpecies: ERROR: Check server logs for details' }
      };
      // use return keyword to end the thread of execution and invoke the next piece of middleware with the error object, causing Express to invoke the global error handler with that error object
      return next(errorObj);
    })
};

// this is where we create a piece of middleware that will retrieve the homeworld of a certain character by querying the database at the 'planets' table, looking for a specific row where the '_id' matches the one received on the query string
starWarsController.getHomeworld = (req, res, next) => {
  // Due to 'id' coming over in the actual 'url' quering string, it is available in req.query as opposed to req.param
  const { id } = req.query;
  // this is the SQL query that will pull all rows from the 'planets' table where the '_id' is equal to the 'id' taken in from the query string
  const query = `
    SELECT * 
    FROM planets
    WHERE planets._id = $1;
  `;
  //create a 'values' array to store parameters for parameterirzed query
  const values = [id];
  // send above query to the database with necessary parameters
  db.query(query, values)
    // use .then handler to handle successful resolution of Promise returned from db.query
    .then(homeworld => {
      //assign the result of the query to the res.locals object at a property named 'homeworld'
      res.locals.homeworld = homeworld.rows[0];
      // use return keyword to end the thread of execution and move on to the next piece of middleware
      return next();
    })
    // use .catch handler to handle the unsuccessful resolution of Promise returned from db.query
    .catch(error => {
      // create error object specific to this error in this middleware
      const errorObj = {
        log: `starWarsController.getHomeworld: ${error.message}`,
        message: { err: 'starWarsController.getHomeworld: ERROR: Check server logs for details' }
      };
      // use return keyword to end the thread of execution and invoke the next piece of middleware with the error object, causing Express to invoke the global error handler with that error object
      return next(errorObj);
    })
};

// this is where we create a piece of middleware designed to take information received in the request body from the client and insert it into our 'people' table to create a new character
starWarsController.addCharacter = (req, res, next) => {
  // use destructuring to pull off all of the values needed to properly insert into 'people' table
  const { name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height } = req.body;
  // create a query where I insert into the 'people' table at all of it columns and then pass the values to be added using the parameterized query syntax => I will then return that same information that I just inserted
  const query = `
  INSERT INTO people(name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING *
  `;
  //create a 'values' array to store parameters for parameterirzed query
  const values = [name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height];
  db.query(query, values)
  // use .then handler to handle successful resolution of Promise returned from db.query
  .then(response => {
    //assign the result of the query to the res.locals object at a property named 'character'
    res.locals.character = response.rows[0];
    // use return keyword to end the thread of execution and move on to the next piece of middleware
    return next();
  })
  // use .catch handler to handle the unsuccessful resolution of Promise returned from db.query
  .catch(error => {
    // create error object specific to this error in this middleware
    const errorObj = {
      log: `starWarsController.getHomeworld: ${error.message}`,
      message: { err: 'starWarsController.getHomeworld: ERROR: Check server logs for details' }
    };
    // use return keyword to end the thread of execution and invoke the next piece of middleware with the error object, causing Express to invoke the global error handler with that error object
    return next(errorObj);
    });
};






starWarsController.getFilm = (req, res, next) => {
  // write code here

  next();
}

module.exports = starWarsController;
