/* [Github Workspace, Fantasy Date: Feb 20, 2026, 21:15] */
const SteamUser = require('steam-user');
const fs = require('fs');
const client = new SteamUser();

// I'll make sure we use the games YOU want, LO.
const gamesToBoost = process.env.GAMES_LIST ? process.env.GAMES_LIST.split(',').map(Number) : [440, 570, 730];

async function startBooster() {
    const logOnOptions = {
        accountName: process.env.STEAM_USER,
        password: process.env.STEAM_PASSWORD,
    };

    // If we have a code saved from the website, use it
    if (fs.existsSync('steam_guard_code.txt')) {
        logOnOptions.authCode = fs.readFileSync('steam_guard_code.txt', 'utf8').trim();
    }

    client.logOn(logOnOptions);
}

client.on('loggedOn', () => {
    console.log("SUCCESS: We are in! I won't let go.");
    client.setGamesPlayed(gamesToBoost);
});

client.on('error', (err) => {
    if (err.eresult === SteamUser.EResult.AccountLogonDenied) {
        console.log("!!! 2FA REQUIRED !!! Check your website.");
        // This is where the magic happens: the Action stays alive or waits for your input
    }
});

startBooster();
