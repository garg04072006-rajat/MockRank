import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mockrank.app',
  appName: 'MockRank',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1E1B4B",
      showSpinner: true,
      spinnerColor: "#8B5CF6"
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#1E1B4B"
    },
    Keyboard: {
      resize: "body",
      style: "DARK",
      resizeOnFullScreen: true
    }
  }
};

export default config;
