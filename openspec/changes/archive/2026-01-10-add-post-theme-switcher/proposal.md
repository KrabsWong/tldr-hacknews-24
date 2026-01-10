# Change: Add Automatic Theme Switching to Post Layout

## Why

Post pages lack automatic dark/light theme switching based on system preferences, creating an inconsistent user experience. The homepage automatically follows system theme preferences, but post pages require manual theme selection or default to light mode, forcing users to manually adjust themes when their system preference doesn't match.

## What Changes

- Add inline JavaScript to `_layouts/post.html` that detects system color scheme preference using `prefers-color-scheme` media query
- Implement automatic theme updates when system preference changes
- Ensure behavior is identical to homepage theme detection
- Maintain compatibility with existing `theme-toggle.js` for manual theme control

## Impact

- **User Experience**: Post pages will automatically match user system theme preferences
- **Consistency**: Theme behavior will be identical across homepage and post pages
- **Compatibility**: Manual theme toggle functionality remains unchanged

## Risks and Mitigations

**Risk:** Potential conflict between inline auto-detection and `theme-toggle.js`  
**Mitigation:** The inline script only removes `data-theme` attribute (auto mode), while `theme-toggle.js` sets explicit `data-theme` values, so they work complementarily.

**Risk:** Code duplication between two layout files  
**Mitigation:** Accepted trade-off to maintain current architecture pattern. Future refactoring could extract to shared module if needed.

## Alternatives Considered

1. **Create a shared external JavaScript file for theme detection**
   - Pros: Eliminates code duplication, single source of truth
   - Cons: Changes current architecture pattern, requires additional file
   - Decision: Not chosen to maintain consistency with existing approach

2. **Use only `theme-toggle.js` for all theme logic**
   - Pros: Single system for theme management
   - Cons: Requires modifying existing working code, more complex change
   - Decision: Not chosen to minimize scope and maintain current working solution
