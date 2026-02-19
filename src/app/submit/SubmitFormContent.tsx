'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  PaperPlaneTilt, Check, Plus, House, ArrowLeft, MagnifyingGlass,
  AppWindow, ChatText, Brain, ArrowsClockwise, Package, Handshake
} from '@phosphor-icons/react';
import { TRADES, TASK_TAGS, FEATURE_TAGS } from '@/data/trades';

const SUBMIT_TYPES = [
  { type: 'App', icon: AppWindow, desc: 'A software tool or platform' },
  { type: 'Prompt', icon: ChatText, desc: 'A copy-paste prompt for any LLM' },
  { type: 'Skill', icon: Brain, desc: 'A reusable persona or system instruction' },
  { type: 'Workflow', icon: ArrowsClockwise, desc: 'A multi-step automation' },
  { type: 'Bundle', icon: Package, desc: 'A curated set of tools' },
  { type: 'Service', icon: Handshake, desc: 'AI setup, consulting, or training' },
];

const typeIcon: Record<string, any> = { App: AppWindow, Prompt: ChatText, Skill: Brain, Workflow: ArrowsClockwise, Bundle: Package, Service: Handshake };

function Input({ label, required, placeholder, maxLength, hint, ...props }: any) {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1.5">
        <label className="text-xs font-semibold text-gray-500">{label} {required && '*'}</label>
        {hint && <span className="text-[10px] text-gray-300">{hint}</span>}
      </div>
      <input maxLength={maxLength} placeholder={placeholder} className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white" {...props} />
    </div>
  );
}

function TextArea({ label, required, placeholder, rows = 4, mono, ...props }: any) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label} {required && '*'}</label>
      <textarea rows={rows} placeholder={placeholder} className={`w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white resize-y ${mono ? 'font-[family-name:var(--font-dm-mono)] text-[13px]' : ''}`} {...props} />
    </div>
  );
}

function Select({ label, required, children, ...props }: any) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label} {required && '*'}</label>
      <select className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white text-gray-400" {...props}>
        {children}
      </select>
    </div>
  );
}

export function SubmitFormContent() {
  const [submitType, setSubmitType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitTask, setSubmitTask] = useState('');
  const [tradeSearch, setTradeSearch] = useState('');
  const maxTags = 5;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : prev.length < maxTags ? [...prev, tag] : prev);
  };

  const Icon = submitType ? typeIcon[submitType] : null;

  if (submitted) {
    return (
      <div className="max-w-[680px] mx-auto px-6 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-5">
          <Check size={32} weight="bold" className="text-white" />
        </div>
        <h1 className="text-[32px] font-extrabold mb-2">You&apos;re live!</h1>
        <p className="text-[15px] text-gray-400 max-w-[400px] mx-auto mb-6 leading-relaxed">
          Your {submitType?.toLowerCase()} has been submitted and is now visible on VansList.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setSubmitType(null); setSubmitted(false); setSelectedTags([]); setSubmitTask(''); setTradeSearch(''); }}
            className="bg-white border border-gray-200 rounded-lg px-5 py-2.5 text-[13px] font-semibold flex items-center gap-1.5 hover:border-gray-300">
            <Plus size={14} /> Submit another
          </button>
          <Link href="/" className="bg-[#1a1a1a] text-white rounded-lg px-5 py-2.5 text-[13px] font-semibold flex items-center gap-1.5">
            <House size={14} className="text-gold" /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[680px] mx-auto px-6 pt-12 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#1a1a1a] flex items-center justify-center mx-auto mb-5">
          <PaperPlaneTilt size={32} className="text-gold" />
        </div>
        <h1 className="text-[36px] font-extrabold tracking-tight mb-2">Submit to VansList</h1>
        <p className="text-[15px] text-gray-400 max-w-[460px] mx-auto leading-relaxed">
          Share an AI tool, prompt, workflow, bundle, or service with the community. Free to submit — goes live instantly.
        </p>
      </div>

      {/* Step 1: Pick type */}
      {!submitType ? (
        <>
          <h3 className="text-sm font-bold text-[#1a1a1a] mb-4">What are you submitting?</h3>
          <div className="grid grid-cols-2 gap-3">
            {SUBMIT_TYPES.map(t => (
              <button key={t.type} onClick={() => setSubmitType(t.type)}
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-3.5 text-left hover:border-gold hover:shadow-[0_2px_12px_rgba(212,168,83,0.12)] transition-all">
                <div className="w-11 h-11 rounded-xl bg-gold-light flex items-center justify-center shrink-0">
                  <t.icon size={20} className="text-[#8b7355]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1a1a1a]">{t.type}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{t.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Back + type header */}
          <div className="flex items-center gap-2.5 mb-7">
            <button onClick={() => { setSubmitType(null); setSelectedTags([]); setSubmitTask(''); setTradeSearch(''); }}
              className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs flex items-center gap-1 text-gray-500 hover:border-gray-300">
              <ArrowLeft size={12} /> Back
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold-light flex items-center justify-center">
                {Icon && <Icon size={16} className="text-[#8b7355]" />}
              </div>
              <span className="text-sm font-bold text-[#1a1a1a]">Submit {submitType === 'App' ? 'an' : 'a'} {submitType}</span>
            </div>
          </div>

          {/* Shared fields */}
          <Input label="Title" required placeholder={
            submitType === 'Prompt' ? 'e.g. Follow-Up Text After Sending a Quote' :
            submitType === 'App' ? 'e.g. Jobber AI' :
            submitType === 'Service' ? 'e.g. AI Setup for Plumbers' :
            `e.g. My ${submitType}`
          } />

          <div className="grid grid-cols-2 gap-4">
            {/* Searchable trade */}
            <div className="mb-6 relative">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Trade *</label>
              <div className="relative">
                <MagnifyingGlass size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 z-10" />
                <input value={tradeSearch} onChange={e => setTradeSearch(e.target.value)}
                  placeholder="Search trades..."
                  className="w-full py-3 pl-9 pr-4 border border-gray-200 rounded-lg text-sm outline-none bg-white"
                />
                {tradeSearch && (() => {
                  const allTrades = [{ name: 'All trades (general purpose)', slug: 'all' }, ...TRADES];
                  const matches = allTrades.filter(t => t.name.toLowerCase().includes(tradeSearch.toLowerCase()));
                  if (matches.length === 0 || matches[0].name === tradeSearch) return null;
                  return (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 max-h-[200px] overflow-y-auto z-50 shadow-lg">
                      {matches.slice(0, 8).map(t => (
                        <div key={t.slug} onClick={() => setTradeSearch(t.name)}
                          className="px-3.5 py-2.5 text-[13px] cursor-pointer border-b border-gray-50 hover:bg-[#faf8f5]">
                          {t.name}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Task with Other */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Task *</label>
              <select value={submitTask} onChange={e => setSubmitTask(e.target.value)}
                className={`w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white ${submitTask ? 'text-[#1a1a1a]' : 'text-gray-400'}`}>
                <option value="">Select a task</option>
                <option>Scheduling</option>
                <option>Lead Generation</option>
                <option>Marketing</option>
                <option>Invoicing</option>
                <option>Customer Service</option>
                <option>Admin</option>
                <option>Estimating</option>
                <option>Other</option>
              </select>
              {submitTask === 'Other' && (
                <input placeholder="Describe the task..." className="w-full py-3 px-4 border border-gray-200 rounded-lg text-sm outline-none bg-white mt-2" />
              )}
            </div>
          </div>

          <Input label="Short Description" required placeholder="One sentence about what this does" maxLength={200} hint="Max 200 characters" />
          <TextArea label="Full Description" placeholder="Go deeper — what does it do, who is it for, how does it work..." rows={5} />

          {/* Structured tags */}
          <div className="mb-6">
            <div className="flex justify-between mb-2.5">
              <label className="text-xs font-semibold text-gray-500">Tags</label>
              <span className={`text-[11px] font-semibold ${selectedTags.length >= maxTags ? 'text-red-500' : 'text-gray-400'}`}>
                {selectedTags.length}/{maxTags} selected
              </span>
            </div>
            <div className="mb-3">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Tasks</div>
              <div className="flex gap-1.5 flex-wrap">
                {TASK_TAGS.map(tag => {
                  const active = selectedTags.includes(tag);
                  const disabled = !active && selectedTags.length >= maxTags;
                  return (
                    <button key={tag} onClick={() => !disabled && toggleTag(tag)}
                      className={`rounded-lg px-3 py-1.5 text-[11px] border transition-all ${
                        active ? 'text-gold border-gold font-bold' : disabled ? 'text-gray-300 border-gray-200 opacity-40' : 'text-gray-500 border-gray-200 hover:border-gray-300'
                      }`}>
                      {active && '✓ '}{tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Features</div>
              <div className="flex gap-1.5 flex-wrap">
                {FEATURE_TAGS.map(tag => {
                  const active = selectedTags.includes(tag);
                  const disabled = !active && selectedTags.length >= maxTags;
                  return (
                    <button key={tag} onClick={() => !disabled && toggleTag(tag)}
                      className={`rounded-lg px-3 py-1.5 text-[11px] border transition-all ${
                        active ? 'bg-[#1a1a1a] text-gold border-gold font-bold' : disabled ? 'bg-[#1a1a1a] text-gray-600 border-gray-700 opacity-40' : 'bg-[#1a1a1a] text-gray-400 border-gray-700 hover:border-gray-500'
                      }`}>
                      {active && '✓ '}{tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Type-specific fields */}
          {submitType === 'App' && (
            <>
              <Input label="Website URL" required placeholder="https://yourapp.com" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Pricing" required placeholder="e.g. Free, $39/mo, Custom" />
                <Select label="Free trial?"><option>Yes</option><option>No</option></Select>
              </div>
              <Input label="GitHub Repo URL" placeholder="https://github.com/your/repo (optional)" />
            </>
          )}

          {submitType === 'Prompt' && (
            <>
              <TextArea label="The Prompt" required placeholder="Paste your full prompt here..." rows={6} mono />
              <Input label="Expected Output" placeholder="What should the user expect back?" />
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Works with</label>
                <div className="flex gap-2 flex-wrap">
                  {['Any LLM', 'ChatGPT', 'Claude', 'Gemini', 'Other'].map(l => (
                    <label key={l} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3.5 py-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={l === 'Any LLM'} className="accent-gold" /> {l}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {submitType === 'Skill' && (
            <>
              <TextArea label="System Prompt / Skill Instructions" required placeholder="You are a plumbing estimator. When given a job description, you provide a detailed cost estimate..." rows={8} mono />
              <Input label="Role / Persona" required placeholder="e.g. Plumbing Estimator, Customer Service Rep, Marketing Writer" />
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Works with</label>
                <div className="flex gap-2 flex-wrap">
                  {['Any LLM', 'ChatGPT', 'Claude', 'Gemini', 'Other'].map(l => (
                    <label key={l} className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-3.5 py-2 cursor-pointer">
                      <input type="checkbox" defaultChecked={l === 'Any LLM'} className="accent-gold" /> {l}
                    </label>
                  ))}
                </div>
              </div>
              <Select label="Difficulty"><option>Easy</option><option>Medium</option><option>Advanced</option></Select>
            </>
          )}

          {submitType === 'Workflow' && (
            <>
              <TextArea label="Steps Overview" required placeholder="Describe the steps in this workflow..." />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Tools Required" required placeholder="e.g. Zapier, Google Sheets, Jobber" />
                <Select label="Difficulty" required><option>Easy</option><option>Medium</option><option>Advanced</option></Select>
              </div>
              <Input label="GitHub Repo URL" placeholder="https://github.com/your/repo (optional)" />
            </>
          )}

          {submitType === 'Bundle' && (
            <>
              <TextArea label="Tools in this bundle" required placeholder="List each tool, one per line" rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Total Estimated Cost" placeholder="e.g. ~$154/mo" />
                <Input label="Best for" placeholder="e.g. Solo plumbers, small teams" />
              </div>
              <Input label="GitHub Repo URL" placeholder="https://github.com/your/repo (optional)" />
            </>
          )}

          {submitType === 'Service' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Select label="Service Type" required>
                  <option>Select type</option><option>AI Setup</option><option>Consulting</option><option>Training</option><option>Custom Build</option><option>Other</option>
                </Select>
                <Select label="Pricing Model" required>
                  <option>Select model</option><option>Hourly</option><option>Flat rate</option><option>Custom / Contact</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Website / Booking URL" required placeholder="https://yoursite.com" />
                <Input label="Experience / Credentials" placeholder="e.g. 5 years, certified, 100+ setups" />
              </div>
            </>
          )}

          {/* Your info */}
          <div className="border-t border-gray-100 pt-6 mt-2 mb-6">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Your info</div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Your Name" placeholder="Optional" />
              <Input label="Email" placeholder="Optional — for updates on your listing" />
            </div>
          </div>

          {/* Submit */}
          <button onClick={() => setSubmitted(true)}
            className="w-full bg-[#1a1a1a] text-white rounded-lg py-3.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
            <PaperPlaneTilt size={16} className="text-gold" /> Submit {submitType}
          </button>
          <p className="text-[11px] text-gray-300 text-center mt-2.5">
            Free to submit. Goes live instantly. No spam or inappropriate content.
          </p>
        </>
      )}
    </div>
  );
}
