# Design: expand-homepage-titles

## Architecture Overview
This change introduces two independent but complementary features to the homepage:

### 1. Title Expansion
- **Data extraction**: Parse post content to extract all H2 headings (article titles)
- **Display strategy**: Show titles as a bulleted list or numbered list within each post item
- **Rendering**: Client-side JavaScript parses markdown/HTML to extract titles, or server-side Liquid template extracts them during build

### 2. Client-Side Pagination
- **State management**: Pure JavaScript approach with no dependencies
- **DOM manipulation**: Show/hide post items based on current page
- **Navigation**: Previous/Next buttons + page number display
- **Persistence**: Optional: Use URL hash to preserve page state on refresh

## Technical Approach

### Option 1: Server-Side Title Extraction (Recommended)
**Pros:**
- No JavaScript parsing required
- Works without JS enabled
- SEO-friendly

**Cons:**
- Requires Jekyll build process understanding
- More complex template logic

**Implementation:**
```liquid
{% raw %}
{% for post in site.posts %}
  <li class="post-item">
    <a href="{{ post.url }}" class="post-link">
      <h2>{{ post.date | date: "%Y-%m-%d" }}</h2>
    </a>
    <div class="post-titles">
      {% assign titles = post.content | split: "## " %}
      {% for title_section in titles %}
        {% if forloop.first == false %}
          {% assign title = title_section | split: "
" | first %}
          <div class="article-title">{{ title }}</div>
        {% endif %}
      {% endfor %}
    </div>
  </li>
{% endfor %}
{% endraw %}
```

### Option 2: Client-Side Title Extraction
**Pros:**
- Simpler template changes
- Flexible post-processing

**Cons:**
- Requires JavaScript
- Potential flash of unstyled content

**Implementation:**
```javascript
document.querySelectorAll('.post-item').forEach(item => {
  const excerpt = item.querySelector('.post-excerpt');
  const content = excerpt.textContent;
  // Parse titles from excerpt or fetch post content
  const titles = extractTitles(content);
  renderTitles(item, titles);
});
```

## Pagination Architecture

### Data Structure
```javascript
const paginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: document.querySelectorAll('.post-item').length,
  totalPages: Math.ceil(totalItems / itemsPerPage)
};
```

### DOM Structure
```html
<div class="pagination-controls">
  <button class="pagination-prev" disabled>← 上一页</button>
  <span class="pagination-info">第 <span id="current-page">1</span> 页 / 共 <span id="total-pages">5</span> 页</span>
  <button class="pagination-next">下一页 →</button>
</div>
```

### Algorithm
1. On page load, hide all items except first page
2. Calculate total pages based on item count
3. On navigation click:
   - Update current page
   - Hide all items
   - Show items for current page
   - Update button states (disable prev/next at boundaries)
   - Update page counter

## Responsive Considerations
- **Desktop**: 10 posts per page
- **Mobile**: 5 posts per page (adjust via media query or JS)
- Pagination controls remain fixed at bottom on mobile

## Accessibility
- Pagination buttons have ARIA labels
- Keyboard navigation support (arrow keys optional)
- Screen reader announces page changes
- Focus management after page change

## Trade-offs

### Title Extraction
**Server-side (Recommended):**
- ✅ Works without JS
- ✅ Better SEO
- ❌ Requires understanding Jekyll's Liquid templating
- ❌ More complex template logic

**Client-side:**
- ✅ Simpler implementation
- ✅ Easier to iterate
- ❌ Requires JavaScript
- ❌ Potential layout shift

### Pagination Strategy
**Client-side (Chosen):**
- ✅ No server-side configuration
- ✅ Instant page changes
- ✅ Works with GitHub Pages
- ❌ Requires JavaScript
- ❌ Not SEO-friendly (all posts still in DOM)

**Server-side (Jekyll Paginate):**
- ✅ SEO-friendly (separate pages)
- ✅ Works without JS
- ❌ Requires Jekyll pagination plugin
- ❌ More complex to implement
- ❌ Slower navigation (full page reload)

## Implementation Sequence
1. **Phase 1**: Server-side title extraction in `_layouts/default.html`
2. **Phase 2**: Client-side pagination JavaScript in `assets/js/pagination.js`
3. **Phase 3**: CSS styling for titles and pagination controls
4. **Phase 4**: Testing across devices and browsers

## Validation
- Test with 1, 5, 10, 20, 50 posts
- Verify pagination works on mobile/desktop
- Ensure titles are clickable and navigate correctly
- Check performance with large post counts
