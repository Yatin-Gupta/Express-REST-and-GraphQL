### Express JS and Graph QL

#### Technologies and Implementations

- Express JS
- Restful CRUD Web API
- Data Validation using **joi** module
- Express Custom Error Handling
- Express Custom Error Handling Middleware
- Logging through winston
- Graph QL

#### Graph QL

- Graph QL is a query language that allows you to query data from frontend. Disadvantage with Restful API is that if API is not developed to fetch, insert, delete data, then frontend has to rely on backend team to develop them first.
- Graph QL is faster and always POST request is made to the path `/graphql`
- Graph QL query format is as shown:

```
{
    query {
        user {
            name
            age
        }
    }
}
```

**query** is Operation Type. Other Types are mutation type(that allows to insert/delete data) and subscription type. Subscriptions allows to query for real time data using web sockets.
**user** is endpoint name defined by backend. Inside **user** fields are flexible. That is we can request from fontend to either provide name or age or both.

- GraphQL is a typed query language. Types has to be defined in backend and returned with the data. Type definations are used by Query defination, Mutation defination and Subscription defination. These definations are resolved by Resolvers(Defined at backend). Assume that Query Definitions, Mutation Definitions and Subscription Definitions are like Routes and Resolver is like controller that do processing of these queries.

- Let's revisit the GraphQL flow. Single POST Endpoint(/graphql) is created on server side using NodeJS/Express. Client request the end point by providing the query definiation. Server side resolver analyze the request body, fetches, prepares and returns the data.

#### winston Logging Library

- winston is a logging library with support for multiple transports.
- A transport is a storage device for logs. Each winston logs can have multiple transport configured at different levels.
- We can output different logs to database or to console as well.
- By default only console transport is set to debug level, i.e it will be only shown in debug mode not in production mode. All the other transport are set to production mode.
