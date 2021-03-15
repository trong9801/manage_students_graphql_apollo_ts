"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("./schema"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const port = process.env.port;
const app = express_1.default();
const apolloServer = new apollo_server_express_1.ApolloServer({ schema: schema_1.default, validationRules: [graphql_depth_limit_1.default(7)] });
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('*', cors_1.default());
apolloServer.applyMiddleware({ app, path: '/graphql' });
http_1.default.createServer(app).listen(port, () => {
    console.log(`Server running to ${port}`);
});
mongoose_1.default.connect(`mongodb+srv://vutrong:${process.env.MG_pass}@cluster0.sllrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log('connect database succerfull');
});
