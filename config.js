const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

//gg
module.exports = {
SESSION_ID: 'DARK-SHUTER-MD=139G2ZbC#kWsHxGzdrsdWaemNP06UrqSLCyZc96Ciqfu6vOxDbQA',

GITHUB_TOKEN: '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',
REPO_NAME: 'FFFFFJ',
GITHUB_USER_NAME: 'DarksadasYT12',

};