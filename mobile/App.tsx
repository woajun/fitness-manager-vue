import { StyleSheet, Text, View } from "react-native";
import MyWebView from "./components/MyWebView";
import Timer from "./pages/timer/Timer";

export default function App() {
  return (
    <View>
      <Text>
        Hello, TI am your cat!
        aasdasdasdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
      </Text>
      {/* <MyWebView /> */}
      <Timer></Timer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
