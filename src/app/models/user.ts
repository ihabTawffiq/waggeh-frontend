export class User{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    photoUrl:string;
    gender:string;
    nationality:string;
    role:string;
    fieldId:string;
    bio:string;
    constructor(){
        this.firstName="";
        this.lastName="";
        this.email="";
        this.password="";
        this.photoUrl="";
        this.role="ROLE_CLIENT";
    }
}

export class Category{
    id:string;
    displayName:string;
    constructor(){
    }
}