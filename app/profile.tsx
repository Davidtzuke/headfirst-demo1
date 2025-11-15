import { Colors, Fonts } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Mock user data
const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  joinDate: "January 2024",
  memberSince: "1 year",
};

// Mock statistics
const MOCK_STATS = {
  totalEntries: 47,
  daysTracked: 89,
  averagePainLevel: 5.2,
  longestStreak: 12,
  triggersIdentified: 8,
};

// Mock preferences
const MOCK_PREFERENCES = {
  notifications: true,
  darkMode: true,
  reminderTime: "9:00 AM",
  units: "metric",
};

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <MaterialCommunityIcons
            name="account-circle"
            size={80}
            color={Colors.icon}
            style={styles.avatar}
          />
          <Text style={styles.name}>{MOCK_USER.name}</Text>
          <Text style={styles.email}>{MOCK_USER.email}</Text>
          <Text style={styles.memberSince}>
            Member since {MOCK_USER.joinDate}
          </Text>

          {/* Statistics Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{MOCK_STATS.totalEntries}</Text>
                <Text style={styles.statLabel}>Entries</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{MOCK_STATS.daysTracked}</Text>
                <Text style={styles.statLabel}>Days Tracked</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {MOCK_STATS.averagePainLevel}
                </Text>
                <Text style={styles.statLabel}>Avg Pain Level</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{MOCK_STATS.longestStreak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </View>

          {/* Account Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color={Colors.icon}
              />
              <Text style={styles.infoText}>{MOCK_USER.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="calendar-outline"
                size={20}
                color={Colors.icon}
              />
              <Text style={styles.infoText}>Joined {MOCK_USER.joinDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="chart-line"
                size={20}
                color={Colors.icon}
              />
              <Text style={styles.infoText}>
                {MOCK_STATS.triggersIdentified} triggers identified
              </Text>
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Notifications</Text>
              <View style={styles.preferenceValue}>
                <MaterialCommunityIcons
                  name={
                    MOCK_PREFERENCES.notifications
                      ? "check-circle"
                      : "close-circle"
                  }
                  size={20}
                  color={
                    MOCK_PREFERENCES.notifications ? Colors.green : Colors.icon
                  }
                />
                <Text
                  style={[
                    styles.preferenceText,
                    {
                      color: MOCK_PREFERENCES.notifications
                        ? Colors.green
                        : Colors.icon,
                    },
                  ]}
                >
                  {MOCK_PREFERENCES.notifications ? "Enabled" : "Disabled"}
                </Text>
              </View>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Daily Reminder</Text>
              <Text style={styles.preferenceText}>
                {MOCK_PREFERENCES.reminderTime}
              </Text>
            </View>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Units</Text>
              <Text style={styles.preferenceText}>
                {MOCK_PREFERENCES.units === "metric" ? "Metric" : "Imperial"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
    fontFamily: Fonts.headingBold,
  },
  email: {
    fontSize: 16,
    color: Colors.icon,
    marginBottom: 4,
    fontFamily: Fonts.body,
  },
  memberSince: {
    fontSize: 14,
    color: Colors.icon,
    marginBottom: 32,
    fontFamily: Fonts.body,
  },
  section: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 16,
    fontFamily: Fonts.bodySemiBold,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statItem: {
    width: "47%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 4,
    fontFamily: Fonts.headingBold,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.icon,
    textAlign: "center",
    fontFamily: Fonts.body,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: Fonts.body,
    flex: 1,
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  preferenceLabel: {
    fontSize: 15,
    color: Colors.text,
    fontFamily: Fonts.body,
  },
  preferenceValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  preferenceText: {
    fontSize: 14,
    color: Colors.icon,
    fontFamily: Fonts.body,
  },
});
