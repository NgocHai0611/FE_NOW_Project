import { useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import ListItem from "./assets/components/ListItem";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <div className="content">
        <div className="layout__content">
          <ListItem></ListItem>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
