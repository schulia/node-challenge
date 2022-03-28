import { getExpenseFiltered } from '../../services/expense-service';
import { findByConditions } from '../../data/expense-db';
import { to } from '@nc/utils/async';

jest.mock('../../data/expense-db', () => {
  const originalModule = jest.requireActual('../../data/expense-db');

  return {
    findByConditions: jest.fn(() => 'expense'),
  };
});

test('should call expense-repository with right conditions', async () => {
  const filters = {
    page: '2',
    items: '2',
    merchant_name: 'Sliders',
  };

  const expected_page_options = { skip: 2, take: 2 };

  await to(getExpenseFiltered(filters));
  expect(findByConditions).toHaveBeenCalledWith(filters, expected_page_options);
});
