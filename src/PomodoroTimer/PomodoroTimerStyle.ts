export const styles = {
  container: {
    mt: 2, 
    color: '#ccc',
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt:2,
    mb: 5,
  },
  circleOutsideBox: {
    position: 'relative',
    display: 'inline-flex',
  },
  circleInsideBox: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleColor: {
    color: '#5c9291'
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 4,
  },
  buttonStyle: {
    mx: 2,
    px: 4,
    py: 1,
  },
  youtubeBox: {
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
  },
  youtubeButtonBox: {
    flex: 1
  },
  youtubeTextField: {
    flex: 2,
    '& label': {
      color: '#ccc'
    },
     '& .MuiInputBase-root': {
      color: '#ccc',
      '&:hover fieldset': {
        borderColor: '#ccc',
      },
    },
  }
};