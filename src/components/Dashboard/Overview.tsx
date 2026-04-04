"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react';
import Charts from './Charts';
import Insights from './Insights';
import './Dashboard.css';

export default function DashboardOverview() {
  const transactions = useAppSelector((state) => state.finance.transactions);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { income, expense, balance } = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') {
          acc.income += curr.amount;
          acc.balance += curr.amount;
        } else {
          acc.expense += curr.amount;
          acc.balance -= curr.amount;
        }
        return acc;
      },
      { income: 0, expense: 0, balance: 0 }
    );
  }, [transactions]);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <div className="dashboard-layout">
      <div className="summary-cards">
        <div className="card glass-panel card-balance">
          <div className="card-header">
            <h3>Total Balance</h3>
            <div className="icon-wrapper bg-accent">
              <Wallet size={20} />
            </div>
          </div>
          <p className="card-amount">{mounted ? formatCurrency(balance) : '...'}</p>
        </div>

        <div className="card glass-panel">
          <div className="card-header">
            <h3>Total Income</h3>
            <div className="icon-wrapper bg-success">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <p className="card-amount text-success">{mounted ? formatCurrency(income) : '...'}</p>
        </div>

        <div className="card glass-panel">
          <div className="card-header">
            <h3>Total Expenses</h3>
            <div className="icon-wrapper bg-danger">
              <ArrowDownRight size={20} />
            </div>
          </div>
          <p className="card-amount text-danger">{mounted ? formatCurrency(expense) : '...'}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <Charts />
        <Insights />
      </div>
    </div>
  );
}
