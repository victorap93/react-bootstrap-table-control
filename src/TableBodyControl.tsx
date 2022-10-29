import React from 'react'

import { Header } from './TableHeadControl'

export type Item = any
  & {
    type?: "default" | "blocked" | "clickable",
    trProps?: object
  }

export type TableBodyControlProps = {
  // Header
  header: Header[],
  // Body
  itens: Item[],
  emptyMessage?: JSX.Element | string,
  clickable?: boolean,
  onClickItem?: (item: Item) => any,
  // Properties
  tbodyProps?: object,
}

export const TableBodyControl = ({
  header,
  itens,
  emptyMessage = "No results",
  clickable = false,
  onClickItem = item => console.log(item),
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
                    item_value.type === 'blocked'
                      ? { cursor: 'not-allowed' }
                      : { cursor: 'pointer' }
                  )
                  : { cursor: 'default' }
              }
              // Clickable action
              onClick={() => (
                clickable && item_value.type !== 'blocked'
                  ? onClickItem(item_value)
                  : false
              )}
              {...(item_value?.trProps !== undefined ? item_value.trProps : {})}
            >
              {header.map((header_item, header_index) => {
                // Blocked style
                return <td key={header_index}
                  style={
                    item_value.type === 'blocked'
                      ? { color: '#bbb' }
                      : {}
                  }
                >
                  {item_value[header_item.key]}
                </td>
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
