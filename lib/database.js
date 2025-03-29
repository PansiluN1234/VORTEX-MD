const fetch = require('node-fetch');
const axios = require('axios');
const config = require('../config')



const userName = config.GITHUB_USER_NAME ;
const token = config.GITHUB_TOKEN ;
const repoName = config.REPO_NAME ;

// Function to fetch data from GitHub API
async function githubApiRequest(url, method = 'GET', data = {}) {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Basic ${Buffer.from(`${userName}:${token}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    };

    if (method === 'GET' || method === 'HEAD') {
      // Remove the body property for GET and HEAD requests
      delete options.body;
    } else {
      // For other methods (POST, PUT, DELETE, etc.), add the JSON.stringify data to the request body
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    return await response.json();
  } catch (error) {
    throw new Error(`GitHub API request failed: ${error.message}`);
  }
}


async function checkRepoAvailability() {
  try {
    const apiUrl = `https://api.github.com/repos/${userName}/${repoName}`;
const headers = {
  Authorization: `Bearer ${token}`,
};

    const response = await axios.get(apiUrl, { headers });

    if (response.status === 200) {
      return true
    } else {
     return false
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false
    } else {
      console.error('Error:', error.message);
    }
  }
}


// 1. Function to search GitHub file
async function githubSearchFile(filePath, fileName) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}?ref=main`;
  const data = await githubApiRequest(url);
  return data.find((file) => file.name === fileName);
}

// 2. Function to create a new GitHub file
async function githubCreateNewFile(filePath, fileName, content) {
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Create new file: ${fileName}`,
    content: Buffer.from(content).toString('base64'),
  };
  return await githubApiRequest(url, 'PUT', data);
}

// 3. Function to delete a GitHub file
async function githubDeleteFile(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
  const data = {
    message: `Delete file: ${fileName}`,
    sha: file.sha,
  };
  await githubApiRequest(url, 'DELETE', data);
}

// 4. Function to get GitHub file content
async function githubGetFileContent(filePath, fileName) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) throw new Error('File not found on GitHub.');
  
  const url = file.download_url;
  const response = await fetch(url);
  return await response.text();
}

// 5. Function to clear GitHub file content and add new content
async function githubClearAndWriteFile(filePath, fileName, content) {
  const file = await githubSearchFile(filePath, fileName);
  if (!file) {
    await githubCreateNewFile(fileName, content);
  } else {
    const url = `https://api.github.com/repos/${userName}/${repoName}/contents/${filePath}/${fileName}`;
    const data = {
      message: `Modify file: ${fileName}`,
      content: Buffer.from(content).toString('base64'),
      sha: file.sha,
    };
    return await githubApiRequest(url, 'PUT', data);
  }
}

// 6. Function to delete an existing GitHub file and upload a new one
async function githubDeleteAndUploadFile(fileName, newContent) {
  await githubDeleteFile(fileName);
  await githubCreateNewFile(fileName, newContent);
}

//========================================
async function updateCMDStore(MsgID , CmdID) {
try { 
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
olds.push({[MsgID]:CmdID})
var add = await githubClearAndWriteFile('Non-Btn','data.json',JSON.stringify(olds, null, 2))
return true
} catch (e) {
console.log( e)
return false
}
}

async function isbtnID(MsgID){
try{
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
if(foundData) return true
else return false
} catch(e){
return false
}
}

async function getCMDStore(MsgID) {
try { 
let olds = JSON.parse(await githubGetFileContent("Non-Btn",'data.json'))
let foundData = null;
for (const item of olds) {
  if (item[MsgID]) {
    foundData = item[MsgID];
    break;
  }
}
return foundData
} catch (e) {
console.log( e)
return false
}
} 

function getCmdForCmdId(CMD_ID_MAP, cmdId) {
  const result = CMD_ID_MAP.find((entry) => entry.cmdId === cmdId);
  return result ? result.cmd : null;
}

const connectdb = async () => {
let availabilityrepo = await checkRepoAvailability()
if(!availabilityrepo){
    const response = await axios.post(
      'https://api.github.com/user/repos',
      {
        name: repoName,
        private: true, // Set to true for a private repo
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
let get = {
LANG: 'EN' ,
AUTO_RECORDING: false,
ANTI_BAD: false,
PREFIX: '.',
AUTO_READ_STATUS: false,
AUTO_BLOCK: false,
ANTI_CALL: false,
ONLY_GROUP: false,
ANTI_LINK: false,
ANTI_BOT: false,
AUTO_REACT: false,
AUTO_TYPING: false,
AUTO_MSG_READ: false,
AT_CHAT: false,
CMD_ONLY_READ: true,  
ALIVE: `default`,
JID: '©𝚉𝙴𝚁𝙾-𝚃𝚆𝙾 𝙼𝙳',
OWNER_NUMBER: '94787318729',
LOGO: `https://github.com/DarksadasYT1/DARK-SHUTER-HARD/blob/main/LOGO/darkshuterv2.jpeg?raw=true` 
}


  let olds = []

await githubCreateNewFile("settings", "settings.json",JSON.stringify(get))
  await githubCreateNewFile("Non-Btn", "data.json",JSON.stringify(olds))
console.log(`Database "${repoName}" created successfully 🛢️`);
}
else console.log("Database connected 🛢️")
};
//=====================================================================
async function input(setting, data){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
if (setting == "AUTO_RECORDING") {
get.AUTO_RECORDING = data
config.AUTO_RECORDING = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_BAD") {
get.ANTI_BAD = data
config.ANTI_BAD = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_READ_STATUS") {
get.AUTO_READ_STATUS = data
config.AUTO_READ_STATUS = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ONLY_GROUP") {
get.ONLY_GROUP = data
config.ONLY_GROUP = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_LINK") {
get.ANTI_LINK = data
config.ANTI_LINK = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_BOT") {
get.ANTI_BOT = data
config.ANTI_BOT = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_TYPING") {
get.AUTO_TYPING = data
config.AUTO_TYPING = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "JID") {
get.JID = data
config.JID = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "LOGO") {
get.LOGO = data
config.LOGO = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "PREFIX") {
get.PREFIX = data
config.PREFIX = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ALIVE") {
get.ALIVE = data
config.ALIVE = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_MSG_READ") {
get.AUTO_MSG_READ = data
config.AUTO_MSG_READ = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "CMD_ONLY_READ") {
get.CMD_ONLY_READ = data
config.CMD_ONLY_READ = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_BLOCK") {
get.AUTO_BLOCK = data
config.AUTO_BLOCK = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "ANTI_CALL") {
get.ANTI_CALL = data
config.ANTI_CALL = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AUTO_REACT") {
get.AUTO_REACT = data
config.AUTO_REACT = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "OWNER_NUMBER") {
get.OWNER_NUMBER = data
config.OWNER_NUMBER = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "AT_CHAT") {
get.AT_CHAT = data
config.AT_CHAT = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} else if (setting == "LANG") {
get.LANG = data
config.LANG = data
return await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))
} 

}

async function get(setting){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
 
if (setting == "AUTO_RECORDING") {
return get.AUTO_RECORDING
} else if (setting == "ANTI_BAD") {
return get.ANTI_BAD
} else if (setting == "AUTO_READ_STATUS") {
return get.AUTO_READ_STATUS
} else if (setting == "ONLY_GROUP") {
return get.ONLY_GROUP
} else if (setting == "ANTI_LINK") {
return get.ANTI_LINK
} else if (setting == "ANTI_BOT") {
return get.ANTI_BOT
} else if (setting == "AUTO_TYPING") {
return get.AUTO_TYPING
} else if (setting == "JID") {
return get.JID
} else if (setting == "LOGO") {
return get.LOGO
} else if (setting == "PREFIX") {
return get.PREFIX
} else if (setting == "ALIVE") {
return get.ALIVE
} else if (setting == "AUTO_MSG_READ") {
return get.AUTO_MSG_READ
} else if (setting == "CMD_ONLY_READ") {
return get.CMD_ONLY_READ
} else if (setting == "AUTO_BLOCK") {
return get.AUTO_BLOCK
} else if (setting == "ANTI_CALL") {
return get.ANTI_CALL
} else if (setting == "AUTO_REACT") {
return get.AUTO_REACT
} else if (setting == "OWNER_NUMBER") {
return get.OWNER_NUMBER
} else if (setting == "AT_CHAT") {
return get.AT_CHAT
} else if (setting == "LANG") {
return get.LANG
} 

}

async function updb(){
let get = JSON.parse(await githubGetFileContent("settings", "settings.json"))
config.LANG = get.LANG
config.AUTO_RECORDING = get.AUTO_RECORDING
config.AUTO_READ_STATUS = get.AUTO_READ_STATUS
config.AUTO_TYPING = get.AUTO_TYPING
config.ALIVE = get.ALIVE
config.ANTI_CALL = get.ANTI_CALL
config.JID = get.JID
config.AUTO_MSG_READ = get.AUTO_MSG_READ
config.PREFIX = get.PREFIX
config.LOGO = get.LOGO
config.ANTI_BAD = get.ANTI_BAD
config.ONLY_GROUP = get.ONLY_GROUP
config.AUTO_REACT = get.AUTO_REACT
config.AUTO_BLOCK = get.AUTO_BLOCK
config.CMD_ONLY_READ = get.CMD_ONLY_READ
config.ANTI_LINK = get.ANTI_LINK
config.ANTI_BOT = get.ANTI_BOT
config.AT_CHAT = get.AT_CHAT
config.OWNER_NUMBER = get.OWNER_NUMBER
console.log("Database writed ✅")
}

async function updfb(){
let get = {
LANG: 'EN' ,
AUTO_RECORDING: false,
ANTI_BAD: false,
AUTO_READ_STATUS: false,
ANTI_CALL: false,
CMD_ONLY_READ: true,
AUTO_REACT: false,  
ONLY_GROUP: false, 
ANTI_LINK: false,
AT_CHAT: false,
PREFIX: '.',
ANTI_BOT: false,
ALIVE: `default`,
AUTO_TYPING: false,
AUTO_BLOCK: false,
AUTO_MSG_READ: false,
JID: '©𝚉𝙴𝚁𝙾-𝚃𝚆𝙾 𝙼𝙳',
OWNER_NUMBER: '94787318729',
LOGO: `https://github.com/DarksadasYT1/DARK-SHUTER-HARD/blob/main/LOGO/darkshuterv2.jpeg?raw=true` 
}
await githubClearAndWriteFile("settings", "settings.json",JSON.stringify(get))

config.LANG = 'EN'  
config.AUTO_RECORDING = false
config.CMD_ONLY_READ = true
config.AUTO_READ_STATUS = false  
config.ANTI_CALL = false
config.AUTO_TYPING = false
config.AUTO_BLOCK = false
config.AT_CHAT = false
config.AUTO_REACT = false
config.JID = '©𝚉𝙴𝚁𝙾-𝚃𝚆𝙾 𝙼𝙳'
config.OWNER_NUMBER = '94787318729'
config.ALIVE =`default`
config.PREFIX = '.'
config.LOGO = `https://github.com/DarksadasYT1/DARK-SHUTER-HARD/blob/main/LOGO/darkshuterv2.jpeg?raw=true` 
config.ANTI_BAD = false
config.ONLY_GROUP = false
config.AUTO_MSG_READ = false
config.ANTI_LINK = false
config.ANTI_BOT = false
console.log("Database writed ✅")
}

module.exports = { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get,updb,updfb }
