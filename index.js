const inquirer = require('inquirer');
const generateHTML = require('./src/generateHTML.js');
const { Employee, Manager, Intern, Engineer } = require('./lib/index.js');
const fs = require('fs');

const team = [];

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the manager?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the name of the manager!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the manager?',
        validate: idInput => {
            if (isNaN(idInput)) {
                console.log('Please enter a valid ID!');
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of the manager?',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter a valid email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of the manager?',
        validate: officeNumberInput => {
            if (isNaN(officeNumberInput)) {
                console.log('Please enter a valid office number!');
                return false;
            } else {
                return true;
            }
        }
    }
];

const employeeQuestions = [
    {
        type: 'list',
        name: 'role',
        message: 'What is the role of the employee?',
        choices: ['Engineer', 'Intern']
    },
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter the name of the employee!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the ID of the employee?',
        validate: idInput => {
            if (isNaN(idInput)) {
                console.log('Please enter a valid ID!');
                return false;
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is the email of the employee?',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Please enter a valid email!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is the GitHub username of the engineer?',
        when: (input) => input.role === 'Engineer',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter a valid GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: 'What is the school of the intern?',
        when: (input) => input.role === 'Intern',
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log('Please enter a valid school!');
                return false;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add another employee?',
        default: false
    }
];

const promptManager = () => {
    return inquirer.prompt(managerQuestions)
        .then(managerData => {
            const { name, id, email, officeNumber } = managerData;
            const manager = new Manager(name, id, email, officeNumber);
            team.push(manager);
        });
}

const promptEmployee = () => {
    return inquirer.prompt(employeeQuestions)
        .then(employeeData => {
            let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
            let employee;
            if (role === 'Engineer') {
                employee = new Engineer(name, id, email, github);
            } else if (role === 'Intern') {
                employee = new Intern(name, id, email, school);
            }
            team.push(employee);
            if (confirmAddEmployee) {
                return promptEmployee();
            } else {
                return team;
            }
        });
}

const init = () => {
    promptManager()
        .then(promptEmployee)
        .then(team => {
            return generateTeam(team);
        })
}

init();