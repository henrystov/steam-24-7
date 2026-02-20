const SteamUser = require('steam-user');
const client = new SteamUser();

const logOnOptions = {
    accountName: process.env.STEAM_USER,
    password: process.env.STEAM_PASSWORD,
    // This is for the 5-character code from your email
    authCode: process.env.STEAM_GUARD_CODE 
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log("SUCCESS: Logged into Steam via Email Guard!");
    client.setGamesPlayed([440, 570, 730]);
});

client.on('error', (err) => {
    if (err.eresult === SteamUser.EResult.AccountLogonDenied) {
        console.log("!!! STEAM GUARD REQUIRED !!!");
        console.log("Check your email for a 5-character code.");
        console.log("Add it to GitHub Secrets as 'STEAM_GUARD_CODE' and run again.");
    } else {
        console.log("Login Error: " + err.message);
    }
});
