let currentLevel;
let levelNbr;

function initLevel(gameLevel) {
    if (gameLevel === 1) {
        levelNbr = gameLevel;
        currentLevel = new Level(
            [
                new Chicken(0),
                new Chicken(3),
                new Chicken(1.5),
                new SmallChicken(1.5),
                new SmallChicken(3),
                new SmallChicken(1.5),
                new Endboss()
            ],
            [
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud()
            ],
            [
                new BackgroundObject('./img/5_background/layers/air.png', -719),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/air.png', 0),
                new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/air.png', 719),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 3)
            ],
            [
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("coin"),
                new Reward("coin"),
                new Reward("coin")
            ]
        );
    }
    if (gameLevel === 2) {
        levelNbr = gameLevel;
        currentLevel = new Level(
            [
                new SmallChicken(1.5),
                new Chicken(0),
                new Chicken(0.5),
                new Chicken(1.5),
                new SmallChicken(1.5),
                new Chicken(3),
                new Chicken(3),
                new SmallChicken(2),
                new Chicken(1.5),
                new SmallChicken(3.5),
                new SmallChicken(1.5),
                new Endboss(60)
            ],
            [
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud()
            ],
            [
                new BackgroundObject('./img/5_background/layers/air.png', -719),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/air.png', 0),
                new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/air.png', 719),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 3)
            ],
            [
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("coin")
            ]
        );
    }
    if (gameLevel === 3) {
        levelNbr = gameLevel;
        currentLevel = new Level(
            [
                new SmallChicken(1.5),
                new Chicken(0),
                new Chicken(0),
                new SmallChicken(1.5),
                new Chicken(0.5),
                new SmallChicken(1.5),
                new SmallChicken(3.5),
                new Chicken(1.5),
                new SmallChicken(1.5),
                new SmallChicken(1.5),
                new Chicken(3),
                new Chicken(3),
                new SmallChicken(2),
                new Chicken(1.5),
                new SmallChicken(3.5),
                new SmallChicken(1.5),
                new Endboss(100)
            ],
            [
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud(),
                new Cloud()
            ],
            [
                new BackgroundObject('./img/5_background/layers/air.png', -719),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', -719),
                new BackgroundObject('./img/5_background/layers/air.png', 0),
                new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 0),
                new BackgroundObject('./img/5_background/layers/air.png', 719),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719),
                new BackgroundObject('./img/5_background/layers/air.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 2),
                new BackgroundObject('./img/5_background/layers/air.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 * 3),
                new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 * 3)
            ],
            [
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("coin"),
                new Reward("bottle"),
                new Reward("bottle"),
                new Reward("coin"),
                new Reward("coin")
            ]
        );
    }
}