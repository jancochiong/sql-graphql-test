const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID} = graphql;

// dummy data
var books = [
    {name: 'Name of the wind', genre: 'Fantasy', id: '1'},
    {name: 'Name of the wind2', genre: 'Fantasy1', id: '2' },
    {name: 'Name of the wind3', genre: 'Fantasy2', id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(books, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});