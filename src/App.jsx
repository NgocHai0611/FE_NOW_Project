import { useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import ListItem from "./assets/components/ListItem";
import Home from "./assets/components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header></Header>
      <Home></Home>
      {/* <div className="content">
        <div className="layout__content">
          <ListItem></ListItem>
        </div>
      </div> */}
      <Footer></Footer>
    </>
  );
}

export default App;
