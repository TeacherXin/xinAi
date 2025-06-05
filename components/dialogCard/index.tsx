import { Avatar } from 'antd';
import type * as React from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import oneDark from 'react-syntax-highlighter/dist/styles/atelier-cave-light';

import styles from './index.module.css';

export interface Chat {
  message: string
  answer: string
  id: string
}

interface IDialogCardProps {
  chatList: Chat[]
  loading: boolean
}

const DialogCard: React.FunctionComponent<IDialogCardProps> = (props) => {
  const { chatList, loading } = props;

  const getCode = (params) => {
    const { inline, className, children, ...props } = params;
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
  };

  return (
    <div className={styles.dialogCard}>
      <div className={styles.chatList}>
        {chatList.map((chat, index) => (
          <div className={styles.chatItem} key={index}>
            <div className={styles.messageContent}>
              <div className={styles.message}>{chat.message}</div>
              <Avatar className={styles.avatar} src="/chat_user.png" />
            </div>
            <div className={styles.answerContent}>
              <Avatar className={styles.avatar} src="/chat_main.png" />
              <div className={styles.answer}>
                <ReactMarkdown components={{ code: getCode }}>{chat.answer}</ReactMarkdown>
                {loading && index === chatList.length - 1 && <div className={styles.typewritter} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DialogCard;
