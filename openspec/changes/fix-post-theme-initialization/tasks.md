# Tasks: fix-post-theme-initialization

## Implementation Tasks

### 1. Remove legacy theme-toggle.js file
- [ ] 1.1 Delete `assets/js/theme-toggle.js`
- [ ] 1.2 Verify no other files reference or import theme-toggle.js

**Validation**: 
- Run `grep -r "theme-toggle.js" .` to confirm no references remain (except in this proposal)
- Check browser console for 404 errors after changes

### 2. Remove theme-toggle.js from post layout
- [ ] 2.1 Edit `_layouts/post.html` to remove line 102: `<script src="{{ "/assets/js/theme-toggle.js" | relative_url }}"></script>`
- [ ] 2.2 Verify inline theme script (lines 62-78) remains intact

**Validation**: 
- Inspect post.html to confirm theme-toggle.js script tag is removed
- Confirm inline script still present and unchanged

### 3. Update post-page-theme-switching specification
- [ ] 3.1 Edit `openspec/specs/post-page-theme-switching/spec.md`
- [ ] 3.2 Remove all requirements related to manual theme toggle (Requirement: Compatibility with Manual Theme Toggle)
- [ ] 3.3 Remove all scenarios mentioning localStorage, manual preferences, or theme-toggle.js
- [ ] 3.4 Update Purpose section to clarify auto-only implementation
- [ ] 3.5 Ensure all remaining requirements focus on system theme detection only

**Validation**: 
- Review updated spec.md to confirm no manual toggle references remain
- Verify all scenarios are relevant to auto-only behavior

### 4. Test theme behavior
- [ ] 4.1 Build and serve the site locally
- [ ] 4.2 Test homepage with light system theme
- [ ] 4.3 Test homepage with dark system theme
- [ ] 4.4 Test post page with light system theme (navigate from homepage)
- [ ] 4.5 Test post page with dark system theme (navigate from homepage)
- [ ] 4.6 Test dynamic theme switching on both pages while open
- [ ] 4.7 Check browser console for any JavaScript errors

**Validation**: 
- Homepage displays correct theme based on system preference ✓
- Post page displays correct theme based on system preference ✓
- Both pages update when system theme changes while open ✓
- No JavaScript errors in console ✓

### 5. Validate with OpenSpec
- [ ] 5.1 Run `openspec validate fix-post-theme-initialization --strict`
- [ ] 5.2 Fix any validation errors
- [ ] 5.3 Confirm all spec deltas are properly formatted

**Validation**: 
- OpenSpec validation passes with no errors

## Notes
- The inline theme detection scripts in both layouts should remain unchanged
- No changes needed to CSS files (theme.css already supports system preference via media queries)
- This is purely a bug fix removing legacy code that interferes with current auto-only implementation
