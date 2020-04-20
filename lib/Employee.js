// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name,id, email ) {
    this.name = name;
    // this.role = role;
    this.email = email;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  // getRole() {
  //   return this.role
  // }
  getEmail() {
    return this.email;
  }
  getId() {
    return this.id;
  }
  getRole() {
    return this.role =  "Employee"
}
}


module.exports = Employee;