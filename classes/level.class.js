class Level {
    enemies;
    clouds;
    backgroundObjs;
    rewards;
    level_end_x = 2900;

    /**
     * 
     * @param {Array} enemies - a object array with all enemys in the level
     * @param {Array} clouds - a object array with clouds
     * @param {Array} backgroundObjs - a object array for the background elements
     * @param {Array} rewards - a object array with all rewards in the level
     */
    constructor(enemies, clouds, backgroundObjs, rewards) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjs = backgroundObjs;
        this.rewards = rewards;        
    }
}