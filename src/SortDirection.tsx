import React from 'react'
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

import { Sort } from './TableHeadControl';

type SortDirectionProps = {
  column: string,
  sort: Sort
}

export const SortDirection = ({ column, sort }: SortDirectionProps) => {

  return (
    sort && sort.column === column
      ? (
        sort.direction === "ASC"
          ? <BsFillCaretDownFill />
          : (
            sort.direction === "DESC"
              ? <BsFillCaretUpFill />
              : <></>
          )
      )
      : <></>
  )
}
