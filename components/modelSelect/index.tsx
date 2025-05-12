import { Select } from 'antd';
import * as React from 'react';
import styles from './index.module.css';
import { useModelStore } from './store';


const ModelSelect: React.FunctionComponent = () => {
    const modelStore = useModelStore();
    const handleChange = (value: string) => {
        modelStore.setModel(value);
    }
    
    return <Select value={modelStore?.model} onChange={handleChange} defaultValue="gpt-3.5-turbo" className={styles.select} options={[
        { value: 'gpt-3.5-turbo', label: 'gpt-3.5-turbo' },
      ]} />
};

export default ModelSelect;
