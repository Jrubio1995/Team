const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getRole() {
    return "Intern";
  }
  getId() {
    return this.id;
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
