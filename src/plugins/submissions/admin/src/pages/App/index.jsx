import React from "react";
import { Switch, Route } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import Contributors from "../Contributors";
import Editors from "../Editors";

const App = () => {
  return (
    <Switch>
      <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
      <Route
        path={`/plugins/${pluginId}/contributors`}
        component={Contributors}
        exact
      />
      <Route path={`/plugins/${pluginId}/editors`} component={Editors} exact />
    </Switch>
  );
};

export default App;
