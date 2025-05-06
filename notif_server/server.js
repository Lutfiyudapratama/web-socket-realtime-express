
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const webSocket = require('ws');
const { Error } = require('sequelize');

const app = express();
const port = 3001;
const server = http.createServer(app);
const wss = new webSocket.Server({ server });
const Hostname = "127.0.0.1";
const corsOptions = {
    origins: ["http://127.0.0.1:5500"],
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: ${message}');
    })
    wss.on('close', () => console.log('websocket disconnected'));
})

app.post('/send-message', (req, res) => {
    const { name, message } = req.body

    if (!name || !message) {
        return res.status(422).json({
            message: 'Name and message must be filled!!'
        })
    }

    try {
        wss.clients.forEach(client => {
            if (client.readyState === webSocket.OPEN) {
                client.send(JSON.stringify({ name, message }))
            }
        })
        res.json({
            success: true,
            message: 'Message sent successfully!',
            contentmessage: message,
            name: name
        })
    }
    catch (error) {
        console.log(`Error sending notif: ${error}`)
        res.status(500).json({
            message: "ERR",
            error: error
        })
    }
})

server.listen(port, () => console.log(`Web server start at http://${Hostname}:${port}`));