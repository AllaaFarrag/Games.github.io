export class Category {
    constructor(gamesCategory) {
        this.category = gamesCategory;
    }

    getAPIReady() {
        return `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
    }

    async getGames() {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'ba11e00294mshd143f96a8253e90p182884jsnc98fdee84811',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(this.getAPIReady(), fetchOptions);
            if (!response.ok) throw new Error("Failed to fetch games");
            return await response.json();
        } catch (error) {
            console.error("Error fetching games:", error);
            return [];
        }
    }
}