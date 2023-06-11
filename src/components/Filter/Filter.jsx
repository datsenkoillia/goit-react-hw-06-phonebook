import { InputLabel, InputField } from './styled';
import { useSelector, useDispatch } from 'react-redux';
import { filtered, filterSelector } from 'redux/contactsSlice';

export const Filter = () => {
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const changeFilter = event => {
    dispatch(filtered(event.target.value));
  };

  return (
    <InputLabel>
      Find contacts by name
      <InputField type="text" value={filter} onChange={changeFilter} />
    </InputLabel>
  );
};
