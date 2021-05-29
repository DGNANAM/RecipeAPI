var express = require('express');
var router = express.Router();
var recipe_controller = require('../recipecontroller'); 
 
router.get('/recipe/search/name/:name', recipe_controller.recipe_name);
router.get('/recipe/:id', recipe_controller.recipe_id);
router.get('/recipe/search/preptime',recipe_controller.recipe_preptime);
router.get('/recipe/search/calories',recipe_controller.recipe_calories);
router.get('/recipe/search/ingredients',recipe_controller.recipe_ingredients);
router.get('/recipe/search/tags',recipe_controller.recipe_tags);

router.post('/recipe',recipe_controller.recipe_add_post);
router.put('/recipe',recipe_controller.recipe_add_put);
router.patch('/recipe/:id',recipe_controller.recipe_patch);
router.delete('/recipe/:id',recipe_controller.recipe_delete);

module.exports = router;