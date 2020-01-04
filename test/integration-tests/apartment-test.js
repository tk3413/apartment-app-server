const supertest = require("supertest");
const should = require("should");
const server = supertest.agent("http://localhost:3000/apartments");

describe("APARTMENT TESTS", () => {
    it("GET /apartments should return a list of all apartments", (done) => {
      server
      .get("/")
      .expect("Content-type",/json/)
      .expect(200) 
      .end((err,res) => {
        res.status.should.equal(200)
        done()
      });
    });

    it("POST should add a new apartment", (done) => {
        server
        .post("/")
        .send({
            "apt_nm_cd":"INTG-TEST",
            "apt_num":"00410",
            "apt_type":"Studio",
            "apt_size":"557 Sq. Ft.",
            "apt_price":"1,855",
            "apt_avl_dt": "Feb 02, 2020",
            "cret_ts":"01/02/2020 22:11:25"
        })
        .expect("Content-type",/json/)
        .expect(201) 
        .end((err,res) => {
            res.status.should.equal(200)
            done()
        });
    });

    it("GET with apt num should return a list of apartments", (done) => {
        server
        .get("/00410")
        .expect("Content-type",/json/)
        .expect(200) 
        .end((err,res) => {
        res.status.should.equal(200)
        done()
        });
    });

    it("DELETE route will delete the integration test apartments", (done) => {
        server
        .delete("/")
        .expect("Content-type",/json/)
        .end((err,res) => {
        done()
        });
    });
});