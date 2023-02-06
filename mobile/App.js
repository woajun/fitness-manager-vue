import { StyleSheet, View } from 'react-native';
import MyWebView from './components/MyWebView';

export default function App() {
  return (
    <View style={styles.container}>
      <MyWebView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});