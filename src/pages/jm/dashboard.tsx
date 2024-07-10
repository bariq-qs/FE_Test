import WrapperContent from "@/app/components/wrapper/Content";
import { Box, Grid, styled } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMemo, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TResLalinsGetAll, useLalinsGetAll } from "@/app/services";
import { groupBy } from "lodash";
import moment, { Moment } from "moment";

type TResBarLalin = {
  label: string;
  value: number;
};

const DashboardPage = () => {
  const [dateFilter, setDateFilter] = useState<Moment | null>(null);
  const {
    data: dataLalins,
    isLoading,
    refetch,
  } = useLalinsGetAll({
    limit: 9999,
    page: 1,
    tanggal: dateFilter ? moment(dateFilter).format("YYYY-MM-DD") : undefined,
  });

  const mappingDataPayments = (values: TResLalinsGetAll[]): TResBarLalin[] => {
    let tunai = 0;
    let dinasOpr = 0;
    let dinasMitra = 0;
    let dinasKary = 0;
    let mandiri = 0;
    let bri = 0;
    let bni = 0;
    let bca = 0;
    let nobu = 0;
    let dki = 0;
    let mega = 0;
    let flo = 0;
    values.forEach((val) => {
      tunai += val.Tunai;
      dinasOpr += val.DinasOpr;
      dinasMitra += val.DinasMitra;
      dinasKary += val.DinasKary;
      mandiri += val.eMandiri;
      bri += val.eBri;
      bni += val.eBni;
      bca += val.eBca;
      nobu += val.eNobu;
      dki += val.eDKI;
      mega += val.eMega;
      flo += val.eFlo;
    });
    const arrPayments = [
      {
        label: "Tunai",
        value: tunai,
      },
      {
        label: "Dinas OPR",
        value: dinasOpr,
      },
      {
        label: "Dinas Mitra",
        value: dinasMitra,
      },
      {
        label: "Dinas Kary",
        value: dinasKary,
      },
      {
        label: "Mandiri",
        value: mandiri,
      },
      {
        label: "BRI",
        value: bri,
      },
      {
        label: "BNI",
        value: bni,
      },
      {
        label: "BCA",
        value: bca,
      },
      {
        label: "Nobu",
        value: nobu,
      },
      {
        label: "DKI",
        value: dki,
      },
      {
        label: "Mega",
        value: mega,
      },
      {
        label: "Flo",
        value: flo,
      },
    ];
    return arrPayments;
  };

  const dataPayments = useMemo<Array<TResBarLalin>>(
    () => mappingDataPayments(dataLalins?.rows?.rows ?? []),
    [dataLalins]
  );

  const mappingDataGerbangs = (values: TResLalinsGetAll[]): TResBarLalin[] => {
    const groupingGerbang = groupBy(values, "IdGerbang");
    const arrObj = Object.entries(groupingGerbang);
    const arrGerbangs = arrObj.map((v) => ({
      label: `Gerbang ${v[0]}`,
      value: v[1].length,
    }));
    return arrGerbangs;
  };

  const dataGerbangs = useMemo<Array<TResBarLalin>>(
    () => mappingDataGerbangs(dataLalins?.rows?.rows ?? []),
    [dataLalins]
  );

  const mappingDataShifts = (values: TResLalinsGetAll[]): TResBarLalin[] => {
    const countShift = values.length;
    const groupingShifts = groupBy(values, "Shift");
    const arrObj = Object.entries(groupingShifts);
    const arrShifts = arrObj.map((v) => {
      return {
        label: `Shift ${v[0]}`,
        value: Number(((100 * v[1].length) / countShift).toFixed(1)),
      };
    });
    return arrShifts;
  };

  const dataShifts = useMemo<Array<TResBarLalin>>(
    () => mappingDataShifts(dataLalins?.rows?.rows ?? []),
    [dataLalins]
  );

  const mappingDataRuas = (values: TResLalinsGetAll[]): TResBarLalin[] => {
    const countRuas = values.length;
    const groupingRuas = groupBy(values, "IdCabang");
    const arrObj = Object.entries(groupingRuas);
    const arrRuas = arrObj.map((v) => {
      return {
        label: `Ruas ${v[0]}`,
        value: Number(((100 * v[1].length) / countRuas).toFixed(1)),
      };
    });
    return arrRuas;
  };

  const dataRuas = useMemo<Array<TResBarLalin>>(
    () => mappingDataRuas(dataLalins?.rows?.rows ?? []),
    [dataLalins]
  );

  return (
    <WrapperContent title='Dashboard'>
      <Box mb={3}>
        <DatePicker
          value={dateFilter}
          onChange={(newValue) => setDateFilter(newValue)}
        />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box flexGrow={1}>
            <BarChart
              xAxis={[
                {
                  id: "bar-payments",
                  data: dataPayments.map((v) => v.label),
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: dataPayments.map((v) => v.value),
                },
              ]}
              width={800}
              height={300}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box flexGrow={1}>
            <PieChart
              series={[
                {
                  valueFormatter: (item) => `${item.value}%`,
                  outerRadius: 80,
                  innerRadius: 40,
                  data: dataShifts,
                },
              ]}
              height={300}
              slotProps={{
                legend: {
                  position: {
                    horizontal: "right",
                    vertical: "bottom",
                  },
                },
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart
            xAxis={[
              {
                id: "bar-gerbangs",
                data: dataGerbangs.map((v) => v.label),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: dataGerbangs.map((v) => v.value),
              },
            ]}
            width={800}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box flexGrow={1}>
            <PieChart
              series={[
                {
                  valueFormatter: (item) => `${item.value}%`,
                  outerRadius: 80,
                  innerRadius: 40,
                  data: dataRuas,
                },
              ]}
              height={300}
              slotProps={{
                legend: {
                  position: {
                    horizontal: "right",
                    vertical: "bottom",
                  },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </WrapperContent>
  );
};

export default DashboardPage;
