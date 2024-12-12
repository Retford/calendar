import { useDispatch, useSelector } from 'react-redux';
import { handleCloseDateModal, handleOpenDateModal } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(handleOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(handleCloseDateModal());
  };

  return {
    //* Properties
    isDateModalOpen,
    //* Methods
    openDateModal,
    closeDateModal,
  };
};
