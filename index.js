const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer")
const Intern = require("./lib/Intern")
const inquirer = require("inquirer");
const fs = require('fs');
const teamBuiltDifferent = [];


const promptManager = () =>
  inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is their name?',
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is their id?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is their email?',
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is their office number?',
    },
]).then((data) => {
    const newManager = new Manager(data.name, data.id, data.email, data.officeNumber);
    teamBuiltDifferent.push(newManager);
    createNewEmployee();
})

function createNewEmployee(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'team',
            choices: ['Engineer', 'Intern', 'No one to add'],
        }
    ]).then((data) => {
        const choice = data.team;
        switch(choice){
            case 'Engineer':
                return engineerQuestions();
            case 'Intern':
                return internQuestions();
            case 'No one to add':
              console.log(teamBuiltDifferent);
                return doneAdding(teamBuiltDifferent);
        }
    })
}
function engineerQuestions(){
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the Engineers name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the Engineers id?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the Engineers email?',
      },
      {
        type: 'input',
        name: 'github',
        message: 'What is the Engineers github username?',
      },
    ]).then((data) => {
      //make a new instance of manager
      const newEngineer = new Engineer(data.name, data.id, data.email, data.github);
      //add engineer to a list of employees
      teamBuiltDifferent.push(newEngineer);
      createNewEmployee();
  })
  };
  function internQuestions(){
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the Interns name?',
      },
      {
        type: 'input',
        name: 'id',
        message: 'What is the Interns id?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the Interns email?',
      },
      {
        type: 'input',
        name: 'school',
        message: 'What is the Interns school?',
      },
    ])
    .then((data) => {
      //make a new instance of manager
      const newIntern = new Intern(data.name, data.id, data.email, data.school);
      //add engineer to a list of employees
      teamBuiltDifferent.push(newIntern);
      createNewEmployee();
  })
  };


function generateHTML(data) {

	let body = ``;

	data.forEach(entry => {
    if (entry.getRole() === 'Manager'){
      body += `
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">Manager</div>
      <div class="card-body">
        <h5 class="card-title">Name: ${entry.name}</h5>
          <p class="card-text">ID: ${entry.id}</p>
          <p class="card-text">Email: ${entry.email}</p>
          <p class="card-text">Office Number: ${entry.officeNumber}</p>
      </div>
    </div>
		`;
	} else if (entry.getRole() === 'Engineer'){
    body += `
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">Engineer</div>
      <div class="card-body">
        <h5 class="card-title">Name: ${entry.name}</h5>
          <p class="card-text">ID: ${entry.id}</p>
          <p class="card-text">Email: ${entry.email}</p>
          <p class="card-text">Office Number: ${entry.github}</p>
      </div>
    </div>
		`;
  } else if (entry.getRole() === 'Intern'){
    body += `
    <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
      <div class="card-header">Intern</div>
      <div class="card-body">
        <h5 class="card-title">Name: ${entry.name}</h5>
          <p class="card-text">ID: ${entry.id}</p>
          <p class="card-text">Email: ${entry.email}</p>
          <p class="card-text">Office Number: ${entry.school}</p>
      </div>
    </div>
		`;
  }
})

	let html = `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
			<title>Document</title>
		</head>
		<body>
    <div class="container">
			${body}
    </div>
		</body>
		</html>`;

	return html;
}
  
function doneAdding(data){
    try {
      const html = generateHTML(data);
      fs.writeFileSync('index.html', html);
      console.log('Successfully wrote to index.html');
    } catch (error) {
      console.log(error);
    }
  };

promptManager();
