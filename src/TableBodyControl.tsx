import React from 'react'

import { Header } from './TableHeadControl'

export type Td = {
  value: any,
  tdProps?: object
}

export type Item = any
  & {
    trType?: "default" | "blocked" | "clickable",
    trProps?: object
    [key: string]: Td | any;
  }

export type TableBodyControlProps = {
  // Header
  header: Header[],
  // Body
  itens: Item[],
  emptyMessage?: JSX.Element | string,
  clickable?: boolean,
  onClickItem?: (item: Item) => any,
  fillEmptyColumn?: boolean,
  // Properties
  tbodyProps?: object,
}

export const TableBodyControl = ({
  header,
  itens,
  emptyMessage = "No results",
  clickable = false,
  onClickItem = item => console.log(item),
  fillEmptyColumn = true,
  tbodyProps = {}
}: TableBodyControlProps) => {

  return <tbody {...tbodyProps}>
    {
      itens.length > 0
        // Exist result
        ? (
          itens.map((item_value, item_index) => {
            // Line
            return <tr key={item_index}
              // Clickable style
              style={
                clickable
                  ? (
                    item_value.trType === 'blocked'
                      ? { cursor: 'not-allowed' }
                      : { cursor: 'pointer' }
                  )
                  : { cursor: 'default' }
              }
              // Clickable action
              onClick={() => (
                clickable && item_value.trType !== 'blocked'
                  ? onClickItem(item_value)
                  : false
              )}
              {...(item_value?.trProps ? item_value.trProps : {})}
            >
              {header.map((header_item, header_index) => {
                // Blocked style
                return fillEmptyColumn || item_value[header_item.key]
                  ? <td key={header_index}
                    style={
                      item_value.trType === 'blocked'
                        ? { color: '#bbb' }
                        : {}
                    }
                    {...(
                      typeof item_value[header_item.key] === 'object' && item_value[header_item.key]?.tdProps
                        ? item_value[header_item.key]?.tdProps
                        : {}
                    )}
                  >
                    {
                      typeof item_value[header_item.key] === 'object' && item_value[header_item.key].value
                        ? item_value[header_item.key].value
                        : item_value[header_item.key]
                    }
                  </td>
                  : null
              })}
            </tr>
          })
        )
        // Empty result
        : <tr>
          <td colSpan={header.length}>{emptyMessage}</td>
        </tr>
    }
  </tbody>
}
