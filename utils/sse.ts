interface CallBackMap {
    major: (data: Major) => void;
    message: (data: Message) => void;
    close: () => void;
}

interface Major {
    id: string;
    session_id: string;
}

interface Message {
    content: string;
}

interface ParseChunk {
    major?: Major;
    message?: Message;
}

interface SendData {
    model: string;
    sessionId: string;
    message: string;
}

const connectSSE = async (url: string, params: SendData, callbackMap:CallBackMap) => {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
      method: 'POST',
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      throw new Error('Error connecting to SSE');  
    }
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    // eslint-disable-next-line no-constant-condition
    while(true) {
      const { value, done } = await reader.read();
      if (done) {
        console.log('Stream closed');
        callbackMap.close();
        break;
      }
      const chunk = decoder.decode(value);
      console.log(chunk);
      const data = parseChunk(chunk);
      console.log(data);
      if (data.major) {
        callbackMap.major(data.major);
      }
      if (data.message) {
        callbackMap.message(data.message);
      }
    }
  } catch (error) {
    console.log('SSE error', error);
  }
};

export {
  connectSSE,
};

const parseChunk = (chunk: string): ParseChunk => {
  let type = '';
  const lines = chunk.split('\n');
  const eventData: ParseChunk = {};
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('event: major')) {
      type = 'major';
      continue;
    }
    if (lines[i].startsWith('event: message')) {
      type = 'message';
      continue;
    }
    if (lines[i].startsWith('data: ')) {
      if (type === 'message' && eventData[type]) {
        eventData[type].content += JSON.parse(lines[i].split(': ')[1]).content;
      } else {
        eventData[type] = JSON.parse(lines[i].split(': ')[1]);
      }
    }
  }
  return eventData;
};