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
import { useContext, useState } from 'react';
import { useFetchPostImgQuery } from '../store/apis/postApi';

import noImage from '../../src/assets/images/noImage.jpg';
import { LikedPosts } from '../context/LikedPostContext';
// eslint-disable-next-line react/prop-types

export default function Post({
  // eslint-disable-next-line react/prop-types
  desc = '',
  title = '',
  createdAt = '',
  post_id = '',
  postRef,
  post,
  liked = false,
}) {
  const { setLikedPosts } = useContext(LikedPosts);
  const [postLiked, setPostLiked] = useState(false);
  const getMonth = new Date(createdAt).toLocaleString('default', {
    month: 'long',
  });

  const date = createdAt.split('T')[0].split('-');
  const postCreatedAt = date[2] + ' ' + getMonth + ' ' + date[0];

  const { data } = useFetchPostImgQuery(post_id, { skip: !post_id });

  return (
    <Card sx={{ width: '300px', my: 3 }} ref={postRef}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        subheaderTypographyProps={{ fontSize: 10 }}
        title={title}
        subheader={postCreatedAt}
      />
      <CardMedia
        component="img"
        height="194"
        image={data?.data ? `data:image/png;base64, ${data?.data}` : noImage}
        alt="Paella dish"
        sx={{ objectFit: 'fill' }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          disabled={liked}
          onClick={() => {
            setPostLiked((prev) => !prev);
            setLikedPosts((prev) => [post, ...prev]);
          }}
        >
          {liked ? (
            <>
              <FavoriteIcon style={{ color: 'red' }} />
            </>
          ) : (
            <>
              {postLiked ? (
                <FavoriteIcon style={{ color: 'red' }} />
              ) : (
                <FavoriteIcon />
              )}
            </>
          )}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
