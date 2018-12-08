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
    deviceModel.findOne({token: "ExponentPushToken[opdDA1CyP16myoZNtPCzwc]"}, (err, devices)=> {
        sendMessages([devices], req.body)
    }),
    newNotification.save()
    ]).then((response)=> {
        res.send(response);
    })


    // deviceModel.find({}, (err, devices)=> {
    //     sendMessages(devices)
    // })
})

app.get("/api/getHistory", (req, res)=> {
    notificationModel.find({}, (err, devices)=> {
        if (err) return res.send(err);
        res.json(devices.reverse());
    })
})

// app.post('/api/addDevice', (req, res) => {
//     const Device = new deviceModel({token: req.body.token});
//     Device.save(()=> {
//         res.send("done")
//     })
// })




const PORT = process.env.PORT || 5000;
app.listen(PORT);