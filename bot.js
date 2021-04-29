const axios = require('axios');
const cron = require('node-cron');
require('dotenv').config({path: __dirname + '/.env'})

const MATTERMOST_URL = process.env.MATTERMOST_URL;
const MATTERMOST_USER_ID = process.env.MATTERMOST_USER_ID;
const MATTERMOST_PASSWORD = process.env.MATTERMOST_PASSWORD;
const MATTERMOST_GUNAYDIN_HOUR = process.env.MATTERMOST_GUNAYDIN_HOUR;
const MATTERMOST_GUNAYDIN_MINUTE = process.env.MATTERMOST_GUNAYDIN_MINUTE;

const channels = {"alperen-tolga":"4w1dys48p3yhtdksra4u799apc", "iso-tolga":"45yazka5wbduupt1qmzuowibec", "offtopic":"65bfgdgwdjnd8q4d7chpr6rdqw"};
const emoji = [":sunny:", ":bouquet: ", ":balloon:", ":sun_behind_small_cloud:", ":coffee:", ":sun_with_face:"]

// MINUTE - HOUR cinsinden sırasıyla yazılır
cron.schedule(MATTERMOST_GUNAYDIN_MINUTE + ' ' + MATTERMOST_GUNAYDIN_HOUR + ' * * *', function() {
    console.log('cron executed');
    gunaydin();
});

// TEST
/*for (let index = 0; index < 5; index++) {
    gunaydin();
    
}*/

async function gunaydin(){
    let loginResponse = await login(MATTERMOST_USER_ID, MATTERMOST_PASSWORD);
    let token = loginResponse.headers.token;
    let randomElement = emoji[Math.floor(Math.random() * emoji.length)];
    sendMessage(token, channels['iso-tolga'], randomElement);
}

function login(login_id, password) {
    var data = JSON.stringify({
        "login_id": login_id,
        "password": password
    });

    var config = {
        method: 'post',
        url: MATTERMOST_URL + '/api/v4/users/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    let response = axios(config);
    return response;
    /*axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.headers.token);
            return response;
            //return response.headers.token;
        })
        .catch(function (error) {
            console.log(error);
        });*/

}

function sendMessage(token, channel_id, message) {
    var data = JSON.stringify({
        "channel_id": channel_id,
        "message": message,
        "root_id": "",
        "file_ids": [""],
        "props": {}
    });

    var config = {
        method: 'post',
        url: MATTERMOST_URL + '/api/v4/posts',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data: data
    };

    let response = axios(config);
    return response;
    /*axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });*/
}