import { CssBaseline, ThemeProvider } from '@mui/material';
import PomodoroTimer from './PomodoroTimer/PomodoroTimer';
import { theme } from './Utils/theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>

      <PomodoroTimer/>

    </ThemeProvider>
  );
};

export default App;
