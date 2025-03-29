const config = require('../config')
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "alive",
    react: "👾",
    alias: ["online","test","bot"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
let monspacenew ='`'
if(config.ALIVE === "default") {
const buttons = [
  {buttonId: prefix + 'menu' , buttonText: {displayText: 'COMMANDS MENU'}, type: 1},
  {buttonId: prefix + 'ping' , buttonText: {displayText: 'BOT\'S SPEED'}, type: 1}
]
const buttonMessage = {
    image: {url: config.LOGO},
    caption: `🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟✨✨✨✨✨🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟🌟
    
    
    💀💀🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠🌠`,
    footer: config.FOOTER,
    buttons: buttons,
    headerType: 4
}
return await conn.buttonMessage2(from, buttonMessage)}
else {
  const buttons = [
    {buttonId: prefix + 'menu' , buttonText: {displayText: 'COMMANDS MENU'}, type: 1},
    {buttonId: prefix + 'ping' , buttonText: {displayText: 'BOT\'S SPEED'}, type: 1}
  ]
  const buttonMessage = {
      image: {url: config.LOGO},
      caption: config.ALIVE,
      footer: config.FOOTER,
      buttons: buttons,
      headerType: 4
  }
  return await conn.buttonMessage2(from, buttonMessage, mek)}
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "ping",
    //react: "📍",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: 'ꜱᴘᴅ ᴛᴇꜱᴛ : )'  }, { quoted: mek } )
var final = new Date().getTime();
await conn.edite(ping, '*Po🫠*\n *' + (final - inital) + ' ms* ' )
   await conn.sendMessage(from, { react: { text: '📍', key: mek.key } }); 
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
  pattern: "menu",
  react: "📃",
  alias: ["panel","list","commands"],
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()
let monspace ='```'
const buttons = [
{buttonId: prefix + 'dojjjjjjj🥺nu' , buttonText: {displayText: '𝙳💝w✅w✅wn♕'}, type: 1},

{buttonId: prefix + 'cnsnnsnsnsnsnu' , buttonText: {displayText: 'jsjsjsjsjjsjsjsnsnsnns💀💀'}, type: 1},
{buttonId: prefix + 'mnsnnsnnsu' , buttonText: {displayText: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃'}, type: 1},
{buttonId: prefix + 'moviemenu' , buttonText: {displayText: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃'}, type: 1},
{buttonId: prefix + '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃' , buttonText: {displayText: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃'}, type: 1},
{buttonId: prefix + 'groupmenu' , buttonText: {displayText: '𝐀  𝐋  𝐄  𝐗  -  𝐌  𝐃'}, type: 1}
]
const buttonMessage = {
  image: {url: config.LOGO},
  caption: `*> © 𝑷𝑶𝑾𝑬𝑹𝑬𝑫 𝑩𝒀  𝑨 𝑳 𝑬 𝑿- 𝑴 𝑫*

*🌠Hellow _${pushname}_

*╭┉━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁*
> ⿻ *Version* :: ${require("../package.json").version}
> ⿻ *Runtime* :: ${runtime(process.uptime())}
*╰┉━━┉━━┉━━┉━━┉━━┉━⦁⦂⦁*⦁`,
  footer: config.FOOTER,
  buttons: buttons,
  headerType: 4
}
return await conn.buttonMessage2(from, buttonMessage, mek)
} catch (e) {
reply('*Error !!*')
l(e)
}
})


cmd({
        pattern: "restart",
    react: "🔄",
        desc: "To restart bot",
        category: "owner",
        filename: __filename
    },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname,isSachintha, isSavi, isSadas, isMani, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
if(!isOwner && !isSachintha && !isSavi && !isSadas && !isMani && !isMe)return;
    try{    const { exec } = require("child_process")
            reply('*Restart all*')
            exec('pm2 restart all')
} catch (e) {
reply('*Error !!*')
l(e)
}
})
