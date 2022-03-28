import { Api } from '../utils/api';

describe('Expenses API test', () => {
  test('Get with no filters', async () => {
    const response = await Api.get('/expense/v1/expenses');
    expect(response.status).toBe(200);
  });

  test('Get with page and items', async () => {
    const response = await Api.get('/expense/v1/expenses?items=2&page=2');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('Get with filter page=0', async () => {
    const response = await Api.get('/expense/v1/expenses?items=2&page=0');
    expect(response.status).toBe(400);
  });

  test('Get with non existing filter condition', async () => {
    const response = await Api.get('/expense/v1/expenses?merchant_name=pumpkin_pie');
    expect(response.status).toBe(404);
  });
});

describe('Unique Expense API test', () => {
  test('Get with valid Id', async () => {
    const response = await Api.get('/expense/v1/expense/3e920f54-49df-4d0b-b11b-e6f08e3a2dca');
    expect(response.status).toBe(200);
  });

  test('Get with not valid Id', async () => {
    const response = await Api.get('/expense/v1/expense/3e920f54-49df-4d0b-b11b-e6f08e3a2dcb');
    expect(response.status).toBe(404);
  });
});
