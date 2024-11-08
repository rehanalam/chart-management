import { AppDispatch, StoreState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

namespace ReduxModule {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`
  export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
  export const useAppSelector = useSelector.withTypes<StoreState>();
}

export default ReduxModule;
