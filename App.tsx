import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toolbar from "./components/Toolbar";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Toolbar />
    </NavigationContainer>
  );
};

export default App;
