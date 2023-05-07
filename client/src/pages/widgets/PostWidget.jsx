import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Send,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import Friend from "../../components/Friend";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPost } from "../../store";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [comment, setComment] = useState("");
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const userComment = (idUser) => {
    const user = users.find((user) => user._id === idUser);
    return user;
  };

  const patchComment = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId, comment }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          {/* input comment */}
          <FlexBetween>
            <InputBase
              placeholder="enter comment here..."
              type="text"
              border="5px"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IconButton
              aria-label="search"
              onClick={() => {
                patchComment();
                setComment("");
              }}
            >
              <Send />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment) => (
            <Box key={comment._id}>
              <Divider />

              <Box display="flex" alignItems="center" p={2}>
                <UserImage
                  image={userComment(comment.userId).picturePath}
                  size="35px"
                />
                <Box
                  ml={1}
                  bgcolor={palette.neutral.light}
                  borderRadius={5}
                  p={1}
                  height="50px"
                  width={
                    comment.comment.length < 16
                      ? "130px"
                      : `${comment.comment.length * 10}px`
                  }
                >
                  <Typography
                    variant="subtitle1"
                    component="div"
                    fontWeight="500"
                    m="-3px 0 0 5px"
                    sx={{
                      "&:hover": {
                        color: palette.primary.light,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => {
                      navigate(`/profile/${loggedInUserId}`);
                      navigate(0);
                    }}
                  >
                    {`${userComment(comment.userId).firstName} ${
                      userComment(comment.userId).lastName
                    }`}
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="100"
                    component="div"
                    sx={{
                      color: main,
                      m: "-5px 0 2px 5px",
                      pl: "1rem",
                    }}
                  >
                    {comment.comment}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
