/**
 * Navigation Component - Clean Rewrite
 * Handles desktop hover and mobile click/expand behaviors
 */

(function () {
    'use strict';

    class NavigationInteractions {
        constructor(navElement) {
            this.nav = navElement;
            this.activeDropdown = null;
            this.moreButton = null;
            this.moreDropdown = null;
            this.resizeTimeout = null;
            this.init();
        }

        init() {
            if (!this.nav) {
                console.error('Navigation element not found');
                return;
            }

            if (window.pnrApplicationSettings && window.pnrApplicationSettings.Version) {
                this.nav.classList.add(window.pnrApplicationSettings.Version);
            }

            this.moreButton = this.nav.querySelector('.mvc-nav-more');
            this.moreDropdown = this.nav.querySelector('.mvc-nav-more-dropdown .mvc-nav-dropdown-list');

            this.attachEventListeners();
            this.handleResponsiveNavigation();
            this.handleScrollTheme();

            window.addEventListener('resize', () => {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.handleResponsiveNavigation();
                }, 200);
            });

            window.addEventListener('scroll', () => {
                this.handleScrollTheme();
            });
        }

        handleScrollTheme() {
            const navBarScrollHeight = window.pnrApplicationSettings?.NavBarScrollHeight ?? 100;
            const themeVersion = window.pnrApplicationSettings?.Version ?? '';
            
            if (themeVersion) {
                if (window.scrollY > navBarScrollHeight) {
                    this.nav.classList.remove(themeVersion);
                } else {
                    this.nav.classList.add(themeVersion);
                }
            }
        }

        attachEventListeners() {
            const isMobile = window.innerWidth < 992;
            const navItems = this.nav.querySelectorAll('.mvc-nav-item:not(.mvc-nav-more)');

            navItems.forEach(item => {
                const chevronButton = item.querySelector('.mvc-nav-chevron-button');
                const dropdown = item.querySelector('.mvc-nav-dropdown');

                if (!chevronButton || !dropdown) return;

                // Desktop: hover behavior on the entire item
                if (!isMobile) {
                    item.addEventListener('mouseenter', () => {
                        this.showDropdown(item);
                    });

                    item.addEventListener('mouseleave', () => {
                        setTimeout(() => {
                            if (!item.matches(':hover')) {
                                this.hideDropdown(item);
                            }
                        }, 100);
                    });
                }

                // Click on chevron button only (mobile and desktop)
                chevronButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.toggleDropdown(item);
                });
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.mvc-navigation')) {
                    this.hideAllDropdowns();
                }
            });
        }

        toggleDropdown(item) {
            const isActive = item.classList.contains('active');

            if (window.innerWidth < 992) {
                // Mobile: toggle current, don't close others
                if (isActive) {
                    this.hideDropdown(item);
                } else {
                    this.showDropdown(item);
                }
            } else {
                // Desktop: toggle current, close others
                if (isActive) {
                    this.hideDropdown(item);
                } else {
                    this.hideAllDropdowns();
                    this.showDropdown(item);
                }
            }
        }

        showDropdown(item) {
            const dropdown = item.querySelector('.mvc-nav-dropdown');
            const chevronButton = item.querySelector('.mvc-nav-chevron-button');

            if (dropdown && chevronButton) {
                item.classList.add('active');
                dropdown.classList.add('active');
                chevronButton.setAttribute('aria-expanded', 'true');
            }
        }

        hideDropdown(item) {
            const dropdown = item.querySelector('.mvc-nav-dropdown');
            const chevronButton = item.querySelector('.mvc-nav-chevron-button');

            if (dropdown && chevronButton) {
                item.classList.remove('active');
                dropdown.classList.remove('active');
                chevronButton.setAttribute('aria-expanded', 'false');
            }
        }

        hideAllDropdowns() {
            const allItems = this.nav.querySelectorAll('.mvc-nav-item');
            allItems.forEach(item => this.hideDropdown(item));
        }

        handleResponsiveNavigation() {
            const isMobile = window.innerWidth < 992;

            if (!isMobile) {
                // Desktop: check if items fit, if not use More button
                this.implementDesktopMoreButton();
                return;
            }

            // Mobile: implement More button logic
            this.implementMobileMoreButton();
        }

        implementDesktopMoreButton() {
            // Desktop: always show all items, no More button
            this.restoreHiddenItems();
            this.hideMoreButton();
        }

        implementMobileMoreButton() {
            if (!this.moreButton || !this.moreDropdown) return;

            const navList = this.nav.querySelector('.mvc-nav-list');
            const allItems = Array.from(navList.querySelectorAll(':scope > .mvc-nav-item:not(.mvc-nav-more)'));
            
            // Reset all items first
            this.restoreHiddenItems();
            
            // On mobile, hide ALL items under "Browse the Latest News"
            const visibleCount = 0;
            const itemsToHide = allItems.slice(visibleCount);

            if (itemsToHide.length > 0) {
                this.showMoreButton(itemsToHide);
            } else {
                this.hideMoreButton();
            }
        }

        restoreHiddenItems() {
            const navList = this.nav.querySelector('.mvc-nav-list');
            const hiddenItems = navList.querySelectorAll(':scope > .mvc-nav-item.hidden-for-more');
            hiddenItems.forEach(item => {
                item.classList.remove('hidden-for-more');
                item.style.display = '';
            });
            
            if (this.moreDropdown) {
                this.moreDropdown.innerHTML = '';
            }
            
            const countBadge = this.moreButton?.querySelector('.mvc-nav-more-count');
            if (countBadge) {
                countBadge.textContent = '';
            }
        }

        attachMoreButtonListeners() {
            if (!this.moreButton) return;

            const chevronButton = this.moreButton.querySelector('.mvc-nav-chevron-button');
            if (!chevronButton) return;

            // Remove old listeners by cloning
            const newChevronButton = chevronButton.cloneNode(true);
            chevronButton.parentNode.replaceChild(newChevronButton, chevronButton);

            // Add click listener to chevron button
            newChevronButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(this.moreButton);
            });

            // Re-attach listeners to cloned items inside More dropdown
            const clonedItems = this.moreDropdown.querySelectorAll('.mvc-nav-item');
            clonedItems.forEach(item => {
                const itemChevronButton = item.querySelector('.mvc-nav-chevron-button');
                if (itemChevronButton) {
                    itemChevronButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleDropdown(item);
                    });
                }
            });
        }

        showMoreButton(itemsToHide) {
            if (!this.moreButton || !this.moreDropdown) return;

            // Clear the more dropdown
            this.moreDropdown.innerHTML = '';

            // Hide items and clone to More dropdown
            itemsToHide.forEach(item => {
                item.classList.add('hidden-for-more');
                item.style.display = 'none';
                
                const clone = item.cloneNode(true);
                clone.classList.remove('hidden-for-more');
                clone.style.display = '';
                
                const wrapperLi = document.createElement('li');
                wrapperLi.className = 'mvc-nav-dropdown-item mvc-nav-more-item';
                wrapperLi.appendChild(clone);
                this.moreDropdown.appendChild(wrapperLi);
            });

            // Update count badges (both desktop and mobile)
            const countBadges = this.moreButton.querySelectorAll('.mvc-nav-more-count');
            countBadges.forEach(badge => {
                badge.textContent = `+${itemsToHide.length}`;
            });

            // Show the More button
            this.moreButton.classList.add('visible');
            this.moreButton.style.display = '';
            
            // Attach event listeners to More button
            this.attachMoreButtonListeners();
        }

        hideMoreButton() {
            if (!this.moreButton) return;

            this.moreButton.style.display = 'none';

            // Restore hidden items
            const navList = this.nav.querySelector('.mvc-nav-list');
            const hiddenItems = navList.querySelectorAll('.mvc-nav-item.hidden-for-more');
            hiddenItems.forEach(item => {
                item.classList.remove('hidden-for-more');
                item.style.display = '';
            });

            // Clear more dropdown
            if (this.moreDropdown) {
                this.moreDropdown.innerHTML = '';
            }
        }

        destroy() {
            this.hideAllDropdowns();
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }
        }
    }

    // Auto-initialize
    function initializeNavigation() {
        const navElement = document.querySelector('.mvc-navigation');
        if (navElement) {
            return new NavigationInteractions(navElement);
        }
        return null;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        initializeNavigation();
    }

    window.NavigationInteractions = NavigationInteractions;
    window.initializeNavigation = initializeNavigation;

})();
