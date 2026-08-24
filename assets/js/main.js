/**
* Template Name: Laura - v4.5.0
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  const closeShareMenus = (exceptShare) => {
    select('.article-share.is-open', true).forEach(share => {
      if (share === exceptShare) return

      share.classList.remove('is-open')
      const toggle = share.querySelector('[data-share-toggle]')
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false')
      }
    })
  }

  const showShareStatus = (element, message) => {
    const shareBar = element.closest('.article-share')
    if (!shareBar) return

    const status = shareBar.querySelector('.article-share-status')
    if (!status) return

    status.textContent = message
    window.setTimeout(() => {
      status.textContent = ''
    }, 2200)
  }

  const copyShareUrl = async (url) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url)
      return
    }

    const textArea = document.createElement('textarea')
    textArea.value = url
    textArea.setAttribute('readonly', '')
    textArea.style.position = 'fixed'
    textArea.style.top = '-9999px'
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  on('click', '[data-share-toggle]', function(event) {
    event.preventDefault()
    event.stopPropagation()

    const shareBar = this.closest('.article-share')
    if (!shareBar) return

    const shouldOpen = !shareBar.classList.contains('is-open')
    closeShareMenus(shareBar)
    shareBar.classList.toggle('is-open', shouldOpen)
    this.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false')
  }, true)

  on('click', '[data-copy-link]', async function() {
    const shareUrl = this.getAttribute('data-share-url') || window.location.href

    try {
      await copyShareUrl(shareUrl)
      showShareStatus(this, 'Link copied')
    } catch (error) {
      showShareStatus(this, 'Copy failed')
    }
  }, true)

  on('click', '[data-native-share]', async function() {
    const shareUrl = this.getAttribute('data-share-url') || window.location.href
    const shareTitle = this.getAttribute('data-share-title') || document.title

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          showShareStatus(this, 'Share failed')
        }
      }
      return
    }

    try {
      await copyShareUrl(shareUrl)
      showShareStatus(this, 'Link copied')
    } catch (error) {
      showShareStatus(this, 'Share unavailable')
    }
  }, true)

  document.addEventListener('click', event => {
    if (!event.target.closest('.article-share')) {
      closeShareMenus()
    }
  })

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeShareMenus()
    }
  })

})()
