// boost.js
const SteamUser = require('steam-user');
const client = new SteamUser();

const logOnOptions = {
    accountName: process.env.STEAM_USER,
    password: process.env.STEAM_PASSWORD,
    authCode: process.env.STEAM_GUARD_CODE // The 5-char code from your email
};

client.logOn(logOnOptions);

client.on('loggedOn', (details) => {
    console.log("SUCCESS: Logged into Steam as " + client.steamID.getSteamID64());
    
    // Set games to "online" status to boost hours
    // 440: Team Fortress 2, 570: Dota 2, 730: CS2
    client.setGamesPlayed([440, 570, 730]);
    console.log("Now boosting hours for IDs: 440, 570, 730");
});

client.on('steamGuard', (domain, callback, lastCodeWrong) => {
    if (lastCodeWrong) {
        console.log("The Steam Guard code in GitHub Secrets is WRONG or EXPIRED.");
        process.exit(1); 
    } else {
        console.log("Steam Guard code required from email: " + domain);
        // If the code wasn't in logOnOptions, the script would usually wait here.
        // In a CI environment, we want to fail fast so the user knows to update secrets.
    }
});

client.on('error', (err) => {
    console.log("Login Error: " + err.message);
    process.exit(1);
});
