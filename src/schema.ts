import 'graphql-import-node'

import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import Students from './typeDefs/students.graphql'
import Classes from './typeDefs/classes.graphql'
import Result from './typeDefs/result.graphql'
import QueryMutation from './typeDefs/query&mutation.graphql'
import * as resolvers from './resolversMap/index'


const typeDefs = [Students, Classes, QueryMutation, Result];

const Schema: GraphQLSchema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: Object.values(resolvers) })


export default Schema