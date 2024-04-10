// ----------------------------------------------------------------------

const Paper = () => {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow:
            "0 0 2px 0 rgba(145, 158, 171, 0.2),0 12px 24px -4px rgba(145, 158, 171, 0.12)",
        },
      },
    },
  };
};
export default Paper;
