import DataGrid, {
  Column,
  Paging,
  SearchPanel,
  HeaderFilter,
  Export,
  Pager,
  LoadPanel,
} from "devextreme-react/data-grid";
import moment from "moment";
import WrapperContent from "@/app/components/wrapper/Content";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { exportDataGrid as exportDataGridToExcel } from "devextreme/excel_exporter";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver-es";
import { Workbook } from "exceljs";
import { useLalinsGetAll } from "@/app/services/lalins";

const ReportLalinPage = () => {
  const {
    data: dataLalins,
    isLoading,
    refetch,
  } = useLalinsGetAll({
    limit: 9999,
    page: 1,
  });

  const onExporting = (e: any) => {
    const nameFile = `Report_${moment().format("DD-MM-YYYY")}`;
    if (e.format === "pdf") {
      const doc = new jsPDF({
        orientation: "landscape",
      });
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
        columnWidths: [40, 40, 40, 30, 30, 25, 55],
      }).then(() => {
        doc.save(`${nameFile}.pdf`);
      });
    } else if (e.format === "xlsx") {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet(nameFile);
      exportDataGridToExcel({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            `${nameFile}.xlsx`
          );
        });
      });
      e.cancel = true;
    }
  };
  const position = { of: "#gridContainer" };

  return (
    <WrapperContent title='Laporan Lalin Per Hari'>
      <DataGrid
        id='gridContainer'
        dataSource={dataLalins?.rows?.rows ?? []}
        keyExpr='id'
        showBorders={false}
        showRowLines={true}
        showColumnLines={false}
        className='dev-extrem-grid-default'
        onExporting={onExporting}
        noDataText='Data belum tersedia'
      >
        <SearchPanel visible={true} width={240} placeholder='Search...' />
        <HeaderFilter visible={true} />
        <Paging defaultPageSize={10} />
        <LoadPanel
          shadingColor='rgba(0,0,0,0.4)'
          enabled={true}
          showIndicator={true}
          showPane={true}
          shading={true}
        />
        <Pager
          visible={true}
          allowedPageSizes={[5, 10, 25]}
          displayMode='compact'
          showPageSizeSelector={false}
          showInfo={true}
          showNavigationButtons={true}
          infoText={undefined}
        />
        <Column
          dataField='id'
          caption='No.'
          width={50}
          allowHeaderFiltering={false}
          allowSorting={false}
        />
        <Column
          dataField='IdCabang'
          caption='Ruas'
          allowSorting={true}
          allowHeaderFiltering={false}
        />
        <Column
          dataField='IdGerbang'
          caption='Gerbang'
          allowSorting={true}
          allowHeaderFiltering={false}
        />
        <Column
          dataField='IdGardu'
          caption='Gardu'
          allowSorting={true}
          allowHeaderFiltering={false}
        />
        <Column
          dataField='Tanggal'
          caption='Hari'
          allowSorting={true}
          customizeText={(val) => {
            return moment(val.value).format("dddd");
          }}
          allowHeaderFiltering={false}
        />
        <Column
          dataField='Tanggal'
          caption='Tanggal'
          dataType='date'
          allowSorting={true}
          format='dd MMMM yyyy, HH:mm'
          customizeText={(val) => {
            return moment(val.value).format("DD-MM-YYYY");
          }}
        />
        <Column
          dataField='Golongan'
          caption='Golongan'
          allowHeaderFiltering={false}
        ></Column>
        <Export enabled={true} formats={["xlsx"]} />
        {/* <Summary>
          <TotalItem
            column='total_price'
            summaryType='sum'
            valueFormat='currency'
            alignment='left'
            cssClass='summary-item'
            showInColumn='Harga'
            displayFormat='Total {1}: {0}'
            customizeText={CustomizeTextSum}
          ></TotalItem>
        </Summary> */}
      </DataGrid>
    </WrapperContent>
  );
};

export default ReportLalinPage;
