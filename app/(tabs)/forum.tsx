import { Colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

type Thread = {
  id: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  likes: number;
  replies: number;
  preview: string;
  isNew?: boolean;
};

type Comment = {
  id: string;
  threadId: string;
  authorName: string;
  authorAvatar: string;
  message: string;
  createdAt: Date;
  likes: number;
};

// ========== SAMPLE DATA ==========

const TAGS = [
  "All",
  "Migraine Triggers",
  "Daily Experiences",
  "Medication Stories",
  "Sleep & Lifestyle",
  "Success Stories",
  "Questions & Advice",
];

const SAMPLE_THREADS: Thread[] = [
  {
    id: "1",
    authorName: "Sarah M.",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    title: "Finally found my biggest trigger - caffeine!",
    content:
      "After tracking for 3 months, I discovered that caffeine after 2pm is my biggest migraine trigger. Cut it out completely and my migraine frequency dropped by 60%. Anyone else notice this?",
    tags: ["Success Stories", "Migraine Triggers"],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 24,
    replies: 8,
    preview:
      "After tracking for 3 months, I discovered that caffeine after 2pm is my biggest migraine trigger...",
    isNew: true,
  },
  {
    id: "2",
    authorName: "Michael R.",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    title: "Sleep schedule tips that actually worked for me",
    content:
      "I struggled with irregular sleep for years. Started going to bed at 10pm every night, even weekends. Migraines reduced from 12/month to 4/month. Consistency is everything!",
    tags: ["Sleep & Lifestyle", "Success Stories"],
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 42,
    replies: 15,
    preview:
      "I struggled with irregular sleep for years. Started going to bed at 10pm every night...",
  },
  {
    id: "3",
    authorName: "Emily K.",
    authorAvatar: "https://i.pravatar.cc/150?img=5",
    title: "New medication - Aimovig, anyone tried it?",
    content:
      "My neurologist recommended Aimovig for chronic migraines. Has anyone here tried it? What were your experiences with side effects and effectiveness?",
    tags: ["Medication Stories", "Questions & Advice"],
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    likes: 18,
    replies: 23,
    preview:
      "My neurologist recommended Aimovig for chronic migraines. Has anyone here tried it?",
  },
  {
    id: "4",
    authorName: "David L.",
    authorAvatar: "https://i.pravatar.cc/150?img=8",
    title: "Weather changes are killing me",
    content:
      "Every time there's a pressure drop, I get a severe migraine. Living in a place with stable weather helped a bit, but wondering if anyone has found other solutions?",
    tags: ["Migraine Triggers", "Questions & Advice"],
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    likes: 31,
    replies: 19,
    preview:
      "Every time there's a pressure drop, I get a severe migraine. Living in a place...",
  },
  {
    id: "5",
    authorName: "Jessica T.",
    authorAvatar: "https://i.pravatar.cc/150?img=9",
    title: "How do you explain migraines to family?",
    content:
      "My family still thinks migraines are 'just headaches'. It's frustrating when they don't understand why I can't attend events sometimes. How do you communicate this?",
    tags: ["Daily Experiences"],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    likes: 56,
    replies: 34,
    preview:
      "My family still thinks migraines are 'just headaches'. It's frustrating when they don't...",
  },
  {
    id: "6",
    authorName: "Alex P.",
    authorAvatar: "https://i.pravatar.cc/150?img=13",
    title: "Screen time tracking really helps!",
    content:
      "Started limiting screen time to 6 hours/day max and taking 20-minute breaks every 2 hours. Huge difference in migraine frequency. The data doesn't lie!",
    tags: ["Success Stories", "Migraine Triggers"],
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000),
    likes: 29,
    replies: 11,
    preview:
      "Started limiting screen time to 6 hours/day max and taking 20-minute breaks...",
  },
];

const SAMPLE_COMMENTS: Comment[] = [
  {
    id: "c1",
    threadId: "1",
    authorName: "Mike J.",
    authorAvatar: "https://i.pravatar.cc/150?img=11",
    message:
      "Same here! I switched to decaf in the afternoon and it made a HUGE difference. Glad you found your trigger!",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    likes: 5,
  },
  {
    id: "c2",
    threadId: "1",
    authorName: "Anna W.",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    message:
      "Interesting! For me it's the opposite - I need my morning coffee or I get a migraine. Bodies are so different.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 3,
  },
  {
    id: "c3",
    threadId: "1",
    authorName: "Chris B.",
    authorAvatar: "https://i.pravatar.cc/150?img=7",
    message:
      "Did you cut it out gradually or cold turkey? I'm thinking of trying this but worried about withdrawal headaches.",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    likes: 2,
  },
];

// ========== COMPONENTS ==========

// Tag Filter Component
function TagFilter({
  tags,
  selectedTag,
  onSelectTag,
}: {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tagFilterContainer}
      contentContainerStyle={styles.tagFilterContent}
    >
      {tags.map((tag) => {
        const isSelected = selectedTag === tag;
        return (
          <TouchableOpacity
            key={tag}
            style={[styles.tagChip, isSelected && styles.tagChipSelected]}
            onPress={() => onSelectTag(tag)}
          >
            <Text
              style={[
                styles.tagChipText,
                isSelected && styles.tagChipTextSelected,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// Thread Card Component
function ThreadCard({
  thread,
  onPress,
}: {
  thread: Thread;
  onPress: () => void;
}) {
  const timeAgo = getTimeAgo(thread.createdAt);

  return (
    <TouchableOpacity style={styles.threadCard} onPress={onPress}>
      <View style={styles.threadHeader}>
        <Image
          source={{ uri: thread.authorAvatar }}
          style={styles.threadAvatar}
        />
        <View style={styles.threadAuthorInfo}>
          <Text style={styles.threadAuthorName}>{thread.authorName}</Text>
          <Text style={styles.threadTime}>{timeAgo}</Text>
        </View>
        {thread.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </View>

      <Text style={styles.threadTitle}>{thread.title}</Text>
      <Text style={styles.threadPreview} numberOfLines={2}>
        {thread.preview}
      </Text>

      <View style={styles.threadTags}>
        {thread.tags.map((tag, index) => (
          <View key={index} style={styles.threadTag}>
            <Text style={styles.threadTagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.threadFooter}>
        <View style={styles.threadStat}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={17}
            color="rgba(255, 255, 255, 0.55)"
          />
          <Text style={styles.threadStatText}>{thread.likes}</Text>
        </View>
        <View style={styles.threadStat}>
          <MaterialCommunityIcons
            name="comment-outline"
            size={17}
            color="rgba(255, 255, 255, 0.55)"
          />
          <Text style={styles.threadStatText}>{thread.replies}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Comment Item Component
function CommentItem({ comment }: { comment: Comment }) {
  const timeAgo = getTimeAgo(comment.createdAt);

  return (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: comment.authorAvatar }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentAuthor}>{comment.authorName}</Text>
          <Text style={styles.commentTime}>{timeAgo}</Text>
        </View>
        <Text style={styles.commentMessage}>{comment.message}</Text>
        <TouchableOpacity style={styles.commentLike}>
          <MaterialCommunityIcons
            name="heart-outline"
            size={14}
            color="rgba(255, 255, 255, 0.55)"
          />
          <Text style={styles.commentLikeText}>{comment.likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ========== HELPER FUNCTIONS ==========

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// ========== MAIN COMPONENT ==========

export default function ForumScreen() {
  const insets = useSafeAreaInsets();

  // State
  const [view, setView] = useState<"feed" | "thread" | "create">("feed");
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<Thread[]>(SAMPLE_THREADS);
  const [comments, setComments] = useState<Comment[]>(SAMPLE_COMMENTS);
  const [newComment, setNewComment] = useState("");

  // Create thread form
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [newThreadTags, setNewThreadTags] = useState<string[]>([]);

  // Filtered threads
  const filteredThreads = threads.filter((thread) => {
    const matchesTag =
      selectedTag === "All" || thread.tags.includes(selectedTag);
    const matchesSearch =
      searchQuery === "" ||
      thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  // Handlers
  const handleThreadPress = (thread: Thread) => {
    setSelectedThread(thread);
    setView("thread");
  };

  const handleBackToFeed = () => {
    setView("feed");
    setSelectedThread(null);
    setNewComment("");
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedThread) return;

    const comment: Comment = {
      id: `c${Date.now()}`,
      threadId: selectedThread.id,
      authorName: "You",
      authorAvatar: "https://i.pravatar.cc/150?img=20",
      message: newComment,
      createdAt: new Date(),
      likes: 0,
    };

    setComments([...comments, comment]);

    // Update thread reply count
    setThreads(
      threads.map((t) =>
        t.id === selectedThread.id ? { ...t, replies: t.replies + 1 } : t
      )
    );

    setNewComment("");
  };

  const handleCreateThread = () => {
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    const thread: Thread = {
      id: `t${Date.now()}`,
      authorName: "You",
      authorAvatar: "https://i.pravatar.cc/150?img=20",
      title: newThreadTitle,
      content: newThreadContent,
      tags: newThreadTags,
      createdAt: new Date(),
      likes: 0,
      replies: 0,
      preview: newThreadContent.substring(0, 120) + "...",
      isNew: true,
    };

    setThreads([thread, ...threads]);
    setNewThreadTitle("");
    setNewThreadContent("");
    setNewThreadTags([]);
    setView("feed");
  };

  const toggleThreadTag = (tag: string) => {
    if (tag === "All") return;
    if (newThreadTags.includes(tag)) {
      setNewThreadTags(newThreadTags.filter((t) => t !== tag));
    } else {
      setNewThreadTags([...newThreadTags, tag]);
    }
  };

  // Thread comments
  const threadComments = selectedThread
    ? comments.filter((c) => c.threadId === selectedThread.id)
    : [];

  // ========== RENDER VIEWS ==========

  // Forum Feed View
  if (view === "feed") {
    return (
      <View style={styles.rootFull}>
        <View style={[styles.header]}>
          <View style={{ width: 28 }} />
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerEyebrow}>Community</Text>
            <Text style={styles.headerTitle}>Forum</Text>
          </View>
          <View style={styles.headerRightSpacer} />
        </View>

        {/* Top search + filter controls */}
        <View style={styles.searchFiltersBlock}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={17}
              color="rgba(255, 255, 255, 0.5)"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search discussions..."
              placeholderTextColor="rgba(255, 255, 255, 0.35)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tag Filters */}
          <TagFilter
            tags={TAGS}
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />
        </View>

        {/* Thread List */}
        <ScrollView
          style={styles.threadList}
          contentContainerStyle={[
            styles.threadListContent,
            {
              paddingBottom: 76 + Math.max(insets.bottom, 20) + 20, // Tab bar height + extra padding
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredThreads.map((thread) => (
            <ThreadCard
              key={thread.id}
              thread={thread}
              onPress={() => handleThreadPress(thread)}
            />
          ))}
        </ScrollView>

        {/* Floating Create Button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setView("create")}
        >
          <MaterialCommunityIcons name="plus" size={22} color="#0A0A24" />
        </TouchableOpacity>
      </View>
    );
  }

  // Thread Detail View
  if (view === "thread" && selectedThread) {
    return (
      <View style={styles.rootFull}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={handleBackToFeed}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={21}
                color="rgba(255, 255, 255, 0.92)"
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Thread</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView
            style={styles.threadDetailScroll}
            contentContainerStyle={styles.threadDetailContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Thread Content */}
            <View style={styles.threadDetailCard}>
              <View style={styles.threadHeader}>
                <Image
                  source={{ uri: selectedThread.authorAvatar }}
                  style={styles.threadAvatar}
                />
                <View style={styles.threadAuthorInfo}>
                  <Text style={styles.threadAuthorName}>
                    {selectedThread.authorName}
                  </Text>
                  <Text style={styles.threadTime}>
                    {getTimeAgo(selectedThread.createdAt)}
                  </Text>
                </View>
              </View>

              <Text style={styles.threadDetailTitle}>
                {selectedThread.title}
              </Text>
              <Text style={styles.threadDetailBody}>
                {selectedThread.content}
              </Text>

              <View style={styles.threadTags}>
                {selectedThread.tags.map((tag, index) => (
                  <View key={index} style={styles.threadTag}>
                    <Text style={styles.threadTagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.threadDetailFooter}>
                <TouchableOpacity style={styles.threadDetailStat}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={18}
                    color="rgba(255, 255, 255, 0.92)"
                  />
                  <Text style={styles.threadDetailStatText}>
                    {selectedThread.likes} likes
                  </Text>
                </TouchableOpacity>
                <View style={styles.threadDetailStat}>
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={18}
                    color="rgba(255, 255, 255, 0.55)"
                  />
                  <Text style={styles.threadDetailStatText}>
                    {selectedThread.replies} replies
                  </Text>
                </View>
              </View>
            </View>

            {/* Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsSectionTitle}>
                Replies ({threadComments.length})
              </Text>
              {threadComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Reply Input */}
          <View style={styles.replyContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder="Write a reply..."
              placeholderTextColor="rgba(255, 255, 255, 0.35)"
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity
              style={[
                styles.replySendButton,
                !newComment.trim() && styles.replySendButtonDisabled,
              ]}
              onPress={handleAddComment}
              disabled={!newComment.trim()}
            >
              <MaterialCommunityIcons
                name="send"
                size={18}
                color={
                  newComment.trim() ? "#0A0A24" : "rgba(255, 255, 255, 0.35)"
                }
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // Create Thread View
  if (view === "create") {
    return (
      <SafeAreaView style={styles.root}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Header */}
          <View style={[styles.createHeader, { paddingTop: insets.top + 12 }]}>
            <TouchableOpacity onPress={handleBackToFeed}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.createHeaderTitle}>New Thread</Text>

            <TouchableOpacity
              onPress={handleCreateThread}
              disabled={!newThreadTitle.trim() || !newThreadContent.trim()}
            >
              <Text
                style={[
                  styles.postButton,
                  (!newThreadTitle.trim() || !newThreadContent.trim()) &&
                    styles.postButtonDisabled,
                ]}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.createScroll}
            contentContainerStyle={styles.createContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Title Input */}
            <View style={styles.createCard}>
              <Text style={styles.createLabel}>Title</Text>
              <TextInput
                style={styles.createTitleInput}
                placeholder="What's on your mind?"
                placeholderTextColor="rgba(255, 255, 255, 0.35)"
                value={newThreadTitle}
                onChangeText={setNewThreadTitle}
              />
            </View>

            {/* Content Input */}
            <View style={styles.createCard}>
              <Text style={styles.createLabel}>Content</Text>
              <TextInput
                style={styles.createContentInput}
                placeholder="Share your experience, ask a question, or start a discussion..."
                placeholderTextColor="rgba(255, 255, 255, 0.35)"
                value={newThreadContent}
                onChangeText={setNewThreadContent}
                multiline
                textAlignVertical="top"
              />
            </View>

            {/* Tag Selection */}
            <View style={styles.createCard}>
              <Text style={styles.createLabel}>Select Tags</Text>
              <View style={styles.createTagsContainer}>
                {TAGS.filter((t) => t !== "All").map((tag) => {
                  const isSelected = newThreadTags.includes(tag);
                  return (
                    <TouchableOpacity
                      key={tag}
                      style={[
                        styles.createTagChip,
                        isSelected && styles.createTagChipSelected,
                      ]}
                      onPress={() => toggleThreadTag(tag)}
                    >
                      <Text
                        style={[
                          styles.createTagChipText,
                          isSelected && styles.createTagChipTextSelected,
                        ]}
                      >
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return null;
}

// ========== STYLES ==========

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020003",
  },
  rootFull: {
    flex: 1,
    backgroundColor: "#020003",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  menuButton: {
    padding: 8,
  },
  headerTitleWrap: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  headerEyebrow: {
    fontSize: 12,
    letterSpacing: 1,
    color: "rgba(255, 255, 255, 0.55)",
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.tint,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 28,
  },
  searchFiltersBlock: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    height: 46,
  },
  searchIcon: {
    marginRight: 10,
    opacity: 0.5,
  },
  searchInput: {
    flex: 1,
    height: 46,
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: 15,
    fontWeight: "400",
  },
  tagFilterContainer: {
    paddingVertical: 4,
    marginTop: 10,
    width: "100%",
  },
  tagFilterContent: {
    flexGrow: 0,
    alignItems: "center",
    paddingHorizontal: 2,
  },
  tagChip: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    marginRight: 10,
    marginVertical: 0,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  tagChipSelected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  tagChipText: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.65)",
    lineHeight: 20,
  },
  tagChipTextSelected: {
    color: "#0A0A24",
    fontWeight: "500",
  },
  threadList: {
    flex: 1,
  },
  threadListContent: {
    paddingHorizontal: 20,
  },
  threadCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 17,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  threadHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  threadAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  threadAuthorInfo: {
    flex: 1,
  },
  threadAuthorName: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.92)",
    marginBottom: 2,
  },
  threadTime: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.45)",
  },
  newBadge: {
    backgroundColor: "rgba(90, 216, 153, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 11,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#5ad899",
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.92)",
    marginBottom: 8,
    lineHeight: 26,
  },
  threadPreview: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.65)",
    lineHeight: 20,
    marginBottom: 12,
  },
  threadTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  threadTag: {
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9,
  },
  threadTagText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.75)",
    fontWeight: "500",
  },
  threadFooter: {
    flexDirection: "row",
    gap: 16,
  },
  threadStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  threadStatText: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.55)",
    fontWeight: "500",
  },
  createButton: {
    position: "absolute",
    bottom: 26,
    right: 22,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 8,
  },
  threadDetailScroll: {
    flex: 1,
  },
  threadDetailContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  threadDetailCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 17,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  threadDetailTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.92)",
    marginBottom: 12,
    lineHeight: 28,
  },
  threadDetailBody: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.75)",
    lineHeight: 22,
    marginBottom: 16,
  },
  threadDetailFooter: {
    flexDirection: "row",
    gap: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
  },
  threadDetailStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  threadDetailStatText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.55)",
    fontWeight: "500",
  },
  commentsSection: {
    marginBottom: 20,
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.92)",
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 13,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  commentAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.92)",
    marginRight: 8,
  },
  commentTime: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.45)",
  },
  commentMessage: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
    lineHeight: 20,
    marginBottom: 8,
  },
  commentLike: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  commentLikeText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.55)",
    fontWeight: "500",
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 18,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)",
    gap: 12,
  },
  replyInput: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.92)",
    fontSize: 14,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  replySendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  replySendButtonDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  createScroll: {
    flex: 1,
  },
  createContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  createCard: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  createLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.92)",
    marginBottom: 12,
  },
  createTitleInput: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.92)",
    fontWeight: "600",
  },
  createContentInput: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.92)",
    minHeight: 120,
    lineHeight: 22,
  },
  createTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  createTagChip: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  createTagChipSelected: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
  },
  createTagChipText: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255, 255, 255, 0.55)",
  },
  createTagChipTextSelected: {
    color: "#0A0A24",
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.92)",
  },
  postButtonTextDisabled: {
    color: "rgba(255, 255, 255, 0.35)",
  },
  createHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  cancelButton: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
  },
  postButton: {
    fontSize: 16,
    color: "#5ad899",
    fontWeight: "600",
  },
  postButtonDisabled: {
    color: "rgba(255, 255, 255, 0.35)",
  },
  createHeaderTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.92)",
    fontWeight: "600",
  },
});
