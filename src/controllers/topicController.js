const topicQueries = require("../db/queries.topics.js");

module.exports = {
    index(req, res, next) {
        topicQueries.getAllTopics((err, topics) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("topics/index", {topics});
            }
        })
    },
    new(req, res, next){
        res.render("topics/new");
    },
<<<<<<< HEAD
    create(req, res, next){
=======
    create(req, res, next) {
>>>>>>> checkpoint-6-version2
        let newTopic = {
            title: req.body.title,
            description: req.body.description
        };
<<<<<<< HEAD
        TopicQueries.addTopic(newTopic, (err, topic) => {
            if(err){
=======
        topicQueries.addTopic(newTopic, (err, topic) => {
            if(err) {
>>>>>>> checkpoint-6-version2
                res.redirect(500, "/topics/new");
            } else {
                res.redirect(303, `/topics/${topic.id}`);
            }
        });
    },
    show(req, res, next) {
<<<<<<< HEAD
        TopicQueries.getTopic(req.params.id, (err, topic) => {
=======
        topicQueries.getTopic(req.params.id, (err, topic) => {
>>>>>>> checkpoint-6-version2
            if(err || topic == null){
                res.redirect(404, "/");
            } else {
                res.render("topics/show", {topic});
            }
        });
    },
    destroy(req, res, next) {
<<<<<<< HEAD
        TopicQueries.deleteTopic(req.params.id, (err, topic) => {
            if(err){
                res.redirect(500, `topics/${topic.id}`)
=======
        topicQueries.deleteTopic(req.params.id, (err, topic) => {
            if(err){
                res.redirect(500, `/topics/${topic.id}`)
>>>>>>> checkpoint-6-version2
            } else {
                res.redirect(303, "/topics")
            }
        });
    },
<<<<<<< HEAD

    edit(req, res, next) {
        TopicQueries.getTopic(req.params.id, (err, topic) => {
            if(err || topic == null) {
=======
    edit(req, res, next) {
        topicQueries.getTopic(req.params.id, (err, topic) => {
            if(err || topic == null){
>>>>>>> checkpoint-6-version2
                res.redirect(404, "/");
            } else {
                res.render("topics/edit", {topic});
            }
        });
<<<<<<< HEAD
=======
    },
    update(req, res, next) {
        topicQueries.updateTopic(req.params.id, req.body, (err, topic) => {
            if(err || topic == null){
                res.redirect(404, `/topics/$req.params.id}/edit`);
            } else {
                res.redirect(`/topics/${topic.id}`);
            }
        });
>>>>>>> checkpoint-6-version2
    }

}