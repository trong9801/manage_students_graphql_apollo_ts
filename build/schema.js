"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const lodash_1 = require("lodash");
const graphql_tools_1 = require("graphql-tools");
const students_resolver_1 = __importDefault(require("./resolversMap/students.resolver"));
const classes_resolver_1 = __importDefault(require("./resolversMap/classes.resolver"));
const students_graphql_1 = __importDefault(require("./typeDefs/students.graphql"));
const classes_graphql_1 = __importDefault(require("./typeDefs/classes.graphql"));
const query_mutation_graphql_1 = __importDefault(require("./typeDefs/query&mutation.graphql"));
const Schema = graphql_tools_1.makeExecutableSchema({ typeDefs: [students_graphql_1.default, classes_graphql_1.default, query_mutation_graphql_1.default], resolvers: lodash_1.merge(students_resolver_1.default, classes_resolver_1.default) });
exports.default = Schema;
