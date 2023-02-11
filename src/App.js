import { useState } from "react";
import Dashboard from "./components/Dashboard";
import FilterContext from "./context/FilterContext";
import StockContext from "./context/StockContext";
import ThemeContext from "./context/ThemeContext";

function App() {
  //Application theme.
  const [darkMode, setDarkMode] = useState(false);
  //stockSymbol the application is passing to the FinnHub API calls.
  const [stockSymbol, setStockSymbol] = useState("TSLA");
  //Time filter for chart candle data.
  const [filter, setFilter] = useState("1W");
  
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <FilterContext.Provider value={{ filter, setFilter }}>
            <Dashboard />
        </FilterContext.Provider>
      </StockContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
