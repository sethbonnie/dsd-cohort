import './App.css';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';
//import { Splitter, SplitterPanel } from 'primereact/splitter';
import React, { useLayoutEffect } from 'react'
import "primereact/resources/themes/lara-dark-purple/theme.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Card title="Dietary Restrictions">
            <p className="m-0">
        <Panel header="Macro Goals">
            <p className="m-0">
                Protein 60g
            </p>
        </Panel>
      </p>
      </Card>
        <Card title="Dietary Restrictions">
            <p className="m-0" /*style = {{boxShadow: "10px 10px 5px pink", height: "60px"}*/>
              gluten free
              <Card>
                <p className="middle-card">
                dairy free 
                </p>
              </Card>
            </p>
        </Card>
        <Panel header="Weight Goals">
            <p className="m-0">
                Lose 10 lbs 
            </p>
        </Panel>
        <Panel header="BMI">
            <p className="m-0">
                Your BMI Score: 92
            </p>
        </Panel>
        <Panel header="Your Main Vitamins and Minerals">
            <p className="m-0">
                Vitamins 
            </p>
        </Panel>
      </header>
    </div>
  );
}

export default App;
