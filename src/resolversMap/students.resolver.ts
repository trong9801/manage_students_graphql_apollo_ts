import mongoose from 'mongoose'
import { IResolvers } from 'graphql-tools'
import { StudentsDB } from '../model/students'
import { ClassDB } from '../model/class'

import { checkCodeStudents } from '../validation/checkCodeStudents'
import { CheckExist } from '../validation/checkExist'

export const StudentsResolver: IResolvers = {
    Query: {
        getStudents: async () => {
            let result
            try {
                const data = await StudentsDB.find().populate({ path: 'nameClass', select: 'name' }).sort({ codeStudents: 'asc' })
                result = {
                    code: '200',
                    message: 'thanh cong',
                    success: true,
                    result: data
                }
                return result
            } catch (error) {
                result = {
                    status: '404',
                    success: false,
                    message: 'that bai',
                    error: error.message
                }
                return result
            }
        },
        getStudent: async (_, args) => {
            let result
            try {
                const codeStudents = args.codeStudents
                checkCodeStudents(codeStudents)
                await CheckExist('student', codeStudents, false)
                const data = await StudentsDB.findOne({ codeStudents: codeStudents }).populate({ path: 'nameClass', select: 'name' })
                result = {
                    status: '200',
                    success: true,
                    message: 'thanh cong',
                    result: data
                }
                return result
            } catch (error) {
                result = {
                    status: '404',
                    success: false,
                    message: 'that bai',
                    error: error.message
                }
                return result
            }
        }
    },
    Mutation: {
        addStudent: async (_, args) => {
            let result
            try {
                const codeStudents = args.codeStudents
                const nameClass = args.nameClass
                await CheckExist('student', codeStudents, true)
                const data = {
                    ...args,
                    _id: new mongoose.Types.ObjectId,
                }
                if(nameClass){
                    await CheckExist('class', nameClass, false)
                    const findClass = await ClassDB.findOne({ name: nameClass })
                    data.nameClass = findClass
                }
                await StudentsDB.create(data)
                result = {
                    code: '200',
                    message: 'thanh cong',
                    success: true,
                    result: data
                }
                return result
            } catch (error) {
                result = {
                    status: '404',
                    success: false,
                    message: 'that bai',
                    error: error.message
                }
                return result
            }
        },
        updateStudents: async (_,args) => {
            let result
            try {
                const codeStudents = args.codeStudents
                const nameClass = args.nameClass
                checkCodeStudents(args.codeStudents)
                await CheckExist('student', codeStudents, false)
                const data = {
                    ...args
                }
                if(nameClass){
                    await CheckExist('class', nameClass, false)
                    const findClass = await ClassDB.findOne({ name: nameClass })
                    data.nameClass = findClass
                }
                await StudentsDB.findOneAndUpdate({ codeStudents: codeStudents }, data)
                result = {
                    code: '200',
                    message: 'thanh cong',
                    success: true,
                    result: data
                }
                return result
            } catch (error) {
                result = {
                    status: '404',
                    success: false,
                    message: 'that bai',
                    error: error.message
                }
                return result
            }
        },
        deleteStudent: async (_, args)=> {
            let result
            try {
                const codeStudents = args.codeStudents
                checkCodeStudents(codeStudents)
                await CheckExist('student', codeStudents, false)
                await StudentsDB.findOneAndDelete({ codeStudents: codeStudents })
                result = {
                    code: '200',
                    message: 'thanh cong',
                    success: true
                }
                return result
            } catch (error) {
                result = {
                    status: '404',
                    success: false,
                    message: 'that bai',
                    error: error.message
                }
                return result
            }
        }
    }

}

