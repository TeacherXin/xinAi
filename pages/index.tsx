import axios from 'axios';
import React, { useState } from 'react';

import type { Chat } from '../components/dialogCard';
import DialogCard from '../components/dialogCard';
import DialogInput from '../components/dialogInput';
import LeftList from '../components/leftList';
import { useModelStore } from '../components/modelSelect/store';
import { useSkillStore } from '../components/skillSelect/store';
import { connectSSE } from '../utils/sse';

import styles from './index.module.css';

function HomePage() {
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>('');
  const modelStore = useModelStore();
  const skillStore = useSkillStore();

  const sendData = async () => {
    setLoading(true);
    if (skillStore.skill === 'textSkill') {
      sendDataWithText();
    }
    if (skillStore.skill === 'imageSkill') {
      sendDataWithImage();
    }
  };

  const sendDataWithImage = async () => {
    const chatItem: Chat = {
      message,
      answer: '',
      id: '',
      type: 'image',
    };
    setChatList([...chatList, chatItem]);
    const res = await axios.post('/api/v2/picture', {
      message,
    });
    if (res.data.data && res.data.code === 0) { 
      const url = res.data.data; 
      chatItem.answer = url;
    }
    setLoading(false);
  };

  const sendDataWithText = () => {
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
        <LeftList setChatList={setChatList} setSessionId={setSessionId} />
        <div className={styles.container}>
          <DialogCard
            chatList={chatList}
            loading={loading}
          />
          <DialogInput message={message} sendData={sendData} setMessage={setMessage} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
