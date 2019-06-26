import models from '../models/index';

const { User } = models;

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
}

export default recipeController;
