/* eslint-disable prettier/prettier */
import React from 'react'

const Home = React.lazy(() => import('./views/dashboard/Home'))
const CreateCustomer = React.lazy(() => import ('./views/createCustomer/CreateCustomer'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', element: Home},
  { path: '/createCustomer', name: 'CreateCustomer', element: CreateCustomer},
]

export default routes
