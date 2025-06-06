import { create } from 'zustand';

type SkillType = 'textSkill' | 'imageSkill'

interface SkillStore {
  skill: SkillType
  setModel: (skill: string) => void
}

export const useSkillStore = create<SkillStore>((set) => ({
  skill: 'textSkill',
  setModel: (skill: SkillType) => set({ skill }),
}));