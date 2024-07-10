import { Box, Card, CardContent, Typography } from "@mui/material";
import { type PropsWithChildren } from "react";

type TWrapperContentProps = {
  title?: string;
};
const WrapperContent = ({
  children,
  title,
}: PropsWithChildren<TWrapperContentProps>) => {
  return (
    <Card>
      <CardContent>
        <Typography variant='h6' mb={4}>
          {title}
        </Typography>
        <Box>{children}</Box>
      </CardContent>
    </Card>
  );
};

export default WrapperContent;
