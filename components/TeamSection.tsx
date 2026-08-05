'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Link as LinkIcon, Trash2, X, Plus, Check, User, Lock, Unlock, ShieldAlert } from 'lucide-react';

interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  subtitle: string;
  image?: string;
}

const DEFAULT_TEAM: TeamMember[] = [
  { id: 'ar', initials: 'AR', name: 'Alex Rivera', title: 'Founder & CEO', subtitle: 'Product strategy & client partnerships' },
  { 
    id: 'jm', 
    initials: 'JY', 
    name: 'Jay Yadav', 
    title: 'Lead Full Stack Developer', 
    subtitle: 'Architecture, APIs & full-stack delivery',
  },
  { id: 'sk', initials: 'SK', name: 'Samira Khan', title: 'Backend Engineer', subtitle: 'APIs, databases & infra' },
  { id: 'np', initials: 'NP', name: 'Noah Patel', title: 'Frontend Engineer', subtitle: 'Interfaces & performance' },
  { id: 'dv', initials: 'DV', name: 'Devon Vance', title: 'AI Engineer', subtitle: 'Agents & automation' },
  { id: 'lc', initials: 'LC', name: 'Lena Chen', title: 'UI/UX Designer', subtitle: 'Research & design systems' },
  { id: 'to', initials: 'TO', name: 'Tariq Owens', title: 'Application Developer', subtitle: 'iOS & Android' },
  { id: 'rb', initials: 'RB', name: 'Rhea Bhatia', title: 'Social Media Strategist', subtitle: 'Content & campaigns' },
  { id: 'ew', initials: 'EW', name: 'Elena Wong', title: 'Creative Designer', subtitle: 'Brand & visual identity' },
  { id: 'mh', initials: 'MH', name: 'Marcus Hill', title: 'Video Editor', subtitle: 'Motion & product video' },
];

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>(DEFAULT_TEAM);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [editName, setEditName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Admin Mode protection so public visitors cannot edit/delete photos
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showAdminPinModal, setShowAdminPinModal] = useState<boolean>(false);
  const [showChangePinModal, setShowChangePinModal] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>('1234');
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

  // Load saved custom images and admin PIN from localStorage on mount
  useEffect(() => {
    try {
      const savedMembers = localStorage.getItem('studioadspro_team_members');
      if (savedMembers) {
        const parsed = JSON.parse(savedMembers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMembers(parsed);
        }
      }

      const savedPin = localStorage.getItem('studioadspro_admin_pin') || process.env.NEXT_PUBLIC_ADMIN_PIN;
      if (savedPin) {
        setAdminPin(savedPin);
      }
    } catch (e) {
      console.error('Failed to load team data from localStorage', e);
    }
  }, []);

  // Save to localStorage helper
  const saveMembers = (updated: TeamMember[]) => {
    setMembers(updated);
    try {
      localStorage.setItem('studioadspro_team_members', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save team members to localStorage', e);
    }
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
    setTimeout(() => setToastMsg(null), 3000);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
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

  const handleSaveMember = () => {
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

    saveMembers(updated);
    showToast(`Saved changes for ${cleanName}`);
    closeModal();
  };

  const handleDeleteMember = (memberId: string) => {
    const target = members.find((m) => m.id === memberId);
    const updated = members.filter((m) => m.id !== memberId);
    saveMembers(updated);
    showToast(`Removed ${target?.name || 'member'} from team`);
    closeModal();
  };

  const handleRemovePhoto = (memberId: string) => {
    setPreviewUrl(null);
    setImageUrlInput('');
    const updated = members.map((m) =>
      m.id === memberId ? { ...m, image: undefined } : m
    );
    saveMembers(updated);
    showToast('Photo removed');
  };

  const handleAddNewMember = (e: React.FormEvent) => {
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
    saveMembers(updated);
    showToast(`Added ${newMember.title} to team!`);

    setNewMember({ name: '', title: '', subtitle: '', image: '' });
    setIsAddingNew(false);
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
          {members.map((member) => (
            <div key={member.id} className="group flex flex-col relative">
              {/* Member Photo Container */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center font-['Space_Grotesk'] text-2xl font-bold text-black dark:text-white mb-3 group-hover:border-black dark:group-hover:border-white transition-all shadow-sm">
                
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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
          ))}
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

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pappu kumar Yadav"
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
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white rounded-xl p-4 text-center cursor-pointer transition-colors bg-neutral-50 dark:bg-neutral-800/30 flex flex-col items-center justify-center gap-1.5"
                      >
                        {previewUrl ? (
                          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-black dark:border-white">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <>
                            <div className="p-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                              <Upload className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-black dark:text-white">
                              Click to browse and upload photo
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="url"
                        placeholder=""
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white text-xs focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                      />

                      {imageUrlInput && (
                        <div className="flex items-center gap-3 p-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/40">
                          <img
                            src={imageUrlInput}
                            alt="Preview"
                            className="w-10 h-10 rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
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
