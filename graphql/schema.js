// Here we will define all the Type Definitions/Query Definition/Mutation Definition/Subscribers
const { buildSchema } = require('graphql');
// We create resolver by same name that query return type is. Like here it is "hello"
/**
 * Equivalent to it is as but you cannot write nested object this way:
 * schema {
 *   query: {
 *      rt: {
 *          st: String
 *          it: Int
 *          mandatorySt: String!
 *          mandatoryIt: Int!
 *      }
 *   }
 * }
 * Note, there is no comma in last of any key value pair
 * String, Int are not JS types, but GraphQL predefined types
 * Adding exclamation at the end of type, make that field mandatory
 * i.e resolver has to return that field, otherwise graphql will throw the error.
 */
module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    schema {
        query: RootQuery
    }
`);

/**
 * When frontend will request data, it will send post request, with json content type and following:
 * Suppose, it want just "st" value, so it will send json as:
 * {
 *      "query": "{ rt { st } }"
 * }
 * To get st and it value both, it will request as:
 * {
 *      "query": "{ rt { st it } }"
 * }
 */