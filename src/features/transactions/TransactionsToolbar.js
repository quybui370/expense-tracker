import { useDispatch } from 'react-redux';
import {
  Avatar,
  Box,
} from '@material-ui/core';
import {
  showTransForm
} from './transactionSlice';
import { red, green } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

const TransactionsToolbar = (props) => {
  const { showForm } = props;
  const dispatch = useDispatch();

  const addNewTransaction = () => {
    if (!showForm) {
      dispatch(showTransForm('add'));
    } else {
      dispatch(showTransForm(false));
    }
  };

  return (
    <Box sx={{py: 3}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <IconButton
          onClick={addNewTransaction}
        >
          {showForm === 'add' &&
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <ClearIcon />
            </Avatar>
          }
          {showForm === 'edit' &&
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <ClearIcon />
            </Avatar>
          }
          {!showForm &&
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <AddIcon />
            </Avatar>
          }
        </IconButton>
      </Box>
    </Box>
  );
};

export default TransactionsToolbar;
