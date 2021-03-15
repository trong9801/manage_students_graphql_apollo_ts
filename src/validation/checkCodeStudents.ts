import {isEmpty} from 'lodash'

export const checkCodeStudents = (code : any )=>{
    if(isEmpty(code)){
        throw new Error('khong duoc bo trong ma hoc sinh')
    }
    const regex : RegExp = /^(A|C)T+[0-9]{1,3}$/
    if( !regex.test(code) ){
        throw  new Error('nhap ma hoc sinh theo dang ATxxxxx hoac CTxxxx va co it nhat 5 chu so')
    }

}