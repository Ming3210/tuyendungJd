import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addNotification } from '../store/slices/notificationSlice';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  CloseCircleFilled,
  BellFilled
} from '@ant-design/icons';

const NOTIFICATION_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3';

const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);
  const clientRef = useRef<Client | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(NOTIFICATION_SOUND_URL);
  }, []);

  useEffect(() => {
    if (!currentUser?.id) {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
      return;
    }

    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      console.log('✅ WebSocket Connected! Subscribing to /topic/notifications/' + currentUser.id);

      // Subscribe to a direct topic — no Principal auth needed
      client.subscribe(`/topic/notifications/${currentUser.id}`, (message) => {
        if (message.body) {
          const newNotif = JSON.parse(message.body);
          console.log('🔔 Notification received:', newNotif);

          // Update Redux Store immediately for Badge count
          dispatch(addNotification(newNotif));

          // Play notification sound
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play blocked:', e));
          }

          // Choose icon based on type
          let icon = <BellFilled style={{ color: '#bc2228' }} />;
          if (newNotif.type === 'INTERVIEW') icon = <ClockCircleFilled style={{ color: '#bc2228' }} />;
          if (newNotif.type === 'ACCEPTED') icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
          if (newNotif.type === 'REJECTED') icon = <CloseCircleFilled style={{ color: '#f5222d' }} />;

          // Show Premium Toast with "Bạn có thông báo mới!" banner
          notification.open({
            message: (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#bc2228', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  🔔 Bạn có thông báo mới!
                </span>
                <span style={{ fontWeight: 800, fontSize: '16px' }}>
                  {newNotif.title || 'Thông báo hệ thống'}
                </span>
              </div>
            ),
            description: <span style={{ fontSize: '14px', color: '#595959' }}>{newNotif.message}</span>,
            icon: icon,
            placement: 'topRight',
            duration: 8,
            style: {
              borderRadius: '20px',
              padding: '20px',
              boxShadow: '0 15px 35px rgba(188, 34, 40, 0.15)',
              background: '#ffffff',
              border: '1px solid #f0f0f0',
              cursor: 'pointer'
            },
            onClick: () => {
              if (newNotif.type === 'INTERVIEW') {
                navigate('/profile/interviews');
              }
              notification.destroy();
            }
          });
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('❌ STOMP Error:', frame.headers['message']);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
        clientRef.current = null;
      }
    };
  }, [currentUser?.id, dispatch, navigate]);

  return clientRef.current;
};

export default useWebSocket;
