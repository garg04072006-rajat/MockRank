import { useEffect, useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PushNotifications, PermissionStatus } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Device, DeviceInfo } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

// Device Info Hook
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const getDeviceInfo = async () => {
      if (Capacitor.isNativePlatform()) {
        const info = await Device.getInfo();
        setDeviceInfo(info);
      }
    };
    getDeviceInfo();
  }, []);

  return deviceInfo;
};

// Network Status Hook
export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<ConnectionStatus | null>(null);

  useEffect(() => {
    const getStatus = async () => {
      if (Capacitor.isNativePlatform()) {
        const status = await Network.getStatus();
        setNetworkStatus(status);
      }
    };

    const setupNetworkListener = () => {
      if (Capacitor.isNativePlatform()) {
        Network.addListener('networkStatusChange', status => {
          setNetworkStatus(status);
        });
      }
    };

    getStatus();
    setupNetworkListener();

    return () => {
      if (Capacitor.isNativePlatform()) {
        Network.removeAllListeners();
      }
    };
  }, []);

  return networkStatus;
};

// Camera Hook
export const useCamera = () => {
  const takePicture = async () => {
    try {
      if (!Capacitor.isNativePlatform()) {
        throw new Error('Camera only available on mobile devices');
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });

      return image.dataUrl;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  };

  return { takePicture };
};

// Push Notifications Hook
export const usePushNotifications = () => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

  useEffect(() => {
    const setupPushNotifications = async () => {
      if (!Capacitor.isNativePlatform()) return;

      try {
        // Request permission
        const permission = await PushNotifications.requestPermissions();
        setPermissionStatus(permission);

        if (permission.receive === 'granted') {
          // Register for push notifications
          await PushNotifications.register();

          // Add listeners
          PushNotifications.addListener('registration', (token) => {
            console.log('Push registration success, token: ' + token.value);
            // Send token to your server here
          });

          PushNotifications.addListener('registrationError', (error) => {
            console.error('Error on registration: ' + JSON.stringify(error));
          });

          PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Push received: ' + JSON.stringify(notification));
          });

          PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            console.log('Push action performed: ' + JSON.stringify(notification));
          });
        }
      } catch (error) {
        console.error('Push notification setup error:', error);
      }
    };

    setupPushNotifications();

    return () => {
      if (Capacitor.isNativePlatform()) {
        PushNotifications.removeAllListeners();
      }
    };
  }, []);

  const sendLocalNotification = async (title: string, body: string) => {
    try {
      if (!Capacitor.isNativePlatform()) {
        // Fallback to browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body });
        }
        return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: Date.now(),
            schedule: { at: new Date(Date.now() + 1000) }, // 1 second from now
          }
        ]
      });
    } catch (error) {
      console.error('Error sending local notification:', error);
    }
  };

  return { permissionStatus, sendLocalNotification };
};

// App State Hook
export const useAppState = () => {
  const [appState, setAppState] = useState<'active' | 'background'>('active');

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const setupAppStateListeners = () => {
      App.addListener('appStateChange', ({ isActive }) => {
        setAppState(isActive ? 'active' : 'background');
      });

      App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          // Handle back button when can't go back (exit app)
          App.exitApp();
        } else {
          // Let default back button behavior happen
          window.history.back();
        }
      });
    };

    setupAppStateListeners();

    return () => {
      App.removeAllListeners();
    };
  }, []);

  return appState;
};

// Platform Detection
export const usePlatform = () => {
  const [platform, setPlatform] = useState<{
    isNative: boolean;
    platform: string;
    isWeb: boolean;
  }>({
    isNative: false,
    platform: 'web',
    isWeb: true
  });

  useEffect(() => {
    const getPlatform = async () => {
      const isNative = Capacitor.isNativePlatform();
      const platformName = Capacitor.getPlatform();
      
      setPlatform({
        isNative,
        platform: platformName,
        isWeb: !isNative
      });
    };

    getPlatform();
  }, []);

  return platform;
};