import TableCustomPagination from "@/app/components/table/CustomPagination";
import WrapperContent from "@/app/components/wrapper/Content";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import {
  Add,
  Create,
  Delete,
  Search as SearchIcon,
  Visibility,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  TResponseGerbangsGetAll,
  useDeleteGerbang,
  useGerbangGetAll,
} from "@/app/services";
import FormMasterGate from "@/app/components/pages/master/gate/Form";
import useConfirmDialog from "@/app/hooks/useConfirmDialog";
import { useSnackbar } from "react-simple-snackbar";
import {
  toastErrorOption,
  toastSuccessOption,
} from "@/app/utils/constant/toastOption";

const MasterGatePage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [dataTemp, setDataTemp] = useState<
    TResponseGerbangsGetAll | undefined
  >();
  const [isViewForm, setIsViewForm] = useState(false);
  const { ConfirmDialog, showConfirmDialog } = useConfirmDialog();
  const [openSuccessToast] = useSnackbar(toastSuccessOption);
  const [openErrorToast] = useSnackbar(toastErrorOption);

  const {
    data: dataGerbangs,
    isLoading,
    refetch,
  } = useGerbangGetAll({
    page,
    limit: rowsPerPage,
    NamaCabang: searchValue,
    NamaGerbang: searchValue,
  });

  const { mutate: mutateDeleteGate } = useDeleteGerbang();

  const onSearch = (val: string) => {
    setPage(1);
    setSearchValue(val);
  };

  const onAdd = () => {
    setOpenForm(true);
  };

  const onEdit = (val: TResponseGerbangsGetAll) => {
    setDataTemp(val);
    setOpenForm(true);
  };

  const onView = (val: TResponseGerbangsGetAll) => {
    setIsViewForm(true);
    onEdit(val);
  };

  const processDelete = (val: TResponseGerbangsGetAll) => {
    mutateDeleteGate(
      {
        id: Number(val.id),
        IdCabang: Number(val.IdCabang),
      },
      {
        onSuccess(isSuccess) {
          if (isSuccess) {
            openSuccessToast("Data berhasil dihapus.");
            refetch();
          }
        },
        onError(error) {
          openErrorToast(error.message);
        },
      }
    );
  };

  const onDelete = (val: TResponseGerbangsGetAll) => {
    showConfirmDialog({
      title: "Konfirmasi Hapus Ruas",
      message: `Apakah anda yakin ingin menghapus data ${val.NamaCabang} ?`,
      onConfirm: () => processDelete(val),
    });
  };
  useEffect(() => {
    if (!openForm) {
      setDataTemp(undefined);
      setIsViewForm(false);
    }
  }, [openForm]);

  return (
    <WrapperContent title='Master Data Gerbang'>
      <Stack>
        <Box
          display='flex'
          mb={2}
          justifyContent='space-between'
          alignItems='center'
        >
          <TextField
            size='small'
            placeholder='Search'
            inputProps={{ maxLength: "50" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          ></TextField>
          <Button
            variant='contained'
            size='small'
            startIcon={<Add />}
            onClick={onAdd}
          >
            Tambah
          </Button>
        </Box>
        <TableCustomPagination
          columns={[
            {
              header: "No.",
              field: "id",
            },
            {
              header: "Ruas",
              field: "NamaCabang",
            },
            {
              header: "Gerbang",
              field: "NamaGerbang",
            },
            {
              header: "Aksi",
              cell(index, data) {
                return (
                  <Stack direction='row' gap={2}>
                    <Create
                      onClick={() => onEdit(data)}
                      className='cursor-pointer'
                    />
                    <Visibility
                      className='cursor-pointer'
                      onClick={() => onView(data)}
                    />
                    <Delete
                      className='cursor-pointer'
                      onClick={() => onDelete(data)}
                    />
                  </Stack>
                );
              },
            },
          ]}
          data={dataGerbangs?.rows?.rows ?? []}
          onPageChange={setPage}
          page={page}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          totalData={dataGerbangs?.count ?? 0}
          isLoading={isLoading}
        ></TableCustomPagination>
      </Stack>
      {openForm && (
        <FormMasterGate
          open={openForm}
          onClose={setOpenForm}
          data={dataTemp}
          isView={isViewForm}
          onSucces={refetch}
        />
      )}
      <ConfirmDialog />
    </WrapperContent>
  );
};

export default MasterGatePage;
