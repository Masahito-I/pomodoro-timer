import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Switch, TextField, Theme, Typography, createTheme } from '@mui/material';
import { Container } from '@mui/system';
import { styles } from './PomodoroTimerStyle';
import { TIMER_BUTTON_STATUS, SETTING_BUTTON_NAME, POMODORO_LENGTH_MENU_ITEMS, BACKGROUND_COLOR } from '../Utils/Constant';
import PomodoroLengthMenu from '../Components/PomodoroLengthMenu/PomodoroLengthMenu';
import YoutubeEmbed from '../Components/YoutubeEmbed/YoutubeEmbed';
import alarmSound from '../Assets/alarm_sound.mp3';

const PomodoroTimer = (props: Props) => {
  const [selectedPomdoroLength, setSelectedPomodoroLength] = React.useState(POMODORO_LENGTH_MENU_ITEMS.LENGTH_25);
  const [timer, setTimer] = React.useState(60 * selectedPomdoroLength);
  const [timerButton, setTimerButton] = React.useState(TIMER_BUTTON_STATUS.START);
  const [volumeOnOff, setVolumeOnOff] = React.useState(true);
  const [countUpDown, setCountUpDown] = React.useState(false);
  const [settingButton, setSettingButton] = React.useState(SETTING_BUTTON_NAME.HIDE);
  const [youtubeUrl, setYoutubeUrl] = React.useState('');
  const alarm = new Audio(alarmSound);
  const [backgroundColor, setBackgroundColor] = React.useState(BACKGROUND_COLOR.GRAY);
  const { setThemeState } = props;
  const [backgroundEffect, setBackgroundEffect] = React.useState(false);

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

  const clickSettingButton = () => {
    setSettingButton(settingButton === SETTING_BUTTON_NAME.DISPLAY ?
      SETTING_BUTTON_NAME.HIDE : SETTING_BUTTON_NAME.DISPLAY
    );
  };

  const clickBackgroundColorButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = (event.target as HTMLInputElement).value;
    setThemeState(
      createTheme({
        palette: {
          background: {
            default: color,
          },
          primary: {
            main: '#ccc',
          },
          secondary: {
            main: '#ccc',
          }
        },
      })
    );
    setBackgroundColor(color);
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

  const displaySettingElement = () => {
    const displayYoutubeElement = settingButton === SETTING_BUTTON_NAME.HIDE ? (
      <Box sx={styles.youtubeElementBox}>
        <Typography variant='body1' sx={styles.youtubeLabel}>{'Youtube'}</Typography>
        <TextField  value={youtubeUrl} label='URL' variant='outlined' size='small' 
          onChange={e => {setYoutubeUrl(e.target.value);}}
          sx={styles.youtubeTextField}
        />
      </Box>
    ) : null;

    const displayBackgroundColorElement =  settingButton === SETTING_BUTTON_NAME.HIDE ? (
      <Box sx={styles.backgroundColorElement}>
        <Typography variant='body1'>{'Background color'}</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            value={backgroundColor}
            onChange={clickBackgroundColorButton}
          >
            <FormControlLabel value={BACKGROUND_COLOR.GRAY} control={<Radio />} label='' sx={{backgroundColor: BACKGROUND_COLOR.GRAY, borderRadius: '90%', opacity: 0.7}}/>
            <FormControlLabel value={BACKGROUND_COLOR.PURPLE} control={<Radio />} label='' sx={{backgroundColor: BACKGROUND_COLOR.PURPLE, borderRadius: '90%', opacity: 0.7}}/>
            <FormControlLabel value={BACKGROUND_COLOR.ORANGE} control={<Radio />} label='' sx={{backgroundColor: BACKGROUND_COLOR.ORANGE, borderRadius: '90%', opacity: 0.7}}/>
            <FormControlLabel value={BACKGROUND_COLOR.GREEN} control={<Radio />} label='' sx={{backgroundColor: BACKGROUND_COLOR.GREEN, borderRadius: '90%', opacity: 0.7}}/>
            <FormControlLabel value={BACKGROUND_COLOR.PINK} control={<Radio />} label='' sx={{backgroundColor: BACKGROUND_COLOR.PINK, borderRadius: '90%', opacity: 0.7}}/>
          </RadioGroup>
        </FormControl>
      </Box>
    ) : null;

    const displayBackgroundEffectElement = settingButton === SETTING_BUTTON_NAME.HIDE ? (
      <Box sx={styles.backgroundEffectElement}>
        <Typography sx={styles.flexGrow} variant='body1'>{'Background effect'}</Typography>
        <Box sx={styles.flexGrow}>
          <Switch checked={backgroundEffect} onChange={(event) => setBackgroundEffect(event.target.checked)} />
        </Box>
      </Box>
    ) : null;

    return (
      <>
        {displayYoutubeElement}
        <YoutubeEmbed settingButton={settingButton} youtubeUrl={youtubeUrl} volumeOnOff={volumeOnOff}/>
        {displayBackgroundColorElement}
        {displayBackgroundEffectElement}
      </>
    );
  };

  const displayCircleEffect = backgroundEffect ? (
    <ul className='circles'>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
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

      <Button onClick={clickSettingButton} sx={styles.buttonStyle}>
        {settingButton}
      </Button>
      {displaySettingElement()}

      {displayCircleEffect}
    </Container>
  );
};

type Props = {
  setThemeState: React.Dispatch<React.SetStateAction<Theme>>;
}

export default PomodoroTimer;
