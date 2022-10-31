import React from 'react'

import { SortDirection } from './SortDirection';

export type Sort = {
  column: string,
  direction?: "ASC" | "DESC"
}

export type Header = {
  name: string,
  key: string,
  sort?: boolean,
  thProps?: object
}

export type TableHeadControlProps = {
  // Header
  header: Header[],
  sortable?: boolean,
  onClickHeader?: (sort: Sort) => any,
  sort?: Sort,
  // Properties
  theadProps?: object,
  trProps?: object,
}

export const TableHeadControl = ({
  header,
  sortable = false,
  onClickHeader = sort => console.log(sort),
  sort = { column: 'id', direction: "ASC" },
  theadProps = {},
  trProps = {}
}: TableHeadControlProps) => {

  return <thead {...theadProps}>
    <tr {...trProps}>
      {/* Map all th headers */}
      {header.map((header_item, header_index) => {
        return <th key={header_index}
          // Sort style
          style={{
            whiteSpace: 'nowrap',
            cursor: sortable
              ? (
                header_item.sort === false
                  ? 'not-allowed'
                  : 'pointer'
              )
              : 'default'
          }}
          // Sort action
          onClick={() => (
            !sortable || header_item.sort === false
              ? false
              : onClickHeader(
                sort.column === header_item.key && sort?.direction
                  ? { column: header_item.key, direction: sort.direction }
                  : { column: header_item.key }
              )
          )}
          {...header_item.thProps}
        >
          {/* Item name and sort direction */}
          {header_item.name} {sortable && <SortDirection column={header_item.key} sort={sort} />}
        </th>
      })}
    </tr>
  </thead>
}
