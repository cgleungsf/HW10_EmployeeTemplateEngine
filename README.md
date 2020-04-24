# Homework 10: Template Engine - Employee Summary

## Description

Created a Node command line application that prompts the user for information on a team consisting of manager(s), engineer(s), and intern(s). This information is then used to generate an html page with the following information:
- Manager
  - Name
  - Employee ID
  - Email
  - Office Number
- Engineer
  - Name
  - Employee ID
  - Email
  - GitHub ID
- Intern
  - Name
  - Employee ID
  - Email
  - School

### Usage
To use this application, navigate to the folder with app.js and run the following commands:
- npm i 
- node .\app.js

The command line application will then prompt you with the required information. 

In order to validate the data with jest, invoke the code:

     `npm run test`. 


## Technologies
  * node.js
    * inquirer NPM
    * fs NPM
    * path NPM
    * util NPM
    * jest NPM
  * HTML
  * CSS

## Challenges

The challenges for this homework were using jest and creating classes that were connected to test code that already existed. I had to be cautious of my naming convention for each constructor and the parent constructor of Employee. 


## Screenshot
![GIF](./assets/image/readme.gif)