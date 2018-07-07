const Advert = require("./models").Advert;

module.exports = {
    getAllAdverts(callback){
        return Advert.all()
        .then((adverts) => {
            callback(null, adverts);
        })
        .catch((err) => {
            callback(err);
        })
    },
    addAdvert(newAdvert, callback){
        return Advert.create({
            title: newAdvert.title,
            description: newAdvert.description
        })
        .then((advert) => {
            callback(null, advert);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getAdvert(id, callback){
        return Advert.findById(id)
        .then((advert) => {
            callback(null, advert);
        })
        .catch((err) => {
            callback(err);
        })
    },
}