const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Post", () => {
    beforeEach((done) => {
        this.topic;
        this.post;
        this.flair;

        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "Creating Flair",
                description: "This is Flair"
            })
            .then((topic) => {
                this.topic = topic;
                Post.create({
                    title: "First Flair Post",
                    body: "This will be green",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
                    Flair.create({
                        name:"1", 
                        color:"green",
                        topicId: this.topic.id,
                        postId: this.post.id
                    })
                    .then((flair) => {
                        this.flair = flair;
                        done();
                    });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });
        });

        describe("#create()", () => {
            it("should create a flair with name and color and be associated with a Topic Post", (done) =>{
                Flair.create({
                    name: "2",
                    color: "red",
                    topicId: this.topic.id,
                    postId: this.post.id
                })
                .then((flair) => {
                    expect(flair.name).toContain("2");
                    expect(flair.color).toContain("red");
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
            });

            it("should not create a flair with missing name or color, or without assigned post/topic", (done) => {
                Flair.create({
                    name:"2"
                })
                .then((flair) =>{
                    done();
                })
                .catch((err) => {
                    expect(err.message).toContain("Flair.color cannot be null");
                    expect(err.message).toContain("Flair.postId cannot be null");
                    expect(err.message).toContain("Flair.topicId cannot be null");
                    done();
                })
            });
        });

        describe("#setPost()", () => {
            it("should associate a Topic:Post:Flair together"), (done) => {
                Post.create({
                    title: "3",
                    body: "this one is blue",
                    topicId: this.topic.id
                })
                .then((newPost) => {
                    expect(this.flair.postId).toBe(this.post.id);
                    this.flair.setPost(newPost)
                    .then((flair) => {
                        expect(flair.postId).toBe(newPost.id);
                        done();
                    });
                });
            };
        });

        describe("#getFlair()", () => {
            it("should return the associated Flair", (done) => {
                this.flair.getPost()
                .then((associatedPost) => {
                    expect(associatedPost.title).toBe("First Flair Post");
                    done();
                });
            });
        });
    });
});