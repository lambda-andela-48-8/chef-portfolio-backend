import express from 'express';
import recipeController from '../controllers/recipe';
import tokenHandler from '../utils/tokenHandler';

const router = express.Router();

router.post('/recipe', tokenHandler.verifyToken, recipeController.postRecipe);

export default router;
