import { memo } from "react";
import { alpha, Avatar, Card, CardContent, Link, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import SvgColor from "@/components/svg-color";

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});
const ToolsCard = memo(
  ({
    title,
    cover,
    onOpen,
  }: {
    title: string;
    cover: string;
    onOpen: () => void;
  }) => {
    return (
      <Grid xs={12} sm={6} md={3}>
        <Card sx={{ position: "relative" }}>
          <StyledCardMedia
            sx={{
              pt: "calc(100% * 3 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.22),
              },
            }}
          >
            <SvgColor
              src="/assets/icons/shape-avatar.svg"
              sx={{
                width: 80,
                height: 36,
                zIndex: 9,
                bottom: -15,
                position: "absolute",
                color: "background.paper",
              }}
            />
            <StyledAvatar alt={title} src={"author.avatarUrl"} />

            <StyledCover alt={title} src={cover} />
          </StyledCardMedia>

          <CardContent onClick={onOpen}>
            <StyledTitle
              color="inherit"
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: "pointer",
              }}
            >
              {title}
            </StyledTitle>
          </CardContent>
        </Card>
      </Grid>
    );
  },
);

export default ToolsCard;
