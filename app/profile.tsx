import { Colors, Fonts } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20) + 60 }]}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="account-circle"
          size={80}
          color={Colors.icon}
          style={styles.avatar}
        />
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>User settings and preferences</Text>
        
        {/* Placeholder content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <Text style={styles.sectionText}>Profile information coming soon...</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatar: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
    fontFamily: Fonts.headingBold,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.icon,
    marginBottom: 32,
  },
  section: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    fontFamily: Fonts.bodySemiBold,
  },
  sectionText: {
    fontSize: 14,
    color: Colors.icon,
    fontFamily: Fonts.body,
  },
});

