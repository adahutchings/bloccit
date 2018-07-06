const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/adverts";
const sequelize = require("../../src/db/models/index").sequelize;
const Advert = require("../../src/db/models").Advert;

describe("routes : adverts", () => {

    beforeEach((done) => {
        this.advert;
        sequelize.sync({force: true}).then((res) => {
            Advert.create({
                title: "This is an Advertisement",
                description: "We want you to buy something"
            })
            .then((advert) => {
                this.advert = advert;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /adverts", () => {
        it("should return a status code 200 and all adverts", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Advertisements");
                expect(body).toContain("This is an Advertisement");
                done();
            });
        });
    });

    describe("GET /adverts/new", () => {
        it("should render a new advert"), (done => {
            request.get(`${base}/new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Advertisement");
                done();
            });
        });
    });

    describe("POST /adverts/create", () => {
        const options = {
            url: `${base}/create`,
            form: {
                title: "Sham Wow!",
                description: "you will love it"
            }
        };

        it("should create a new advert and redirect", (done) => {
            request.post(options, (err, res, body) => {
                Advert.findOne({where: {title: "Sham Wow!"}})
                .then((advert) => {
                    expect(res.statusCode).toBe(303);
                    expect(advert.title).toBe("Sham Wow!");
                    expect(advert.description).toBe("you will love it");
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