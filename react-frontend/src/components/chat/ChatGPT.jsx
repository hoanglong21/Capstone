import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

import chatBot from '../../assets/images/chatbot.png'
import { CloseIcon, SendIcon } from '../icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

// hide key
const configuration = new Configuration({
    organization: process.env.REACT_APP_ORGANIZATION,
    apiKey: process.env.REACT_APP_API_KEY,
})

// fix: Refused to set unsafe header "User-Agent" (because it auto add in configuration)
delete configuration.baseOptions.headers['User-Agent']

const openai = new OpenAIApi(configuration)

function ChatGPT({ showGPT, setShowGPT, setShowChat, setShowNew, userInfo }) {
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const { userLanguage } = useSelector((state) => state.user);
    const { userToken } = useSelector((state) => state.auth);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      if (userToken) {
        i18n.changeLanguage(userLanguage);
      }
    }, [userLanguage]);
    const tooltip = <Tooltip>Chatbot</Tooltip>

    const chat = async (e, message) => {
        e.preventDefault()

        if (!message) return
        setIsTyping(true)
        window.scrollTo(0, 1e10)

        let msgs = chats
        msgs.push({ role: 'user', content: message })
        setChats(msgs)

        setMessage('')

        await openai
            .createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a embedded GPT. You can help with learning Japanese',
                    },
                    ...chats,
                ],
            })
            .then((res) => {
                msgs.push(res.data.choices[0].message)
                setChats(msgs)
                setIsTyping(false)
                window.scrollTo(0, 1e10)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            {showGPT && (
                <div className="chat_container d-flex flex-column">
                    <div className="chat_header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <img src={chatBot} />
                                <span className="chat_receiveUsername">
                                {t('chatBot')}
                                </span>
                            </div>
                            <button
                                className="chat_btn chat_closeBtn"
                                onClick={() => {
                                    setShowGPT(false)
                                }}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                    </div>
                    <div className="flex-grow-1 chat_messages p-2">
                        {chats && chats.length
                            ? chats.map((chat, index) => {
                                  if (chat.role === 'user') {
                                      return (
                                          <div
                                              className="chat_messContainer d-flex align-items-center justify-content-end"
                                              key={index}
                                          >
                                              <div className="chat_messSender">
                                                  {chat.content}
                                              </div>
                                          </div>
                                      )
                                  } else {
                                      return (
                                          <div key={index}>
                                              <div className="chat_messContainer">
                                                  <div className="chat_messReceiver d-flex align-items-center justify-content-start">
                                                      <img src={chatBot} />
                                                      <span>
                                                          {chat.content}
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  }
                              })
                            : ''}
                    </div>
                    <div className={isTyping ? 'p-2' : 'd-none'}>
                        <span>{t('typing')}...</span>
                    </div>
                    <form className="chat_sendMess d-flex">
                        <input
                            id="message"
                            placeholder="Enter message"
                            autoComplete="off"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            className="btn ms-1 p-1"
                            type="submit"
                            onClick={(e) => chat(e, message)}
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>
            )}
            <OverlayTrigger placement="left" overlay={tooltip}>
                <button
                    className="chatElement_btn chatGPT_btn"
                    onClick={() => {
                        setShowGPT(!showGPT)
                        setShowChat(false)
                        setShowNew(false)
                    }}
                >
                    <img src={chatBot} />
                </button>
            </OverlayTrigger>
        </div>
    )
}

export default ChatGPT
