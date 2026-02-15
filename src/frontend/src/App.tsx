import TbnLandingPage from './pages/TbnLandingPage';
import { AppErrorBoundary } from './components/runtime/AppErrorBoundary';

function App() {
  return (
    <AppErrorBoundary>
      <TbnLandingPage />
    </AppErrorBoundary>
  );
}

export default App;
