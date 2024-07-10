import * as React from "react";
import {
  Stack,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
  DialogTitle,
  Box,
} from "@mui/material";
import FormLabel from "@/app/components/form/Label";
import {
  schemaFormGerbang,
  TSchemaFormGerbang,
} from "@/app/utils/schema/gerbang";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TResponseGerbangsGetAll, useSaveGerbang } from "@/app/services";
import { useSnackbar } from "react-simple-snackbar";
import {
  toastErrorOption,
  toastSuccessOption,
} from "@/app/utils/constant/toastOption";
import LoadingButton from "@mui/lab/LoadingButton";

type TFormMasterGateProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  data?: TResponseGerbangsGetAll;
  isView: boolean;
  onSucces?: () => void;
};

export default function FormMasterGate({
  open,
  onClose,
  data,
  isView,
  onSucces,
}: TFormMasterGateProps) {
  const [title, setTitle] = React.useState("Tambah Gerbang");
  const [openSuccessToast] = useSnackbar(toastSuccessOption);
  const [openErrorToast] = useSnackbar(toastErrorOption);
  const [isEdit, setIsEdit] = React.useState(false);

  const handleClose = (event?: any, reason?: string) => {
    if (reason && reason === "backdropClick") return;
    onClose(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TSchemaFormGerbang>({
    resolver: yupResolver(schemaFormGerbang),
    defaultValues: {
      idGerbang: 0,
      idRuas: 0,
      namaGerbang: "",
      namaRuas: "",
    },
  });

  const { mutate: mutateSaveGerbang, isPending: isLoading } = useSaveGerbang();

  const onSubmit = handleSubmit((values) => {
    try {
      mutateSaveGerbang(
        {
          isEdit,
          payload: {
            id: values.idGerbang,
            IdCabang: values.idRuas,
            NamaCabang: values.namaRuas,
            NamaGerbang: values.namaGerbang,
          },
        },
        {
          onSuccess(isSuccess) {
            if (isSuccess) {
              onClose(false);
              openSuccessToast("Data berhasil ditambahkan.");
              onSucces?.();
            }
          },
          onError(error) {
            openErrorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  });

  React.useEffect(() => {
    if (data) {
      setIsEdit(true);
      setValue("idGerbang", Number(data.id));
      setValue("idRuas", Number(data.IdCabang));
      setValue("namaGerbang", data.NamaGerbang);
      setValue("namaRuas", data.NamaCabang);
      setTitle(isView ? "Lihat Gerbang" : "Ubah Gerbang");
    }
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='title-form-gate'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='title-form-gate' textAlign='center'>
        {title}
      </DialogTitle>
      <DialogContent>
        <form className='w-100'>
          <Box display='flex' gap={6} mb={2}>
            <Stack width='50%'>
              <FormLabel label='ID Ruas' required></FormLabel>
              <TextField
                {...register("idRuas")}
                helperText={errors.idRuas?.message}
                error={Boolean(errors?.idRuas?.message)}
                fullWidth
                size='small'
                placeholder=''
                type='number'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={isView}
              ></TextField>
            </Stack>
            <Stack width='50%'>
              <FormLabel label='ID Gerbang' required></FormLabel>
              <TextField
                {...register("idGerbang")}
                helperText={errors.idGerbang?.message}
                error={Boolean(errors?.idGerbang?.message)}
                fullWidth
                size='small'
                placeholder=''
                type='number'
                inputProps={{ maxLength: "50" }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={isView}
              ></TextField>
            </Stack>
          </Box>
          <Box display='flex' gap={6}>
            <Stack width='50%'>
              <FormLabel label='Nama Ruas' required></FormLabel>
              <TextField
                {...register("namaRuas")}
                helperText={errors.namaRuas?.message}
                error={Boolean(errors?.namaRuas?.message)}
                fullWidth
                size='small'
                placeholder=''
                type='text'
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={isView}
                inputProps={{ maxLength: "100" }}
              ></TextField>
            </Stack>
            <Stack width='50%'>
              <FormLabel label='Nama Gerbang' required></FormLabel>
              <TextField
                {...register("namaGerbang")}
                helperText={errors.namaGerbang?.message}
                error={Boolean(errors?.namaGerbang?.message)}
                fullWidth
                size='small'
                placeholder=''
                type='text'
                inputProps={{ maxLength: "100" }}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={isView}
              ></TextField>
            </Stack>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Stack
          direction='row'
          gap={2}
          justifyContent='center'
          display='flex'
          width='100%'
          mb={5}
        >
          <Button onClick={handleClose} variant='outlined' size='small'>
            Batal
          </Button>
          {!isView && (
            <LoadingButton
              onClick={onSubmit}
              loading={isLoading}
              variant='contained'
              size='small'
            >
              Simpan
            </LoadingButton>
          )}
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
