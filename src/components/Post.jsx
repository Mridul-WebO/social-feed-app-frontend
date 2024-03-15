/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useFetchPostImgQuery } from '../store/apis/postApi';

// eslint-disable-next-line react/prop-types
export default function Post({
  // eslint-disable-next-line react/prop-types
  desc = '',
  title = '',
  createdAt = '',
  post_id = '',
}) {
  const [postLiked, setPostLiked] = useState(false);
  const { data } = useFetchPostImgQuery(post_id);
  console.log(data);
  return (
    <Card sx={{ width: '300px', my: 3 }}>
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={createdAt.split('T')[0]}
      />
      <CardMedia component="img" height="194" image={data} alt="Paella dish" />
      <img src={`data:image/png;base64, ${data?.data}`} alt="" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => setPostLiked((prev) => !prev)}
        >
          {postLiked ? (
            <FavoriteIcon style={{ color: 'red' }} />
          ) : (
            <FavoriteIcon />
          )}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
