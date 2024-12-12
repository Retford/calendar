import { useDispatch, useSelector } from 'react-redux';
import { handleSetActiveEvent } from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  return {
    events,
    setActiveEvent,
    activeEvent,
  };
};
