const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiErrorMiddleware = require('./middlewares/apiErrorMiddleware');
const employeeApiRoutes = require('./routes/api/employeeRoutes');
const ApiError = require('./models/ApiError');
const logger = require('./loggers/appLogger');
const { graphqlHTTP } = require('express-graphql');
const graphQlSchema = require('./graphql/schema');
const graphQlResolver = require('./graphql/resolvers');

// Initializing the Application
const app = express();
// You can only parse data if Content-Type is urlencoded
// Unable to USE bodyParser with GraphQL.
//app.use(bodyParser.urlencoded({extended:false}));
app.use("/api", employeeApiRoutes);
// Note we are using app.use not app.post. 
app.use('/graphql', graphqlHTTP({
    schema:graphQlSchema,
    rootValue:graphQlResolver,
    graphiql:true
}))
app.use("/", (request, response, next) => {
    next(new ApiError(404, "Invalid Request URL"));
});

// Always keep it in last
app.use(apiErrorMiddleware);
mongoose.connect("mongodb://employee:employee@localhost:27017/crudapp", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    app.listen(8080, () => {
        logger.info('Application is listening for incomming requests on port 8080');
    });
}).catch((err) => {
    logger.error('Unable to connect to database.');
    logger.error(err);
});
