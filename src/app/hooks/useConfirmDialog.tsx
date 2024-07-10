import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";

interface ConfirmDialogOptions {
  onConfirm: () => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
}

const useConfirmDialog = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);

  const showConfirmDialog = (options: ConfirmDialogOptions) => {
    setOptions(options);
    setOpen(true);
  };

  const handleConfirm = () => {
    if (options?.onConfirm) {
      options.onConfirm();
    }
    setOpen(false);
  };

  const handleCancel = () => {
    if (options?.onCancel) {
      options.onCancel();
    }
    setOpen(false);
  };

  const ConfirmDialog: React.FC = () => {
    if (!options) return null;

    return (
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle textAlign='center'>
          {options.title || "Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign='center'>
            {options.message || "Are you sure you want to proceed?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Stack
            direction='row'
            gap={2}
            justifyContent='center'
            display='flex'
            width='100%'
            mb={2}
          >
            <Button onClick={handleCancel} variant='contained' size='small'>
              Tidak
            </Button>
            <Button onClick={handleConfirm} variant='outlined' size='small'>
              Ya
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    );
  };

  return { showConfirmDialog, ConfirmDialog };
};

export default useConfirmDialog;
