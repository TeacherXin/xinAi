import { Select } from 'antd';
import type * as React from 'react';

import styles from './index.module.css';
import { useSkillStore } from './store';

const options = [
  {
    value: 'textSkill',
    label: '文本对话',
  },
  {
    value: 'imageSkill',
    label: '图片生成',
  },
];

const SkillSelect: React.FunctionComponent = () => {
  const skillStore = useSkillStore();
  const handleChange = (value: string) => {
    skillStore.setModel(value);
  };

  return (
    <Select
      value={skillStore?.skill}
      onChange={handleChange}
      defaultValue="文本对话"
      className={styles.select}
      options={options}
    />
  );
};

export default SkillSelect;
