const request = require('supertest');
const app = require('../../index'); 
const jwt = require('jsonwebtoken'); // Import JWT library

// Mock authenticated user
const mockUser1 = {
  id: 1,
  username: 'username1'
};

const mockToken1 = jwt.sign({username:mockUser1.username, id: mockUser1.id}, 'secret_key', { expiresIn: '1h' }); // Replace 'your_secret_key' with your actual JWT secret key

describe('GET /users/:id', () => {
  it('should retrieve a user with a valid ID and authentication', async () => {
    // Send a request with the authentication token included
    const response = await request(app)
      .get('/users/1')
      .set('Authorization', `Bearer ${mockToken1}`);
      
    expect(response.status).toBe(200);
  });

  it('should return 401 for an unauthenticated request', async () => {
    // Send a request without authentication headers
    const response = await request(app)
      .get('/users/1');
      
    expect(response.status).toBe(401);
  });

  it('should return 403 for attempting to retrieve a different user entity', async () => {
    // Send a request to retrieve a different user entity
    const response = await request(app)
      .get('/users/3')
      .set('Authorization', `Bearer ${mockToken1}`);
      
    expect(response.status).toBe(404);
  });
});
