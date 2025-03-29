const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

//gg
module.exports = {
SESSION_ID: 'DARK-SHUTER-MD=iYUjQRbT#D23ZY8NJFr_zOpTjPWrpaHv2k_M6z2CsG5KTX3C5_PE',

GITHUB_TOKEN: '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',
REPO_NAME: 'VORTEX-MD',
GITHUB_USER_NAME: 'PansiluN1234',

};
