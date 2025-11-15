# PfiAura App Color Palette

## Color System

This document defines the official color palette for the PfiAura migraine tracking application.

### Primary Colors

| Color | Hex Code | RGB | Usage |
|-------|----------|-----|-------|
| **Green** | `#5ad899` | `rgb(90, 216, 153)` | Primary actions, success states, positive values |
| **Yellow** | `#f7d36c` | `rgb(247, 211, 108)` | Warnings, highlights, tints, tab indicators |
| **Blue** | `#7592e6` | `rgb(117, 146, 230)` | Information, secondary actions, links |
| **Red** | `#ef4f49` | `rgb(239, 79, 73)` | Errors, alerts, danger states, negative values |
| **Black** | `#020003` | `rgb(2, 0, 3)` | Background, dark surfaces, primary text |

### Semantic Color Mapping

```typescript
// Core App Colors
background: "#020003"     // Deep black background
tint: "#5ad899"          // Primary green for main UI elements

// Semantic Colors
primary: "#5ad899"       // Green - primary actions
secondary: "#7592e6"     // Blue - secondary actions
accent: "#f7d36c"        // Yellow - highlights and accents
error: "#ef4f49"         // Red - error states
success: "#5ad899"       // Green - success states
warning: "#f7d36c"       // Yellow - warning states
info: "#7592e6"          // Blue - informational states
```

### Implementation Notes

- All colors are defined in `/constants/theme.ts`
- Background uses the new black `#020003` instead of pure black
- Tab indicator glow uses yellow `#f7d36c`
- Positive/negative indicators use green/red respectively
- Forum elements use the green primary color for actions

### Color Usage Examples

- **Triggers (Positive)**: `#5ad899` (Green)
- **Triggers (Negative)**: `#ef4f49` (Red)
- **Suggestions (Increase)**: `#5ad899` (Green)
- **Suggestions (Decrease)**: `#f7d36c` (Yellow)
- **New badges**: `#5ad899` (Green)
- **Post buttons**: `#5ad899` (Green)
- **Tab bar glow**: `#f7d36c` (Yellow)

### Accessibility

All colors have been chosen to maintain proper contrast ratios against the dark background for accessibility compliance.