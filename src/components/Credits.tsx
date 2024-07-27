import { Grid, Link, Typography } from "@mui/material";

const Credits = () => {
  return (
    <Grid position="fixed" bottom={16} right={16}>
      <Typography variant="body2" color="text.secondary">
        Made by&nbsp;
        <Link href="https://github.com/JCiroLo" target="_blank" rel="noreferrer">
          JCiroLo
        </Link>
      </Typography>
    </Grid>
  );
};

export default Credits;
