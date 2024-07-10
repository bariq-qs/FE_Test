import { Box, Grid } from "@mui/material";
import { ReactNode } from "react";
import "@/app/styles/scss/layouts/auth.scss";
import BackgrounStreet from "@/app/assets/images/bg-tol.jpg";

type TAuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: TAuthLayoutProps) => {
  return (
    <Grid container className='wrap-auth-layout'>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexDirection: "column", height: '100%' }}>
          {children}
        </Box>
      </Grid>
      <Grid item xs={12} md={6} py={2} px={2}>
        <Box className='wrap-left-side'></Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
