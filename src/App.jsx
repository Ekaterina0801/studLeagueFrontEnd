import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppRoutes from "./AppRoutes";
import MobileNavigation from "./components/navbar/MobileNavbar";
function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar />
        <MobileNavigation/>
        <AppRoutes
        />
      </Router>
    </Provider>
  );
}

export default App;
