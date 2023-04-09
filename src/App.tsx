import { CssBaseline, ThemeProvider } from '@mui/material';
import PomodoroTimer from './PomodoroTimer/PomodoroTimer';
import { theme } from './Utils/theme';
import { useState } from 'react';

const App = () => {
  const [themeState, setThemeState] = useState(theme);
  return (
    <ThemeProvider theme={themeState}>
      <CssBaseline/>

      <PomodoroTimer setThemeState={setThemeState}/>

    </ThemeProvider>
  );
};

export default App;
