import * as React from 'react';
import { POMODORO_LENGTH_MENU_ITEMS } from '../../Utils/Constant';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const PomodoroLengthMenu = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setSelectedPomodoroLength } = props;
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (item: number) => {
    setAnchorEl(null);
    if (typeof item === 'number') {
      setSelectedPomodoroLength(item);
    }
  };

  const renderMenuItems = () => {
    const menuItems = Object.keys(POMODORO_LENGTH_MENU_ITEMS).map((key) => (
      <MenuItem key={key} onClick={() =>
        handleClose(Number(POMODORO_LENGTH_MENU_ITEMS[key]))
      }>
        {POMODORO_LENGTH_MENU_ITEMS[key]} mins
      </MenuItem>
    ));
    return menuItems;
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
    </>
  );
};

type Props = {
  setSelectedPomodoroLength: React.Dispatch<React.SetStateAction<number>>;
}

export default PomodoroLengthMenu;