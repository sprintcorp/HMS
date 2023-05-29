import { AuthDTO } from "src/dtos/auth.dto";

export class UserResources{
   
    static response(user: AuthDTO){
        return {
            'id': user._id,
            'firstname': user.firstname,
            'lastname': user.lastname,
            'role': user.role,
            'email': user.email,        
        }
    }

    static responses(users: Array<AuthDTO>){
        const data = [];
         users.forEach((user: AuthDTO) =>{
            data.push({
                'id':  user._id,
                'firstname': user.firstname,
                'lastname': user.lastname,
                'role': user.role,
                'email': user.email, 
            })      
        });
        return data;
    }
}