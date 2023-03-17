import React from 'react';
import { ScrollView } from 'react-native';
import Apple from './pages/timer/Apple';
import Timer from './pages/timer/Timer';

export default function App() {
  return (
    <ScrollView>
      <Apple />
      <Timer />
    </ScrollView>
  );
}
