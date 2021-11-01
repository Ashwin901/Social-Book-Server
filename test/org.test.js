const supertest = require("supertest")
const app = require("../app")
const request = supertest(app)
const db = require("../services/database")
const Post = require("../models/post");
const newOrgData = { organizationName: 'test_org' };



describe("Testing all org related routes", () => {
    let token,id;
    beforeAll(async () => {
        await request
            .post("/api/auth/org/login/")
            .send({
                organizationEmail: "test@org.com",
                password: "testaccount"
            })
            .then((res) => {
                token = JSON.parse(res.text).token
                id = JSON.parse(res.text).organizationId
            })
        
    }, 30000)
    afterAll(async () => {
        await Post.deleteMany({organizationName : "test_org"})
    })
    test('GET /api/', async () => {
        await request
        .get("/api/")
        .expect(200)
        .then((res) => {
            expect(res.text).toBe("Hello world!")
        })
    },30000)
    test('GET /api/org/:id without token', async ()=>{
        await request
            .get("/api/org/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('fetching org profile details', async () => {
        await request
            .get("/api/org/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('fetching all donations', async () => {
        await request
            .get("/api/donation/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(404)
            })
    })
    test('fetching all donations unauthenticated', async () => {
        await request
            .get("/api/donation/org/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('fetching all visits for an org', async () => {
        await request
            .get("/api/visit/org/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
            })
    })
    test('fetching all visits for a user', async () => {
        await request
            .get("/api/visit/org/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('fetching all orgs', async () => {
        await request
            .get("/api/visit/name/org")
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('fetching all org names without token', async () => {
        await request
            .get("/api/visit/name/org")
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('updating org detail without token', async () => {
        await request
            .put("/api/org/" + id)
            .set("x-access-token",token)
            .send(newOrgData)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('updating org detail', async () => {
        await request
            .put("/api/org/" + id)
            .send(newOrgData)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('adding a new post', async () => {
        const postBody = {organizationName:"test_org",postDate:'1000',postBody:'a',postTitle:'a'}
        await request
            .post("/api/post/")
            .set("x-access-token",token)
            .send({ organizationId: id, ...postBody })
            .then((res) => {
                console.log({ organizationId: id, ...postBody })
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('adding a new post unauthenticated', async () => {
        const postBody = {organizationName:"test_org",postDate:'1',postBody:'a',postTitle:'a'}
        await request
            .post("/api/post/")
            .send({ organizationId: id, ...postBody })
            .then((res) => {
                console.log({ organizationId: id, ...postBody })
                expect(res.statusCode).toBe(401)
            })
    })
    test('fetching all org posts', async () => {
        await request
            .get("/api/org/posts/"+id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
})