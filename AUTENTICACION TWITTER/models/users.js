import { convertMultiFactorInfoToServerFormat, UserImportBuilder } from "firebase-admin/lib/auth/user-import-builder";

let user=[];

const add=(username,password,address)=>{
    const userExist= get(username);
if(userExists){
    throw new Error
}

const user= {username,password,address};
User.push(user);
return user;
};


const get=(username)=>{Users.find(el=> el.username===username)};

export {add,get};