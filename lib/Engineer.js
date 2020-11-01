const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.id = id;
    this.github = github;
  }

  getRole() {
    return "Engineer";
  }
  getId() {
    return this.id;
  }
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;
