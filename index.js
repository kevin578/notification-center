const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const deviceModel = require("./models/devices");
const notificationModel = require("./models/notificationHistory")
const sendMessages = require("./expo-server-sdk");

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URI, ()=> {
    console.log("connected")
});

app.post('/api/sendnotification', (req, res)=> {
    
    const {body} = req;

    const newNotification = new notificationModel({ 
        title: body.title,
        message: body.message,
        link: body.link,
        years: body.years,
        date: Date.now()
    });
    Promise.all([
    deviceModel.find({}, (err, devices)=> {
        sendMessages(devices, req.body)
    }),
    newNotification.save()
    ]).then((response)=> {
        res.send(response);
    })
})

app.get("/api/getHistory", (req, res)=> {
    notificationModel.find({}, (err, devices)=> {
        if (err) return res.send(err);
        res.json(devices.reverse());
    })
})

app.post("/api/deleteHistory", (req, res)=> {
    notificationModel.remove({}, (err, resp)=> {
        if (err) return res.send(err);
        res.json(resp);
    })
})

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    // like our main.js file, or main.css file!
    app.use(express.static("client/build"));
  
    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

app.post('/api/addDevice', (req, res) => {
    const Device = new deviceModel({
        token: req.body.token,
        timestamp: req.body.timestamp
    });
    Device.save(()=> {
        res.send("done")
    })
});

app.post('/api/updateYear', (req,res) => {
    const {deviceId, year} = req.body;    
    deviceModel.findOneAndUpdate({deviceId}, {year}, (err, resp)=> {
        if (err) return res.send(err);
        res.send(resp);
    });
});



const PORT = process.env.PORT || 5000;
app.listen(PORT);