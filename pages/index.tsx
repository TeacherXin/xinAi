import { Button, Input } from 'antd';
import React, { useState } from 'react';

import type { Chat } from '../components/dialogCard';
import DialogCard from '../components/dialogCard';
import ModelSelect from '../components/modelSelect';
import { useModelStore } from '../components/modelSelect/store';
import { connectSSE } from '../utils/sse';

import styles from './index.module.css';

const { TextArea } = Input;
function HomePage() {
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  const modelStore = useModelStore();

  const sendData = async () => {
    setLoading(true);
    let answerItem = '';
    const chatItem: Chat = {
      message,
      answer: '',
      id: '',
    };
    setChatList([...chatList, chatItem]);
    const handleMajor = (data) => {
      const { id, session_id } = data;
      chatItem.id = id;
      setSessionId(session_id);
    };
    const handleMessage = (data) => {
      if (data) {
        answerItem += data.content;
        chatItem.answer = answerItem;
        setChatList([...chatList, chatItem]);
      }
    };
    const handleClose = () => {
      setLoading(false);
      setMessage('');
    };
    connectSSE('http://localhost:3000/api/v2', {
      message,
      model: modelStore.model,
      sessionId,
    }, {
      major: handleMajor,
      message: handleMessage,
      close: handleClose,
    });
  };
  return (
    <div className={styles.root}>
      <div className={styles.main}>
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
          <ModelSelect />
        </div>
        <div className={styles.container}>
          <DialogCard chatList={chatList}
            loading={loading} />
          <div className={styles.bottom}>
            <TextArea
              className={styles.textArea}
              style={{ width: 800, height: 150 }}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button className={styles.btn} onClick={sendData}>
            发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
