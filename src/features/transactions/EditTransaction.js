import moment from 'moment';
import 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { showTransForm, editTransaction, selectItem } from './transactionSlice';
import categories from 'src/__mocks__/categories';

const EditTransaction = () => {
  const selectEditItem = useSelector(selectItem);
  const inputState = {
    value: '',
    error: false,
    errorMessage: ''
  };
  const [name, setName] = useState({...inputState, value: selectEditItem.name});
  const [category, setCategory] = useState({...inputState, value: selectEditItem.category});
  const [date, setDate] = useState({...inputState, value: new Date()});
  const [amount, setAmount] = useState({...inputState, value: selectEditItem.amount});

  const dispatch = useDispatch();

  const edit = (values) => {
    if (values.category === 'Salary (income)') {
      values.amount = Math.abs(values.amount);
    } else {
      values.amount = -Math.abs(values.amount);
    }
    dispatch(editTransaction(values));
    dispatch(showTransForm(false));
  };

  const cancel = () => {
    dispatch(showTransForm(false));
  };

  const validateForm = () => {
    let isValid = true;

    if (name.value.length === 0) {
      setName({
        ...name,
        error: true,
        errorMessage: 'Name is empty'
      });
      isValid = false;
    }

    if (category.value.length === 0) {
      setCategory({
        ...category,
        error: true,
        errorMessage: 'Category is empty'
      });
      isValid = false;
    }

    if (!date.value) {
      setDate({
        ...date,
        error: true,
        errorMessage: 'Date is empty'
      });
      isValid = false;
    }

    if (amount.value.length === 0) {
      setAmount({
        ...amount,
        error: true,
        errorMessage: 'Amount is empty'
      });
      isValid = false;
    }

    if (isNaN(amount.value)) {
      setAmount({
        ...amount,
        error: true,
        errorMessage: 'Amount must be a number'
      });
      isValid = false;
    }

    return isValid;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      edit({
        key: selectEditItem.key,
        name: name.value,
        category: category.value,
        date: moment(date.value).format('YYYY-MM-DD'),
        day: moment(date.value, 'YYYY-MM-DD').date(),
        month: moment(date.value, 'YYYY-MM-DD').month() + 1,
        year: moment(date.value, 'YYYY-MM-DD').year(),
        amount: amount.value,
      })
    }
  };

  return (
    <form autoComplete="off" onSubmit={onSubmitHandler}>
      <Card sx={{
        mb: 3
      }}>
        <CardHeader
          title='Edit transaction'
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label='Name'
            margin='normal'
            name='name'
            onChange={(e) => {setName({value: e.target.value})}}
            type='text'
            value={name.value}
            error={name.error}
            helperText={name.errorMessage}
            variant='outlined'
          />
          <TextField
            fullWidth
            label='Category'
            margin='normal'
            name='category'
            onChange={(e) => {setCategory({value: e.target.value})}}
            type='text'
            value={category.value}
            error={category.error}
            helperText={category.errorMessage}
            variant='outlined'
            select
            SelectProps={{ native: true }}
          >
            {categories.map((option) => (
              <option
                key={option.key}
                value={option.name}
              >
                {option.name}
              </option>
            ))}
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={['date']}
              label="Date"
              value={date.value}
              onChange={(e) => {setDate({value: e})}}
              renderInput={(params) =>
                <TextField
                  {...params}
                  fullWidth
                  name='date'
                  margin='normal'
                  error={date.error}
                  helperText={date.errorMessage}
                />
              }
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label='Amount'
            margin='normal'
            name='amount'
            onChange={(e) => {setAmount({value: e.target.value})}}
            type='text'
            value={amount.value}
            error={amount.error}
            helperText={amount.errorMessage}
            variant='outlined'
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            sx={{ mx: 1 }}
            color='primary'
            type="submit"
            variant='contained'
          >
            Edit
          </Button>
          <Button onClick={cancel}>
            Cancel
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default EditTransaction;
