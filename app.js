const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const managerQuery = [
  {
    type: "input",
    name: "name",
    message: "Enter manager's name.",
  },
  {
    type: "input",
    name: "email",
    message: "Enter manager's email.",
  },
  {
    type: "input",
    name: "id",
    message: "Enter manager's ID/Badge number.",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Enter office number.",
  },
  {
    type: "list",
    name: "additionalMembers",
    message: "Are there anymore members on this team?",
    choices: ["Yes", "No"],
  },
];
const employeeQuery = [
  {
    type: "input",
    name: "name",
    message: "Enter employee's name.",
  },
  {
    type: "input",
    name: "email",
    message: "Enter employee's email.",
  },
  {
    type: "input",
    name: "id",
    message: "Enter employee's ID/Badge number.",
  },
  {
    type: "list",
    name: "role",
    message: "Please choose the role of this team member?",
    choices: ["engineer", "intern"],
  },
  {
    when: (input) => {
      return input.role === "intern";
    },
    type: "input",
    name: "school",
    message: "Please enter the name of your school.",
  },
  {
    when: (input) => {
      return input.role === "engineer";
    },
    type: "input",
    name: "github",
    message: "Please enter github username.",
  },
  {
    type: "list",
    name: "additionalMembers",
    message: "Are there anymore employee's?",
    choices: ["Yes", "No"],
  },
];

function makeList() {
  inquirer.prompt(employeeQuery).then((response) => {
    if (response.role === "engineer") {
      var newEmployee = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
    } else {
      var newEmployee = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
    }
    teamMembers.push(newEmployee);
    if (response.additionalMembers === "Yes") {
      console.log(" ");
      makeList();
    } else {
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      }
      fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });
}

function init() {
  inquirer.prompt(managerQuery).then((response) => {
    let teamManager = new Manager(
      response.name,
      response.id,
      response.email,
      response.officeNumber
    );
    teamMembers.push(teamManager);
    console.log(" ");
    if (response.additionalMembers === "Yes") {
      makeList();
    } else {
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      }
      fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
          throw err;
        }
      });
    }
  });
}
init();
