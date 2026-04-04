"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';

export default function Insights() {
  const transactions = useAppSelector((state) => state.finance.transactions);

  const insights = useMemo(() => {
    if (transactions.length === 0) return [];
    
    const exps = transactions.filter(t => t.type === 'expense');
    
    const catTotals: Record<string, number> = {};
    exps.forEach(t => { catTotals[t.category] = (catTotals[t.category] || 0) + t.amount; });
    
    let maxCat = { name: 'None', amount: 0 };
    Object.keys(catTotals).forEach(cat => {
      if (catTotals[cat] > maxCat.amount) maxCat = { name: cat, amount: catTotals[cat] };
    });

    const latestTx = transactions[0]; 
    
    return [
      {
        id: 1,
        icon: <TrendingUp size={20} className="text-warning" />,
        title: 'Top Expense Category',
        desc: `Your highest spending is on ${maxCat.name} with $${maxCat.amount.toLocaleString()}.`
      },
      {
        id: 2,
        icon: <Lightbulb size={20} className="text-success" />,
        title: 'Spending Observation',
        desc: exps.length > 3 ? "You have frequent small transactions. Consider grouping purchases." : "Your expenses are well consolidated."
      },
      {
        id: 3,
        icon: <AlertCircle size={20} className="text-accent" />,
        title: 'Recent Activity',
        desc: latestTx ? `Last recorded activity was ${latestTx.type === 'expense' ? 'an expense' : 'income'} of $${latestTx.amount.toLocaleString()} for ${latestTx.category}.` : "No recent activity."
      }
    ];
  }, [transactions]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="insights-panel glass-panel">
        <h3 className="chart-title">Smart Insights</h3>
        <div className="insights-grid" style={{ padding: '2rem', textAlign: 'center' }}>
          <p className="text-secondary">Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="insights-panel glass-panel">
      <h3 className="chart-title">Smart Insights</h3>
      <div className="insights-grid">
        {insights.map(item => (
          <div key={item.id} className="insight-item">
            <div className="insight-icon-container">
              {item.icon}
            </div>
            <div className="insight-content">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
        {insights.length === 0 && <p className="text-secondary">Add some transactions to see insights.</p>}
      </div>
    </div>
  );
}
