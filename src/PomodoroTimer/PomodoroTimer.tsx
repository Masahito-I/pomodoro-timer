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
  const [timer, setTimer] = React.useState(60 * selectedPomdoroLength);
  const [timerButton, setTimerButton] = React.useState(TIMER_BUTTON_STATUS.START);
  const [volumeOnOff, setVolumeOnOff] = React.useState(true);
  const [countUpDown, setCountUpDown] = React.useState(false);
  const [youtubeButton, setYoutubeButton] = React.useState(YOUTUBE_BUTTON_NAME.HIDE);
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const alarm = new Audio(alarmSound);

  React.useEffect(() => {
    let id: NodeJS.Timeout | undefined;

    if (timerButton === TIMER_BUTTON_STATUS.PAUSE) {
      document.title = 'Pomodoro Timer - ' + time;
      id = setInterval(() => { setTimer(t => countUpDown ? t + 1 : t - 1); }, 1000);
    }

    if ((countUpDown && timer >= (60 * selectedPomdoroLength)) || 
      (!countUpDown && timer < 0)) {
      resetTimer();
    }

    return () => clearInterval(id);
  }, [timerButton, timer]);

  const CircularProgressWithLabel = ( props: CircularProgressProps & { value: number } ) => {
    return (
      <Box sx={styles.circleOutsideBox}>
        <CircularProgress variant='determinate' size={250} value={100}/>
        <Box sx={styles.circleInsideBox}>
          <CircularProgress variant='determinate' size={250} {...props} style={styles.circleColor}/>
          <Box sx={styles.circleInsideBox}>
            <Typography variant='h3'>{time}</Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  const changeTimerStatus = () => {
    if (timerButton === TIMER_BUTTON_STATUS.START) {   
      setTimer(countUpDown ? 0 : 60 * selectedPomdoroLength);
      setTimerButton(TIMER_BUTTON_STATUS.PAUSE);
    } else if (timerButton === TIMER_BUTTON_STATUS.PAUSE) {
      setTimerButton(TIMER_BUTTON_STATUS.CONTINUE);
    } else if (timerButton === TIMER_BUTTON_STATUS.CONTINUE) {
      setTimerButton(TIMER_BUTTON_STATUS.PAUSE);
    }
  };

  const resetTimer = () => {
    if (timerButton !== TIMER_BUTTON_STATUS.CONTINUE && volumeOnOff) alarm.play();
    updatePomodoroLength(selectedPomdoroLength);
  };

  const updatePomodoroLength = (pomodoroLength: number) => {
    setTimer(countUpDown ? 0 : 60 * pomodoroLength);
    setSelectedPomodoroLength(pomodoroLength);
    setTimerButton(TIMER_BUTTON_STATUS.START);
    document.title = 'Pomodoro Timer';
  };

  const clickVolumeButton = () => setVolumeOnOff(!volumeOnOff);

  const clickCircularProgress = () => {
    setTimer(countUpDown ? 
      Math.abs(timer - 60 * selectedPomdoroLength) :
      60 * selectedPomdoroLength - timer
    );
    setCountUpDown(!countUpDown);
  };

  const clickYoutubeButton = () => {
    setYoutubeButton(youtubeButton === YOUTUBE_BUTTON_NAME.DISPLAY ?
      YOUTUBE_BUTTON_NAME.HIDE : YOUTUBE_BUTTON_NAME.DISPLAY
    );
  };

  const time = selectedPomdoroLength < 60 ?
    `${('00'+Math.floor(timer/60)).slice(-2)} : ${('00'+timer%60).slice(-2)}` :
    `${('000'+Math.floor(timer/60)).slice(-3)} : ${('00'+timer%60).slice(-2)}`;
  const progress = timer / (60 * selectedPomdoroLength) * 100;

  const volumeButton = volumeOnOff ? <VolumeUpIcon/> : <VolumeOffIcon/>;

  const displayStopButton = timerButton === TIMER_BUTTON_STATUS.CONTINUE ? (
    <Button variant='contained' onClick={resetTimer} sx={styles.buttonStyle}>
      {TIMER_BUTTON_STATUS.STOP}
    </Button>
  ) : null;

  const displayTextField = youtubeButton === YOUTUBE_BUTTON_NAME.HIDE ? (
    <TextField  value={youtubeUrl} label='URL' variant='outlined' size='small' 
      onChange={e => {setYoutubeUrl(e.target.value);}}
      sx={styles.youtubeTextField}
    />
  ) : null;

  return (
    <Container maxWidth='sm' sx={styles.container}>
      <Box sx={styles.titleBox}>
        <Typography variant='h5'>{'Pomodoro Timer'}</Typography>
        <Box sx={styles.soundAndPomodoroLengthBox}>
          <Button size='small' onClick={clickVolumeButton}>{volumeButton}</Button>
          <PomodoroLengthMenu updatePomodoroLength={updatePomodoroLength} />
        </Box>
      </Box>

      <Box sx={styles.flexCenter}>
        <Button onClick={clickCircularProgress} sx={styles.circleOutsideButton}>
          <CircularProgressWithLabel value={progress} />
        </Button>
      </Box>

      <Box sx={styles.flexCenter}>
        <Button variant='contained' onClick={changeTimerStatus} sx={styles.buttonStyle}>
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
  );
};

export default PomodoroTimer;
