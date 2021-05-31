import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AddTransaction from './AddTransaction';
import EditTransaction from './EditTransaction';
import TransactionsList from './TransactionsList';
import { selectShowForm } from './transactionSlice';
import TransactionsToolbar from "./TransactionsToolbar";

const Transactions = () => {
  const showForm = useSelector(selectShowForm);

  return (
    <>
      <Helmet>
        <title>Transactions</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
        }}
      >
        <Container maxWidth={false}>
          <Box>
            <TransactionsToolbar showForm={showForm}/>
            {!showForm && <TransactionsList />}
            {showForm && showForm === 'add' && <AddTransaction />}
            {showForm && showForm === 'edit' && <EditTransaction />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Transactions;
