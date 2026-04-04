import DashboardOverview from '@/components/Dashboard/Overview';
import TransactionList from '@/components/Transactions/TransactionList';

export default function Home() {
  return (
    <>
      <DashboardOverview />
      <TransactionList />
    </>
  );
}
