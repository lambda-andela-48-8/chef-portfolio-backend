import express from 'express';
import recipeController from '../controllers/recipe';
import tokenHandler from '../utils/tokenHandler';

const router = express.Router();

router.post('/recipe', tokenHandler.verifyToken, recipeController.postRecipe);
router.get('/recipe', recipeController.getRecipes);

export default router;
