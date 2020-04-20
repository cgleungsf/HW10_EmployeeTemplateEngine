const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const team = [];
const render = require("./lib/htmlRenderer");

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
            let teamHTML = render(team)
            await writeFileAsync(outputPath, teamHTML);

            console.log(teamHTML)
            console.log("render complete")
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
            const manager = new Manager(managerInput.name, managerInput.id, managerInput.email, managerInput.officeNumber);
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
            const engineer = new Engineer(engineerInput.name, engineerInput.id,  engineerInput.email, engineerInput.github);
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
            const intern = new Intern(internInput.name, internInput.id, internInput.email,  internInput.school);
            team.push(intern);
            initPrompt()
        })
    }
}

async function init() {
    try {
        await initPrompt();
    } catch (err) {
        console.log("Error alert:" + err);
    }
}

init();