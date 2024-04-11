import "./App.css";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";
//import { Splitter, SplitterPanel } from 'primereact/splitter';
import React, { useLayoutEffect } from "react";
import "primereact/resources/themes/lara-dark-purple/theme.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Panel header="Macro Goals">
          <p className="m-0">Protein 60g</p>
          <p className="m-0">Carbs 20g</p>
          <p className="m-0">Fat 10g</p>
          <p className="m-0">Calories 1600kcals</p>
        </Panel>
        <Panel header="Dietary Restrictions">
          <p className="m-0">gluten free</p>
          <p className="m-0">dairy free</p>
          <p className="m-0">nut free</p>
        </Panel>
        <Panel header="Weight Goals">
          <p className="m-0">Current: 150lbs</p>
          <p className="m-0">Target: 180lbs</p>
        </Panel>
      </header>
    </div>
  );
}

export default App;
