const inquirer = require('inquirer')

const runPrompt = async (questions) => {
    try {
        const answers = await inquirer.prompt(questions);
        console.log(answers);
        return answers;
    } catch (error) {
        console.error('Error during prompting:', error);
    }
}

module.exports = runPrompt


