import * as React from 'react';
import { styles } from './PomodoroTimerStyle'
import { BUTTON_STATUS, POMODORO_LENGTH_MENU_ITEMS } from '../Utils/Constant'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import PomodoroLengthMenu from '../PomodoroLengthMenu/PomodoroLengthMenu';

const PomodoroTimer = () => {
  const [selectedPomdoroLength, setSelectedPomodoroLength] = React.useState(POMODORO_LENGTH_MENU_ITEMS.LENGTH_25);
  const [timer, setTimer] = React.useState(0);
  const [timerButton, setTimerButton] = React.useState(BUTTON_STATUS.START)

  React.useEffect(() => {
    let id: NodeJS.Timeout | undefined;

    if (timerButton === BUTTON_STATUS.PAUSE) {
      id = setInterval(() => { setTimer(t => t + 1); }, 1000);
    }

    if (timer >= (60 * selectedPomdoroLength)) {
      resetTimer()
    }

    return () => clearInterval(id);
  }, [timerButton, timer]);

  const CircularProgressWithLabel = ( props: CircularProgressProps & { value: number } ) => {
    return (
      <Box sx={styles.circleOutsideBox}>
        <CircularProgress variant="determinate" size={250} value={100}/>
        <Box sx={styles.circleInsideBox}>
          <CircularProgress variant="determinate" size={250} color="success" {...props} />
          <Box sx={styles.circleInsideBox}>
            <Typography variant="h3">
              {time}</Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  const changeTimerStatus = () => {
    if (timerButton === BUTTON_STATUS.START) {
      setTimer(0);
      setTimerButton(BUTTON_STATUS.PAUSE);
    } else if (timerButton === BUTTON_STATUS.PAUSE) {
      setTimerButton(BUTTON_STATUS.CONTINUE);
    } else if (timerButton === BUTTON_STATUS.CONTINUE) {
      setTimerButton(BUTTON_STATUS.PAUSE);
    }
  }

  const resetTimer = () => {
    setTimer(0);
    setTimerButton(BUTTON_STATUS.START);
  }

  const time = timerButton === BUTTON_STATUS.START ? `${selectedPomdoroLength} : 00` :
    `${('00'+Math.floor(timer/60)).slice(-2)} : ${('00'+timer%60).slice(-2)}`;
  const progress = timerButton === BUTTON_STATUS.START ? 
    100 : timer / (60 * selectedPomdoroLength) * 100;

  const stopButton = timerButton === BUTTON_STATUS.CONTINUE ? (
    <Button variant="contained" onClick={resetTimer} sx={styles.buttonStyle}>
      {BUTTON_STATUS.STOP}
    </Button>
  ) : null

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Box sx={styles.titleBox}>
        <Typography variant="h4">{'Pomodoro Timer'}</Typography>
        <PomodoroLengthMenu
          setSelectedPomodoroLength={setSelectedPomodoroLength}
        />
      </Box>

      <Box sx={styles.flexCenter}>
        <CircularProgressWithLabel value={progress} />
      </Box>

      <Box sx={styles.flexCenter}>
        <Button variant="contained" onClick={changeTimerStatus} sx={styles.buttonStyle}>
          {timerButton}
        </Button>
        {stopButton}
      </Box>
    </Container>
  )
}

export default PomodoroTimer;