import { useState } from "react"
import styles from './index.module.css'
import ReactMarkdown from 'react-markdown'

function HomePage() {
    const [message, setMessage] = useState('');
    const [answer, setAnswer] = useState('');
    const getData  = async () => {
        const evtSource = new EventSource(`http://localhost:3000/api/v2?message=${message}`);
        evtSource.onmessage = function(event) {
            console.log('Received data:', event.data);
            if (event.data) {
                setAnswer((pre) => pre + event.data);
            }
        };
        evtSource.onerror = function(error) {
            console.error('SSE error:', error);
            evtSource.close();
        };
    }
    return <div className={styles.main}>
        <div className={styles.content}>
            <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
        <div className={styles.bottom}>
            <input style={{width: 800, height: 150}} value={message} onChange={(e) => {
                setMessage(e.target.value)
            }}/>
            <button className={styles.btn} onClick={getData}>发送</button>
        </div>
    </div>
}

export default HomePage