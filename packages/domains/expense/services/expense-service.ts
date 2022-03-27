import { findByConditions, findById } from '../repository/expense-repository';
import { to } from '@nc/utils/async';


export async function getExpenseById(expenseId) {
    const [expenseError, expenseDetails] = await to(findById(expenseId));

    if (expenseError) {
        return expenseError;
    }

    if (!expenseDetails) {
        return;
    }

    return expenseDetails;
};


export async function getExpenseFiltered(filters) {
    const [expenseError, expenses] = await to(findByConditions(filters));

    if (expenseError) {
        return expenseError;
    }

    if (!expenses) {
        return;
    }

    return expenses;
}
