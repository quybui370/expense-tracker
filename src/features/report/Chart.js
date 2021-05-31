import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectList } from '../transactions/transactionSlice';

const Chart = (props) => {
  const theme = useTheme();
  const transactions = useSelector(selectList);
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();

  const day1To2 = transactions.filter(o => (o.day >= 1 && o.day <= 2) && o.month === currentMonth && o.year === currentYear);
  const day3To9 = transactions.filter(o => (o.day >= 3 && o.day <= 9) && o.month === currentMonth && o.year === currentYear);
  const day10To16 = transactions.filter(o => (o.day >= 10 && o.day <= 16) && o.month === currentMonth && o.year === currentYear);
  const day17To23 = transactions.filter(o => (o.day >= 17 && o.day <= 23) && o.month === currentMonth && o.year === currentYear);
  const day24To30 = transactions.filter(o => (o.day >= 24 && o.day <= 30) && o.month === currentMonth && o.year === currentYear);
  const day31To31 = transactions.filter(o => o.day === 31 && o.month === currentMonth && o.year === currentYear);

  const totalOutcome = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].amount < 0) {
        sum += arr[i].amount;
      }
    }
    return Math.abs(sum);
  };

  const totalIncome = (arr) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].amount > 0) {
        sum += arr[i].amount;
      }
    }
    return Math.abs(sum);
  };

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [totalOutcome(day1To2), totalOutcome(day3To9), totalOutcome(day10To16), totalOutcome(day17To23), totalOutcome(day24To30), totalOutcome(day31To31)],
        label: 'Outcome'
      },
      {
        backgroundColor: colors.grey[200],
        data: [totalIncome(day1To2), totalIncome(day3To9), totalIncome(day10To16), totalIncome(day17To23), totalIncome(day24To30), totalIncome(day31To31)],
        label: 'Income'
      }
    ],
    labels: ['1 - 2', '3 - 9', '10 - 16', '17 - 23', '24 - 30', '31 - 31']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            size='small'
            variant='text'
          >
            This month
          </Button>
        )}
        title='Monthly expense chart'
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Chart;
