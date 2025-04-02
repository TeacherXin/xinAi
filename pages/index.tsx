import { useState } from "react"
import styles from './index.module.css'
import { Button, Input } from 'antd';
import DialogCard, { Chat } from "../components/dialogCard";

const { TextArea } = Input;
function HomePage() {
    const [message, setMessage] = useState('');
    const [chatList, setChatList] = useState<Chat []>([])
    const getData  = async () => {
        let answerItem = '';
        let chatItem: Chat = {
            message,
            answer: '',
            id: '',
        }
        const evtSource = new EventSource(`http://localhost:3000/api/v2?message=${message}`);
        evtSource.addEventListener('major', (event) => {
            chatItem.id = event.data;
            setChatList([...chatList, chatItem])
        })
        evtSource.onmessage = function(event) {
            console.log('Received data:', event.data);
            let data;
            try {
                data = JSON.parse(event.data);
            } catch{}
            if (event.data) {
                answerItem += data.content;
                chatItem.answer = answerItem;
                setChatList([...chatList, chatItem])
            }
        };
        evtSource.onerror = function(error) {
            console.error('SSE error:', error);
            evtSource.close();
            setMessage('');
        };
    }
    return <div className={styles.root}>
        <div className={styles.main}>
            <Button className={styles.newSession} onClick={() => {
                setChatList([])
            }}>新建对话</Button>
            <DialogCard chatList={chatList} />
            <div className={styles.bottom}>
                <TextArea style={{width: 800, height: 150}} value={message} onChange={(e) => {
                    setMessage(e.target.value)
                }}/>
                <Button className={styles.btn} onClick={getData}>发送</Button>
            </div>
        </div>
    </div>
}

export default HomePage