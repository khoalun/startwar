import { HomePage } from "./pages";
import AppProvider from "./providers/AppProviders";

function App() {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
}

export default App;
