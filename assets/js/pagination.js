(function() {
  'use strict';

  // Pagination state
  const state = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
    postItems: []
  };

  // DOM elements
  let prevButton, nextButton, currentPageSpan, totalPagesSpan, paginationControls, announceRegion;

  /**
   * Get items per page based on viewport width
   */
  function getItemsPerPage() {
    return window.innerWidth <= 768 ? 5 : 10;
  }

  /**
   * Initialize pagination
   */
  function initPagination() {
    // Get all post items
    state.postItems = Array.from(document.querySelectorAll('.post-item'));
    state.totalItems = state.postItems.length;
    
    // Set items per page based on viewport
    state.itemsPerPage = getItemsPerPage();
    state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);

    // Get DOM elements
    prevButton = document.querySelector('.pagination-prev');
    nextButton = document.querySelector('.pagination-next');
    currentPageSpan = document.getElementById('current-page');
    totalPagesSpan = document.getElementById('total-pages');
    paginationControls = document.querySelector('.pagination-controls');
    announceRegion = document.getElementById('pagination-announce');

    // Show pagination controls only if needed
    if (state.totalPages > 1) {
      paginationControls.style.display = 'flex';
    }

    // Set up event listeners
    if (prevButton) {
      prevButton.addEventListener('click', handlePrevClick);
    }
    if (nextButton) {
      nextButton.addEventListener('click', handleNextClick);
    }

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Show first page
    showPage(1);
  }

  /**
   * Show a specific page
   */
  function showPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > state.totalPages) return;

    state.currentPage = pageNumber;

    // Calculate start and end indices
    const startIndex = (pageNumber - 1) * state.itemsPerPage;
    const endIndex = Math.min(startIndex + state.itemsPerPage, state.totalItems);

    // Hide all items, then show only current page items
    state.postItems.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });

    // Update controls
    updateControls();

    // Scroll to top of post list
    const postList = document.querySelector('.post-list');
    if (postList) {
      postList.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Announce page change to screen readers
    if (announceRegion) {
      announceRegion.textContent = `已加载第 ${pageNumber} 页，共 ${state.totalPages} 页`;
    }
  }

  /**
   * Update pagination controls
   */
  function updateControls() {
    // Update page counter
    if (currentPageSpan) {
      currentPageSpan.textContent = state.currentPage;
    }
    if (totalPagesSpan) {
      totalPagesSpan.textContent = state.totalPages;
    }

    // Update link states (add/remove disabled class)
    if (prevButton) {
      if (state.currentPage === 1) {
        prevButton.classList.add('disabled');
        prevButton.setAttribute('aria-disabled', 'true');
      } else {
        prevButton.classList.remove('disabled');
        prevButton.setAttribute('aria-disabled', 'false');
      }
    }
    if (nextButton) {
      if (state.currentPage === state.totalPages) {
        nextButton.classList.add('disabled');
        nextButton.setAttribute('aria-disabled', 'true');
      } else {
        nextButton.classList.remove('disabled');
        nextButton.setAttribute('aria-disabled', 'false');
      }
    }
  }

  /**
   * Handle previous link click
   */
  function handlePrevClick(e) {
    e.preventDefault();
    if (state.currentPage > 1) {
      showPage(state.currentPage - 1);
    }
  }

  /**
   * Handle next link click
   */
  function handleNextClick(e) {
    e.preventDefault();
    if (state.currentPage < state.totalPages) {
      showPage(state.currentPage + 1);
    }
  }

  /**
   * Handle window resize
   */
  function handleResize() {
    const newItemsPerPage = getItemsPerPage();
    
    // Only recalculate if items per page changed
    if (newItemsPerPage !== state.itemsPerPage) {
      state.itemsPerPage = newItemsPerPage;
      state.totalPages = Math.ceil(state.totalItems / state.itemsPerPage);
      
      // Adjust current page if needed
      if (state.currentPage > state.totalPages) {
        state.currentPage = state.totalPages;
      }
      
      // Show/hide pagination controls
      if (state.totalPages > 1) {
        paginationControls.style.display = 'flex';
      } else {
        paginationControls.style.display = 'none';
      }
      
      // Re-render current page
      showPage(state.currentPage);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagination);
  } else {
    initPagination();
  }
})();
