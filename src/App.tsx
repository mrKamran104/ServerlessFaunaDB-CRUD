import React from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import AppTodos from "./components/AppTodos";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppTodos />
    </div>
  );
}

export default App;
