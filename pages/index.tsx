import { Button, Input } from 'antd';
import React, { useState } from 'react';

import type { Chat } from '../components/dialogCard';
import DialogCard from '../components/dialogCard';
import ModelSelect from '../components/modelSelect';

import styles from './index.module.css';

const { TextArea } = Input;
function HomePage() {
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const sendData = async () => {
    setLoading(true);
    let answerItem = '';
    const chatItem: Chat = {
      message,
      answer: '',
      id: '',
    };
    setChatList([...chatList, chatItem]);
    const evtSource = new EventSource(`http://localhost:3000/api/v2?message=${message}`);
    evtSource.addEventListener('major', (event) => {
      chatItem.id = event.data;
    });
    evtSource.onmessage = function (event) {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        /* empty */
      }
      if (event.data) {
        answerItem += data.content;
        chatItem.answer = answerItem;
        setChatList([...chatList, chatItem]);
      }
    };
    evtSource.onerror = function (error) {
      console.error('SSE error:', error);
      setLoading(false);
      evtSource.close();
      setMessage('');
    };
  };
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <div className={styles.leftList}>
          <Button
            className={styles.newSession}
            onClick={() => {
              setChatList([]);
            }}
          >
            新建对话
          </Button>
          <ModelSelect />
        </div>
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
  );
}

export default HomePage;
