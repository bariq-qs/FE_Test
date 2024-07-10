import { Typography } from "@mui/material";
type TFormLabelProps = {
  label: string;
  required?: boolean;
};
const FormLabel = ({ label, required }: TFormLabelProps) => {
  return (
    <Typography
      variant='subtitle1'
      sx={{
        "&::after": required
          ? {
              content: '" *"',
              color: "red",
            }
          : {},
      }}
    >
      {label}
    </Typography>
  );
};

export default FormLabel;
