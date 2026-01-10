# post-page-theme-switching Specification

## Purpose
Enable automatic theme switching on post pages based on system preferences, ensuring consistent theme behavior between homepage and post pages.

## ADDED Requirements

### Requirement: Automatic System Theme Detection
The post page MUST automatically detect and apply the system's color scheme preference (light or dark mode) when the page loads.

#### Scenario: Light mode system preference
- **WHEN** a user loads a post page with their OS/browser set to light mode
- **THEN** the page MUST display using the light theme
- **AND** the theme MUST be applied immediately on page load without flicker

#### Scenario: Dark mode system preference
- **WHEN** a user loads a post page with their OS/browser set to dark mode
- **THEN** the page MUST display using the dark theme
- **AND** the theme MUST be applied immediately on page load without flicker

#### Scenario: No system preference available
- **WHEN** a user loads a post page on a browser that doesn't support prefers-color-scheme
- **THEN** the page MUST default to light theme
- **AND** the page MUST NOT throw JavaScript errors

### Requirement: Dynamic Theme Switching
The post page MUST automatically update the theme when the user changes their system color scheme preference while the page is open.

#### Scenario: System switches from light to dark
- **WHEN** a post page is open with light theme
- **AND** the user changes their OS/browser to dark mode
- **THEN** the page MUST automatically switch to dark theme
- **AND** the transition MUST happen without requiring a page refresh

#### Scenario: System switches from dark to light
- **WHEN** a post page is open with dark theme
- **AND** the user changes their OS/browser to light mode
- **THEN** the page MUST automatically switch to light theme
- **AND** the transition MUST happen without requiring a page refresh

### Requirement: Theme Implementation Parity
The automatic theme detection logic on post pages MUST be identical to the implementation on the homepage to ensure consistent behavior.

#### Scenario: Same detection logic as homepage
- **WHEN** comparing theme detection between homepage and post page
- **THEN** both pages MUST use the same system theme detection method
- **AND** both pages MUST use matchMedia with '(prefers-color-scheme: dark)' query
- **AND** both pages MUST implement the same change listener for dynamic updates

#### Scenario: Same theme application method
- **WHEN** applying automatic theme on post pages
- **THEN** the page MUST remove the data-theme attribute to enable system theme
- **AND** this MUST match the homepage's applySystemTheme() behavior
- **AND** CSS MUST respect the absence of data-theme attribute by using system preference

### Requirement: Compatibility with Manual Theme Toggle
The automatic theme detection MUST work harmoniously with the existing manual theme toggle functionality provided by theme-toggle.js.

#### Scenario: Automatic detection doesn't conflict with manual toggle
- **WHEN** a post page loads with automatic theme detection
- **AND** theme-toggle.js is also present
- **THEN** both systems MUST coexist without conflicts
- **AND** the inline auto-detection MUST handle automatic (system-based) theme
- **AND** theme-toggle.js MUST handle manual user preferences

#### Scenario: Manual toggle takes precedence
- **WHEN** a user has manually selected a theme via theme-toggle.js
- **THEN** the manual preference MUST override automatic detection
- **AND** system theme changes MUST NOT affect manually selected themes
- **AND** the theme-toggle.js localStorage preference MUST take priority

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
