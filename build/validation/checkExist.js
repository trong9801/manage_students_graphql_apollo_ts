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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckExist = void 0;
const students_1 = require("../model/students");
const CheckExist = (DB, propertyValue, boolean) => __awaiter(void 0, void 0, void 0, function* () {
    let arr = [];
    if (DB == 'student') {
        const findStudent = yield students_1.StudentsDB.findOne({ codeStudents: propertyValue });
        arr.push(findStudent === null || findStudent === void 0 ? void 0 : findStudent._id);
    }
    if (boolean) {
        if (arr[0]) {
            throw new Error(` ${DB} da ton tai`);
        }
    }
    else {
        if (!arr[0]) {
            throw new Error(`${DB} khong ton tai`);
        }
    }
});
exports.CheckExist = CheckExist;
