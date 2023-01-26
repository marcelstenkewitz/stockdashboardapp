import { useState } from "react";
import Dashboard from "./components/Dashboard";
import StockContext from "./context/StockContext";
import ThemeContext from "./context/ThemeContext";

function App() {
  //Application theme.
  const [darkMode, setDarkMode] = useState(false);
  //stockSymbol the application is passing to the FinnHub API calls.
  const [stockSymbol, setStockSymbol] = useState("TSLA")

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
