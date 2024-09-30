/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import icons from '../assets/images/avatars/loanB.ico'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CCollapse,
  CNavbarToggler,
  CButton,
  CCard,
  CCardBody,
} from '@coreui/react'
import CIcon, { CIconSvg } from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilX,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { Collapse } from '@coreui/coreui'
import { auto } from '@popperjs/core'
import { Block } from '@mui/icons-material'
import { blueGrey } from '@mui/material/colors'
import { CChartLine } from '@coreui/react-chartjs'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CHeader position="sticky" className="p-0" ref={headerRef}>
      <CContainer className=" ">
        <CHeaderNav className="d-none d-md-flex align-items-center">
          <CNavItem className='mt-2'>
            <a href="#">
              <img src={icons} style={{ width: '50px', height: '30px' }} alt="My Icon" />
             
            </a>
          </CNavItem>
          <CNavItem className="d-none d-md-block ms-3">
            <CNavLink href="#" className='account nav-link-custom'>Open Account</CNavLink>
          </CNavItem>
          <CNavItem className="d-none d-md-block">
            <CNavLink href="#" className='loan nav-link-custom'>Loan Request</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <div className="d-flex flex-column">
        <a href="#">
        <img
        className="d-md-none mt-2"
        src={icons}
        style={{ width: '50px', height: '30px' }}
        alt="My Icon"
        />
        </a>
        <CButton className="d-md-none mb-2" onClick={() => setIsOpen(!isOpen)}>
          <CIcon icon={isOpen ? cilX : cilMenu} />
        </CButton>
        </div>
        <CHeaderNav>
          <li className="nav-item ">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-3">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
        </CHeaderNav>
      </CContainer>
      <CContainer className="ml-5 mr-5">
        <CCollapse visible={isOpen} className="d-md-none">
          <CCard
            className="position-absolute"
            style={{
              // marginLeft: '16px',
              XIndex: '100',
              width: '50%',
              // backgroundColor:'#F3C468',
              
              backgroundColor:"rgb(255 255 255 / 99%)",
              // borderRadius: '16px',
              // borderBlockColor: 'blue',
              overflow: auto,
              padding: '15px 3px',
              display: Block,
            }}
          >
            <CCardBody style={{ listStyle: 'none' }}>
              <CNavItem>
                <CNavLink href="#">Open Account</CNavLink>
              </CNavItem>
             
              <CNavItem>
                <CNavLink href="#">Loan Request</CNavLink>
              </CNavItem>
            </CCardBody>
          </CCard>
        </CCollapse>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
