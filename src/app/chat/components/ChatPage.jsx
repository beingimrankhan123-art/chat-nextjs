// components/ChatPage.js
'use client';
import { useState } from 'react';
import styles from './ChatPage.module.css';

export default function ChatPage() {
    const [contacts] = useState([
        {
            id: 1,
            name: 'Sarah Johnson',
            avatar: '👩',
            lastMessage: 'Hey! How are you doing?',
            time: '2:30 PM',
            unread: 3,
            online: true
        },
        {
            id: 2,
            name: 'Mike Chen',
            avatar: '👨',
            lastMessage: 'Thanks for the help!',
            time: '1:15 PM',
            unread: 0,
            online: true
        },
        {
            id: 3,
            name: 'Emma Wilson',
            avatar: '👩‍🦰',
            lastMessage: 'See you tomorrow!',
            time: '11:45 AM',
            unread: 1,
            online: false
        },
        {
            id: 4,
            name: 'James Brown',
            avatar: '👨‍💼',
            lastMessage: 'Meeting at 3 PM',
            time: '10:20 AM',
            unread: 0,
            online: false
        },
        {
            id: 5,
            name: 'Lisa Anderson',
            avatar: '👩‍💻',
            lastMessage: 'Check out this link',
            time: 'Yesterday',
            unread: 0,
            online: true
        }
    ]);

    const [activeChat, setActiveChat] = useState(contacts[0]);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Hey! How are you doing?',
            sender: 'other',
            time: '2:25 PM'
        },
        {
            id: 2,
            text: "I'm doing great! Just working on some projects. How about you?",
            sender: 'me',
            time: '2:26 PM'
        },
        {
            id: 3,
            text: 'Same here! Working on the new design system.',
            sender: 'other',
            time: '2:28 PM'
        },
        {
            id: 4,
            text: 'That sounds exciting! Would love to see it when you\'re done.',
            sender: 'me',
            time: '2:29 PM'
        },
        {
            id: 5,
            text: 'Sure! I\'ll share it with you tomorrow.',
            sender: 'other',
            time: '2:30 PM'
        }
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });

            setMessages([...messages, {
                id: messages.length + 1,
                text: newMessage,
                sender: 'me',
                time: time
            }]);
            setNewMessage('');
        }
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.chatContainer}>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    {/* Sidebar - Contacts List */}
                    <div className={`col-lg-4 col-md-5 ${styles.sidebar}`}>
                        <div className={styles.sidebarHeader}>
                            <div className={styles.userProfile}>
                                <div className={styles.userAvatar}>👤</div>
                                <div className={styles.userInfo}>
                                    <h5 className={styles.userName}>John Doe</h5>
                                    <span className={styles.userStatus}>Online</span>
                                </div>
                            </div>
                            <button className={styles.iconButton} title="Settings">
                                ⚙️
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search contacts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className={styles.searchIcon}>🔍</span>
                        </div>

                        {/* Contacts List */}
                        <div className={styles.contactsList}>
                            {filteredContacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    className={`${styles.contactItem} ${activeChat.id === contact.id ? styles.activeContact : ''}`}
                                    onClick={() => setActiveChat(contact)}
                                >
                                    <div className={styles.contactAvatar}>
                                        <span className={styles.avatarEmoji}>{contact.avatar}</span>
                                        {contact.online && <span className={styles.onlineIndicator}></span>}
                                    </div>
                                    <div className={styles.contactInfo}>
                                        <div className={styles.contactHeader}>
                                            <h6 className={styles.contactName}>{contact.name}</h6>
                                            <span className={styles.messageTime}>{contact.time}</span>
                                        </div>
                                        <div className={styles.contactFooter}>
                                            <p className={styles.lastMessage}>{contact.lastMessage}</p>
                                            {contact.unread > 0 && (
                                                <span className={styles.unreadBadge}>{contact.unread}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className={`col-lg-8 col-md-7 ${styles.chatArea}`}>
                        {/* Chat Header */}
                        <div className={styles.chatHeader}>
                            <div className={styles.chatHeaderInfo}>
                                <div className={styles.chatAvatar}>
                                    <span className={styles.avatarEmoji}>{activeChat.avatar}</span>
                                    {activeChat.online && <span className={styles.onlineIndicator}></span>}
                                </div>
                                <div>
                                    <h5 className={styles.chatUserName}>{activeChat.name}</h5>
                                    <span className={styles.chatUserStatus}>
                                        {activeChat.online ? 'Active now' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.chatHeaderActions}>
                                <button className={styles.iconButton} title="Voice call">📞</button>
                                <button className={styles.iconButton} title="Video call">📹</button>
                                <button className={styles.iconButton} title="More options">⋮</button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className={styles.messagesArea}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`${styles.messageWrapper} ${message.sender === 'me' ? styles.myMessage : styles.otherMessage}`}
                                >
                                    {message.sender === 'other' && (
                                        <div className={styles.messageAvatar}>
                                            {activeChat.avatar}
                                        </div>
                                    )}
                                    <div className={styles.messageBubble}>
                                        <p className={styles.messageText}>{message.text}</p>
                                        <span className={styles.messageTime}>{message.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <form onSubmit={handleSendMessage} className={styles.messageInputArea}>
                            <button type="button" className={styles.attachButton} title="Attach file">
                                📎
                            </button>
                            <input
                                type="text"
                                className={styles.messageInput}
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button type="button" className={styles.emojiButton} title="Emoji">
                                😊
                            </button>
                            <button type="submit" className={styles.sendButton} title="Send">
                                ➤
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}