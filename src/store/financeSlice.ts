import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

interface FinanceState {
  transactions: Transaction[];
  role: 'Viewer' | 'Admin';
  theme: 'light' | 'dark';
  filters: {
    search: string;
    category: string;
    type: 'income' | 'expense' | 'All';
  };
}

const initialState: FinanceState = {
  transactions: [
    { id: '1', date: '2023-10-01', amount: 3500, category: 'Salary', type: 'income', description: 'Oct Salary' },
    { id: '2', date: '2023-10-02', amount: 150, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
    { id: '3', date: '2023-10-05', amount: 60, category: 'Utilities', type: 'expense', description: 'Internet Bill' },
    { id: '4', date: '2023-10-10', amount: 120, category: 'Entertainment', type: 'expense', description: 'Movie night' },
    { id: '5', date: '2023-10-15', amount: 800, category: 'Rent', type: 'expense', description: 'Monthly Rent' },
    { id: '6', date: '2023-10-20', amount: 200, category: 'Freelance', type: 'income', description: 'Side project UI' },
  ],
  role: 'Viewer',
  theme: 'dark',
  filters: { search: '', category: 'All', type: 'All' },
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<'Viewer' | 'Admin'>) => {
      state.role = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setFilters: (state, action: PayloadAction<Partial<FinanceState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      state.transactions.unshift({ ...action.payload, id: Date.now().toString() });
    },
    editTransaction: (state, action: PayloadAction<{ id: string; updates: Partial<Transaction> }>) => {
      const index = state.transactions.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = { ...state.transactions[index], ...action.payload.updates };
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
    },
  },
});

export const { setRole, toggleTheme, setFilters, addTransaction, editTransaction, deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;
