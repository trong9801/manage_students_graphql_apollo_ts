import {StudentsDB} from "../model/students"




export const CheckExist = async(DB : string, propertyValue : any , boolean: boolean )=>{
    let arr = []
    if(DB =='student'){
        const findStudent = await StudentsDB.findOne({codeStudents : propertyValue})
        arr.push(findStudent?._id)
    }
    if(boolean){
        if(arr[0]){
            throw new Error(` ${DB} da ton tai`)
        }
    }else{
        if(!arr[0]){
            throw new Error(`${DB} khong ton tai`)
        }
    } 
}