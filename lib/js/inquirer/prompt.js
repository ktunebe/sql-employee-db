const inquirer = require('inquirer')

const runPrompt = async (questions) => {
    try {
        const answers = await inquirer.prompt(questions);
        return answers;
    } catch (err) {
        console.error('Error during prompting: ', err);
    }
}

module.exports = {runPrompt}
