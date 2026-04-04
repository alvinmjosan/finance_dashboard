"use client";

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setRole, toggleTheme } from '../../store/financeSlice';
import { Moon, Sun, UserCircle } from 'lucide-react';
import './Header.css';

export default function Header() {
  const dispatch = useAppDispatch();
  const { role, theme } = useAppSelector((state) => state.finance);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <header className="header glass-panel">
      <div className="header-brand">
        <div className="logo-icon"></div>
        <h1>FinanceFlow</h1>
      </div>
      
      <div className="header-actions">
        <div className="role-switcher">
          <UserCircle size={18} className="icon" />
          <select 
            value={isMounted ? role : 'Viewer'} 
            onChange={(e) => dispatch(setRole(e.target.value as 'Viewer' | 'Admin'))}
            className="role-select"
          >
            <option value="Viewer">Viewer Mode</option>
            <option value="Admin">Admin Mode</option>
          </select>
        </div>
        
        <button onClick={() => dispatch(toggleTheme())} className="theme-toggle" aria-label="Toggle theme">
          {(!isMounted || theme === 'dark') ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
