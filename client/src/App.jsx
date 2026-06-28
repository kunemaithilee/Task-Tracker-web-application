import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { TaskProvider } from './context/TaskContext';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const ToastSetup = () => {
  const { dark } = useTheme();
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={dark ? 'dark' : 'light'}
    />
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <TaskProvider>
        <ToastSetup />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
