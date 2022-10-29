import React from 'react'

import { Placeholder } from 'react-bootstrap';

type TotalItemsProps = {
  total: number,
  isLoading?: boolean
}

export const TotalItems = ({ total, isLoading = false }: TotalItemsProps) => {

  return <>
    <div style={{ marginRight: '5px' }}><b>Total:</b></div>
    {
      !isLoading
        ? <div>{total}</div>
        : <Placeholder as="div" style={{ minWidth: '40px' }} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
    }
  </>
}
