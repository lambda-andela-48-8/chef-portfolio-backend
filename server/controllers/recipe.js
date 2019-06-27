import models from '../models/index';

const { Recipe, User } = models;

class recipeController {
  static async postRecipe(req, res) {
    const {
      title, image, mealType, ingredients, instructions
    } = req.body;
    const { sub } = req.user;
    if (!title || !mealType || !ingredients) {
      return res.status(422).json({
        status: 'failed',
        error: 'please provide values for title, mealType and ingredients',
      });
    }
    try {
      const user = await User.findByPk(sub);
      if (!user) {
        return res.status(404).json({
          status: 'failed',
          error: 'chef does not exist'
        });
      }
      const createdRecipe = await user.createRecipe({
        chefName: `${user.firstName} ${user.lastName}`,
        title,
        image,
        mealType,
        ingredients,
        instructions,
      });
      if (!createdRecipe) {
        return res.status(422).json({
          status: 'failed',
          error: 'could not create recipe'
        });
      }
      return res.status(201).json({
        status: 'success',
        data: createdRecipe
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'unable to post recipe'
      });
    }
  }

  static async getRecipes(req, res) {
    try {
      const recipes = await Recipe.findAll();
      return res.status(200).json({
        status: 'success',
        data: recipes
      });
    } catch (error) {
      return res.status(400).json({
        status: 'failed',
        error: 'unable to get recipes'
      });
    }
  }
}

export default recipeController;
