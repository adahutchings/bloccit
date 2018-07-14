const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";
const sequelize = require("../../src/db/models/index").sequelize;

const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flair", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "How do you feel about Flair",
                description: "Your feelings on flair?"
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "Flair is Rad",
                    body: "I love flair",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;

                    Flair.create({
                        name: "Green flair",
                        color: "green",
                        topicId: this.topic.id,
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

    describe("GET /posts/:postId/flair/new", () => {
        it("should render a new flair form", (done) => {
            request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Flair");
                done();
            });
        });
    });

    describe("POST /posts/:postId/flair/create", () => {
        it("should create a new flair and redirect", (done) => {
            const options = {
                url: `${base}/${this.topic.id}/posts/${this.post.id}/flairs/create`,
                form: {
                    name: "Newest Flair",
                    color: "Purple"
                }
            };
            request.post(options, (err, res, body) => {
                Flair.findOne({where: {name: "Newest Flair"}})
                .then((flair) => {
                    expect(flair).not.toBeNull();
                    expect(flair.name).toContain("Newest Flair");
                    expect(flair.color).toContain("Purple");
                    expect(flair.postId).not.toBeNull();
                    expect(flair.topicId).not.toBeNull();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });
    });

    describe("GET /posts/:postId/flair/:id", () => {
        it("should render a view with the selected flair", (done) => {
            request.get(`${base}/${this.topic.id}/posts/${this.post.id}/flairs/${this.flair.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Purple");
                done();
            });
        });
    });
});