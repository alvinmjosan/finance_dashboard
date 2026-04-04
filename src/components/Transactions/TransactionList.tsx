"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setFilters, deleteTransaction, Transaction } from '../../store/financeSlice';
import { Search, Plus, Edit2, Trash2, Filter } from 'lucide-react';
import TransactionModal from './TransactionModal';
import './Transactions.css';

export default function TransactionList() {
  const dispatch = useAppDispatch();
  const { transactions, role, filters } = useAppSelector((state) => state.finance);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const isAdmin = isMounted && role === 'Admin';

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchSearch = tx.description.toLowerCase().includes(filters.search.toLowerCase()) || 
                          tx.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === 'All' || tx.type === filters.type;
      const matchCategory = filters.category === 'All' || tx.category === filters.category;
      return matchSearch && matchType && matchCategory;
    });
  }, [transactions, filters]);

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  if (!isMounted) {
    return (
      <div className="transactions-section glass-panel">
        <div className="transactions-header">
          <h2 className="section-title">Recent Transactions</h2>
        </div>
        <div className="table-container" style={{ padding: '2rem', textAlign: 'center' }}>
          <p className="text-secondary">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-section glass-panel">
      <div className="transactions-header">
        <h2 className="section-title">Recent Transactions</h2>
        {isAdmin && (
          <button className="btn btn-primary" onClick={handleAddNew}>
            <Plus size={18} />
            <span>Add Transaction</span>
          </button>
        )}
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={18} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <div className="select-wrapper">
            <Filter size={16} className="select-icon" />
            <select 
              value={filters.type} 
              onChange={(e) => dispatch(setFilters({ type: e.target.value as any }))}
              className="select-field"
            >
              <option value="All">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select 
              value={filters.category} 
              onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
              className="select-field"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              {isAdmin && <th className="actions-col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td className="text-secondary" suppressHydrationWarning>{new Date(tx.date).toLocaleDateString()}</td>
                <td className="font-medium">{tx.description}</td>
                <td>
                  <span className="badge badge-neutral">{tx.category}</span>
                </td>
                <td className={`font-semibold ${tx.type === 'income' ? 'text-success' : ''}`} suppressHydrationWarning>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                </td>
                {isAdmin && (
                  <td className="actions-col">
                    <button className="icon-btn edit-btn" onClick={() => handleEdit(tx)} aria-label="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => dispatch(deleteTransaction(tx.id))} aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTransactions.length === 0 && (
          <div className="empty-state">
            <p className="text-secondary">No transactions found matching your filters.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <TransactionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          existingTx={editingTx}
        />
      )}
    </div>
  );
}
