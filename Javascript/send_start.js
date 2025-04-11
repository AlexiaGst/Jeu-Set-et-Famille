const fs = require('fs');
const WebSocket = require('ws');


const data = JSON.parse(fs.readFileSync("start_msg.json"));
data.id_partie = parseInt(data.id_partie); // important !

console.log("Contenu du start_msg.json : ", data);

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
    ws.send(JSON.stringify(data), () => {
        setTimeout(() => {
            ws.close();
        }, 500);
    });
});

ws.on('error', (err) => {
    console.error("Erreur WebSocket :", err);
});
