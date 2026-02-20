const SteamUser = require('steam-user');
const client = new SteamUser();

const user = process.env.STEAM_USER;
const pass = process.env.STEAM_PASSWORD;

console.log("Starting engine... checking for credentials.");

if (!user || !pass) {
    console.error("FAILED: STEAM_USER or STEAM_PASSWORD secrets are empty!");
    process.exit(1);
}

client.logOn({ accountName: user, password: pass });

client.on('loggedOn', () => {
    console.log("Logged into Steam successfully!");
    // TF2, Dota 2, CS2 (You can add more IDs here)
    client.setGamesPlayed([440, 570, 730]);
    console.log("Hours are now climbing. Cards are being checked.");
});

client.on('error', (err) => {
    console.error("Steam Connection Error: " + err.message);
    process.exit(1);
});
