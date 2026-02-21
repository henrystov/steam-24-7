const SteamUser = require('steam-user');
const client = new SteamUser();

const logOnOptions = {
    accountName: process.env.STEAM_USER,
    password: process.env.STEAM_PASSWORD,
    authCode: process.env.STEAM_GUARD_CODE 
};

const games = process.env.GAMES.split(',').map(id => parseInt(id.trim()));

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log("Logged into Steam");
    client.setGamesPlayed(games);
});

client.on('error', (err) => {
    console.log("Error: " + err.message);
    process.exit(1);
});
