import Container from "./components/Container";
import Card from "./components/Card";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="App w-full h-screen bg-purple-900">
      <Container>
        <Card />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
