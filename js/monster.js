const monsterCreator = (monsterDetails) => {
  return {
    name: monsterDetails[0],
    health: monsterDetails[1],
    maxHealth: monsterDetails[2],
    attack: monsterDetails[3],
    defense: monsterDetails[4],   //if the speed number is higher, monster go first
    speed: monsterDetails[5],
    level: monsterDetails[6],
    xpGiven: monsterDetails[7],
    goldGiven: monsterDetails[8],
    description: monsterDetails[9],
    icon: monsterDetails[10]
  }
};

const monsters = [];
monsters.push(['Ryan', 100, 100, 20, 2, 3, 1, 10, 500, 'A dangerous man wearing basketball shorts.', 1]);
monsters.push(['Ben', 100, 100, 15, 1, 4, 1, 10, 500, 'A confused man wielding an IPA.', 2]);
monsters.push(['Math Homework', 100, 100, 12, 1, 6, 2, 10, 100, 'You struggle to understand the Gauss-Green theorem.', 3]);
monsters.push(['All Your Exes', 100, 100, 8, 1, 2, 2, 10, 100, 'Each more evil than the last.', 4]);
monsters.push(['Looming Deadline', 100, 100, 7, 1, 3, 2, 10, 100, 'Procrastinator\'s wake-up call.', 5]);
monsters.push(['High Cost of Living', 100, 100, 5, 1, 1, 2, 20, 500, 'Gonna need to find another room mate.', 6]);
monsters.push(['Medical Debt', 100, 100, 15, 1, 4, 2, 20, 100, 'From that time you got suplexed.', 7]);
monsters.push(['Dissapointed Father', 100, 100, 20, 1, 6, 3, 30, 10, 'He\'s not mad, just dissapointed.', 8]);


export const monsterGenerator = () => {
  const monsterNumber = Math.floor(Math.random()*monsters.length);
  return monsterCreator(monsters[monsterNumber]);
}

const bossMonsters = [];

export const bossMonsterGenerator = (level) => {
  return bossMonsters[level];
}
