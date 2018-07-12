const flairQueries = require("../db/queries.flairs.js");

module.exports = {
    new(req, res, next) {
        res.render("flair/new", {postId: req.params.postId});
        console.log("new");
    },
    create(req, res, next) {
        let newFlair = {
            name: req.body.name,
            color: req.body.color,
            postId: req.params.postId
        };
        flairQueries.addFlair(newFlair, (err, flair) => {
            if(err){
                console.log("new flair fail");
                res.redirect(500, "flair/new");
            } else {
                console.log("new flair pass");
                res.redirect(303, `/posts/${newFliar.postId}/flair/${flair.id}`)
            }
        })
    }, 
    show(req, res, next){
        flairQueries.getFlair(req.params.id, (err, flair) => {
            if(err || flair == null){
                console.log("flair show fail");
                res.redirect(404, "/");
            } else {
                console.log("flair show pass");
                res.render("flair/show", {flair});
            }
        });
    }
}