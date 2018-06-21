import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";
import RecipeTitles from "../components/RecipeTitles";
import CreateNewRecipe from "../components/CreateNewRecipe";
import EditRecipe from "../components/EditRecipe";
import FullRecipe from "../components/FullRecipe";
import SearchResultsTitles from "../components/SearchResultsTitles";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/createnewrecipe" component={CreateNewRecipe} />
        <Route path="/edit/:recipeid" component={EditRecipe} />
        <Route path="/search/" component={SearchResultsTitles} />
        <Route path="/:navitem/:recipeid" component={FullRecipe} />
        <Route path="/:navitem" component={RecipeTitles} />
        <Route component={Home} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
