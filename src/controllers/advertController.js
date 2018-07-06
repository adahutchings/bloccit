const advertQueries = require("../db/queries.adverts.js");

module.exports = {
    index(req, res, next){
        advertQueries.getAllAdverts((err, adverts) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("adverts/index", {adverts});
            }
        })
    },
    new(req, res, next){
        res.render("adverts/new");
    },
    create(req, res, next){
        let newAdvert = {
            title: req.body.title,
            description: req.body.description
        };
        advertQueries.addAdvert(newAdvert, (err, advert) => {
            if(err){
                res.redirect(500, "/adverts/new");
            } else {
                res.redirect(303, `/adverts/${advert.id}`);
            }
        });
    },
}
