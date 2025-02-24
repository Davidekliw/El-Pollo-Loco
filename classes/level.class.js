class Level {
    enemies;
    clouds;
    backgroundObjs;
    // endboss;
    rewards;
    level_end_x = 2900;

    constructor(enemies, clouds, backgroundObjs, rewards) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjs = backgroundObjs;
        // this.endboss = endboss;
        this.rewards = rewards;        
    }
}