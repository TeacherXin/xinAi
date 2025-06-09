import { Button } from 'antd';
import type React from 'react';

import ModelSelect from '../modelSelect';
import SkillSelect from '../skillSelect';

import styles from './index.module.css';

interface ILeftListProps {
    setChatList: (chatList: any) => void;
    setSessionId: (sessionId: string) => void;
}

const LeftList: React.FunctionComponent<ILeftListProps> = (props) => {
  const { setChatList, setSessionId } = props;
  return (    
    <div className={styles.leftList}>
      <Button
        className={styles.newSession}
        onClick={() => {
          setChatList([]);
          setSessionId('');
        }}
      >
        新建对话
      </Button>
      <SkillSelect />
      <ModelSelect />
    </div>);
};

export default LeftList;
