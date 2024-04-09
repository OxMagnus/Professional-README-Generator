// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// Array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a brief description of your project:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'How do you install your app?'
  },
  {
    type: 'input',
    name: 'instructions',
    message: 'Instructions to be followed:'
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Any credits?'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'How do you use your app?'
  },
  {
    type: 'list',
    name:'license',
    message: 'What license was used?',
    choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0','Apache License 2.0','MIT License', 'N/A']
  },
  {
    type: 'input',
    name: 'username',
    message: 'GitHub Username:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'E-mail:'
  }
];

// Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('README.md has been generated successfully!');
  });
}

// Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const readmeContent = generateReadme(answers);
      writeToFile('README.md', readmeContent);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to generate README content based on user input
function generateReadme(data) {
  const licenseBadgeUrl = licenseBadge(data.license);
  return `
  ${licenseBadgeUrl}
# ${data.title} 


## Description

${data.description}

## Table of Contents
* [Installation](#installation)
* [Instructions](#instructions)
* [Contribution](#contribution)
* [Usage](#usage)
* [Contact](#contact)

## Installation
${data.installation}

## Instructions
${data.instructions}

## Contribution
${data.contribution}

## Usage
${data.usage}


## Contact
* GitHub: [${data.username}](https://github.com/${data.username})
* E-mail: ${data.email}
`;
}

// Function to generate license badge URL based on license type
function licenseBadge(licenseType) {
  switch (licenseType) {
    case 'GNU AGPLv3':
      return '![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)';
    case 'GNU GPLv3':
      return '![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)';
    case 'GNU LGPLv3':
      return '![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)';
    case 'Mozilla Public License 2.0':
      return '![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)';
    case 'Apache License 2.0':
      return '![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
    case 'MIT License':
      return '![License: MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)';
    default:
      return 'License information not available';
  }
}

// Function call to initialize app
init();

