import React from 'react'
import { Navbar } from '../features/Navigation/components/Navbar'
import { TicketDetails } from '../features/tickets/components/TicketDetails'

export const TicketDetailsPage = () => {
  return (
    <>
    <Navbar/>
    <TicketDetails/>
    </>
  )
}
