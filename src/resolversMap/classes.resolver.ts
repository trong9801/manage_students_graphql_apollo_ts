import { ClassDB } from '../model/class'
import { IResolvers } from 'graphql-tools'


export const ClassesResolver: IResolvers = {
    Query: {
        getClass : async()=>{
            const result = await ClassDB.find()
            return result
        }     
    },
    // Mutation: {
        
    // }

}


