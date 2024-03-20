import "./DataTable.css";
import React from "react";
import Table from "react-data-table-component";

const DataTable = ({
  tableHeading,
  tableData,
  pagination,
  fixedHeader,
  fixedHeaderScrollHeight,
  transparent,
  selectableRows = true,
  selectableRowsSingle = false,
  setSelectedRows = () => {},
  setPage,
  setPageSize,
  totalRows,
}) => {
  const customStyles = {
    head: {
      style: {},
    },
    rows: {
      style: {
        backgroundColor: transparent ? "#f1f1f1" : "",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        whiteSpace: "normal",
        wordWrap: "break-word",
      },
    },
  };

  const handleSelectedRowsChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  const handleRowsPerPageChanges = (newPerPage) => {
    if (setPageSize) {
      setPageSize(newPerPage);
    }
  };

  const handlePageChanges = (page) => {
    if (setPage) {
      setPage(page);
    }
  };

  const paginationOptions = [5, 10, 20, 30, 40, 50];

  return (
    <Table
      columns={tableHeading}
      data={tableData}
      customStyles={customStyles}
      selectableRowsSingle={selectableRowsSingle}
      selectableRows={selectableRows}
      pagination={pagination}
      fixedHeader={fixedHeader}
      fixedHeaderScrollHeight={fixedHeaderScrollHeight}
      onSelectedRowsChange={handleSelectedRowsChange}
      responsive
      noDataComponent={"No data to show"}
      paginationServer
      onChangePage={handlePageChanges}
      paginationTotalRows={totalRows ? totalRows : null}
      paginationRowsPerPageOptions={paginationOptions}
      onChangeRowsPerPage={handleRowsPerPageChanges}
    />
  );
};

export default DataTable;
