const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const team = [];
const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function initPrompt() {
    await inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What position would you like to add?",
            choices: ["Manager", "Engineer", "Intern", "I'm done, I don't want to add any more team members"],
        },
    ]).then(async function (position) {
        if (position.role === "I'm done, I don't want to add any more team members") {
            console.log(team);
            render(team)
        }
        else {
            await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter employee name: "
                },
                {
                    type: "input",
                    name: "email",
                    message: "Enter employee email: "
                },
                {
                    type: "input",
                    name: "id",
                    message: "Enter employee id: "
                }
            ],
            ).then(async function (data) {
                let positionInput = {...position, ...data}
                await addPrompt(positionInput);
            })
        }
    }
)}
async function addPrompt(response) {
    if (response.role === "Manager") {
        await inquirer.prompt([
            {
                type: "input",
                name: "officeNumber",
                message: "Enter employee office number",
            },
        ]).then(async function (data) {
            const managerInput = { ...response, ...data };
            const manager = new Manager(managerInput.name, managerInput.role, managerInput.email, managerInput.id, managerInput.officeNumber);
            team.push(manager);
            initPrompt()
        })


    } else if (response.role === "Engineer") {
        await inquirer.prompt([
            {
                type: "input",
                name: "github",
                message: "Enter employee GitHub username",
            }
        ]).then(async function (data) {
            const engineerInput = { ...response, ...data };
            const engineer = new Engineer(engineerInput.name, engineerInput.role, engineerInput.email, engineerInput.id, engineerInput.github);
            team.push(engineer);
            initPrompt()
        })
    } else if (response.role === "Intern") {
        await inquirer.prompt([
            {
                type: "input",
                name: "school",
                message: "Enter employee school name",
            }
        ]).then(async function (data) {
            const internInput = { ...response, ...data };
            const intern = new Intern(internInput.name, internInput.role, internInput.email, internInput.id, internInput.school);
            team.push(intern);
            initPrompt()
        })
    }
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// render();

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

async function init() {
    try {
        await initPrompt();
    } catch (err) {
        console.log("Error alert:" + err);
    }
}

init();