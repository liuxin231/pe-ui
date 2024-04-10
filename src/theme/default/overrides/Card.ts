const Card = (theme) => {
  return {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            "0 0 2px 0 rgba(145, 158, 171, 0.2),0 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: Number(theme.shape.borderRadius) * 2,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6" },
        subheaderTypographyProps: { variant: "body2" },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 0),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },
  };
};

export default Card;
