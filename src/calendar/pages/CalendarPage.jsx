import { useEffect, useState } from 'react';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar } from 'react-big-calendar';

import {
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
} from '../';

import { localizer, getMessagesES } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'week'
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0',
      opacity: 0.8,
      color: 'white',
    };

    return {
      style,
    };
  };

  const handleDoubleClick = (event) => {
    openDateModal();
  };

  const handleSelect = (event) => {
    setActiveEvent(event);
  };

  const handleViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  };

  useEffect(() => {
    startLoadingEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={handleDoubleClick}
        onSelectEvent={handleSelect}
        onView={handleViewChange}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
