import { useDispatch, useSelector } from 'react-redux';
import {
  handleAddNewEvent,
  handleSetActiveEvent,
  handleUpdateEvent,
} from '../store';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(handleSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: Llegar al backend

    if (calendarEvent._id) {
      // Updating
      dispatch(handleUpdateEvent({ ...calendarEvent }));
    } else {
      // Creating
      dispatch(
        handleAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })
      );
    }
  };

  return {
    // Properties
    activeEvent,
    events,

    // Methods
    setActiveEvent,
    startSavingEvent,
  };
};
