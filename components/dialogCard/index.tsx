import * as React from 'react';
import styles from './index.module.css';
import { Avatar } from 'antd'

export interface Chat {
    message: string;
    answer: string;
    id: string;
}

interface IDialogCardProps {
    chatList: Chat[];
}

const DialogCard: React.FunctionComponent<IDialogCardProps> = (props) => {
    const { chatList } = props;

    return <div className={styles.dialogCard}>
        {
            chatList.map((chat, index) => {
                return <div className={styles.chatItem} key={index}>
                    <div className={styles.messageContent}>
                        <div className={styles.message}>{chat.message}</div>
                        <Avatar className={styles.avatar} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>
                    </div>
                    <div className={styles.answerContent}>
                        <Avatar className={styles.avatar}>爹gpt</Avatar>
                        <div className={styles.answer}>{chat.answer}</div>
                    </div>
                </div>;
            })
        }
    </div>;
};

export default DialogCard;
