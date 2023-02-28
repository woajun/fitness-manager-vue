import React from 'react';
import { WebView } from 'react-native-webview';

function MyWebView() {
  return (
    <WebView
      source={{ uri: 'https://symphonious-eclair-024f7d.netlify.app/' }}
    />
  );
}
export default MyWebView;
