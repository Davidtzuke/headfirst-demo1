import { Colors, Fonts } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    console.log("Login attempt:", { email, password });
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.content, { paddingTop: insets.top + 40 }]}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/icon-color.png")}
            style={{
              maxWidth: 96,
              width: 96,
              maxHeight: 96,
              height: 96,
              resizeMode: "contain",
            }}
          />

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9BA1A6"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#9BA1A6"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => {
              // TODO: Implement forgot password
              console.log("Forgot password");
            }}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.loginButton,
              (!email || !password) && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!email || !password}
          >
            <Text style={styles.loginButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              // TODO: Navigate to sign up
              console.log("Navigate to sign up");
            }}
          >
            <Text style={styles.footerLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  header: {
    marginBottom: 48,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.headingBold,
    color: Colors.tint,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.icon,
    letterSpacing: 0.3,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: Fonts.body,
    color: Colors.text,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: Fonts.bodyMedium,
    color: Colors.blue,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: "rgba(90, 216, 153, 0.3)",
    opacity: 0.5,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: Fonts.bodyBold,
    color: Colors.black,
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.body,
    color: Colors.icon,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: Fonts.bodySemiBold,
    color: Colors.blue,
  },
});
