import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  items: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Dropdown: React.FC<Props> = ({ items, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);

  const selectedLabel = items.find((i) => i.value === value)?.label;

  return (
    <View style={styles.wrapper}>
      {/* Tappable input */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpen((prev) => !prev)}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.inputText, !selectedLabel && { color: Colors.tint }]}
        >
          {selectedLabel || placeholder || "Select…"}
        </Text>

        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={20}
          color={Colors.tint}
        />
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            style={styles.dropdownScroll}
          >
            {items.map((item) => (
              <Pressable
                key={item.value}
                style={styles.item}
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                <Text style={styles.itemLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "relative",
    zIndex: 10,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#1b1b1b",
    borderColor: "#333",
    borderWidth: 1,

    borderRadius: 12,
    height: 45,
    paddingHorizontal: 14,
  },

  inputText: {
    fontSize: 16,
    color: "#e6e6e6",
  },

  dropdown: {
    marginTop: 6,
    backgroundColor: "#1b1b1b",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    maxHeight: 220,
    overflow: "hidden",
  },
  dropdownScroll: {
    maxHeight: 220,
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
  },

  itemLabel: {
    fontSize: 16,
    color: "#e6e6e6",
  },
});

export default Dropdown;
