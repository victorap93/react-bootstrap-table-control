import React from 'react';
import { Meta, Story } from '@storybook/react';
import { useArgs } from '@storybook/addons';

import { TableControl, TableControlProps } from '../src';
import { Sort } from '../src/TableHeadControl';
import { Item } from '../src/TableBodyControl';

const meta: Meta = {
  title: 'React Bootstrap Table Control',
  component: TableControl,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TableControlProps> = args => {
  const [{ total, limit, sort, clickable }, updateArgs] = useArgs()

  const updateItens = (page: number, sort: Sort, clickable: boolean) => {
    updateArgs({ isLoading: true })
    setTimeout(() => {
      const itens = getItens(page, sort, clickable)
      updateArgs({ page: page, itens: itens, isLoading: false })
    }, 300)
  }

  const updateSort = (sort: Sort) => {
    updateArgs({ isLoading: true })
    const direction = sort.direction === "ASC" ? "DESC" : "ASC"
    setTimeout(() => {
      const itens = getItens(1, { column: sort.column, direction: direction }, clickable)
      updateArgs({ page: 1, itens: itens, sort: { column: sort.column, direction: direction }, isLoading: false })
    }, 300)
  }

  const getItens = (page: number, sort: Sort, clickable: boolean): Item[] => {
    const real_limit = (args.limit ? args.limit : limit)
    const real_total = (args.total ? args.total : total)

    let start = (page * real_limit) - real_limit
    return Array.from({ length: total - start > limit ? limit : total - start }, () => {
      start++
      let number = sort && sort.direction === "DESC" ? ((start - total) * -1) + 1 : start
      return {
        id: number,
        name: "Name " + number,
        description: "Description " + number,
        trType: clickable && number % Math.ceil(real_total / (real_limit * 4)) === 0 ? 'blocked' : 'default'
      }
    })
  }

  return <TableControl
    {...(args?.itens === undefined && args?.isLoading !== true ? { itens: getItens(1, { column: 'id', direction: "ASC" }, clickable) } : {})}
    {...args}
    onClickHeader={(sort) => updateSort(sort)}
    onClickPage={(page) => updateItens(page, sort, clickable)}
  />
}

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  header: [
    { key: "id", name: '#' },
    { key: "name", name: 'Name' },
    { key: "description", name: 'Description' }
  ],
  page: 1,
  total: 63,
  limit: 5,
  ellipsis: 1
};

export const Sortable = Template.bind({});

Sortable.args = {
  header: [
    { key: "id", name: '#', sort: true },
    { key: "name", name: 'Name', sort: true },
    { key: "description", name: 'Description', sort: false }
  ],
  page: 1,
  total: 63,
  limit: 5,
  ellipsis: 1,
  sortable: true,
  tableProps: { striped: true }
};

export const Clickable = Template.bind({});

Clickable.args = {
  header: [
    { key: "id", name: '#' },
    { key: "name", name: 'Name' },
    { key: "description", name: 'Description' }
  ],
  page: 1,
  total: 63,
  limit: 5,
  ellipsis: 1,
  clickable: true,
  onClickItem: item => alert('#' + item.id),
  tableProps: { hover: true }
};
