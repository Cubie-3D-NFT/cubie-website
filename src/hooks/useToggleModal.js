import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, OPEN_MODAL } from 'src/store';

export function useToggleModal(modalName, onCloseCallback = undefined) {
  const dispatch = useDispatch();

  const modalOpen = useSelector((state) => state.modals[modalName].show);

  return useCallback((props) => {
    if (onCloseCallback) onCloseCallback();

    if (modalOpen) return dispatch({ type: CLOSE_MODAL, name: modalName });
    else return dispatch({ type: OPEN_MODAL, name: modalName, ...props });
  });
}
