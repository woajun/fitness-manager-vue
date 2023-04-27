import React, { useState } from 'react';
import Measure from './pages/measure/Measure';
import NavBar from './components/nav/NavBar';
import Calendar from './pages/calendar/Calendar';

export type PageName = 'Measure' | 'Calendar';

export default function App() {
  const [curPage, setCurPage] = useState<PageName>('Measure');

  function navigateToPage(pageName: PageName) {
    setCurPage(pageName);
  }

  return (
    <NavBar navigate={navigateToPage}>
      {curPage === 'Measure' && <Measure />}
      {curPage === 'Calendar' && <Calendar />}
    </NavBar>
  );
}
