"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const students_1 = require("../model/students");
const class_1 = require("../model/class");
const checkExist_1 = require("../validation/checkExist");
const StudentsResolver = {
    Query: {
        getStudents: () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield students_1.StudentsDB.find().populate({ path: 'nameClass', select: 'name' }).sort({ codeStudents: 'asc' });
            return result;
        }),
        getStudent: (_, { codeStudents }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(codeStudents);
            const result = yield students_1.StudentsDB.findOne({ codeStudents: codeStudents }).populate({ path: 'nameClass', select: 'name' });
            return result;
        })
    },
    Mutation: {
        addStudent: (_, { name, nameClass, codeStudents, age }) => __awaiter(void 0, void 0, void 0, function* () {
            yield checkExist_1.CheckExist('student', codeStudents, true);
            const findClass = yield class_1.ClassDB.findOne({ name: nameClass });
            console.log(findClass);
            const data = {
                _id: new mongoose_1.default.Types.ObjectId,
                name: name,
                nameClass: findClass,
                codeStudents: codeStudents,
                age: age
            };
            return yield students_1.StudentsDB.create(data);
        }),
        deleteStudent: (_, { codeStudents }) => __awaiter(void 0, void 0, void 0, function* () {
            yield checkExist_1.CheckExist('student', codeStudents, false);
            yield students_1.StudentsDB.findOneAndDelete({ codeStudents: codeStudents });
            return 'thanh cong';
        })
    }
};
exports.default = StudentsResolver;
