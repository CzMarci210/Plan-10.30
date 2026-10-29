'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),{DatabaseSync}=require('node:sqlite');
const series=['F1','MotoGP','WEC','WRC','IndyCar','Formula E','NASCAR'],statuses=['scheduled','completed','cancelled'];
const file=process.env.DB_PATH||path.join(__dirname,'data','motorsport.sqlite');
fs.mkdirSync(path.dirname(file),{recursive:true});
const db=new DatabaseSync(file);
db.exec("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT NOT NULL,series TEXT NOT NULL,start_utc TEXT NOT NULL,end_utc TEXT NOT NULL,venue TEXT NOT NULL,country TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',status TEXT NOT NULL DEFAULT 'scheduled',is_demo INTEGER NOT NULL DEFAULT 0);CREATE INDEX IF NOT EXISTS idx_events_date ON events(start_utc);");
if(db.prepare('SELECT COUNT(*) n FROM events').get().n===0){
 const ins=db.prepare('INSERT INTO events(title,series,start_utc,end_utc,venue,country,description,status,is_demo) VALUES(?,?,?,?,?,?,?,?,1)');
 [['F1','Bemutató Nagydíj','Hungaroring','Magyarország',4],['MotoGP','Bemutató MotoGP','Portimão','Portugália',9],['WEC','Bemutató 6 órás futam','Spa','Belgium',13],['WRC','Bemutató Rally','Monte-Carlo','Monaco',19],['IndyCar','Bemutató Indy futam','Indianapolis','USA',24],['Formula E','Bemutató E-Prix','Berlin','Németország',30],['NASCAR','Bemutató NASCAR futam','Daytona','USA',36]].forEach(([s,t,v,c,days])=>{let a=new Date();a.setUTCHours(13,0,0,0);a.setUTCDate(a.getUTCDate()+days);let b=new Date(a.getTime()+7200000);ins.run(t,s,a.toISOString(),b.toISOString(),v,c,'DEMO: nem hivatalos versenyidőpont','scheduled');});
}
const json=(r,status,data)=>{r.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});r.end(JSON.stringify(data));};
function validate(o){if(!o||typeof o!=='object')throw Error('Hiányzó adatok');
const clean=(key,max=150)=>{if(typeof o[key]!=='string'||!o[key].trim()||o[key].length>max)throw Error('Hibás mező: '+key);return o[key].trim();};
const d={title:clean('title'),series:clean('series'),start_utc:clean('start_utc'),end_utc:clean('end_utc'),venue:clean('venue'),country:clean('country'),description:typeof o.description==='string'?o.description.slice(0,1000):'',status:o.status||'scheduled'};
if(!series.includes(d.series)||!statuses.includes(d.status))throw Error('Érvénytelen sorozat vagy állapot');
for(const key of ['start_utc','end_utc']){if(!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(d[key])||!Number.isFinite(Date.parse(d[key])))throw Error('Hibás UTC időpont');d[key]=new Date(d[key]).toISOString();}
if(d.end_utc<=d.start_utc)throw Error('A befejezésnek később kell lennie');return d;}
async function body(req){let s='';for await(const part of req){s+=part;if(s.length>65536)throw Error('Túl nagy kérés')}try{return JSON.parse(s)}catch{throw Error('Érvénytelen JSON')}}
const cols='title,series,start_utc,end_utc,venue,country,description,status';
function ics(rows){let out=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//GRIDLINE//HU','CALSCALE:GREGORIAN'];for(const r of rows){const dt=v=>v.replace(/[-:]/g,'').replace(/\.\d{3}/,'');const esc=v=>String(v).replace(/\\/g,'\\\\').replace(/,/g,'\\,').replace(/;/g,'\\;').replace(/\n/g,'\\n');out.push('BEGIN:VEVENT','UID:'+r.id+'@gridline.local','DTSTAMP:'+dt(new Date().toISOString()),'DTSTART:'+dt(r.start_utc),'DTEND:'+dt(r.end_utc),'SUMMARY:'+esc(r.series+' - '+r.title),'LOCATION:'+esc(r.venue+', '+r.country),'DESCRIPTION:'+esc(r.description),'END:VEVENT')}return out.concat('END:VCALENDAR','').join('\r\n')}
const types={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/styles.css':'styles.css','/favicon.svg':'favicon.svg'};
const mime={html:'text/html',js:'text/javascript',css:'text/css',svg:'image/svg+xml'};
const server=http.createServer(async(req,res)=>{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'; frame-ancestors 'none'");let u=new URL(req.url,'http://localhost'),p=u.pathname,m=req.method;
try{
if(p==='/api/health'&&m==='GET')return json(res,200,{ok:true});
if(p==='/api/series'&&m==='GET')return json(res,200,{series});
if(p==='/api/events'&&m==='GET'){let rows=db.prepare('SELECT * FROM events ORDER BY start_utc ASC LIMIT 5000').all();if(u.searchParams.has('series'))rows=rows.filter(x=>x.series===u.searchParams.get('series'));if(u.searchParams.has('q')){let q=u.searchParams.get('q').toLocaleLowerCase('hu');rows=rows.filter(x=>[x.title,x.venue,x.country].some(y=>y.toLocaleLowerCase('hu').includes(q)))}return json(res,200,{events:rows})}
if(p==='/api/events'&&m==='POST'){let d=validate(await body(req)),r=db.prepare('INSERT INTO events('+cols+',is_demo) VALUES(?,?,?,?,?,?,?,?,0)').run(...Object.values(d));return json(res,201,{event:db.prepare('SELECT * FROM events WHERE id=?').get(Number(r.lastInsertRowid))})}
if(p==='/api/calendar.ics'&&m==='GET'){res.writeHead(200,{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="gridline.ics"'});return res.end(ics(db.prepare("SELECT * FROM events WHERE status!='cancelled'").all()))}
let match=p.match(/^\/api\/events\/([1-9]\d*)(\.ics)?$/);if(match){let id=Number(match[1]),r=db.prepare('SELECT * FROM events WHERE id=?').get(id);if(!r)return json(res,404,{error:'Nem található'});if(m==='GET'&&match[2]){res.writeHead(200,{'Content-Type':'text/calendar; charset=utf-8'});return res.end(ics([r]))}if(m==='GET')return json(res,200,{event:r});if(m==='PUT'){let d=validate(await body(req));db.prepare('UPDATE events SET title=?,series=?,start_utc=?,end_utc=?,venue=?,country=?,description=?,status=?,is_demo=0 WHERE id=?').run(...Object.values(d),id);return json(res,200,{event:db.prepare('SELECT * FROM events WHERE id=?').get(id)})}if(m==='DELETE'){db.prepare('DELETE FROM events WHERE id=?').run(id);return json(res,200,{deleted:true})}}
if(m==='GET'&&types[p]){let name=types[p],b=fs.readFileSync(path.join(__dirname,'public',name));res.writeHead(200,{'Content-Type':mime[name.split('.').pop()]+'; charset=utf-8'});return res.end(b)}
return json(res,404,{error:'Nem található'});
}catch(e){return json(res,400,{error:e.message})}});
if(require.main===module){const port=Number(process.env.PORT||3000),host=process.env.HOST||'127.0.0.1';server.listen(port,host,()=>console.log('GRIDLINE: http://'+host+':'+port))}
module.exports={server,db,validate};
