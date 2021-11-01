const supertest = require("supertest")
const app = require("../app")
const request = supertest(app)
const db = require("../services/database")

const userNewData = { userName: 'testuser' };




describe("Testing all user related routes", () => {
    let token,id;
    beforeAll(async () => {
        await request
            .post("/api/auth/user/login/")
            .send({
                userEmail: "test@gmail.com",
                password: "testaccount"
            })
            .then((res) => {
                token = JSON.parse(res.text).token
                console.log(token)
                id = JSON.parse(res.text).userId
            })
        
    }, 30000)
    test('GET /api/', async () => {
        await request
        .get("/api/")
        .expect(200)
        .then((res) => {
            expect(res.text).toBe("Hello world!")
        })
    },30000)
    test('GET /api/user/:id without token', async ()=>{
        await request
            .get("/api/user/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('GET /api/user/:id with token', async () => {
        await request
            .get("/api/user/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('GET /api/donation/user/:id', async () => {
        await request
            .get("/api/donation/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(404)
            })
    })
    test('GET /api/donation/user/:id without token', async () => {
        await request
            .get("/api/donation/user/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('GET /api/visit/user/:id', async () => {
        await request
            .get("/api/visit/user/" + id)
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
            })
    })
    test('GET /api/visit/user/:id without', async () => {
        await request
            .get("/api/visit/user/" + id)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('GET /api/visit/name/org', async () => {
        await request
            .get("/api/visit/name/org")
            .set("x-access-token",token)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('GET /api/visit/name/org without token', async () => {
        await request
            .get("/api/visit/name/org")
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
    test('PUT /api/user/:id', async () => {
        await request
            .put("/api/user/" + id)
            .set("x-access-token",token)
            .send(userNewData)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                expect(res.type).toBe('application/json')
            })
    })
    test('PUT /api/user/:id', async () => {
        await request
            .put("/api/user/" + id)
            .send(userNewData)
            .then((res) => {
                expect(res.statusCode).toBe(401)
                expect(res.type).toBe('application/json')
            })
    })
    test('POST /api/visit/', async () => {
        await request
            .post("/api/visit/")
            .send(userNewData)
            .then((res) => {
                expect(res.statusCode).toBe(401)
            })
    })
})