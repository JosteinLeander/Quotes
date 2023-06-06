//funksjoner som genererer og verifiserer JWT
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

//Variabler i .env filen
dotenv.config();
const secretKey = process.env.SECRET_KEY;

//Generer en token som varer i en time
const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token ;
};

//Sjekker om bruker er den innloggede brukeren som får se siden
const verifyUser = async (req) => {
  //Henter token fra header(req) og fjerner de 6 første tegnene, så jeg bare får verdien til token
  const token = req.headers['cookie'].substring(6);
  console.log(token);

  //sjekker om det er en gyldig token, og hvis deter det så får jeg tak i id til bruker
   let userId = 0;
   jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return false;
    } else {
      userId = decoded.userId;
    }
   });

   if (userId != 0) {
    try {
      //Prøver å finne brukeren i databasen med id fra token ovenfor
      const userInDB = await User.findById(userId);
      //Henter ut navnet som html sier at den vil se siden til
      let user = req.params.user;
      
      //Sjekker om brukerem som er i databasen med token id er lik den som brukeren ønsker å se
      //Er det samme bruker, så returnerer den true
      if (user === userInDB.username) {
        return true;
      }
    }
    catch (err) {
      return false;
    };
   };
};

module.exports = { generateToken, verifyUser };