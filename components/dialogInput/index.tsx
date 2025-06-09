import { Button, Input } from 'antd';
import type * as React from 'react';

import styles from './index.module.css';

interface IDialogInputProps {
    message: string;
    setMessage: (value: string) => void;
    sendData: () => void;
}

const DialogInput: React.FunctionComponent<IDialogInputProps> = (props) => {
  const { message, setMessage, sendData } = props;
  return( 
    <div className={styles.bottom}>
      <Input
        className={styles.textArea}
        style={{ width: 825, height: 150 }}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      
      />
      <Button className={styles.btn} onClick={sendData}>
        发送
      </Button>
    </div>);
};

export default DialogInput;
