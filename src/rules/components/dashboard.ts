import type { RuleComponent } from '@aidomx/core'

const dashboard: RuleComponent[] = [
  {
    name: 'title',
    design: {
      type: 'h2',
      className: 'text-2xl font-semibold mb-2',
      content: 'Dashboard Overview',
    },
  },
  {
    name: 'refreshButton',
    design: {
      type: 'button',
      className: 'bg-green-500 p-2 text-white rounded',
      content: 'Refresh',
    },
    listeners: {
      onClick: () => {
        alert('Data refreshed!')
      },
    },
  },
  {
    name: 'stats',
    design: {
      type: 'div',
      className: 'grid grid-cols-2 gap-4',
    },
    scope: [
      {
        name: 'usersCard',
        design: {
          type: 'div',
          className: 'p-4 bg-white shadow rounded',
          content: 'Users: 1240',
        },
      },
      {
        name: 'ordersCard',
        design: {
          type: 'div',
          className: 'p-4 bg-white shadow rounded',
          content: 'Orders: 312',
        },
      },
    ],
  },
]

export default dashboard
