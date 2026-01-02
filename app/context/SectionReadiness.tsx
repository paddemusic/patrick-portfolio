'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SectionReadinessContextType {
  isSectionReady: (sectionId: string) => boolean;
  markSectionReady: (sectionId: string) => void;
}

const SectionReadinessContext = createContext<SectionReadinessContextType | undefined>(undefined);

export function SectionReadinessProvider({ children }: { children: React.ReactNode }) {
  const [readySections, setReadySections] = useState<Set<string>>(new Set());

  const markSectionReady = useCallback((sectionId: string) => {
    setReadySections((prev) => {
      const newSet = new Set(prev);
      newSet.add(sectionId);
      return newSet;
    });
  }, []);

  const isSectionReady = useCallback(
    (sectionId: string) => {
      return readySections.has(sectionId);
    },
    [readySections]
  );

  return (
    <SectionReadinessContext.Provider value={{ isSectionReady, markSectionReady }}>
      {children}
    </SectionReadinessContext.Provider>
  );
}

export function useSectionReadiness() {
  const context = useContext(SectionReadinessContext);
  if (!context) {
    throw new Error('useSectionReadiness must be used within SectionReadinessProvider');
  }
  return context;
}
