import { AppRouter } from './router/AppRouter';
import { AuthProvider} from './context';

const App = () => {
  return (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
  )
}

export default App
