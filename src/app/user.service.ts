import { User } from "./user.model";

export class UserService{
    private users:User[]=[
        new User("Admin", "Admin"),
        new User("Ermin", "Ermin"),
        new User("Lejla", "Lejla"),
        new User("Jasmin", "Jasmin"),
        new User("Superuser", "Superuser")
      ];


      getUsers(){
        return this.users.slice(); //we do slice so we can return copy of an array, not the actual reference
    }

    checkIfValidUser(user:User)
    {
        let validUser=false;
        for(let i=0; i<this.users.length;i++)
        {
            if(this.users[i].username==user.username && this.users[i].password==user.password)
                {
                    
                    validUser=true;
                    
                }
           
        }

        return validUser;
    }
}