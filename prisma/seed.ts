import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const userDaigo = await prisma.user.upsert({
    where: { email: "daigo@thebeast.com" },
    update: {},
    create: {
      email: "daigo@thebeast.com",
      firstName: "Umehara",
      lastName: "Daigo",
    },
  });
  const userJustin = await prisma.user.upsert({
    where: { email: "just@wongfactor.com" },
    update: {},
    create: {
      email: "justin@wongfactor.com",
      firstName: "Justin",
      lastName: "Wong",
    },
  });

  console.log("Created users: ", userDaigo, userJustin);

  const gameStreetFighter6 = await prisma.game.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Street Fighter 6",
      description: "The sixth installment of the Street Fighter series.",
      year: 2022,
      platform: "PlayStation 5",
      imageUrl:
        "https://www.streetfighter.com/6/assets/images/index/logo_mark.png",
    },
  });

  const gameTekken8 = await prisma.game.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Tekken 8",
      description: "The eighth installment of the Tekken series.",
      year: 2023,
      platform: "Steam",
      imageUrl:
        "https://static.bandainamcoent.eu/high/tekken/tekken-8/00-page-setup/tekken8_logo.jpg.png",
    },
  });

  console.log("Created games: ", gameStreetFighter6, gameTekken8);

  const characterRyu = await prisma.character.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Ryu",
      description:
        "A wandering warrior seeking to become a true martial artist.",
      gameId: 1,
      imageUrl:
        "https://www.streetfighter.com/6/assets/images/character/ryu/ryu.png",
    },
  });

  const characterChunLi = await prisma.character.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Chun-Li",
      description:
        "An Interpol officer who relentlessly seeks revenge for her father's death.",
      gameId: 1,
      imageUrl:
        "https://static.wikia.nocookie.net/streetfighter/images/5/5b/Chun-Li_SF6_Render.png/revision/latest?cb=20220603005535",
    },
  });

  const characterKazuya = await prisma.character.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Kazuya Mishima",
      description:
        "The son of Heihachi Mishima and the grandson of Jinpachi Mishima.",
      gameId: 2,
      imageUrl:
        "https://static.wikia.nocookie.net/tekken/images/4/4b/Kazuya_TK8_Render.png/revision/latest?cb=20230120014634",
    },
  });

  const characterJin = await prisma.character.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Jin Kazama",
      description: "The son of Kazuya Mishima and Jun Kazama.",
      gameId: 2,
      imageUrl:
        "https://static.wikia.nocookie.net/tekken/images/2/2b/Jin_TK8_Render.png/revision/latest?cb=20230120014634",
    },
  });

  console.log(
    "Created characters: ",
    characterRyu,
    characterChunLi,
    characterKazuya,
    characterJin
  );

  const gameCharacterRyu = await prisma.gameCharacter.upsert({
    where: { id: 1 },
    update: {},
    create: { gameId: 1, characterId: 1 },
  });

  const gameCharacterChunLi = await prisma.gameCharacter.upsert({
    where: { id: 2 },
    update: {},
    create: { gameId: 1, characterId: 2 },
  });

  const gameCharacterKazuya = await prisma.gameCharacter.upsert({
    where: { id: 3 },
    update: {},
    create: { gameId: 2, characterId: 3 },
  });

  const gameCharacterJin = await prisma.gameCharacter.upsert({
    where: { id: 4 },
    update: {},
    create: { gameId: 2, characterId: 4 },
  });

  console.log(
    "Created game characters: ",
    gameCharacterRyu,
    gameCharacterChunLi,
    gameCharacterKazuya,
    gameCharacterJin
  );
}

async function rawSql() {
  const result =
    await prisma.$executeRaw`INSERT INTO "User" ("email", "firstName", "lastName", "updatedAt") VALUES ('valle@calipower.com', 'Alex', 'Valle', NOW()) ON CONFLICT DO NOTHING;`;
  console.log("Raw SQL result: ", result);
}

main()
  .then(async () => {
    await rawSql();
  })
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
