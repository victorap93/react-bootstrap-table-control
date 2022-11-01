import React from 'react'
import { Col, Row, Table as RBTable } from 'react-bootstrap';

import { TableLoading } from 'react-bootstrap-table-loading';
import { PaginationControl } from 'react-bootstrap-pagination-control';

import { TotalItems } from './TotalItems';
import { TableBodyControl, TableBodyControlProps } from './TableBodyControl';
import { TableHeadControl, TableHeadControlProps } from './TableHeadControl';

export type TableControlProps = TableHeadControlProps
  & TableBodyControlProps
  & {
    // Total
    total?: number,
    totalPosition?: "both" | "top" | "bottom" | "none",
    // Pagination
    pagination?: boolean,
    page?: number,
    limit?: number,
    between?: number,
    ellipsis?: number,
    next?: boolean,
    last?: boolean,
    onClickPage?: (page: number) => any,
    // Loading
    isLoading?: boolean,
    loadingLines?: number,
    // Properties
    tableProps?: object
  }

export const TableControl = ({
  header,
  sortable = false,
  onClickHeader = sort => console.log(sort),
  sort = { column: 'id', direction: "ASC" },
  itens,
  emptyMessage = "No results",
  clickable = false,
  onClickItem = item => console.log(item),
  total = 0,
  totalPosition = "both",
  pagination = true,
  page = 1,
  limit = 25,
  between = 4,
  ellipsis = 1,
  next = true,
  last = false,
  onClickPage = page => console.log(page),
  isLoading = false,
  loadingLines = limit,
  tableProps = {},
  theadProps = {},
  trProps = {},
  tbodyProps = {}
}: TableControlProps) => {

  total = total < itens?.length ? itens.length : total
  limit = limit < itens?.length ? itens?.length : limit

  return <>
    {/* Total itens on top */}
    {
      (totalPosition === "both" || totalPosition === "top") &&
      <Row>
        <Col md={12}
          className="mb-3"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <TotalItems total={total} isLoading={isLoading} />
        </Col>
      </Row>
    }

    {/* Table */}
    <Row>
      <Col md={12}>
        <RBTable {...tableProps}>

          {/* Table head */}
          <TableHeadControl
            header={header}
            sortable={sortable}
            onClickHeader={onClickHeader}
            sort={sort}
            theadProps={theadProps}
            trProps={trProps}
          />

          {/* Table body */}
          {
            !isLoading
              // Content
              ? <TableBodyControl
                header={header}
                itens={itens}
                emptyMessage={emptyMessage}
                clickable={clickable}
                onClickItem={onClickItem}
                tbodyProps={tbodyProps}
              />
              // Loading
              : <TableLoading
                lines={loadingLines}
                columns={
                  header.map(() => {
                    return { min: 3, max: 8 }
                  })
                }
                tbodyProps={tbodyProps}
              />
          }
        </RBTable>
      </Col>
    </Row>

    {/* Total itens on bottom */}
    {
      (totalPosition === "both" || totalPosition === "bottom") &&
      <Row>
        <Col md={12}
          className="mb-3"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <TotalItems total={total} isLoading={isLoading} />
        </Col>
      </Row>
    }

    {/* Pagination */}
    {
      (!isLoading && pagination) &&
      <Row>
        <Col md={12}>
          <PaginationControl page={page} total={total} limit={limit} between={between} ellipsis={ellipsis} next={next} last={last} changePage={(page: number) => onClickPage(page)} />
        </Col>
      </Row>
    }
  </>
}
