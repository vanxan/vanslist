'use client';

import * as PhosphorIcons from '@phosphor-icons/react';
import { ComponentType } from 'react';

interface DynIconProps {
  name: string;
  size?: number;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  color?: string;
  className?: string;
}

export function DynIcon({ name, size = 20, weight = 'regular', color, className }: DynIconProps) {
  const Icon = (PhosphorIcons as unknown as Record<string, ComponentType<any>>)[name];
  if (!Icon) return null;
  return <Icon size={size} weight={weight} color={color} className={className} />;
}
