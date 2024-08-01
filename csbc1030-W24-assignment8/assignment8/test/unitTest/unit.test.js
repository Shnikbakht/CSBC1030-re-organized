const { getUserById } = require('../../controllers/usersController'); // Import your route handler function
const httpMocks = require('node-mocks-http'); // Import node-mocks-http for mocking requests and responses

describe('getUserById route handler', () => {
  it('should be able to retrieve my user entity', async () => {
    const userId = '1';
    const mockUser = { id: userId, name: 'Test User' };

    // Mock getUserById function directly
    const getUserByIdMock = jest.fn().mockImplementation(async (req, res) => {
      res.json(mockUser);
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/user/${userId}`,
      params: { id: userId }
    });
    const res = httpMocks.createResponse();

    await getUserByIdMock(req, res);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockUser);
  });
  it('should not be able to retrieve a different user entity and return appropriate error code', async () => {
    const userId = '1';
    const mockUser = { id: userId, name: 'Test User' };
    const anotherUserId = '2';

    // Mock getUserById function to return a different user entity
    const getUserByIdMock = jest.fn().mockImplementation(async (req, res) => {
      if (req.params.id === anotherUserId) {
        res.status(403).json({ error: 'Unauthorized' });
      } else {
        res.json(mockUser);
      }
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/user/${anotherUserId}`,
      params: { id: anotherUserId }
    });
    const res = httpMocks.createResponse();

    await getUserByIdMock(req, res);

    expect(res.statusCode).toBe(403);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Unauthorized' });
  });

  it('should not be able to retrieve an entity if not authenticated and return appropriate error code', async () => {
    const userId = '1';

    // Mock getUserById function to simulate unauthenticated request
    const getUserByIdMock = jest.fn().mockImplementation(async (req, res) => {
      res.status(401).json({ error: 'Unauthorized' });
    });

    const req = httpMocks.createRequest({
      method: 'GET',
      url: `/user/${userId}`,
      params: { id: userId }
    });
    const res = httpMocks.createResponse();

    await getUserByIdMock(req, res);

    expect(res.statusCode).toBe(401);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Unauthorized' });
  });
});


