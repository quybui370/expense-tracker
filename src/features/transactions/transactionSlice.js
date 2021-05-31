import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showForm: false,
  list: [],
  searchList: [],
  selectedItem: {}
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showTransForm: (state, action) => {
      state.showForm = action.payload;
    },
    addTransaction: (state, action) => {
      state.list.push(action.payload);
      state.list.sort((a, b) => (a.date > b.date) ? 1 : -1);
    },
    editTransaction: (state, action) => {
      const index = state.list.findIndex((o => o.key === action.payload.key));
      state.list[index] = {...action.payload};
    },
    deleteTransaction: (state, action) => {
      if (state.list.length > 0) {
        const index = state.list.findIndex((o => o.key === action.payload));
        if (index > -1) {
          state.list.splice(index, 1);
        }
      }
    },
    getByKey: (state, action) => {
      state.selectedItem = state.list.find(o => o.key === action.payload);
    },
    sortByDate: (state, action) => {
      switch (action.payload) {
        case 'desc':
          state.list.sort((a, b) => (a.date > b.date) ? 1 : -1);
          break;
        case 'asc':
          state.list.sort((a, b) => (a.date < b.date) ? 1 : -1);
          break;
      }
    },
    sortByAmount: (state, action) => {
      switch (action.payload) {
        case 'desc':
          state.list.sort((a, b) => (a.amount > b.amount) ? 1 : -1);
          break;
        case 'asc':
          state.list.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
          break;
      }
    },
    searchByName: (state, action) => {
      const search = state.list.filter(o => o.name.toLowerCase().search(action.payload.toLowerCase()) >= 0 );
      state.searchList = search ? search : [];
    }
  }
});

export const {
  showTransForm,
  addTransaction,
  sortByDate,
  sortByAmount,
  searchByName,
  getByKey,
  editTransaction,
  deleteTransaction,
} = transactionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectShowForm = (state) => state.transaction.showForm;
export const selectList = (state) => state.transaction.list;
export const selectSearchList = (state) => state.transaction.searchList;
export const selectItem = (state) => state.transaction.selectedItem;

export default transactionSlice.reducer;
