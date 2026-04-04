"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Charts() {
  const transactions = useAppSelector((state) => state.finance.transactions);
  const theme = useAppSelector((state) => state.finance.theme);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const areaData = useMemo(() => {
    const sortedList = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let runningBalance = 0;
    const dataMap: Record<string, number> = {};
    
    sortedList.forEach((tx) => {
      runningBalance += tx.type === 'income' ? tx.amount : -tx.amount;
      dataMap[tx.date] = runningBalance;
    });

    return Object.keys(dataMap).map(date => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: dataMap[date]
    }));
  }, [transactions]);

  const pieData = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(tx => {
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
    });

    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  if (!mounted) return null;

  const textColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';
  const tooltipBg = theme === 'dark' ? '#1e293b' : '#ffffff';

  return (
    <>
      <div className="chart-card glass-panel chart-area">
        <h3 className="chart-title">Balance Trend</h3>
        <div className="chart-wrapper" style={{ height: 300 }}>
          {areaData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="date" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '8px', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
                  itemStyle={{ color: '#3b82f6', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No trend data available</div>
          )}
        </div>
      </div>

      <div className="chart-card glass-panel chart-pie">
        <h3 className="chart-title">Expenses Breakdown</h3>
        <div className="chart-wrapper" style={{ height: 300 }}>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: tooltipBg, borderColor: gridColor, borderRadius: '8px', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
                  formatter={(value: any) => `$${value}`}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: textColor }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No expense data available</div>
          )}
        </div>
      </div>
    </>
  );
}
