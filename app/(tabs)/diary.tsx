import { MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ========== DATA TYPES ==========

type DiaryEntry = {
  id: string;
  diaryName: string;
  dateCreated: Date;
  painLevel: number;
  duration: {
    value: number;
    unit: "hours" | "days";
  };
  remedy: {
    tried: "yes" | "no" | null;
    description: string;
  };
  notes: string;
};

// ========== SAMPLE DATA ==========

const SAMPLE_ENTRIES: DiaryEntry[] = [
  {
    id: "1",
    diaryName: "Stressful Work Day",
    dateCreated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    painLevel: 8,
    duration: { value: 6, unit: "hours" },
    remedy: {
      tried: "yes",
      description:
        "Took ibuprofen and rested in a dark room. Pain subsided after 4 hours.",
    },
    notes:
      "Intense migraine triggered by project deadline stress. Visual aura started around 2pm.",
  },
  {
    id: "2",
    diaryName: "Weekend Migraine",
    dateCreated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    painLevel: 6,
    duration: { value: 1, unit: "days" },
    remedy: {
      tried: "yes",
      description:
        "Applied cold compress and took prescribed medication. Helped reduce intensity.",
    },
    notes:
      "Woke up with moderate pain on the right side. Likely due to irregular sleep schedule.",
  },
  {
    id: "3",
    diaryName: "Caffeine Withdrawal",
    dateCreated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    painLevel: 4,
    duration: { value: 3, unit: "hours" },
    remedy: {
      tried: "no",
      description: "Decided to ride it out without medication this time.",
    },
    notes:
      "Mild migraine after skipping morning coffee. Interesting to note the caffeine dependency.",
  },
];

// ========== HELPER FUNCTIONS ==========

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

// ========== COMPONENTS ==========

// Expandable Diary Creation Card
function DiaryCreationCard({
  isExpanded,
  onToggle,
  onSave,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  onSave: (entry: Omit<DiaryEntry, "id" | "dateCreated">) => void;
}) {
  const [diaryName, setDiaryName] = useState("");
  const [painLevel, setPainLevel] = useState(5);
  const [durationUnit, setDurationUnit] = useState<"hours" | "days" | null>(
    null
  );
  const [durationValue, setDurationValue] = useState("");
  const [remedyTried, setRemedyTried] = useState<"yes" | "no" | null>(null);
  const [remedyDescription, setRemedyDescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    if (
      !diaryName.trim() ||
      !durationUnit ||
      !durationValue ||
      remedyTried === null
    ) {
      return;
    }

    onSave({
      diaryName,
      painLevel,
      duration: {
        value: parseInt(durationValue),
        unit: durationUnit,
      },
      remedy: {
        tried: remedyTried,
        description: remedyDescription,
      },
      notes,
    });

    // Reset form
    setDiaryName("");
    setPainLevel(5);
    setDurationUnit(null);
    setDurationValue("");
    setRemedyTried(null);
    setRemedyDescription("");
    setNotes("");
    onToggle();
  };

  const canSave =
    diaryName.trim() && durationUnit && durationValue && remedyTried !== null;

  return (
    <View style={styles.expandableCard}>
      {/* Header - always visible */}
      <TouchableOpacity
        style={styles.expandableHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={isExpanded ? "minus" : "plus"}
          size={22}
          color="#ECEDEE"
        />
        <Text style={styles.expandableHeaderText}>Create Diary</Text>
        <MaterialCommunityIcons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={22}
          color="rgba(236, 237, 238, 0.55)"
        />
      </TouchableOpacity>

      {/* Expanded Form */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          {/* Diary Name */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Diary Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Morning Migraine"
              placeholderTextColor="rgba(236, 237, 238, 0.35)"
              value={diaryName}
              onChangeText={setDiaryName}
            />
          </View>

          {/* Date of Creation */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Date of Creation</Text>
            <Text style={styles.dateText}>{formatDate(new Date())}</Text>
          </View>

          {/* Migraine Pain Level */}
          <View style={styles.formField}>
            <View style={styles.sliderHeader}>
              <Text style={styles.fieldLabel}>Migraine Pain (0–10)</Text>
              <Text style={styles.painLevelValue}>{painLevel}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={painLevel}
              onValueChange={setPainLevel}
              minimumTrackTintColor="#5ad899"
              maximumTrackTintColor="rgba(236, 237, 238, 0.15)"
              thumbTintColor="#FFF8DC"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>0</Text>
              <Text style={styles.sliderLabelText}>10</Text>
            </View>
          </View>

          {/* Migraine Duration */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Migraine Duration</Text>
            <View style={styles.pillGroup}>
              <TouchableOpacity
                style={[
                  styles.pillButton,
                  durationUnit === "hours" && styles.pillButtonActive,
                ]}
                onPress={() => setDurationUnit("hours")}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    durationUnit === "hours" && styles.pillButtonTextActive,
                  ]}
                >
                  Hours
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.pillButton,
                  durationUnit === "days" && styles.pillButtonActive,
                ]}
                onPress={() => setDurationUnit("days")}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    durationUnit === "days" && styles.pillButtonTextActive,
                  ]}
                >
                  Days
                </Text>
              </TouchableOpacity>
            </View>
            {durationUnit && (
              <TextInput
                style={[styles.textInput, { marginTop: 12 }]}
                placeholder={`Enter number of ${durationUnit}`}
                placeholderTextColor="rgba(236, 237, 238, 0.35)"
                value={durationValue}
                onChangeText={setDurationValue}
                keyboardType="numeric"
              />
            )}
          </View>

          {/* Remedy Section */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>
              What did you do to get rid of it, and did it work?
            </Text>
            <View style={styles.pillGroup}>
              <TouchableOpacity
                style={[
                  styles.pillButton,
                  remedyTried === "yes" && styles.pillButtonActive,
                ]}
                onPress={() => setRemedyTried("yes")}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    remedyTried === "yes" && styles.pillButtonTextActive,
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.pillButton,
                  remedyTried === "no" && styles.pillButtonActive,
                ]}
                onPress={() => setRemedyTried("no")}
              >
                <Text
                  style={[
                    styles.pillButtonText,
                    remedyTried === "no" && styles.pillButtonTextActive,
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {remedyTried && (
              <TextInput
                style={[styles.textAreaInput, { marginTop: 12 }]}
                placeholder="Describe what you tried and whether it helped…"
                placeholderTextColor="rgba(236, 237, 238, 0.35)"
                value={remedyDescription}
                onChangeText={setRemedyDescription}
                multiline
                textAlignVertical="top"
              />
            )}
          </View>

          {/* Notes */}
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Notes</Text>
            <TextInput
              style={styles.textAreaInput}
              placeholder="Write your diary entry..."
              placeholderTextColor="rgba(236, 237, 238, 0.35)"
              value={notes}
              onChangeText={setNotes}
              multiline
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, !canSave && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={!canSave}
          >
            <Text
              style={[
                styles.saveButtonText,
                !canSave && styles.saveButtonTextDisabled,
              ]}
            >
              Save Diary Entry
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Diary Entry Card
function DiaryEntryCard({ entry }: { entry: DiaryEntry }) {
  const getPainLevelColor = (level: number) => {
    if (level <= 3) return "#5ad899";
    if (level <= 6) return "#f7d36c";
    return "#ef4f49";
  };

  return (
    <TouchableOpacity style={styles.diaryCard} activeOpacity={0.7}>
      <View style={styles.diaryCardHeader}>
        <Text style={styles.diaryCardTitle}>{entry.diaryName}</Text>

        <View
          style={[
            styles.painLevelChip,
            { backgroundColor: `${getPainLevelColor(entry.painLevel)}20` },
          ]}
        >
          <Text
            style={[
              styles.painLevelChipText,
              { color: getPainLevelColor(entry.painLevel) },
            ]}
          >
            {entry.painLevel}/10
          </Text>
        </View>
      </View>

      <Text style={styles.diaryCardDate}>{formatDate(entry.dateCreated)}</Text>

      <View style={styles.diaryCardMeta}>
        <View style={styles.metaItem}>
          <MaterialCommunityIcons
            name="clock-outline"
            size={14}
            color="rgba(236, 237, 238, 0.55)"
          />
          <Text style={styles.metaText}>
            {entry.duration.value} {entry.duration.unit}
          </Text>
        </View>
        <View
          style={[
            styles.remedyIndicator,
            {
              backgroundColor:
                entry.remedy.tried === "yes"
                  ? "rgba(90, 216, 153, 0.15)"
                  : "rgba(247, 211, 108, 0.15)",
            },
          ]}
        >
          <Text
            style={[
              styles.remedyIndicatorText,
              {
                color: entry.remedy.tried === "yes" ? "#5ad899" : "#f7d36c",
              },
            ]}
          >
            {entry.remedy.tried === "yes" ? "Remedy Worked" : "No Relief"}
          </Text>
        </View>
      </View>

      {entry.notes && (
        <Text style={styles.diaryCardPreview} numberOfLines={2}>
          {entry.notes}
        </Text>
      )}
    </TouchableOpacity>
  );
}

// ========== MAIN COMPONENT ==========

export default function DiaryScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>(SAMPLE_ENTRIES);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext({
      duration: 280,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setIsExpanded(!isExpanded);
  };

  const handleSaveDiary = (entry: Omit<DiaryEntry, "id" | "dateCreated">) => {
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      dateCreated: new Date(),
      ...entry,
    };
    setEntries([newEntry, ...entries]);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        {/* Header - Reserved space for logo */}
        <View style={styles.header}>
          {/* Empty space reserved for future logo */}
        </View>

        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Expandable Create Diary Card */}
          <DiaryCreationCard
            isExpanded={isExpanded}
            onToggle={toggleExpanded}
            onSave={handleSaveDiary}
          />

          {/* Saved Diaries List */}
          <View style={styles.diariesList}>
            <Text style={styles.diariesListTitle}>Your Diary Entries</Text>
            {entries.map((entry) => (
              <DiaryEntryCard key={entry.id} entry={entry} />
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ========== STYLES ==========

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020003",
  },
  header: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  expandableCard: {
    backgroundColor: "rgba(236, 237, 238, 0.05)",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(236, 237, 238, 0.08)",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  expandableHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },
  expandableHeaderText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#ECEDEE",
    marginLeft: 12,
  },
  expandedContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
  },
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ECEDEE",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "rgba(236, 237, 238, 0.06)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(236, 237, 238, 0.08)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#ECEDEE",
  },
  textAreaInput: {
    backgroundColor: "rgba(236, 237, 238, 0.03)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(236, 237, 238, 0.08)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#ECEDEE",
    minHeight: 100,
  },
  dateText: {
    fontSize: 14,
    color: "rgba(236, 237, 238, 0.55)",
    fontWeight: "500",
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  painLevelValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5ad899",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -8,
  },
  sliderLabelText: {
    fontSize: 12,
    color: "rgba(236, 237, 238, 0.45)",
  },
  pillGroup: {
    flexDirection: "row",
    gap: 10,
  },
  pillButton: {
    flex: 1,
    backgroundColor: "rgba(236, 237, 238, 0.05)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(236, 237, 238, 0.08)",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pillButtonActive: {
    backgroundColor: "#FFF8DC",
    borderColor: "#FFF8DC",
  },
  pillButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "rgba(236, 237, 238, 0.65)",
  },
  pillButtonTextActive: {
    color: "#020003",
  },
  saveButton: {
    backgroundColor: "#FFF8DC",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: "rgba(236, 237, 238, 0.1)",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#020003",
  },
  saveButtonTextDisabled: {
    color: "rgba(236, 237, 238, 0.35)",
  },
  diariesList: {
    marginBottom: 20,
  },
  diariesListTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ECEDEE",
    marginBottom: 16,
  },
  diaryCard: {
    backgroundColor: "rgba(236, 237, 238, 0.03)",
    borderRadius: 17,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(236, 237, 238, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  diaryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  diaryCardTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#ECEDEE",
    marginRight: 12,
  },
  painLevelChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  painLevelChipText: {
    fontSize: 13,
    fontWeight: "700",
  },
  diaryCardDate: {
    fontSize: 13,
    color: "rgba(236, 237, 238, 0.55)",
    marginBottom: 12,
  },
  diaryCardMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  metaText: {
    fontSize: 13,
    color: "rgba(236, 237, 238, 0.55)",
    fontWeight: "500",
  },
  remedyIndicator: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  remedyIndicatorText: {
    fontSize: 12,
    fontWeight: "600",
  },
  diaryCardPreview: {
    fontSize: 14,
    color: "rgba(236, 237, 238, 0.65)",
    lineHeight: 20,
  },
});
