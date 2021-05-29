var db = require('./dbcontroller');

exports.recipe_name = async(req, res) => {
    try {
        await db.recipe_names(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_id = async(req, res) => {
    try {
        await db.recipe_ids(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_preptime = async(req, res) => {
    try {
        await db.recipe_preptimess(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_calories = async(req, res) => {
    try {
        await db.recipe_caloriess(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_ingredients = async(req, res) => {
    try {
        await db.recipe_ingredientss(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_tags = async(req, res) => {
    try {
        await db.recipe_tagss(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_add_post = async(req, res) => {
    try {
        await db.recipe_add_posts(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_add_put = async(req, res) => {
    try {
        await db.recipe_add_puts(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_patch = async(req, res) => {
    try {
        await db.recipe_patchs(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}

exports.recipe_delete = async(req, res) => {
    try {
        await db.recipe_deletes(req,res);
    }
    catch(error){
        res.send({'error':'Error in calling dbcontroller.'});  
    }
    
}
