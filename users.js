class User{
    constructor(firstName, lastName, emailAddress, password){
        this.firstName = firstName
        this.lastName = lastName
        this.emailAddress = emailAddress
        this.password = password
    }    
    
}

class SuperUser extends User{
    constructor(firstName, lastName, emailAddress, password){
        super(firstName, lastName, emailAddress, password)
    }
}
