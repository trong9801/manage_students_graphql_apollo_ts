import mongoose from 'mongoose'
import { IResolvers } from 'graphql-tools'
import { StudentsDB } from '../model/students'
import { ClassDB } from '../model/class'
import { CheckExist } from '../validation/checkExist'

export const StudentsResolver: IResolvers = {
    Query: {
        getStudents: async () => {
            const result = await StudentsDB.find().populate({path:'nameClass',select: 'name'}).sort({ codeStudents: 'asc' })
            return result
        },
        getStudent: async (_, { codeStudents }) => {
            console.log(codeStudents)
            const result = await StudentsDB.findOne({ codeStudents: codeStudents }).populate({path:'nameClass',select: 'name'})
            return result
        }    
    },
    Mutation: {
        addStudent: async (_, { name, nameClass, codeStudents, age }) => {
            await CheckExist('student', codeStudents, true)
            const findClass = await ClassDB.findOne({name: nameClass})
            console.log(findClass)
            const data = {
                _id: new mongoose.Types.ObjectId,
                name: name,
                nameClass: findClass,
                codeStudents: codeStudents,
                age: age
            }
            return await StudentsDB.create(data)
        },
        deleteStudent: async (_, { codeStudents }) => {
            await CheckExist('student', codeStudents, false)
            await StudentsDB.findOneAndDelete({ codeStudents: codeStudents })
            return 'thanh cong'
        }
    }

}