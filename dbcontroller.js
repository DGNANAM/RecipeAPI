var recipemodel = require('./model');

exports.recipe_names= async(req,response) => {     
    try{ 
        if(req.params.name)
        var recipe_name = req.params.name;
        var recipes = await recipemodel.find({name: { $regex: recipe_name, $options: "i" }}).exec(); 
        if(recipes.length<=0){throw error;}    
        response.send(recipes);
    }
    catch (error) {
        if(error.name === 'CastError')
        response.send({'error':'Error getting name.'});  
        else
        response.send({'error':'Given name not found.'});
      }
}

exports.recipe_ids = async (request, response) => {
    try {
        var recipes = await recipemodel.findOne({id : request.params.id}).exec();
        if(recipes.length<=0){throw error;}
        response.send(recipes);
    } catch (error) {
        if(error.name === 'CastError')
        response.send({'error':'Error getting ID.'});  
        else
        response.send({'error':'Given ID not found.'});
    }
}

exports.recipe_preptimess = async (request, response) => {
    try {
        var [min,max] = request.query.between.split(',');
        var recipes = await recipemodel.find({preptime : {"$gte": min || 0, "$lte": max || 2147483647} }).exec();
        response.send(recipes);
    } catch (error) {
        response.send({'error': error});
    }
}

exports.recipe_caloriess = async (request, response) => {
    try {
        var [min,max] = request.query.between.split(',');
        var recipes = await recipemodel.find({calories : {"$gte":min ||0  , "$lte": max || 2147483647 } }).exec();
        response.send(recipes);
    } catch (error) {
        response.send({'error': error});
    }
}

exports.recipe_ingredientss = async (request, response) => {
    try {
        var and_query=request.query.list.split(",").reduce((acc,v) => { acc.push({"ingredients":{"$regex" : v , "$options" : 'i'}}); return acc; }, []);
        var recipes = await recipemodel.find({$and: and_query}).exec();     
        response.send(recipes);
    } catch (error) {
        response.send({'error': error});
    }
}


exports.recipe_tagss = async (request, response) => {
    try {
        var recipe_tag=request.query.list.split(",").join('|');
        var recipes = await recipemodel.find({tags: { $regex: recipe_tag, $options: "i" }}).exec();
        response.send(recipes);
    } catch (error) {
        response.send({'error': error});
    }
}

exports.recipe_add_posts = async (req, res,next) => {
    var post1 = await recipemodel.find({$or:[{name : req.body.name},{id:req.body.id}]}).exec();
    if(post1.length>0) {return res.send({'error':"Given name or Id already exits"});}
    var post = new recipemodel({
        carbs : req.body.carbs,
        fiber : req.body.fiber,
        name : req.body.name,
        ingredients : req.body.ingredients,
        satfat: req.body.satfat,
        calories: req.body.calories,
        comments : req.body.comments,
        cooktime : req.body.cooktime,
        waittime : req.body.waittime,
        source : req.body.source ,
        tags : req.body.tags,
        fat : req.body.fat,
        servings : req.body.servings,
        protein : req.body.protein,
        sugar : req.body.sugar,
        id : req.body.id,
        preptime : req.body.preptime,
        instructions : req.body.instructions
      })
      post.save(function (err, post) {
        if (err) { return next(err) }
            res.json(post);
      })
}


exports.recipe_add_puts = async (req, res,next) => {
    var put = await recipemodel.find({$and:[{name : req.body.name},{ingredients:req.body.ingredients}]}).exec();
    if(!put.length) {
        var put1 = new recipemodel({
            carbs : req.body.carbs,
            fiber : req.body.fiber,
            name : req.body.name,
            ingredients : req.body.ingredients,
            satfat: req.body.satfat,
            calories: req.body.calories,
            comments : req.body.comments,
            cooktime : req.body.cooktime,
            waittime : req.body.waittime,
            source : req.body.source ,
            tags : req.body.tags,
            fat : req.body.fat,
            servings : req.body.servings,
            protein : req.body.protein,
            sugar : req.body.sugar,
            id : req.body.id,
            preptime : req.body.preptime,
            instructions : req.body.instructions
        })
        put1.save(function (err, put1) {
            if (err) { return next(err) }
            res.json(put1);
        })
    }
    else
    {
        try {
            let query ={$set:{}};
            var key =Object.keys(put);
            var put_value = put[key];
            for (let key in req.body){
                if(put_value[key] !== req.body[key])
                {
                    query.$set[key] = req.body[key];
                }
            }
            const updaterecipe = await recipemodel.updateOne({$or:[{id:req.params.id},{name:req.body.name}]},query).exec();
            res.json(updaterecipe);
            }
        catch(err){
            response.send({'error': error});
        }    

    }
}


exports.recipe_patchs = async (req, res) => {
    try {
        var patch = await recipemodel.find({id:req.params.id}).exec();
        if(!patch.length) {return res.send({error:"The Given Id not found"})};
        let query ={$set:{}};
        var key =Object.keys(patch);
        var patch_value = patch[key];
        for (let key in req.body){
            if(patch_value[key] !== req.body[key])
            {
                query.$set[key] = req.body[key];
            }
    }
        const updaterecipe = await recipemodel.updateOne({id:req.params.id},query).exec();
        res.json(updaterecipe);
        }
    catch(err){
        response.send({'error': error});
    }    
}

exports.recipe_deletes = async (request, response) => {
    try {
        await recipemodel.deleteOne({id : request.params.id}).remove().exec();
        response.send({'success message':"Successful deletion"});
    } 
    catch (error) {
        response.send({'error': error});
    }
}