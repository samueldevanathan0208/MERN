import React from 'react';
import MyTicketsListView from "../../components/MyTicketsListView";

export default function MyTickets({ filterType }) {
  return <MyTicketsListView filterType={filterType} />;
}
