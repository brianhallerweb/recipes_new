const app = require("../server");
const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");
const Recipe = require("../models/recipe");

const recipes = [
  {
    _id: new ObjectID(),
    title: "first test title",
    category: "first test category",
    instructions: "first test instructions"
  },
  {
    _id: new ObjectID(),
    title: "second test title",
    category: "second test category",
    instructions: "second test instructions"
  }
];

beforeEach(done => {
  Recipe.remove({})
    .then(() => {
      return Recipe.insertMany(recipes);
    })
    .then(() => done());
});

describe("POST /recipes", () => {
  it("should create a new recipe", done => {
    const recipe = {
      title: "Vanilla Ice Cream",
      category: "desserts",
      instructions: "cream milk eggs sugar"
    };
    request(app)
      .post("/recipes")
      .send(recipe)
      .expect(200)
      .expect(res => {
        expect(res.body.title).toBe(recipe.title);
        expect(res.body.category).toBe(recipe.category);
        expect(res.body.instructions).toBe(recipe.instructions);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find(recipe)
          .then(recipes => {
            expect(recipes.length).toBe(1);
            expect(recipes[0].title).toBe(recipe.title);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create recipe with invalid body data", done => {
    const recipe = {
      title: "Vanilla Ice Cream",
      category: "",
      instructions: "cream milk eggs sugar"
    };
    request(app)
      .post("/recipes")
      .send(recipe)
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find()
          .then(recipes => {
            expect(recipes.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("GET /recipes/search/:searchString", () => {
  it("should get recipes by search term", done => {
    const searchTerm = "first";
    request(app)
      .get(`/recipes/search/${searchTerm}`)
      .expect(200)
      .expect(res => {
        expect(res.body[0].title).toBe(recipes[0].title);
        expect(res.body[0].category).toBe(recipes[0].category);
        expect(res.body[0].instructions).toBe(recipes[0].instructions);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find({
          $text: { $search: searchTerm }
        })
          .then(recipes => {
            expect(recipes.length).toBe(1);
            expect(recipes[0].title).toBe(recipes[0].title);
            expect(recipes[0].category).toBe(recipes[0].category);
            expect(recipes[0].instructions).toBe(recipes[0].instructions);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should get return an empty array for search terms without a match", done => {
    const searchTerm = "no match";
    request(app)
      .get(`/recipes/search/${searchTerm}`)
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(0);
      })
      .end(done);
  });
});

describe("GET /recipes/category/:category", () => {
  it("should get all recipes", done => {
    request(app)
      .get("/recipes/category/all")
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });

  it("should get recipes by category", done => {
    const category = recipes[0].category;
    request(app)
      .get(`/recipes/category/${category}`)
      .expect(200)
      .expect(res => {
        expect(res.body[0].title).toBe(recipes[0].title);
        expect(res.body[0].category).toBe(recipes[0].category);
        expect(res.body[0].instructions).toBe(recipes[0].instructions);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find({ category: category })
          .then(recipes => {
            expect(recipes.length).toBe(1);
            expect(recipes[0].title).toBe(recipes[0].title);
            expect(recipes[0].category).toBe(recipes[0].category);
            expect(recipes[0].instructions).toBe(recipes[0].instructions);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should get recipes by ID", done => {
    const id = recipes[0]._id.toHexString();
    request(app)
      .get(`/recipes/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.title).toBe(recipes[0].title);
        expect(res.body.category).toBe(recipes[0].category);
        expect(res.body.instructions).toBe(recipes[0].instructions);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find({ _id: id })
          .then(recipe => {
            expect(recipe.length).toBe(1);
            expect(recipe[0].title).toBe(recipes[0].title);
            expect(recipe[0].category).toBe(recipes[0].category);
            expect(recipe[0].instructions).toBe(recipes[0].instructions);
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe("PUT /recipes/:id", () => {
  it("should edit recipe with correct ID", done => {
    const id = recipes[0]._id.toHexString();
    const recipe = {
      title: "edited title",
      category: "edited category",
      instructions: "edited instructions"
    };
    request(app)
      .put(`/recipes/${id}`)
      .send(recipe)
      .expect(200)
      .expect(res => {
        expect(res.status).toBe(200);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find({ _id: id })
          .then(recipes => {
            expect(recipes.length).toBe(1);
            expect(recipes[0].title).toBe(recipe.title);
            expect(recipes[0].category).toBe(recipe.category);
            expect(recipes[0].instructions).toBe(recipe.instructions);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("DELETE /recipes/:id", () => {
  it("should delete recipe with correct ID", done => {
    const id = recipes[0]._id.toHexString();
    request(app)
      .delete(`/recipes/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.ok).toBe(1);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Recipe.find({ _id: id })
          .then(recipe => {
            expect(recipe).toEqual([]);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should return 500 if for invalid ids", done => {
    const id = new ObjectID().toHexString();
    request(app)
      .delete(`/recipes/${id}1`)
      .expect(500)
      .end(done);
  });
});
