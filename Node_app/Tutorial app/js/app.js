// const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
// const axios = require('axios')
// const { error } = require('console')


// const url = 'https://api.open-meteo.com/v1/forecast?latitude=-26.2023&longitude=28.0436&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m'
// //Lati = -26.2023 longi = 28.0436

// const apiKey = 'BE08CBAA805A0B5780B047B8DB4F1E054FCC99B075FEBBB8663BB4341CDB674E85646765D3E3B26F97406F28192A8824';

// const apiUrl = 'https://api.elasticemail.com/v2/';


const app = express()
// const publicDirectoryPath = path.join(__dirname, '../public')

// app.use(express.static(publicDirectoryPath))

// app.set('view engine', 'hbs')

// app.get('',(req, res)=> {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/weather',(req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Cape Town'
//     })
// })

// app.get('/weather', (req, res) => {
//     // All query string key/value pairs are on req.query
//     res.send(`You provided "${req.query.address}" as the address.`);
// });


// app.get('/hbs', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Sandile Nxumalo'
//     })
// })

// axios.get(url, {
//     responseType: 'json',
// })
//     .then(response => {
//         const data = response.data;

//         console.log('Current Temperature: ', data.current.temperature_2m);
//         console.log('Current Wind Speed:', data.current.wind_speed_10m);

//         console.log('Hourly Temperature:', data.hourly.temperature_2m);
//     })
//     .catch(error => {
//         console.error('Error  fetching data:', error.message);
//     });

    // const sendEmail = async () => {
    //     try {
    //         const response = await axios.post(`${apiUrl}email/send`, {
    //             apiKey: apiKey,
    //             subject: 'Test Mail API',
    //             to: 'sandileyzee@gmail.com',
    //             from: 'sandile@gmail.com',
    //             bodyText: 'We alert you that this api is working!!'
    //         });
    //         console.log('Email sent:', response.data);
    //     } catch (error) {
    //         console.error('Error sending email:', error.response ? error.response.data : error.message);
    //     }
    // };

    // sendEmail();

// console.log('Starting')

// //Wait 2 seconds before running the function
// setTimeout(() => {
//     console.log('2 second timer')
// }, 2000)

// console.log('Stopping')

mongoose.connect('mongodb://127.0.0.1:27017/nodeApi')
  .then(() => {
    console.log('Connected!');
  })
  .catch((error) => {
    console.log(error);
  });




   

  