const db = require('../models/starWarsModels');

const starWarsController = {};

const parser = JSON.stringify;

starWarsController.getCharacters = (req, res, next) => {
  // create a variable to store my SQL query
  const query = `
    SELECT people.*, species.name AS species, planets.name AS homeworld
    FROM people LEFT OUTER JOIN species
    ON people.species_id = species._id
    LEFT OUTER JOIN planets
    ON people.homeworld_id = planets._id
  `;
  // send a query to the database to get characters from the 'people' table
  db.query(query)
    .then(characters => {
      res.locals.characters = characters.rows;
      return next();
    })
    .catch(error => {
      const errorObj = {
        log: `starWarsController.getMoreCharacters: ${error.message}`,
        message: { err: 'starWarsController.getMoreCharacters: ERROR: Check server logs for details' }
      };
      return next(errorObj);
    })
}

starWarsController.getSpecies = (req, res, next) => {
  // write code here
  const { id } = req.query;
  const query = `
    SELECT species.*, planets.name
    FROM species LEFT OUTER JOIN planets
    ON species.homeworld_id = planets._id
    WHERE species._id = $1;
  `;
  const values = [id];
  db.query(query, values)
    .then(species => {
      res.locals.species = species.rows[0];
      return next();
    })
    .catch(error => {
      const errorObj = {
        log: `starWarsController.getSpecies: ${error.message}`,
        message: { err: 'starWarsController.getSpecies: ERROR: Check server logs for details' }
      };
      return next(errorObj);
    })
}

starWarsController.getHomeworld = (req, res, next) => {
  // write code here
  const { id } = req.query;
  console.log(`Here is the id from getHomeword => ${id}`);
  const query = `
    SELECT * 
    FROM planets
    WHERE planets._id = $1;
  `;
  const values = [id];

  db.query(query, values)
  .then(homeworld => {
    res.locals.homeworld = homeworld.rows[0];
    return next();
    })
    .catch(error => {
      const errorObj = {
        log: `starWarsController.getHomeworld: ${error.message}`,
        message: { err: 'starWarsController.getHomeworld: ERROR: Check server logs for details' }
      };
      return next(errorObj);
    })


}

starWarsController.getFilm = (req, res, next) => {
  // write code here

  next();
}

starWarsController.addCharacter = (req, res, next) => {
  // write code here
  console.log(`Here is the incoming request to addCharacter => ${parser(req.body)}`);
  const { name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height } = req.body;
  const query = `
    INSERT INTO people(name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `;
  const values = [ name, mass, hair_color, skin_color, eye_color, birth_year, gender, species_id, homeworld_id, height ];
  db.query(query, values)
    .then(response => {
      console.log(`Here is the response for a successfuly query => ${response}`);
      return next();
    })
    .catch(error => {
      const errorObj = {
        log: `starWarsController.getHomeworld: ${error.message}`,
        message: { err: 'starWarsController.getHomeworld: ERROR: Check server logs for details' }
      };
      return next(errorObj);
    });
}

module.exports = starWarsController;
