const request = require('supertest');
const path = require('path');

// Import server
const server = require(path.join(__dirname, '..', 'server'));

describe('Todo DevOps App', () => {
  test('Health endpoint should return 200', async () => {
    const response = await request(server)
      .get('/health')
      .expect(200);
    
    expect(response.body.status).toBe('healthy');
  });

  test('GET /api/todos should return empty array initially', async () => {
    const response = await request(server)
      .get('/api/todos')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/todos should create a new todo', async () => {
    const newTodo = {
      title: 'Test Todo',
      description: 'Test Description'
    };

    const response = await request(server)
      .post('/api/todos')
      .send(newTodo)
      .expect(201);
    
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.description).toBe(newTodo.description);
    expect(response.body.id).toBeDefined();
  });
});
