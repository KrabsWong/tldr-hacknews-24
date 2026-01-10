# Proposal: fix-post-theme-initialization

## Problem Statement
Post pages fail to correctly apply the system color scheme when users switch their OS/browser theme before navigating to the post page. The theme displays as light mode regardless of the actual system preference. The theme only updates correctly when the system theme is changed while already viewing the post page.

## Background Context
The theme switching feature has evolved:
- **Early version**: Supported manual user switching between three modes (light/dark/auto) with a toggle button and localStorage persistence
- **Current version**: Only supports auto mode - automatically follows system theme preference without user interaction

The codebase contains remnants from the early version that are no longer needed and cause the reported bug.

## Root Cause Analysis
The issue occurs due to legacy code that conflicts with the current auto-only approach:

**Current state of `_layouts/post.html`:**
1. Lines 62-78: Inline script that correctly applies system theme
2. Line 102: Loads `theme-toggle.js` (legacy file from manual switching era)

**The problem:**
- `theme-toggle.js` contains complete manual switching logic including localStorage management
- It reads from localStorage key `'theme-preference'` which may contain stale values from earlier versions ('light', 'dark', or 'auto')
- If a user previously set a manual preference (e.g., 'light'), that cached value persists in localStorage
- When post page loads, both the inline script and theme-toggle.js run
- `theme-toggle.js` reads the cached 'light' preference and overrides the system theme detection
- Result: page displays in light mode even when system preference is dark

**Why homepage works correctly:**
- `_layouts/default.html` only has inline script (lines 84-98)
- Does NOT load `theme-toggle.js`
- No localStorage interference - purely follows system preference

## Proposed Solution
Remove all legacy manual switching infrastructure since only auto mode (system theme following) is needed:

1. **Remove `theme-toggle.js`**: Delete the entire file as it's no longer needed
2. **Remove script tag from post.html**: Delete line 102 that loads theme-toggle.js
3. **Keep inline scripts**: Retain the simple inline theme detection scripts in both layouts as they correctly implement auto-only behavior

### Why this is the correct solution:
- Both layouts will use identical, simple inline scripts that only follow system preference
- No localStorage persistence needed (auto mode doesn't require remembering user choice)
- No manual toggle UI elements exist in the codebase
- Eliminates the source of the bug (localStorage cache interference)
- Simplifies the codebase by removing ~118 lines of unused code

## Scope

### Files to modify:
- **DELETE**: `assets/js/theme-toggle.js` (entire file, 118 lines of legacy code)
- **MODIFY**: `_layouts/post.html` (remove line 102: script tag loading theme-toggle.js)
- **MODIFY**: `openspec/specs/post-page-theme-switching/spec.md` (update to reflect auto-only implementation)

### Files NOT affected:
- `_layouts/default.html` - already correct, no changes needed
- `assets/css/theme.css` - CSS variables and media queries remain unchanged
- Inline theme detection scripts in both layouts - keep as-is (lines 84-98 in default.html, lines 62-78 in post.html)
- Other JavaScript files (`post.js`, `toggle.js`, `pagination.js`, `scale.fix.js`)

### Additional cleanup completed:
- Removed `_plugins/remove_number_prefix.rb` - no longer needed as source data doesn't have number prefixes
- Updated `_layouts/default.html:55` to remove `| remove_number_prefix` filter usage

## Success Criteria
1. Post pages correctly display dark mode when system preference is dark (before and after navigation)
2. Post pages correctly display light mode when system preference is light (before and after navigation)
3. Both homepage and post pages dynamically update when system theme changes while page is open
4. No localStorage cache interference from previous manual preferences
5. No JavaScript errors or console warnings
6. Theme behavior is identical between default.html and post.html
7. No manual theme toggle functionality remains in the codebase

## Dependencies
None - this is a cleanup task removing unused code.

## Risks and Mitigation
**Risk**: Users who have manual preferences cached in localStorage might expect them to persist.

**Mitigation**: This is desired behavior - we want to stop honoring manual preferences since that feature has been intentionally removed. All users should follow system theme only. Clearing the cache is a one-time side effect.

**Risk**: Potential reliance on theme-toggle.js for some edge case functionality.

**Mitigation**: Analysis confirms theme-toggle.js is completely unused:
- No theme toggle button exists in the UI (searched for `class="theme-toggle"` - not found)
- Inline scripts provide all necessary auto-theme functionality
- No other code references theme-toggle.js or its ThemeManager object
- Only post.html loads it, and only for legacy reasons
