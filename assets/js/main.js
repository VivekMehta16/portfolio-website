/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


// Education

// Add hover animation
document.querySelectorAll('.service-item').forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
  });

  item.addEventListener('mouseout', () => {
    item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
  });
});



// Experience

// Experience Data
// Add flip functionality to the "View More" buttons
document.querySelectorAll('.view-more').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    card.classList.add('is-flipped');
  });
});

// Add flip-back functionality to the "Go Back" buttons
document.querySelectorAll('.flip-back').forEach((button) => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    card.classList.remove('is-flipped');
  });
});


// Project
const data = {
  Internship: {
    title: "Software Engineer Intern",
    company: "Yaako Global Services",
    dates: "Jan 2025 – Present | United States",
    details: [
      " Engaged with global teams and business stakeholders to gather requirements, define project objectives, and deliver scalable software solutions, achieving a 25% reduction in project delivery times and enhancing automation workflows.",
      "Designed and developed software applications using Python, TypeScript, and React leveraging advanced data structures such as hash maps, trees, and queues to improve system performance and scalability by 30%.",
      " Built and optimized NoSQL database schemas and queries, enhancing data storage efficiency by 22% and supporting high-volume systems with millions of records."
    ]
  },
  ASU: {
    title: "Technology Consultant",
    company: "ASU Enterprise Technology",
    dates: "Nov 2023 – Present | United States",
    details: [
      "Delivered technical support across 150+ classrooms, resolving more than 20 issues weekly and reducing downtime by almost 50%, ensuring continuity for over 10,000 students and faculty.",
      "Verified technology at 168 sites, improving system reliability by 38 %. Provided on-call support to 15,000+ users, escalating complex issues within 2 hours, increasing user satisfaction by 20%.",
      "Led training and digital transformation projects, raising tech adoption by 25%. Analyzed IT requirements to align with ASU goals, boosting performance by 35%."
    ]
  },
  consultant: {
    title: "Software Engineering Consultant",
    company: "Sac-Industries",
    dates: "Jan 2022 – Dec 2022 | India",
    details: [
      "Automated production workflows by designing and deploying a microservices solution, increasing productivity by 30% and operational efficiency by 50%.",
      "Designed and implemented responsive user interfaces using React, HTML, CSS, and TypeScript, ensuring seamless user experiences across devices and enhancing frontend performance.",
      "Engineered a multi-layered architecture using Java, Spring Boot, MySQL, and JavaScript to streamline business operations, resulting in significant workflow optimization and enhanced user engagement.",
      "Implemented robust access control mechanisms with Spring Security, providing secure, role-based access to over 10 authorized users, reducing unauthorized access risks.",
      "Enhanced API performance by implementing asynchronous handling and caching mechanisms, achieving a 25% reduction in response times and improving scalability.",
      "Optimized system scalability and resilience by implementing advanced load balancing, dynamic auto-scaling, and real-time monitoring strategies, ensuring high availability and rapid response during peak loads.",
      "Conducted rigorous UI testing as part of a quality assurance process to meet client specifications, identifying and resolving over 27 critical bugs to improve usability and client satisfaction."
    ]
  },
  intern: {
    title: "Software Engineer Intern",
    company: "Softvan PVT. LTD.",
    dates: "Dec 2022 – Jul 2023 | India",
    details: [
      "Led development and implementation of a Agile Methodology across multiple projects, integrating CI/CD automation, RESTful services, and Python to accelerate deployment cycles by 28% and optimize scalability and resilience.",
 "     Engineered and launched interactive data visualization dashboards utilizing Angular and Java, increasing data availability by 27% and enhancing client decision-making capabilities, resulting in a 35% improvement in operational efficiency.", 
 "Collaborated with cross-functional teams to enhance web application responsiveness, employing AJAX and JavaScript to optimize page load times, which improved overall project efficiency by 15% and significantly elevated the user experience.",
  "Enhanced application functionality and performance by leveraging Java, JSON, and XML for cross-platform compatibility,ensuring efficient code and delivering a seamless end-user experience.",
  "Contributed to the development of an iOS application with a Swift-based backend, collaborating on coding tasks and building SwiftUI interfaces in Xcode."
    ]
  },
};

// Add event listeners to "View More" buttons
document.querySelectorAll('.view-more-btn').forEach(button => {
  button.addEventListener('click', () => {
    const role = button.getAttribute('data-role');
    const { title, company, dates, details } = data[role];

    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupCompany').textContent = company;
    document.getElementById('popupDates').textContent = dates;

    const detailsList = document.getElementById('popupDetails');
    detailsList.innerHTML = '';
    details.forEach(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      detailsList.appendChild(li);
    });

    document.getElementById('popupOverlay').style.display = 'block';
  });
});

// Close popup when clicking "X" button
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popupOverlay').style.display = 'none';
});

// Close popup when clicking outside the popup content
document.getElementById('popupOverlay').addEventListener('click', (e) => {
  if (e.target === document.getElementById('popupOverlay')) {
    document.getElementById('popupOverlay').style.display = 'none';
  }
});

// Testimonial

document.addEventListener("DOMContentLoaded", function () {
  const testimonialCarousel = document.getElementById("testimonialCarousel");

  // Bootstrap carousel instance
  const carousel = new bootstrap.Carousel(testimonialCarousel, {
    interval: 5000, // Auto-slide interval (5 seconds)
    pause: "hover", // Pause when hovering
  });

  console.log("Testimonials carousel initialized!");
});


// CHeck
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sheetdb-form");
  const msgDisplay = document.getElementById("msgdisplay");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("Form submission started...");
    msgDisplay.innerHTML = `<div class="loading">Sending your message...</div>`; // Show loading message

    try {
      const formData = new FormData(form);

      // Send the request
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Response received:", result);

      // Log condition check
      console.log("Checking if response is ok and created is true...");

      if (response.ok && result.created) {
        console.log("Form submission successful. Hiding form...");

        form.reset(); // Clear the form fields
        form.style.display = "none"; // Hide the form

        console.log("Updating msgDisplay with success message...");
        msgDisplay.innerHTML = `
          <div class="sent-message" style="display: block; text-align: center; color: green; font-weight: bold;">
            🎉 Your message has been sent successfully. Thank you! <br /> Will get back to you soon.
          </div>
        `;
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      msgDisplay.innerHTML = `
        <div class="error-message" style="display: block; text-align: center; color: red; font-weight: bold;">
          🚨 Something went wrong. Please try again later.
        </div>
      `;
    }

    console.log("Script execution completed.");
  });
});







})();