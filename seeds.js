const faker = require("faker");
const { hash } = require("bcryptjs");

const Users = require("./src/app/models/users");
const Chefs = require("./src/app/models/chefs");
const Recipes = require("./src/app/models/recipes");
const Files = require("./src/app/models/files");

let idsUsers = [];
let idsChefs = [];
let idsRecipes = [];

const totalUsers = 3;
const totalChefs = 5;
const totalRecipes = 10;

// this is the number of images that are on the public/images folder
const totalImagesFace = 8;
const totalImagesRecipes = 14;

async function createUsers() {
  const users = [];
  const password = await hash("admin", 8);

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      is_admin: faker.random.boolean(),
    });
  }

  const usersPromise = users.map((user) => Users.create(user));

  idsUsers = await Promise.all(usersPromise);
}

async function createChefs() {
  const chefs = [];

  while (chefs.length < totalChefs) {
    let fileId = await createFiles(1, "face");
    chefs.push({
      name: faker.name.firstName(),
      file_id: fileId[0],
    });
  }

  const chefsPromise = chefs.map((chef) => Chefs.post(chef));

  idsChefs = await Promise.all(chefsPromise);
}

async function createRecipes() {
  const recipes = [];
  while (recipes.length < totalRecipes) {
    recipes.push({
      chef_id: idsChefs[Math.floor(Math.random() * idsChefs.length)],
      title: faker.name.title(),
      ingredients: [
        `${faker.lorem.paragraph()}`,
        `${faker.lorem.paragraph()}`,
        `${faker.lorem.paragraph()}`,
      ],
      preparations: [
        `${faker.lorem.paragraph()}`,
        `${faker.lorem.paragraph()}`,
        `${faker.lorem.paragraph()}`,
      ],
      information: faker.lorem.paragraph(Math.ceil(Math.random() * 4)),
      user_id: idsUsers[Math.floor(Math.random() * idsUsers.length)],
    });
  }

  const recipesPromise = recipes.map((recipe) => Recipes.post(recipe));

  idsRecipes = await Promise.all(recipesPromise);
}
async function recipesFile() {
  const recipesFile = [];
  let recipeNumber = 0;
  recipeId = 0;
  if (idsRecipes[9].id > 10) {
    recipeId = idsRecipes[9].id - 10;
  }

  while (recipeNumber < idsRecipes.length) {
    recipeId++;
    recipeNumber++;
    let fileId = await createFiles(6, "recipe");
    let recipe = 0;
    while (recipe < fileId.length) {
      recipesFile.push({
        name: faker.name.firstName(),
        recipe_id: recipeId,
        file_id: fileId[Math.floor(Math.random() * 6)],
      });
      recipe++;
    }
  }

  const RecipesPromise = recipesFile.map((recipe) =>
    Files.createReferenceRecipeImages(recipe.recipe_id, recipe.file_id)
  );
}
async function createFiles(quantity, type) {
  let files = [],
    filesId = [],
    generate = {};
  if (type == "face") {
    (generate.name = "face_"),
      (generate.imgType = "png"),
      (generate.quantity = totalImagesFace);
  } else if (type == "recipe") {
    (generate.name = "recipe_"),
      (generate.imgType = "jpg"),
      (generate.quantity = totalImagesRecipes);
  }
  while (files.length < quantity) {
    files.push({
      name: faker.image.image(),
      path: `public/images/${generate.name}${Math.ceil(
        Math.random() * generate.quantity
      )}.${generate.imgType}`,
    });
  }

  const filesPromise = files.map((file) => Files.create(file));
  filesId = await Promise.all(filesPromise);

  return filesId;
}

async function init() {
  await createUsers();
  await createChefs();
  await createRecipes();
  await recipesFile();
}

init();
