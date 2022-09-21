import React, { useMemo } from "react";
import { Button } from "antd";
import CaretUpFilled from "@ant-design/icons";
import {
  useExpanded,
  useGroupBy,
  useSortBy,
  useGlobalFilter,
  useTable,
  usePagination,
} from "react-table";
import Filter from "./Filter";

function Table({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Batch",
        accessor: "batch",
        Aggregated: () => "All",
      },
      {
        Header: "Stock",
        accessor: "stock",
        aggregate: "sum",
        Aggregated: ({ value }) => `${value}`,
      },
      {
        Header: "Deal",
        accessor: "deal",
        aggregate: "max",
        Aggregated: ({ value }) => `${value}`,
      },
      {
        Header: "Free",
        accessor: "free",
        aggregate: "min",
      },

      {
        Header: "MRP",
        accessor: "mrp",
        aggregate: "max",
        Aggregated: ({ value }) => `${value}`,
      },

      {
        Header: "Expiry",
        accessor: "exp",
        aggregate: "min",
        Aggregated: ({ value }) => `${value}`,
      },
      {
        Header: "Company",
        accessor: "company",
        Aggregated: () => "Company",
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    nextPage,
    previousPage,
    setGlobalFilter,
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination
  );
  const { globalFilter } = state;

  const { pageIndex } = state;
  return (
    <div>
      <Filter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.canGroupBy && column.id === "name" ? (
                    <span
                      {...column.getGroupByToggleProps(column.getHeaderProps())}
                    >
                      {" "}
                      {column.isGrouped ? (
                        <Button style={{ margin: "0px 10px" }}>UnGroup</Button>
                      ) : (
                        <Button style={{ margin: "0px 10px" }}>Group</Button>
                      )}
                    </span>
                  ) : null}
                  <Button type="primary" icon={<CaretUpFilled />}>
                    {" "}
                    {column.render("Header")}
                  </Button>

                  <span></span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? (
                              <Button
                                type="primary"
                                danger
                                style={{ margin: "0px 10px" }}
                              >
                                -
                              </Button>
                            ) : (
                              <Button
                                style={{ margin: "0px 10px" }}
                                shape="circle"
                                type="primary"
                              >
                                +
                              </Button>
                            )}
                          </span>
                          {"  "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: "center" }}>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <Button
          disabled={!canPreviousPage}
          style={{ margin: "10px" }}
          type="primary"
          onClick={() => previousPage()}
        >
          Previous
        </Button>
        <Button
          disabled={!canNextPage}
          style={{ margin: "10px" }}
          type="primary"
          onClick={() => nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Table;
