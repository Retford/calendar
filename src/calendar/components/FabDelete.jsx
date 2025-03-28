import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDelete = () => {
  const { isDateModalOpen } = useUiStore();
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const handleClickDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className='btn btn-danger fab-danger'
      onClick={handleClickDelete}
      style={{
        display: hasEventSelected ? (isDateModalOpen ? 'none' : '') : 'none',
      }}
    >
      <i className='fas fa-trash-alt'></i>
    </button>
  );
};
