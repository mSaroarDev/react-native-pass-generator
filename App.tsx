import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from "react-native";
import Main from "./components/Main";

const App = () => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#080e30" />
          <SafeAreaView style={styles.safeareaContainer}>
            <ScrollView>
              <Main />
            </ScrollView>
          </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
  safeareaContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#080e30",
  }
});

export default App;