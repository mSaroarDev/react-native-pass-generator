import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";
import CustomSwitch from "./CustomSwitch";
import GradientButton from "./Button";

const Main = () => {

  const [inputLength, setInputLength] = useState(4);
  const [isUppercaseEnabled, setIsUppercaseEnabled] = useState(false);
  const [isLowercaseEnabled, setIsLowercaseEnabled] = useState(false);
  const [isNumbersEnabled, setIsNumbersEnabled] = useState(false);
  const [isSymbolsEnabled, setIsSymbolsEnabled] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Password Generator</Text>
      </View>
      <View style={styles.passwordBox} />

      <View style={styles.flexBox}>
        <Text style={styles.inputLabel}>Input Length</Text>
        <TextInput style={styles.inputField}
          value={inputLength.toString()}
          onChangeText={(text) => setInputLength(Number(text))}
          keyboardType="numeric"
          maxLength={2}
          placeholderTextColor="#aaa"
          textAlign="center"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.flexBox}>
        <Text style={styles.inputLabel}>Include Uppercase</Text>
        <CustomSwitch
          value={isUppercaseEnabled}
          onToggle={setIsUppercaseEnabled}
          style={styles.switch}
        />
      </View>

      <View style={styles.flexBox}>
        <Text style={styles.inputLabel}>Include Lowercase</Text>
        <CustomSwitch
          value={isLowercaseEnabled}
          onToggle={setIsLowercaseEnabled}
          style={styles.switch}
        />
      </View>

      <View style={styles.flexBox}>
        <Text style={styles.inputLabel}>Include Numbers</Text>
        <CustomSwitch
          value={isNumbersEnabled}
          onToggle={setIsNumbersEnabled}
          style={styles.switch}
        />
      </View>

      <View style={styles.flexBox}>
        <Text style={styles.inputLabel}>Include Symbols</Text>
        <CustomSwitch
          value={isSymbolsEnabled}
          onToggle={setIsSymbolsEnabled}
          style={styles.switch}
        />
      </View>

      <GradientButton title="Generate Password" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    marginTop: Platform.OS === "android" ? 20 : 0,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
    color: "#fff",
  },
  passwordBox: {
    height: 80,
    backgroundColor: "#1b2140",
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flexBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1b2140",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  inputLabel: {
    fontFamily: "Quicksand-Regular",
    fontSize: 16,
    color: "#fff",
  },
  inputField: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    color: "#fff",
    width: 100,
    textAlign: "center",
  },
  switch: {
    transform: Platform.OS === 'android' ? [{ scaleX: 1.2 }, { scaleY: 1.2 }] : [],
  },
});

export default Main;