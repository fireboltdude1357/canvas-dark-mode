# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Canvas Dark Mode is a Chrome Extension (Manifest V3) that applies a dark theme to Canvas LMS (*.instructure.com). Dark mode is enabled by default and can be toggled via a popup.

## Architecture

**Dark Mode Strategy**: CSS applies dark styles immediately at `document_start` to prevent flash of white content. The content script only handles toggling OFF (adds `canvas-light-mode` class to `<html>` to disable).

**Files**:
- `styles.css` - All dark mode styles using `html:not(.canvas-light-mode)` selector prefix. CSS variables defined in `:root` for consistent theming.
- `content.js` - Reads preference from `chrome.storage.sync`, adds/removes `canvas-light-mode` class, listens for toggle messages from popup.
- `popup.js` - Toggle UI that saves preference and sends messages to active Canvas tabs.
- `manifest.json` - Extension config targeting `*://*.instructure.com/*`.

## Development

**Load extension locally**:
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select this folder

**After CSS changes**: Refresh extension at `chrome://extensions/`, then hard refresh Canvas pages (Cmd+Shift+R).

**Regenerate icons**: Open `icons/generate-icons.html` in browser and save the canvas images.

## CSS Patterns

Canvas uses InstUI (React component library) with dynamically generated class names. Target elements using:
- Semantic IDs/classes: `#content`, `.ic-DashboardCard`
- Attribute selectors for dynamic classes: `[class*="tray"]`, `[class*="Planner"]`
- Portal containers: `#nav-tray-portal` for slide-out navigation

User preference stored in `chrome.storage.sync` as `darkModeEnabled` (boolean, defaults to true).
