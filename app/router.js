// @ts-check
const express = require('express');
const santaRouter = express.Router();

const putSantaLetter = require('./controller/putSantaLetterController');

// store santa gift request form children 
santaRouter.post("/santa/putSantaLetter", putSantaLetter.init);

module.exports = santaRouter;
