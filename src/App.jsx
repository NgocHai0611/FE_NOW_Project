import { useState } from "react";
import "./App.css";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import ListItem from "./assets/components/ListItem";
import Login from "./assets/components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header />
          <div className="content">
            <div className="layout__content">
              <ListItem />
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </>
  );
}

export default App;
