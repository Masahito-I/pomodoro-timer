import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { styles } from './PomodoroTimerStyle';
import { TIMER_BUTTON_STATUS, YOUTUBE_BUTTON_NAME, POMODORO_LENGTH_MENU_ITEMS } from '../Utils/Constant';
import PomodoroLengthMenu from '../Components/PomodoroLengthMenu/PomodoroLengthMenu';
import YoutubeEmbed from '../Components/YoutubeEmbed/YoutubeEmbed';
import alarmSound from '../Assets/alarm_sound.mp3';

const PomodoroTimer = () => {
  const [selectedPomdoroLength, setSelectedPomodoroLength] = React.useState(POMODORO_LENGTH_MENU_ITEMS.LENGTH_25);
  const [timer, setTimer] = React.useState(0);
  const [timerButton, setTimerButton] = React.useState(TIMER_BUTTON_STATUS.START);
  const [volumeOnOff, setVolumeOnOff] = React.useState(true);
  const [youtubeButton, setYoutubeButton] = React.useState(YOUTUBE_BUTTON_NAME.HIDE);
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const alarm = new Audio(alarmSound);

  React.useEffect(() => {
    let id: NodeJS.Timeout | undefined;

    if (timerButton === TIMER_BUTTON_STATUS.PAUSE) {
      id = setInterval(() => { setTimer(t => t + 1); }, 1000);
    }

    if (timer >= (60 * selectedPomdoroLength)) {
      resetTimer();
    }

    return () => clearInterval(id);
  }, [timerButton, timer]);

  const CircularProgressWithLabel = ( props: CircularProgressProps & { value: number } ) => {
    return (
      <Box sx={styles.circleOutsideBox}>
        <CircularProgress variant="determinate" size={250} value={100}/>
        <Box sx={styles.circleInsideBox}>
          <CircularProgress variant="determinate" size={250} {...props} style={styles.circleColor}/>
          <Box sx={styles.circleInsideBox}>
            <Typography variant="h3">{time}</Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  const changeTimerStatus = () => {
    if (timerButton === TIMER_BUTTON_STATUS.START) {
      setTimer(0);
      setTimerButton(TIMER_BUTTON_STATUS.PAUSE);
    } else if (timerButton === TIMER_BUTTON_STATUS.PAUSE) {
      setTimerButton(TIMER_BUTTON_STATUS.CONTINUE);
    } else if (timerButton === TIMER_BUTTON_STATUS.CONTINUE) {
      setTimerButton(TIMER_BUTTON_STATUS.PAUSE);
    }
  }

  const resetTimer = () => {
    if (volumeOnOff) alarm.play();
    setTimer(0);
    setTimerButton(TIMER_BUTTON_STATUS.START);
  }

  const clickVolumeButton = () => setVolumeOnOff(!volumeOnOff);

  const clickYoutubeButton = () => {
    if (youtubeButton === YOUTUBE_BUTTON_NAME.DISPLAY) {
      setYoutubeButton(YOUTUBE_BUTTON_NAME.HIDE);
    } else {
      setYoutubeButton(YOUTUBE_BUTTON_NAME.DISPLAY);
    }
  }

  const time = timerButton === TIMER_BUTTON_STATUS.START ? `${selectedPomdoroLength} : 00` :
    `${('00'+Math.floor(timer/60)).slice(-2)} : ${('00'+timer%60).slice(-2)}`;
  const progress = timerButton === TIMER_BUTTON_STATUS.START ? 
    100 : timer / (60 * selectedPomdoroLength) * 100;

  const volumeButton = volumeOnOff ? <VolumeUpIcon/> : <VolumeOffIcon/>;

  const displayStopButton = timerButton === TIMER_BUTTON_STATUS.CONTINUE ? (
    <Button variant="contained" onClick={resetTimer} sx={styles.buttonStyle}>
      {TIMER_BUTTON_STATUS.STOP}
    </Button>
  ) : null

  const displayTextField = youtubeButton === YOUTUBE_BUTTON_NAME.HIDE ? (
    <TextField  value={youtubeUrl} label="URL" variant="outlined" size="small" 
      onChange={e => {setYoutubeUrl(e.target.value)}}
      sx={styles.youtubeTextField}
    />
  ) : null

  return (
    <Container maxWidth="sm" sx={styles.container}>
      <Box sx={styles.titleBox}>
        <Typography variant="h4">{'Pomodoro Timer'}</Typography>
        <Button size="small" onClick={clickVolumeButton}>{volumeButton}</Button>
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
        {displayStopButton}
      </Box>

      <Box sx={styles.youtubeBox}>
        <Box sx={styles.youtubeButtonBox}>
          <Button onClick={clickYoutubeButton} sx={styles.buttonStyle}>
            {youtubeButton}
          </Button>
        </Box>
        {displayTextField}
      </Box>
      <YoutubeEmbed youtubeButton={youtubeButton} youtubeUrl={youtubeUrl} volumeOnOff={volumeOnOff}/>
    </Container>
  )
}

export default PomodoroTimer;