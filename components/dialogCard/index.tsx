import * as React from 'react';
import styles from './index.module.css';
import { Avatar } from 'antd'
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/styles/atelier-cave-light';

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

    const getCode = (params) => {
        const { node, inline, className, children, ...props } = params;
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
        <SyntaxHighlighter
            className={styles.codeBlock}
            style={oneDark}
            language={match[1]}
            PreTag="div"
            {...props}
        >
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        ) : (
        <code className={className} {...props}>
            {children}
        </code>
        );
    }

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
                        <div className={styles.answer}>
                            <ReactMarkdown
                                components={{code: getCode}}
                            >
                                {chat.answer}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>;
            })
        }
    </div>;
};

export default DialogCard;
