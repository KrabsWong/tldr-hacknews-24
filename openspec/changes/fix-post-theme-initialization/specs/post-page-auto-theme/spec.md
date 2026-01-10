# post-page-auto-theme Specification Delta

## MODIFIED Requirements

### Requirement: Automatic System Theme Detection
The post page MUST automatically detect and apply the system's color scheme preference (light or dark mode) when the page loads, without any manual user intervention or localStorage dependencies.

#### Scenario: Light mode system preference on initial load
- **WHEN** a user switches their OS/browser to light mode
- **AND** then navigates to a post page
- **THEN** the page MUST display using the light theme immediately
- **AND** the theme MUST be applied on page load without flicker

#### Scenario: Dark mode system preference on initial load
- **WHEN** a user switches their OS/browser to dark mode
- **AND** then navigates to a post page
- **THEN** the page MUST display using the dark theme immediately
- **AND** the theme MUST be applied on page load without flicker

#### Scenario: No system preference available
- **WHEN** a user loads a post page on a browser that doesn't support prefers-color-scheme
- **THEN** the page MUST default to light theme
- **AND** the page MUST NOT throw JavaScript errors

### Requirement: Dynamic Theme Switching
The post page MUST automatically update the theme when the user changes their system color scheme preference while the page is open.

#### Scenario: System switches from light to dark while page is open
- **WHEN** a post page is open with light theme
- **AND** the user changes their OS/browser to dark mode
- **THEN** the page MUST automatically switch to dark theme
- **AND** the transition MUST happen without requiring a page refresh

#### Scenario: System switches from dark to light while page is open
- **WHEN** a post page is open with dark theme
- **AND** the user changes their OS/browser to light mode
- **THEN** the page MUST automatically switch to light theme
- **AND** the transition MUST happen without requiring a page refresh

### Requirement: Theme Implementation Parity
The automatic theme detection logic on post pages MUST be identical to the implementation on the homepage to ensure consistent behavior.

#### Scenario: Same detection logic as homepage
- **WHEN** comparing theme detection between homepage and post page
- **THEN** both pages MUST use the same inline script implementation
- **AND** both pages MUST use matchMedia with '(prefers-color-scheme: dark)' query
- **AND** both pages MUST implement the same change listener for dynamic updates

#### Scenario: Same theme application method
- **WHEN** applying automatic theme on post pages
- **THEN** the page MUST remove the data-theme attribute to enable system theme
- **AND** this MUST match the homepage's inline script behavior
- **AND** CSS MUST respect the absence of data-theme attribute by using system preference

### Requirement: Browser Compatibility
The automatic theme detection MUST work reliably across modern browsers that support the prefers-color-scheme media query.

#### Scenario: Works in Chromium-based browsers
- **WHEN** a user views a post page in Chrome, Edge, or other Chromium browser
- **THEN** automatic theme detection MUST work correctly
- **AND** dynamic theme updates MUST work correctly

#### Scenario: Works in Firefox
- **WHEN** a user views a post page in Firefox
- **THEN** automatic theme detection MUST work correctly
- **AND** dynamic theme updates MUST work correctly

#### Scenario: Works in Safari
- **WHEN** a user views a post page in Safari
- **THEN** automatic theme detection MUST work correctly
- **AND** dynamic theme updates MUST work correctly

#### Scenario: Graceful degradation
- **WHEN** a user views a post page in a browser without matchMedia support
- **THEN** the page MUST NOT throw JavaScript errors
- **AND** the page MUST fall back to default (light) theme

## REMOVED Requirements

### Requirement: Compatibility with Manual Theme Toggle
**REMOVED** - Manual theme toggle functionality has been removed from the project. Only automatic system theme following is supported.

### Requirement: Manual toggle takes precedence
**REMOVED** - No manual toggle exists, so this requirement is no longer applicable.

### Requirement: localStorage persistence
**REMOVED** - No user preferences are stored. Theme always follows system preference automatically.
