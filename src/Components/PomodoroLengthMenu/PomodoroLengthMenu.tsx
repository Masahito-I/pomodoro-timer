import * as React from 'react';
import { styles } from './PomodoroLengthStyle';
import { POMODORO_LENGTH_MENU_ITEMS } from '../../Utils/Constant';
import { Dialog, DialogActions, DialogContent, DialogContentText, 
  TextField, Button, Menu, MenuItem } from '@mui/material';

const PomodoroLengthMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { updatePomodoroLength } = props;
  const [dialog, setDialog] = React.useState(false);
  const [customPomodoro, setCustomPomodoro] = React.useState('');
  const [customTextErrorFlag, setCustomTextErrorFlag] = React.useState(false);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: number) => {
    setAnchorEl(null);
    if (typeof item === 'number' && item != POMODORO_LENGTH_MENU_ITEMS.CUSTOM) {
      updatePomodoroLength(item);
    } else if(typeof item === 'number' && item === POMODORO_LENGTH_MENU_ITEMS.CUSTOM) {
      setDialog(true);
    }
  };

  const renderMenuItems = () => {
    const menuItems = Object.keys(POMODORO_LENGTH_MENU_ITEMS).map((key) => {
      const pomodoroText = typeof POMODORO_LENGTH_MENU_ITEMS[key] === 'number' &&
        POMODORO_LENGTH_MENU_ITEMS[key] != POMODORO_LENGTH_MENU_ITEMS.CUSTOM ?
        POMODORO_LENGTH_MENU_ITEMS[key]+'mins' : 'CUSTOM';
      return (
        <MenuItem key={key} onClick={() => handleClose(Number(POMODORO_LENGTH_MENU_ITEMS[key]))}>
          {pomodoroText}
        </MenuItem>
      );
    });
    return menuItems;
  };

  const clickSetButton = () => {
    if (customPomodoro !== '' &&  Number.isInteger(Number(customPomodoro)) && Number(customPomodoro) > 0) {
      setCustomTextErrorFlag(false);
      updatePomodoroLength(Number(customPomodoro));
      setDialog(false);
    } else {
      setCustomTextErrorFlag(true);
    }
  };

  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {'Pomodoro Length'}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {renderMenuItems()}
      </Menu>
      <Dialog maxWidth='xs' open={dialog} onClose={() => setDialog(false)}>
        <DialogContent>
          <DialogContentText>
            {'How many minituss would you like to set?'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Pomodoro Length (mins)"
            fullWidth
            variant="standard"
            onChange={(value) => setCustomPomodoro(String(value.target.value))}
            value={customPomodoro}
            error={customTextErrorFlag}
            helperText={customTextErrorFlag ? 'Please input correct number' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={styles.dialogButton} onClick={() => setDialog(false)}>{'Cancel'}</Button>
          <Button sx={styles.dialogButton} onClick={clickSetButton}>{'Set'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type Props = {
  updatePomodoroLength: (pomodoroLength: number) => void;
}

export default PomodoroLengthMenu;