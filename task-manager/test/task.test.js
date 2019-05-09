const request = require('supertest')
const app = require('../src/app')

const Task = require('../src/models/task')

const {     
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    TaskOne,
    TaskTwo,
    TaskThree, 
    setUpDatabase } = require('./fixtures/db')

beforeEach(setUpDatabase)

test('Should create task for user', async () => {
    const response = 
                await request(app)
                        .post('/tasks')
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .send({
                            description: "test-1"
                        }).expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull();
    expect(task.completed).toEqual(false)
})

test('Should return all tasks of userOne', async () => {
    const response = 
                await request(app)
                        .get('/tasks')
                        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
                        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not delete task', async () => {
    const response =
                await request(app)
                        .delete(`/tasks/${TaskOne._id}`)
                        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                        .send()
                        .expect(404)
    const task = await Task.findById(TaskOne._id)
    expect(task).not.toBeNull()
})

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
