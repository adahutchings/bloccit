const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";
const macro = "http://localhost:3000/macro";

describe("routes: static", () => {
    describe("GET /", () => {
        it("should return status code 200", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                done();
            });
        });
    });

    describe("GET /macro", () => {
        it("should return satus code 200 and the body should display polo", (done) => {
            request.get(macro, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(body).toBe("polo");
                done();
            });
        });
    });
});