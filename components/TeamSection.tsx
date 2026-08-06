'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Camera, Upload, Link as LinkIcon, Trash2, X, Plus, Check, User, Lock, Unlock, ShieldAlert, Loader2 } from 'lucide-react';

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  subtitle: string;
  image?: string;
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [editName, setEditName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  // Admin Mode protection so public visitors cannot edit/delete photos
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState<boolean>(false);
  const [showChangePinModal, setShowChangePinModal] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>('190700');
  const [pinInput, setPinInput] = useState<string>('');
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // New member form
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    subtitle: '',
    image: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync latest team members from database via API
  useEffect(() => {
    async function initTeamData() {
      // 1. Read local cache for instant render on client mount
      try {
        const saved = localStorage.getItem('studioadspro_team_members');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMembers(parsed);
            setIsLoading(false);
          }
        }

        const savedPin = localStorage.getItem('studioadspro_admin_pin') || process.env.NEXT_PUBLIC_ADMIN_PIN;
        if (savedPin) {
          setAdminPin(savedPin);
        }
      } catch (e) {
        console.error('Failed to load team cache from localStorage', e);
      }

      // 2. Fetch database data from API
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setMembers(json.data);
            try {
              localStorage.setItem('studioadspro_team_members', JSON.stringify(json.data));
            } catch {}
          }
        }
      } catch (err) {
        console.error('Failed to load team from API:', err);
      } finally {
        setIsLoading(false);
      }
    }

    initTeamData();
  }, []);

  // Save to PostgreSQL database (NeonDB) via /api/team
  const saveMembers = async (updated: TeamMember[]): Promise<boolean> => {
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: adminPin, members: updated }),
      });
      const json = await res.json().catch(() => null);

      if (res.ok && json?.success) {
        const freshData = Array.isArray(json.data) && json.data.length > 0 ? json.data : updated;
        setMembers(freshData);
        try {
          localStorage.setItem('studioadspro_team_members', JSON.stringify(freshData));
        } catch {}
        showToast('Saved to Neon Database successfully!');
        setModalError(null);
        return true;
      } else {
        const msg = json?.message || 'Database save failed.';
        setModalError(`NeonDB Error: ${msg}`);
        showToast(`NeonDB Error: ${msg}`);
        return false;
      }
    } catch (apiErr: any) {
      console.error('API sync error:', apiErr);
      const msg = apiErr?.message || 'Network connection error';
      setModalError(`NeonDB Error: ${msg}`);
      showToast(`NeonDB Error: ${msg}`);
      return false;
    }
  };

  const compressImage = (dataUrl: string, maxWidth = 1600, maxHeight = 1600, quality = 0.95): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(dataUrl);
        }
      };
      img.onerror = () => resolve(dataUrl);
    });
  };

  const handleSetNewPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput.trim()) return;
    const cleanPin = newPinInput.trim();
    setAdminPin(cleanPin);
    try {
      localStorage.setItem('studioadspro_admin_pin', cleanPin);
    } catch (e) {
      console.error('Failed to save PIN to localStorage', e);
    }
    setShowChangePinModal(false);
    setNewPinInput('');
    showToast('Admin passcode updated successfully!');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleAdminUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin) {
      setIsAdminMode(true);
      setShowAdminPinModal(false);
      setPinInput('');
      setPinError(null);
      showToast('Admin edit mode unlocked!');
    } else {
      setPinError('Incorrect passcode. Please try again.');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setModalError('File size exceeds 20MB limit. Please choose a smaller image.');
      return;
    }

    setModalError(null);
    setIsUploadingImage(true);

    try {
      // 1. Prepare FormData for Cloudinary API upload
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success && data.url) {
        setPreviewUrl(data.url);
        setModalError(null);
        showToast('Uploaded photo to Cloudinary!');
      } else {
        const errorMsg = data.message || 'Cloudinary upload failed.';
        // Auto-fallback to local crystal-clear HD image (1600x1600 @ 0.95 quality)
        const reader = new FileReader();
        reader.onload = async () => {
          if (typeof reader.result === 'string') {
            const compressed = await compressImage(reader.result, 1600, 1600, 0.95);
            setPreviewUrl(compressed);
            showToast('Loaded photo with HD local optimization');
            setModalError(`Cloudinary Note: ${errorMsg}. Photo loaded with HD local optimization so you can save.`);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      const errorMsg = err?.message || 'Server error';
      const reader = new FileReader();
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
          const compressed = await compressImage(reader.result, 1600, 1600, 0.95);
          setPreviewUrl(compressed);
          showToast('Loaded photo with HD local optimization');
          setModalError(`Cloudinary Note: ${errorMsg}. Photo loaded with HD local optimization.`);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const openEditModal = (member: TeamMember) => {
    setSelectedMember(member);
    setEditName(member.name);
    setEditTitle(member.title);
    setEditSubtitle(member.subtitle);
    setPreviewUrl(member.image || null);
    setImageUrlInput(member.image || '');
  };

  const handleSaveMember = async () => {
    if (!selectedMember) return;
    const finalUrl = activeTab === 'upload' ? previewUrl : imageUrlInput;
    const cleanName = editName.trim() || selectedMember.name;
    const cleanTitle = editTitle.trim() || selectedMember.title;
    const cleanSubtitle = editSubtitle.trim() || selectedMember.subtitle;

    const initials = cleanName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || selectedMember.initials;

    const updated = members.map((m) =>
      m.id === selectedMember.id
        ? {
            ...m,
            name: cleanName,
            title: cleanTitle,
            subtitle: cleanSubtitle,
            initials: initials,
            image: finalUrl || undefined,
          }
        : m
    );

    const ok = await saveMembers(updated);
    if (ok) {
      showToast(`Saved changes for ${cleanName}`);
      closeModal();
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    const target = members.find((m) => m.id === memberId);
    const updated = members.filter((m) => m.id !== memberId);
    const ok = await saveMembers(updated);
    if (ok) {
      showToast(`Removed ${target?.name || 'member'} from team`);
      closeModal();
    }
  };

  const handleRemovePhoto = async (memberId: string) => {
    setPreviewUrl(null);
    setImageUrlInput('');
    const updated = members.map((m) =>
      m.id === memberId ? { ...m, image: undefined } : m
    );
    const ok = await saveMembers(updated);
    if (ok) {
      showToast('Photo removed');
    }
  };

  const handleAddNewMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.title) return;

    const initials = newMember.name
      ? newMember.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : newMember.title
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2);

    const created: TeamMember = {
      id: `custom_${Date.now()}`,
      initials: initials || 'TM',
      name: newMember.name || newMember.title,
      title: newMember.title,
      subtitle: newMember.subtitle || 'Team Specialist',
      image: newMember.image || undefined,
    };

    const updated = [...members, created];
    const ok = await saveMembers(updated);
    if (ok) {
      showToast(`Added ${newMember.title} to team!`);
      setNewMember({ name: '', title: '', subtitle: '', image: '' });
      setIsAddingNew(false);
    }
  };

  const closeModal = () => {
    setSelectedMember(null);
    setEditName('');
    setEditTitle('');
    setEditSubtitle('');
    setPreviewUrl(null);
    setImageUrlInput('');
  };

  return (
    <section id="team" className="py-16 sm:py-24 bg-white dark:bg-neutral-950 transition-colors duration-300 relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Toast alert notification */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-black dark:bg-white text-white dark:text-black px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 transition-all animate-bounce">
            <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            {toastMsg}
          </div>
        )}

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div
              onClick={() => {
                if (!isAdminMode) {
                  setShowAdminPinModal(true);
                }
              }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black dark:text-white mb-3 cursor-pointer select-none group/teamtag"
              title="Team"
            >
              <span className="w-2 h-2 rounded-full bg-black dark:bg-white group-hover/teamtag:scale-125 transition-transform" />
              Team
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
              The people behind the build.
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              Cross-functional team of engineers, designers, and digital strategists.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isAdminMode && (
              <>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold transition-all shadow-md hover:opacity-90 w-fit cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  Add Team Member
                </button>
                <button
                  onClick={() => setShowChangePinModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all cursor-pointer"
                  title="Set secret admin passcode"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Change Passcode
                </button>
                <button
                  onClick={() => {
                    setIsAdminMode(false);
                    showToast('Admin mode locked.');
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold transition-all hover:bg-emerald-100 cursor-pointer"
                  title="Lock Admin Mode"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  Admin Active (Lock)
                </button>
              </>
            )}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {isLoading && members.length === 0 ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex flex-col animate-pulse">
                <div className="w-full aspect-square rounded-xl bg-neutral-200 dark:bg-neutral-800 mb-3" />
                <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded mb-1.5" />
                <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded mb-1" />
                <div className="h-3 w-2/3 bg-neutral-200 dark:bg-neutral-800 rounded" />
              </div>
            ))
          ) : members.length === 0 ? (
            <div className="col-span-full py-12 px-4 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 flex flex-col items-center justify-center">
              <User className="w-10 h-10 text-neutral-400 mb-3" />
              <h3 className="text-sm font-bold text-black dark:text-white">No Team Members Found</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                There are currently no team members in the database.
                {isAdminMode ? " Click 'Add Member' above to create your first team member." : " Unlock Admin Mode to add team members."}
              </p>
            </div>
          ) : (
            members.map((member) => (
              <div key={member.id} className="group flex flex-col relative">
              {/* Member Photo Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white mb-3 group-hover:border-black dark:group-hover:border-white transition-all shadow-sm">
                
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.title || member.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    quality={95}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    unoptimized={Boolean(member.image.startsWith('data:'))}
                  />
                ) : (
                  <span>{member.initials}</span>
                )}

                {/* Hover overlay with edit button (ONLY VISIBLE IN ADMIN MODE) */}
                {isAdminMode && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center gap-1.5">
                    <button
                      onClick={() => openEditModal(member)}
                      className="px-3 py-1.5 rounded-lg bg-white text-black text-[11px] font-bold flex items-center gap-1.5 hover:scale-105 transition-transform shadow-lg cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Edit Member
                    </button>

                    {member.image && (
                      <button
                        onClick={() => handleRemovePhoto(member.id)}
                        className="text-[10px] text-red-300 hover:text-red-100 underline mt-1 cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                )}
                {/* Badge if customized photo */}
                {member.image && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-black" />
                )}
              </div>

              <h3 className="font-['Space_Grotesk'] font-bold text-base text-black dark:text-white leading-snug">
                {member.name}
              </h3>
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                {member.title}
              </p>
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 leading-normal mt-0.5">
                {member.subtitle}
              </span>
            </div>
          )))}
        </div>

        {/* Modal: Edit Member */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-base text-black dark:text-white">
                    Edit Team Member
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Update name, role, details, and photo
                  </p>
                </div>
              </div>

              {/* Inline Error Alert Notification Banner */}
              {modalError && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2 mb-4">
                  <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="flex-1 leading-relaxed">{modalError}</span>
                  <button onClick={() => setModalError(null)} className="text-amber-500 hover:text-amber-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jay Yadav"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                  />
                </div>

                {/* Job Title / Role */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Full Stack Developer"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                  />
                </div>

                {/* Subtitle / Focus */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Subtitle / Specialty
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Architecture, APIs & full-stack delivery"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                  />
                </div>

                {/* Photo Header */}
                <div className="pt-2">
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Profile Photo
                  </label>
                  
                  {/* Tabs */}
                  <div className="flex gap-2 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 mb-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab('upload')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === 'upload'
                          ? 'bg-white dark:bg-neutral-900 text-black dark:text-white shadow-sm'
                          : 'text-neutral-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5 inline mr-1.5" />
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('url')}
                      className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        activeTab === 'url'
                          ? 'bg-white dark:bg-neutral-900 text-black dark:text-white shadow-sm'
                          : 'text-neutral-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      <LinkIcon className="w-3.5 h-3.5 inline mr-1.5" />
                      Image URL
                    </button>
                  </div>

                  {/* Content by Tab */}
                  {activeTab === 'upload' ? (
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />

                      <div
                        onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white rounded-xl p-4 text-center cursor-pointer transition-colors bg-neutral-50 dark:bg-neutral-800/30 flex flex-col items-center justify-center gap-1.5 min-h-[100px]"
                      >
                        {isUploadingImage ? (
                          <div className="flex flex-col items-center gap-2 py-2">
                            <Loader2 className="w-6 h-6 animate-spin text-black dark:text-white" />
                            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                              Uploading photo to Cloudinary...
                            </span>
                          </div>
                        ) : previewUrl ? (
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black dark:border-white">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              quality={95}
                              className="object-cover"
                              referrerPolicy="no-referrer"
                              unoptimized={Boolean(previewUrl.startsWith('data:'))}
                            />
                          </div>
                        ) : (
                          <>
                            <div className="p-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                              <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-black dark:text-white">
                              Click to browse and upload photo to Cloudinary
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                      />

                      {imageUrlInput && (
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-700 flex-shrink-0">
                            <Image
                              src={imageUrlInput}
                              alt="Preview"
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                              unoptimized={Boolean(imageUrlInput.startsWith('data:'))}
                            />
                          </div>
                          <span className="text-xs text-neutral-500">Image URL preview</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-2.5 mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => handleDeleteMember(selectedMember.id)}
                  className="px-3 py-2 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 flex items-center gap-1.5 cursor-pointer"
                  title="Delete this team member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveMember}
                    className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Modal: Add New Team Member */}
        {isAddingNew && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
              
              <button
                onClick={() => setIsAddingNew(false)}
                className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-['Space_Grotesk'] font-bold text-lg text-black dark:text-white mb-1">
                Add Team Member
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5">
                Add a new colleague, partner, or specialist to your team section.
              </p>

              <form onSubmit={handleAddNewMember} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead DevOps Engineer"
                    value={newMember.title}
                    onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Smith"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Subtitle / Focus Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cloud infrastructure & CI/CD pipelines"
                    value={newMember.subtitle}
                    onChange={(e) => setNewMember({ ...newMember, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newMember.image}
                    onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
                  >
                    Add Member
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Modal: Admin PIN Authorization */}
        {showAdminPinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
              
              <button
                onClick={() => {
                  setShowAdminPinModal(false);
                  setPinError(null);
                  setPinInput('');
                }}
                className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-base text-black dark:text-white">
                    Unlock Team Management
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Enter passcode to edit, add, or upload photos
                  </p>
                </div>
              </div>

              <form onSubmit={handleAdminUnlock} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Admin Passcode
                  </label>
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="Enter PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white tracking-widest"
                  />
                </div>

                {pinError && (
                  <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
                    {pinError}
                  </div>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPinModal(false);
                      setPinError(null);
                      setPinInput('');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
                  >
                    Unlock Admin Mode
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* Modal: Change Secret Passcode */}
        {showChangePinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl relative">
              
              <button
                onClick={() => {
                  setShowChangePinModal(false);
                  setNewPinInput('');
                }}
                className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Space_Grotesk'] font-bold text-base text-black dark:text-white">
                    Set Secret Admin Passcode
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Choose a new secret passcode for admin authorization
                  </p>
                </div>
              </div>

              <form onSubmit={handleSetNewPin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    autoFocus
                    required
                    placeholder="Enter your new secret passcode"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-sm outline-none focus:ring-2 focus:ring-black dark:focus:ring-white tracking-widest"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePinModal(false);
                      setNewPinInput('');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold"
                  >
                    Save Secret Passcode
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
