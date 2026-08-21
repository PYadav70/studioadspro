'use client';

import React, { useState, useEffect, useMemo, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Mail,
  Phone,
  Search,
  Filter,
  RefreshCw,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  MessageSquare,
  ShieldAlert,
  Lock,
  Unlock,
  Copy,
  Check,
  X,
  TrendingUp,
  Inbox,
  AlertCircle,
  Eye,
  Loader2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ContactLead {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'archived' | string;
  createdAt: string;
}

interface StatsSummary {
  total: number;
  newCount: number;
  contactedCount: number;
  convertedCount: number;
  archivedCount: number;
  todayCount: number;
}

const emptySubscribe = () => () => {};

const DEFAULT_ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;

function getStorageAuthSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('studioadspro_admin_auth') === 'true';
  } catch {
    return false;
  }
}

function getStorageAuthServerSnapshot(): boolean {
  return false;
}

export default function AdminPage() {
  // Hydration-safe client mounting check
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Read saved auth status safely from external store
  const isStoredAuth = useSyncExternalStore(
    emptySubscribe,
    getStorageAuthSnapshot,
    getStorageAuthServerSnapshot
  );

  // Authentication State
  const [localAuth, setLocalAuth] = useState<boolean | null>(null);
  const isAuthenticated = localAuth !== null ? localAuth : isStoredAuth;

  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Leads & Data State
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [stats, setStats] = useState<StatsSummary>({
    total: 0,
    newCount: 0,
    contactedCount: 0,
    convertedCount: 0,
    archivedCount: 0,
    todayCount: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string>('');

  // Filter & Search Controls
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  // Lead Detail / Actions Modals
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState<boolean>(false);
  const [leadToDelete, setLeadToDelete] = useState<ContactLead | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    status: 'new',
  });
  const [isSubmittingNewLead, setIsSubmittingNewLead] = useState<boolean>(false);

  // Fetch leads on mount and when filters change
  useEffect(() => {
    if (!isMounted || !isAuthenticated) return;
    let isCurrent = true;

    async function loadData() {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const params = new URLSearchParams();
        if (statusFilter !== 'all') params.append('status', statusFilter);
        if (searchQuery.trim()) params.append('search', searchQuery.trim());
        params.append('sortBy', sortBy);

        const res = await fetch(`/api/admin/leads?${params.toString()}`);
        const data = await res.json();

        if (!isCurrent) return;
        if (!res.ok) {
          throw new Error(data.error || 'Failed to retrieve inquiries from database.');
        }

        setLeads(data.leads || []);
        if (data.stats) {
          setStats(data.stats);
        }
        const d = new Date();
        setLastRefreshedTime(
          `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
        );
      } catch (err: any) {
        if (!isCurrent) return;
        console.error('Error fetching leads:', err);
        setErrorMsg(err.message || 'Failed to load inquiries. Check database connection.');
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isCurrent = false;
    };
  }, [isMounted, isAuthenticated, statusFilter, searchQuery, sortBy]);

  // Manual fetchLeads trigger
  const fetchLeads = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      params.append('sortBy', sortBy);

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to retrieve inquiries from database.');
      }

      setLeads(data.leads || []);
      if (data.stats) {
        setStats(data.stats);
      }
      const d = new Date();
      setLastRefreshedTime(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
      );
    } catch (err: any) {
      console.error('Error fetching leads:', err);
      setErrorMsg(err.message || 'Failed to load inquiries. Check database connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Search on Enter or debounced
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  // Admin PIN Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = pinInput.trim();
    if (cleanInput === DEFAULT_ADMIN_PIN) {
      setLocalAuth(true);
      setPinError(null);
      setPinInput('');
      try {
        localStorage.setItem('studioadspro_admin_auth', 'true');
      } catch {
        // ignore
      }
      showToast('Admin access granted');
    } else {
      setPinError('Invalid Security PIN. Please try again.');
    }
  };

  const handleLogout = () => {
    setLocalAuth(false);
    try {
      localStorage.removeItem('studioadspro_admin_auth');
    } catch {
      // ignore
    }
    showToast('Logged out of Admin Portal');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Update Lead Status
  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update lead status');
      }

      setLeads((prev) =>
        prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
      );

      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      showToast(`Lead status updated to "${newStatus.toUpperCase()}"`);
      fetchLeads();
    } catch (err: any) {
      console.error('Status update error:', err);
      showToast(err.message || 'Error updating status');
    }
  };

  // Delete Lead
  const handleDeleteLead = async (leadId: string) => {
    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete lead');
      }

      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
      setLeadToDelete(null);
      showToast('Lead deleted successfully');
      fetchLeads();
    } catch (err: any) {
      console.error('Delete error:', err);
      showToast(err.message || 'Failed to delete lead');
    }
  };

  // Add Manual Lead
  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingNewLead(true);

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLeadForm),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save lead');
      }

      setShowAddLeadModal(false);
      setNewLeadForm({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
        status: 'new',
      });
      showToast('New lead added to database!');
      fetchLeads();
    } catch (err: any) {
      console.error('Create lead error:', err);
      showToast(err.message || 'Failed to create lead');
    } finally {
      setIsSubmittingNewLead(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('No leads available to export.');
      return;
    }

    const headers = ['ID', 'Date & Time', 'Full Name', 'Email', 'Phone', 'Service', 'Budget', 'Status', 'Message'];
    const csvRows = [headers.join(',')];

    leads.forEach((lead) => {
      const row = [
        `"${lead.id}"`,
        `"${new Date(lead.createdAt).toISOString()}"`,
        `"${(lead.fullName || '').replace(/"/g, '""')}"`,
        `"${(lead.email || '').replace(/"/g, '""')}"`,
        `"${(lead.phone || '').replace(/"/g, '""')}"`,
        `"${(lead.service || '').replace(/"/g, '""')}"`,
        `"${(lead.budget || '').replace(/"/g, '""')}"`,
        `"${lead.status || 'new'}"`,
        `"${(lead.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `StudioAdsPro_Leads_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Leads exported to CSV successfully!');
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
    showToast(`Copied ${fieldName} to clipboard`);
  };

  // Filtered Leads by service in memory
  const displayedLeads = useMemo(() => {
    if (serviceFilter === 'all') return leads;
    return leads.filter((l) =>
      (l.service || '').toLowerCase().includes(serviceFilter.toLowerCase())
    );
  }, [leads, serviceFilter]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-300">
      <Navbar />

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-xl font-medium text-xs flex items-center gap-2 border border-neutral-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {!isMounted ? (
          /* Initial matching SSR state to prevent hydration flicker */
          <div className="py-24 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-neutral-400 mb-3" />
            <p className="text-xs font-mono text-neutral-500">Loading Studio Portal...</p>
          </div>
        ) : !isAuthenticated ? (
          /* =========================================================================
             ADMIN LOGIN SCREEN
             ========================================================================= */
          <div className="max-w-md mx-auto my-12 sm:my-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-xl text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black mx-auto flex items-center justify-center mb-6 shadow-md">
                <Lock className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block mb-1">
                StudioAdsPro Portal
              </span>
              <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-bold text-black dark:text-white mb-2">
                Admin Leads Panel
              </h1>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                Enter your secure Studio PIN to manage client inquiries, leads pipeline, and project briefs.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    inputMode="numeric"
                    autoFocus
                    placeholder="Enter Security PIN"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError(null);
                    }}
                    className="w-full px-4 py-3.5 text-center text-lg tracking-[0.3em] font-mono rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white focus:outline-hidden focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                  {pinError && (
                    <p className="text-xs text-red-500 mt-2 font-medium flex items-center justify-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      {pinError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <span>Unlock Admin Leads</span>
                  <Unlock className="w-4 h-4" />
                </button>
              </form>

              {/* <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
                <span>Default Studio PIN: </span>
                <code className="font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-black dark:text-white font-semibold">
                  190700
                </code>
              </div> */}
            </motion.div>
          </div>
        ) : (
          /* =========================================================================
             AUTHENTICATED ADMIN LEADS DASHBOARD
             ========================================================================= */
          <div className="space-y-8">
            {/* Top Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE DATABASE CONNECTED
                  </span>
                  {lastRefreshedTime && (
                    <span className="font-mono text-xs text-neutral-500">
                      Updated {lastRefreshedTime}
                    </span>
                  )}
                </div>
                <h1 className="font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-black dark:text-white">
                  Client Inquiries &amp; Leads
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Manage inbound contact submissions, assign statuses, and follow up with prospective clients.
                </p>
              </div>

              <div className="flex items-center flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={fetchLeads}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-2 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lead</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg bg-neutral-200/60 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold text-neutral-600 dark:text-neutral-400 transition-colors"
                  title="Lock Admin Panel"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {/* Total */}
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <span className="text-[11px] font-mono uppercase text-neutral-500 block mb-1">
                  Total Leads
                </span>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-black dark:text-white">
                  {stats.total}
                </div>
              </div>

              {/* New */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase text-blue-700 dark:text-blue-400">
                    New / Unread
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-blue-700 dark:text-blue-300">
                  {stats.newCount}
                </div>
              </div>

              {/* Contacted */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase text-amber-700 dark:text-amber-400">
                    In Progress
                  </span>
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-amber-700 dark:text-amber-300">
                  {stats.contactedCount}
                </div>
              </div>

              {/* Converted */}
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase text-emerald-700 dark:text-emerald-400">
                    Converted
                  </span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-emerald-700 dark:text-emerald-300">
                  {stats.convertedCount}
                </div>
              </div>

              {/* Today */}
              <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase text-purple-700 dark:text-purple-400">
                    Received Today
                  </span>
                  <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-purple-700 dark:text-purple-300">
                  {stats.todayCount}
                </div>
              </div>

              {/* Archived */}
              <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono uppercase text-neutral-500">
                    Archived
                  </span>
                  <Archive className="w-3.5 h-3.5 text-neutral-400" />
                </div>
                <div className="text-2xl font-bold font-['Space_Grotesk'] text-neutral-700 dark:text-neutral-300">
                  {stats.archivedCount}
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-lg">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, phone, company, message keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white focus:ring-1 focus:ring-black dark:focus:ring-white"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        fetchLeads();
                      }}
                      className="absolute right-12 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-black dark:bg-white text-white dark:text-black font-semibold text-[11px] hover:opacity-90 transition-opacity"
                  >
                    Find
                  </button>
                </form>

                {/* Dropdown Filters */}
                <div className="flex items-center flex-wrap gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Filter className="w-3.5 h-3.5" />
                    <span className="font-mono">Filter:</span>
                  </div>

                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-hidden"
                  >
                    <option value="all">All Services</option>
                    <option value="Full Stack">Full Stack Dev</option>
                    <option value="AI">AI &amp; Agent Dev</option>
                    <option value="Mobile">Mobile App Dev</option>
                    <option value="UI/UX">UI/UX Design</option>
                    <option value="Social">Social / Ads</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-hidden"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-neutral-100 dark:border-neutral-800 pt-3">
                {[
                  { id: 'all', label: 'All Inquiries', count: stats.total },
                  { id: 'new', label: 'New / Unread', count: stats.newCount },
                  { id: 'contacted', label: 'Contacted / In Discussion', count: stats.contactedCount },
                  { id: 'converted', label: 'Converted Clients', count: stats.convertedCount },
                  { id: 'archived', label: 'Archived', count: stats.archivedCount },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      statusFilter === tab.id
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-xs'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        statusFilter === tab.id
                          ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Leads List / Table */}
            {isLoading ? (
              <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-neutral-400 mb-3" />
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Loading inquiries from database...
                </p>
              </div>
            ) : errorMsg ? (
              <div className="p-8 text-center bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl">
                <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                <h3 className="font-bold text-base text-red-800 dark:text-red-300 mb-1">
                  Database Query Error
                </h3>
                <p className="text-xs text-red-600 dark:text-red-400 mb-4 max-w-md mx-auto">
                  {errorMsg}
                </p>
                <button
                  type="button"
                  onClick={fetchLeads}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                >
                  Retry Loading
                </button>
              </div>
            ) : displayedLeads.length === 0 ? (
              <div className="py-20 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6">
                <Inbox className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-black dark:text-white mb-1">
                  No inquiries found
                </h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
                  {searchQuery || statusFilter !== 'all'
                    ? 'No leads match the active filters or search criteria.'
                    : 'When visitors submit project inquiries through the website contact form, they will appear here in real-time.'}
                </p>
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  + Add Manual Inbound Lead
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedLeads.map((lead) => {
                  const isNew = (lead.status || 'new').toLowerCase() === 'new';
                  const dateObj = new Date(lead.createdAt);
                  const formattedDate = !isNaN(dateObj.getTime())
                    ? `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`
                    : '';

                  return (
                    <motion.div
                      key={lead.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border transition-all duration-200 hover:shadow-md ${
                        isNew
                          ? 'border-blue-300 dark:border-blue-800/80 shadow-xs'
                          : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                        {/* Lead Summary Info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Status Selector Pill */}
                            <select
                              value={lead.status || 'new'}
                              onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                              className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                                (lead.status || 'new').toLowerCase() === 'new'
                                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                                  : (lead.status || '').toLowerCase() === 'contacted'
                                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                                  : (lead.status || '').toLowerCase() === 'converted'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-neutral-700'
                              }`}
                            >
                              <option value="new">● NEW INQUIRY</option>
                              <option value="contacted">● CONTACTED / IN TALKS</option>
                              <option value="converted">● CONVERTED CLIENT</option>
                              <option value="archived">● ARCHIVED</option>
                            </select>

                            {lead.service && (
                              <span className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                                {lead.service}
                              </span>
                            )}

                            {lead.budget && (
                              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                {lead.budget}
                              </span>
                            )}

                            {formattedDate && (
                              <span className="text-[11px] font-mono text-neutral-400 ml-auto sm:ml-0" suppressHydrationWarning>
                                {formattedDate}
                              </span>
                            )}
                          </div>

                          {/* Client Details Row */}
                          <div>
                            <h3 className="text-lg font-bold font-['Space_Grotesk'] text-black dark:text-white flex items-center gap-2">
                              <span>{lead.fullName}</span>
                              {lead.phone && lead.phone.includes('Company:') && (
                                <span className="text-xs font-normal font-sans text-neutral-500">
                                  ({lead.phone})
                                </span>
                              )}
                            </h3>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                              <a
                                href={`mailto:${lead.email}?subject=${encodeURIComponent(
                                  'Re: Your Inquiry with StudioAdsPro'
                                )}`}
                                className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white hover:underline font-mono text-blue-600 dark:text-blue-400"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>{lead.email}</span>
                              </a>

                              {lead.phone && !lead.phone.includes('Company:') && (
                                <a
                                  href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                  className="inline-flex items-center gap-1.5 hover:text-black dark:hover:text-white font-mono"
                                >
                                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                                  <span>{lead.phone}</span>
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Message Content Snippet */}
                          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/80 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                            <p className="line-clamp-3 whitespace-pre-wrap">{lead.message}</p>
                          </div>
                        </div>

                        {/* Actions Toolbar */}
                        <div className="flex lg:flex-col items-center lg:items-end justify-between gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-100 dark:border-neutral-800">
                          <div className="flex items-center gap-2">
                            {/* View Full Modal */}
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="px-3 py-1.5 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View Brief</span>
                            </button>

                            {/* Reply Email */}
                            <a
                              href={`mailto:${lead.email}?subject=${encodeURIComponent(
                                `StudioAdsPro Proposal & Response for ${lead.fullName}`
                              )}`}
                              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4" />
                            </a>

                            {/* Direct WhatsApp if phone available */}
                            {lead.phone && !lead.phone.includes('Company:') && (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 hover:bg-emerald-200 text-emerald-800 dark:text-emerald-300 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                            )}

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => setLeadToDelete(lead)}
                              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-600 text-neutral-400 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =========================================================================
         MODAL 1: VIEW FULL LEAD BRIEF
         ========================================================================= */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-6">
                <div>
                  <span className="font-mono text-xs text-neutral-500 uppercase">
                    Inquiry Brief #{selectedLead.id.slice(-6)}
                  </span>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] text-black dark:text-white">
                    {selectedLead.fullName}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Meta details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                      Email Address
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate"
                      >
                        {selectedLead.email}
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(selectedLead.email, 'Email')}
                        className="p-1 rounded text-neutral-400 hover:text-black dark:hover:text-white"
                      >
                        {copiedField === 'Email' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                      Phone / Mobile
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-black dark:text-white">
                        {selectedLead.phone || 'Not provided'}
                      </span>
                      {selectedLead.phone && (
                        <button
                          type="button"
                          onClick={() => copyToClipboard(selectedLead.phone || '', 'Phone')}
                          className="p-1 rounded text-neutral-400 hover:text-black dark:hover:text-white"
                        >
                          {copiedField === 'Phone' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                      Service Interested In
                    </span>
                    <span className="text-xs font-semibold text-black dark:text-white">
                      {selectedLead.service || 'General Inquiry'}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[11px] font-mono text-neutral-500 block mb-1">
                      Budget Estimate
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                      {selectedLead.budget || 'Not specified'}
                    </span>
                  </div>
                </div>

                {/* Submission Timestamp & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px] font-mono">
                      Submission Date
                    </span>
                    <span className="font-semibold text-black dark:text-white font-mono" suppressHydrationWarning>
                      {new Date(selectedLead.createdAt).toISOString().replace('T', ' ').slice(0, 19)} UTC
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 text-[11px] font-mono">Status:</span>
                    <select
                      value={selectedLead.status || 'new'}
                      onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-black dark:text-white focus:outline-hidden"
                    >
                      <option value="new">NEW INQUIRY</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="converted">CONVERTED CLIENT</option>
                      <option value="archived">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                    Project Requirements &amp; Message
                  </h4>
                  <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                    {selectedLead.message}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 transition-colors"
                  >
                    Close
                  </button>

                  <a
                    href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(
                      `StudioAdsPro Proposal & Response for ${selectedLead.fullName}`
                    )}`}
                    className="px-5 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         MODAL 2: ADD MANUAL INBOUND LEAD
         ========================================================================= */}
      <AnimatePresence>
        {showAddLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-['Space_Grotesk'] text-black dark:text-white">
                    Add Inbound Lead
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Record offline inquiries received via Phone, WhatsApp, or direct meeting.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateManualLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                      Client Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={newLeadForm.fullName}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={newLeadForm.email}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                      Phone / Mobile
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={newLeadForm.phone}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                      Primary Service
                    </label>
                    <select
                      value={newLeadForm.service}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                    >
                      <option value="">Select service</option>
                      <option>Full Stack Development</option>
                      <option>AI &amp; Agent Development</option>
                      <option>Mobile App Development</option>
                      <option>UI/UX Design</option>
                      <option>Social Media &amp; Meta Ads</option>
                      <option>Video Editing &amp; Graphic Design</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                      Budget Range
                    </label>
                    <select
                      value={newLeadForm.budget}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                    >
                      <option value="">Select budget</option>
                      <option>Under ₹25,000</option>
                      <option>₹25,000 – ₹75,000</option>
                      <option>₹75,000 – ₹2,00,000</option>
                      <option>₹2,00,000+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                      Initial Status
                    </label>
                    <select
                      value={newLeadForm.status}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                    Lead Notes &amp; Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter project details, client requirements, next action items..."
                    value={newLeadForm.message}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-xs text-black dark:text-white focus:outline-hidden focus:border-black dark:focus:border-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setShowAddLeadModal(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingNewLead}
                    className="px-5 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black font-semibold text-xs hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmittingNewLead ? 'Saving...' : 'Save Lead to Database'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
         MODAL 3: DELETE CONFIRMATION
         ========================================================================= */}
      <AnimatePresence>
        {leadToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 mx-auto flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-black dark:text-white mb-1">
                Delete this inquiry?
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6">
                Are you sure you want to permanently delete the inquiry from{' '}
                <strong className="text-black dark:text-white">{leadToDelete.fullName}</strong>?
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setLeadToDelete(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteLead(leadToDelete.id)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
