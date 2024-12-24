export class Game {
    constructor(gameid) {
        this.gameid = gameid;
    }

    getAPIReady() {
        return `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.gameid}`;
    }

    async getGameDetails() {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ba11e00294mshd143f96a8253e90p182884jsnc98fdee84811',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(this.getAPIReady(), fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch game details");
            return await response.json();
        } catch (error) {
            console.error("Error fetching game details:", error);
            return null;
        }
    }
}