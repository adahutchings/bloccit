const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next){
        res.render("flairs/new", {topicId: req.params.topicId, postId: req.params.postId});
    },
    create(req, res, next){
        let newFlair = {
            name: req.body.name,
            color: req.body.color,
            topicId: req.params.topicId,
            postId: req.params.postId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if(err){
                res.redirect(500, "flairs/new");
            } else {
                console.log("create pass");
                res.redirect(303, `/topics/${newFlair.topicId}/posts/${newFlair.postId}/flairs/${flair.id}`);
            }
        });
    },
    show(req, res, next){
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if(err || flair == null){
                console.log("show fail");
                res.redirect(404, "/");
            } else {
                console.log("show pass");
                res.render("flairs/show", {flair});

            }
        });
    }
}