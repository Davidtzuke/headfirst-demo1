import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// ========== DATA TYPES ==========

type Message = {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
};

// ========== SAMPLE DATA ==========

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hello! I'm Aura, your migraine assistant. I can help you understand your triggers, suggest remedies, and answer questions about your migraine patterns. How can I help you today?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

const HORIZONTAL_PADDING = 20;
const MIN_INPUT_HEIGHT = 64;
const EXTRA_SCROLL_PADDING = 16;
const KEYBOARD_GAP = 8;

// ========== HELPER FUNCTIONS ==========

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// ========== MAIN COMPONENT ==========

export default function ChatbotScreen() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const chatBottomPadding = inputHeight + EXTRA_SCROLL_PADDING;
  // Tab bar height (~76px) + container padding (~20px) + safe area
  const tabBarHeight = 76 + Math.max(insets.bottom, 20);
  const composerPaddingBottom = isKeyboardVisible ? KEYBOARD_GAP : tabBarHeight;

  // Auto-scroll when keyboard shows
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, () => {
      setIsKeyboardVisible(true);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText("");

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to help! Based on your question, I recommend checking your diary entries and analysis page for personalized insights about your migraine patterns.",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantResponse]);

      // Auto-scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);

    // Auto-scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageRow,
        item.sender === "user" && styles.messageRowUser,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          item.sender === "user"
            ? styles.messageBubbleUser
            : styles.messageBubbleAssistant,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === "user" && styles.messageTextUser,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.sender === "user" && styles.messageTimeUser,
          ]}
        >
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.rootFull} edges={["left", "right"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? insets.top + 110 : 0}
      >
        {/* Page Header */}
        <View style={styles.pageHeader}>
          <View style={{ width: 28 }} />
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerEyebrow}>AI ASSISTANT</Text>
            <Text style={styles.headerTitle}>Aura</Text>
          </View>
          <View style={{ width: 28 }} />
        </View>

        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[
            styles.chatListContent,
            { paddingBottom: chatBottomPadding },
          ]}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        />

        {/* Input */}
        <View
          style={[
            styles.inputSection,
            {
              paddingBottom: composerPaddingBottom,
            },
          ]}
        >
          <View
            style={styles.inputPill}
            onLayout={(event) => {
              const nextHeight = event.nativeEvent.layout.height;
              setInputHeight((prev) =>
                Math.abs(prev - nextHeight) < 1 ? prev : nextHeight
              );
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Ask Aura anything…"
              placeholderTextColor="rgba(255, 255, 255, 0.45)"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              returnKeyType="default"
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() === "" && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={inputText.trim() === ""}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="send"
                size={18}
                color={
                  inputText.trim() === "" ? "rgba(255,255,255,0.3)" : "#020003"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ========== STYLES ==========

const styles = StyleSheet.create({
  rootFull: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
    backgroundColor: Colors.background,
  },
  headerTitleWrap: {
    alignItems: "center",
    gap: 4,
  },
  headerEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "rgba(255, 255, 255, 0.55)",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.tint,
  },
  chatListContent: {
    paddingTop: 20,
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  messageRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  messageBubble: {
    maxWidth: "82%",
    paddingHorizontal: 18,
    paddingVertical: 14,
    paddingBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  messageBubbleAssistant: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.06)",
    alignSelf: "flex-start",
  },
  messageBubbleUser: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    alignSelf: "flex-end",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.92)",
    marginBottom: 6,
  },
  messageTextUser: {
    color: "#0A0A24",
  },
  messageTime: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.45)",
  },
  messageTimeUser: {
    color: "rgba(10, 10, 36, 0.5)",
  },
  inputSection: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 16,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.04)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 16,
  },
  inputPill: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: 15,
    maxHeight: 96,
    textAlignVertical: "top",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});
