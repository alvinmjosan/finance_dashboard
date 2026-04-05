"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addTransaction, editTransaction, Transaction } from '../../store/financeSlice';
import { X } from 'lucide-react';
import './Transactions.css';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingTx: Transaction | null;
}

export default function TransactionModal({ isOpen, onClose, existingTx }: TransactionModalProps) {
  const dispatch = useAppDispatch();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (existingTx) {
      setFormData({
        description: existingTx.description,
        amount: existingTx.amount.toString(),
        category: existingTx.category,
        type: existingTx.type,
        date: existingTx.date
      });
    }
  }, [existingTx]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      description: formData.description,
      category: formData.category,
      type: formData.type,
      date: formData.date,
      amount: parseFloat(formData.amount)
    };

    if (existingTx) {
      dispatch(editTransaction({ id: existingTx.id, updates: payload }));
    } else {
      dispatch(addTransaction(payload));
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h3>{existingTx ? 'Edit Transaction' : 'Add New Transaction'}</h3>
          <button className="icon-btn close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Description</label>
            <input 
              type="text" 
              className="input-field" 
              required 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Amount</label>
              <input 
                type="number" 
                step="0.01" 
                min="0.01"
                className="input-field" 
                required 
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                className="input-field" 
                required 
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select 
                className="input-field" 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Category</label>
              <input 
                type="text" 
                className="input-field" 
                required 
                placeholder="e.g. Groceries"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
            </div>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{existingTx ? 'Save Changes' : 'Add Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
