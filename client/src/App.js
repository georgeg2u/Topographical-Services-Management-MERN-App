import {HelmetProvider} from "react-helmet-async";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";

import ThemeProvider from "./theme";
import Router from "./routes";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <MotionLazyContainer>
          <Router />
        </MotionLazyContainer>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
