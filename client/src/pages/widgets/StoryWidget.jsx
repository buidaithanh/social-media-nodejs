import * as React from "react";
import { styled } from "@mui/system";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";

const Root = styled(Card)({
  maxWidth: 500,
  margin: "auto",
  marginTop: "16px",
});

const Media = styled(CardMedia)({
  height: 0,
  paddingTop: "56.25%", // 16:9
});

const AvatarWrapper = styled(Avatar)({
  backgroundColor: "#FFC400",
});

const ContentWrapper = styled(CardContent)({
  marginTop: "8px",
});

export default function StoryWidget() {
  return (
    <Root>
      <CardHeader
        avatar={<AvatarWrapper aria-label="recipe">R</AvatarWrapper>}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="John Doe"
        subheader="May 14, 2023"
      />
      <Media image="https://source.unsplash.com/random" title="Story Image" />
      <ContentWrapper>
        <Typography variant="body2" color="textSecondary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eget
          leo eu nisl pulvinar lobortis.
        </Typography>
      </ContentWrapper>
    </Root>
  );
}
