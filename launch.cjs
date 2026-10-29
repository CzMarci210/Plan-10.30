const {spawn}=require('node:child_process');
const child=spawn(process.execPath,['server.js'],{cwd:__dirname,env:process.env,stdio:['inherit','pipe','inherit']});let opened=false;
child.stdout.on('data',chunk=>{process.stdout.write(chunk);const match=chunk.toString().match(/GRIDLINE: (http:\/\/(?:127\.0\.0\.1|localhost):\d+)/);if(match&&!opened){opened=true;if(process.platform==='win32'){const browser=spawn('explorer.exe',[match[1]],{stdio:'ignore'});browser.on('error',()=>console.log('Open '+match[1]+' in your browser.'))}}});
child.on('error',e=>{console.error(e.message);process.exitCode=1});child.on('exit',code=>process.exit(code||0));process.on('SIGINT',()=>child.kill('SIGINT'));
