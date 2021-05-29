var mongoose = require('mongoose');

var Schema = mongoose.Schema;

 var recipeSchema = new Schema({
    carbs : Number,
    fiber : Number,
    name : String,
    ingredients : [String],
    satfat: Number,
    calories: Number,
    comments : {type:String, required:true},
    cooktime : Number,
    waittime : Number,
    source : String ,
    tags : [String],
    fat : Number,
    servings : Number,
    protein : Number,
    sugar : Number,
    id : Number,
    preptime : Number,
    instructions :String
});

// Export model.
module.exports = mongoose.model('recipes', recipeSchema);