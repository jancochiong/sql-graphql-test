const graphql = require('graphql');
const _ = require('lodash');
const Db = require('../database/model.js');

const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve: async (source, args) => {
                return Db.models.users.findAll({ where: args })
            },
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
