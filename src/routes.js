/* eslint-disable prettier/prettier */
import React from 'react'

const Home = React.lazy(() => import('./views/dashboard/Home'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', element: Home}
]

export default routes
