import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card, CardContent,
  CardHeader,
  Divider, IconButton,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel, TextField,
  Tooltip
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  selectList,
  selectSearchList,
  sortByAmount,
  sortByDate,
  searchByName,
  getByKey,
  showTransForm,
  deleteTransaction
} from './transactionSlice';

const TransactionsList = (props) => {
  let transactions = useSelector(selectList);
  let searchTransactions = useSelector(selectSearchList);
  const [searchText, setSearchText] = useState('');
  const [sortByDateState, setSortByDateState] = useState('desc');
  const [sortByAmountState, setSortByAmountState] = useState('desc');
  const dispatch = useDispatch();

  const editItem = (key) => {
    dispatch(getByKey(key));
    dispatch(showTransForm('edit'));
  };

  const deleteItem = (key) => {
    dispatch(deleteTransaction(key));
  };

  const changeSortByDate = () => {
    if (sortByDateState === 'desc') {
      setSortByDateState('asc');
      dispatch(sortByDate('asc'));
    } else {
      setSortByDateState('desc');
      dispatch(sortByDate('desc'));
    }
  };

  const changeSortByAmount = () => {
    if (sortByAmountState === 'desc') {
      setSortByAmountState('asc');
      dispatch(sortByAmount('asc'));
    } else {
      setSortByAmountState('desc');
      dispatch(sortByAmount('desc'));
    }
  };

  const onSearch = (e) => {
    setSearchText(e.target.value);
    dispatch(searchByName(e.target.value));
  };

  return (
    <>
      <Box>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SvgIcon
                        fontSize='small'
                        color='action'
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder='Search transaction by name'
                variant='outlined'
                onChange={onSearch}
                value={searchText}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card {...props}>
          <CardHeader title='Latest Transactions' />
          <Divider />
          <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Category
                    </TableCell>
                    <TableCell sortDirection='desc'>
                      <Tooltip
                        enterDelay={300}
                        title='Sort by date'
                      >
                        <TableSortLabel
                          active
                          direction={sortByDateState}
                          onClick={changeSortByDate}
                        >
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        enterDelay={300}
                        title='Sort by amount'
                      >
                        <TableSortLabel
                          active
                          direction={sortByAmountState}
                          onClick={changeSortByAmount}
                        >
                          Amount ($)
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchText.length === 0 && transactions.map((transaction) => (
                    <TableRow
                      hover
                      key={transaction.key}
                    >
                      <TableCell>
                        {transaction.name}
                      </TableCell>
                      <TableCell>
                        {transaction.category}
                      </TableCell>
                      <TableCell>
                        {moment(transaction.date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          id={transaction.key}
                          edge='end'
                          size='small'
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={() => editItem(transaction.key)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          id={transaction.key}
                          edge='end'
                          size='small'
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={() => deleteItem(transaction.key)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {searchText.length > 0 && searchTransactions.map((transaction) => (
                    <TableRow
                      hover
                      key={transaction.key}
                    >
                      <TableCell>
                        {transaction.name}
                      </TableCell>
                      <TableCell>
                        {transaction.category}
                      </TableCell>
                      <TableCell>
                        {moment(transaction.date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          id={transaction.key}
                          edge='end'
                          size='small'
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={() => editItem(transaction.key)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          id={transaction.key}
                          edge='end'
                          size='small'
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={() => deleteItem(transaction.key)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {transactions.length === 0 &&
                <p style={{ margin: '20px 0', textAlign: 'center'}}>No transactions</p>
              }
            </Box>
          </PerfectScrollbar>
        </Card>
      </Box>
    </>
  );
};

export default TransactionsList;
