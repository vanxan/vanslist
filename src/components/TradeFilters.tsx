'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Task, ContentType } from '@/lib/supabase';

interface Props {
  tradeSlug: string;
  tasks: Task[];
  contentTypes: ContentType[];
  activeType?: string;
  activeTask?: string;
  activeDifficulty?: string;
}

export function TradeFilters({ tradeSlug, tasks, contentTypes, activeType, activeTask, activeDifficulty }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(key: string, value: string | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/trade/${tradeSlug}?${params.toString()}`);
  }

  const difficulties = [
    { value: 'beginner', label: 'Easy', color: 'green' },
    { value: 'intermediate', label: 'Medium', color: 'yellow' },
    { value: 'needs-tech-person', label: 'Advanced', color: 'red' },
  ];

  return (
    <div className="mb-8 space-y-4">
      {/* Content Type Filter */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
          Type
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('type', undefined)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !activeType ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {contentTypes.map((ct) => (
            <button
              key={ct.slug}
              onClick={() => setFilter('type', activeType === ct.slug ? undefined : ct.slug)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeType === ct.slug ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {ct.icon} {ct.name}
            </button>
          ))}
        </div>
      </div>

      {/* Task Filter */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
          Task
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('task', undefined)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !activeTask ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {tasks.map((t) => (
            <button
              key={t.slug}
              onClick={() => setFilter('task', activeTask === t.slug ? undefined : t.slug)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTask === t.slug ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t.icon} {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Filter */}
      <div>
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wider block mb-2">
          Difficulty
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('difficulty', undefined)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              !activeDifficulty ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setFilter('difficulty', activeDifficulty === d.value ? undefined : d.value)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                activeDifficulty === d.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active filters indicator */}
      {(activeType || activeTask || activeDifficulty) && (
        <div className="pt-2">
          <button
            onClick={() => router.push(`/trade/${tradeSlug}`)}
            className="text-xs text-blue-600 hover:underline"
          >
            ✕ Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
