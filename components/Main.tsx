import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import CustomSwitch from "./CustomSwitch";
import GradientButton from "./Button";
import * as Yup from "yup";
import { Formik } from "formik";

const Main = () => {

  const [generatedPassword, setGeneratedPassword] = useState("");

  // const [inputLength, setInputLength] = useState(6);
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [isUppercaseEnabled, setIsUppercaseEnabled] = useState(true);
  const [isLowercaseEnabled, setIsLowercaseEnabled] = useState(true);
  const [isNumbersEnabled, setIsNumbersEnabled] = useState(true);
  const [isSymbolsEnabled, setIsSymbolsEnabled] = useState(true);

  const validationSchema = Yup.object().shape({
    inputLength: Yup.number()
      .min(4, "Minimum length is 4")
      .max(16, "Maximum length is 16")
      .required("Input length is required"),
  });

  const generatePasswordString = (passwordLength: number) => {
    let selectedCharacters = '';

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    if (isUppercaseEnabled) {
      selectedCharacters += uppercase;
    }
    if (isLowercaseEnabled) {
      selectedCharacters += lowercase;
    }
    if (isNumbersEnabled) {
      selectedCharacters += numbers;
    }
    if (isSymbolsEnabled) {
      selectedCharacters += symbols;
    }

    const result = createPassword(selectedCharacters, passwordLength);
    setGeneratedPassword(result);
    setIsPassGenerated(true);
    console.log(`Generated Password: ${result}`);
    
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }

    return result;
  }

  const reset = () => {
    setGeneratedPassword("");
    setIsPassGenerated(false);
    setIsUppercaseEnabled(true);
    setIsLowercaseEnabled(true);
    setIsNumbersEnabled(true);
    setIsSymbolsEnabled(true);
  }

  return (
    <Formik
      initialValues={{ inputLength: 6 }}
      onSubmit={values => generatePasswordString(values.inputLength)}
      validationSchema={validationSchema}
    >
      {({ 
        values, 
        handleChange,  
        handleSubmit, 
        handleReset
      }) => (
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.text}>Password Generator</Text>
          </View>

          {isPassGenerated && (
            <View style={styles.passwordBox}>
              <Text style={styles.generatedPassword}>{generatedPassword}</Text>
            </View>
          )}


          <View style={styles.flexBox}>
            <Text style={styles.inputLabel}>Input Length</Text>
            <TextInput style={styles.inputField}
              value={String(values.inputLength)}
              onChangeText={handleChange('inputLength')}
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor="#aaa"
              textAlign="center"
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

          <GradientButton onPress={handleSubmit} title="Generate Password" />
          <TouchableOpacity 
            onPress={()=> {
            reset();
            handleReset();
          }}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        </View>
      )}
    </Formik>
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
  generatedPassword: {
    fontSize: 25,
    color: "#fff",
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
  resetButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,  
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 14,
    fontFamily: 'Quicksand-Bold', 
    letterSpacing: 1,
  }
});

export default Main;