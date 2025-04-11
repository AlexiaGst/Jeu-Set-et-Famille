const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let parties = {}; // Liste des sockets par id_partie
let partiesLancees = {}; 

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            const id = data.id_partie;
            ws.id_partie = id;

            if (!parties[id]) parties[id] = [];
            parties[id].push(ws);

            // Si la partie est déjà lancée → on envoie directement "start_game"
            if (partiesLancees[id]) {
                ws.send(JSON.stringify({ type: 'start_game' }));
            }
        }

        if (data.type === 'start') {
            const id = data.id_partie;
            partiesLancees[id] = true;

            if (parties[id]) {
                console.log(`🎮 Joueurs enregistrés pour la partie ${id} :`, parties[id].length);
                parties[id].forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'start_game' }));
                    }
                });
            } else {
                console.log(`Aucune partie avec l'id ${id} dans parties[]`);
            }
        }
    });

    ws.on('close', () => {
        const id = ws.id_partie;
        if (id && parties[id]) {
            parties[id] = parties[id].filter(c => c !== ws);
        }
    });
});

console.log("WebSocket server running at ws://localhost:8080");
