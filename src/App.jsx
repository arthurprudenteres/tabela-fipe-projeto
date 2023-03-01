import { useEffect, useState } from "react";
import Container from "./components/Container";
import Card from "./components/Card";

function App() {

  return (
    <div className="App w-full h-screen bg-purple-900">
      <Container>
        <Card />
      </Container>
    </div>
  );
}

export default App;
