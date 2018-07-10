const request = require("request");
const server = require("../../src/server");
const base = require("http://localhost:3000/posts");
const sequelize = require("../..src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/model").Flair;

describe(" routes : flair ", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Learning Flair",
                description: "How to make some flair"
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "First Try",
                    body: "This one should be green",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;

                    Flair.create({
                        name: "1",
                        color: "green",
                        postId: this.post.id
                    })
                    .then((flair) => {
                        this.flair = flair;
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                });
            });
        });
    });

  /*  describe("GET /posts/:postId/flair/new", () => {
        it("should render a new flair", (done) => {
            request.get(`${base}/${this.post.id}/flair/new`, (err, res, body) =>{
                expect(err).toBeNull;
                expect(body).toContain("New Flair");
                done();
            });
        });
    }); */

});