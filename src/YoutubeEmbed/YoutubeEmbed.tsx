import { Box, Typography } from '@mui/material';
import { styles } from './YoutubeEmbedStyle';
import { YOUTUBE_BUTTON_NAME } from '../Utils/Constant';

const YoutubeEmbed = (props:Props) => {
  const { youtubeUrl, youtubeButton } = props;

  const checkUrl = () => {
    const isYoutubeUrl = 
      youtubeUrl.includes('https://www.youtube.com/') || youtubeUrl.includes('https://youtu.be/');
    if (!isYoutubeUrl) return ''

    const pattern = /v=([\w-]+)/;
    const videoId = youtubeUrl.match(pattern);
    if (youtubeUrl.includes('https://www.youtube.com/') && videoId) {
      return videoId[1];
    }else if(youtubeUrl.includes('https://youtu.be/')){
      return youtubeUrl.substring(youtubeUrl.lastIndexOf('/') + 1);
    }
  }

  const validateUrl = checkUrl();

  const youttubeElementVisibility = youtubeButton === YOUTUBE_BUTTON_NAME.DISPLAY ?
    styles.hideYoutubeElement : null;

  return youtubeUrl === '' ?(
    <Box>
      <Typography variant="body1" sx={styles.flexCenter}>
        {'Please input a youtube link to listen to music.'}
      </Typography>
    </Box>
  ) : (
    <Box sx={youttubeElementVisibility}>
      <Box sx={styles.flexCenter}>
        <iframe
          width='80%'
          src={'https://www.youtube.com/embed/'+validateUrl}
        />
      </Box>
    </Box>
  );
}

type Props = {
  youtubeUrl: string;
  youtubeButton: string;
}

export default YoutubeEmbed;