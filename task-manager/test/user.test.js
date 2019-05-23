const request = require('supertest')
const app = require('../src/app')

const User = require('../src/models/user')

const { userOneId, userOne, setUpDatabase } = require('./fixtures/db')

// beforeEach(() => {
//     await User.deleteMany();
//     await new User(userOne).save();
// })

beforeEach(setUpDatabase)

test('Should signup a new user', async () => {
    const response = await request(app)
            .post('/users')
            .send({
                name: "wyx",
                email: "wyx@example.com",
                password: "wangyixing"
            }).expect(201)

    //Assert that the database was changed correctly => fetch user
    const user = await User.findById(response.body.createdUser._id)
    expect(user).not.toBeNull()

    expect(response.body).toMatchObject({
        createdUser: {
            name: "wyx",
            email: "wyx@example.com"
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe("wangyixing")
})

test('Should log in existing user', async () => {
    // only check status code
    const response = await request(app)
            .post('/users/login')
            .send({
                email: userOne.email,
                password: userOne.password
            }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token) 
})

test('Should not in login', async () => {
    await request(app)
            .post('/users/login')
            .send({
                email: userOne.email,
                password: "wyx"
            }).expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send().expect(200)
})

test('Should not get profile for user', async () => {
    await request(app)
            .get('/users/me')
            // .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send().expect(401)
})

test('Should delete acoount for user', async () => {
    const response = await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send().expect(200)
    const user = await User.findById(response.body._id)
    expect(user).toBeNull();
})

test('Should not delete acoount for user', async () => {
    await request(app)
            .delete('/users/me')
            .send().expect(401)
})

test('Should upload avatar image', async () => {
    const response = await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .attach('avatar', 'test/fixtures/TWICE_TWICE_2_normal_cover_art.png')  //attach files, path start from root
            .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user field', async () => {
    const response = await request(app)
                            .patch('/users/me')
                            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                            .send({
                                name: "Yixing"
                            }).expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('Yixing')
})

test('Should not update invalid user field', async () => {
    await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
            .send({
                location: "Dalian"
            }).expect(400)
})

//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated