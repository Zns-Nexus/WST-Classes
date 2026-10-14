'use client';

import { motion } from 'motion/react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

/** Single-choice filter on the shadcn Toggle Group, with a pill that slides to the selected option. */
export function FilterTabs<Option extends string>({ id, label, options, value, onChange }: { id: string; label: string; options: ReadonlyArray<Option>; value: Option; onChange: (option: Option) => void }) {
  return <ToggleGroup type="single" className="filter-tabs" aria-label={label} value={value} onValueChange={next => { const option = options.find(entry => entry === next); if (option) onChange(option); }}>
    {options.map(option => <ToggleGroupItem key={option} value={option} className="filter-tab">
      {option === value && <motion.span layoutId={`${id}-pill`} className="filter-pill" transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }} />}
      <span className="filter-label">{option}</span>
    </ToggleGroupItem>)}
  </ToggleGroup>;
}
