import {HelmetProvider} from "react-helmet-async";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";

import ThemeProvider from "./theme";
import Router from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <MotionLazyContainer>
          <Router />
          <ToastContainer />
        </MotionLazyContainer>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
