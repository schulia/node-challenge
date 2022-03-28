## Expense listing API 
### User
User domain provides a single endpoint to fetch a specific user 
```user/v1/user/:userId```

### Expense
Expense domain provides two endpoints, one for a single expense, one to filter expense by conditions 
```expense/v1/expense/:expenseId```

```expense/v1/expenses``` -> enables using query params to filter your results by status, merchant, user_id and currency, also allow to choose the number of items and page

example:
```http://localhost:9001/expense/v1/expenses?currency=DKK```
```http://localhost:9001/expense/v1/expenses?merchant_name=Cafe 22&page=1&items=3```



## About the challenge completion 

-> For the expense domain structure I went back and forth on how to organize the project,but mainly focused on separating business logic from external calls from db access.   
-> My initial take was to test everything writing simple queries on the code, I then added an  ORM to better support that and make it easier for following implementations.  
-> At first I tried Sequelize, but I was not finding the documentation to be as helpful, after some research I decided to go with Prisma. On Prisma queries values that are marked as 'undefined' are not taking into consideration, I thought this to be benefitial for a multiple filtering need.  
-> After the configuration was set it was mainly a matter of implementing the endpoints and it's specific characteristics and then organizing the code structure a little better.  
-> At the end of the day I started writing some tests and I noticed some things that were missing and adjusted them
  
    
My main point was to make sure the project was easy to understand and to work with, if there is ever a need for a person to add features to it. 
