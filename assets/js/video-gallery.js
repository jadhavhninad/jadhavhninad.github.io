(function () {
  "use strict";

  var carousels = document.querySelectorAll("[data-video-carousel]");

  carousels.forEach(function (carousel) {
    var viewport = carousel.querySelector("[data-video-viewport]");
    var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-video-slide]"));
    var previousButton = carousel.querySelector("[data-video-previous]");
    var nextButton = carousel.querySelector("[data-video-next]");
    var currentLabel = carousel.querySelector("[data-video-current]");
    var dots = Array.prototype.slice.call(carousel.querySelectorAll("[data-video-dot]"));
    var activeIndex = 0;
    var autoRotateTimer;
    var interactionPaused = false;
    var videoPlaying = false;
    var scrollFrame;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function updateControls(index) {
      activeIndex = (index + slides.length) % slides.length;
      currentLabel.textContent = activeIndex + 1;

      slides.forEach(function (slide, slideIndex) {
        var isActive = slideIndex === activeIndex;
        var interactiveElement = slide.querySelector("a, iframe");
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
        if (interactiveElement) interactiveElement.tabIndex = isActive ? 0 : -1;
      });

      dots.forEach(function (dot, dotIndex) {
        var isActive = dotIndex === activeIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    }

    function goTo(index, smooth) {
      var nextIndex = (index + slides.length) % slides.length;
      viewport.scrollTo({
        left: slides[nextIndex].offsetLeft,
        behavior: smooth && !reduceMotion ? "smooth" : "auto"
      });
      updateControls(nextIndex);
    }

    function stopAutoRotate() {
      window.clearInterval(autoRotateTimer);
    }

    function startAutoRotate() {
      stopAutoRotate();
      if (reduceMotion || interactionPaused || videoPlaying || document.hidden) return;

      autoRotateTimer = window.setInterval(function () {
        goTo(activeIndex + 1, true);
      }, 6500);
    }

    function pauseForInteraction() {
      interactionPaused = true;
      stopAutoRotate();
    }

    function resumeAfterInteraction() {
      interactionPaused = false;
      startAutoRotate();
    }

    previousButton.addEventListener("click", function () {
      goTo(activeIndex - 1, true);
      startAutoRotate();
    });

    nextButton.addEventListener("click", function () {
      goTo(activeIndex + 1, true);
      startAutoRotate();
    });

    dots.forEach(function (dot, index) {
      dot.addEventListener("click", function () {
        goTo(index, true);
        startAutoRotate();
      });
    });

    viewport.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(activeIndex - 1, true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(activeIndex + 1, true);
      }
    });

    viewport.addEventListener("scroll", function () {
      window.cancelAnimationFrame(scrollFrame);
      scrollFrame = window.requestAnimationFrame(function () {
        var nearestIndex = 0;
        var nearestDistance = Infinity;

        slides.forEach(function (slide, index) {
          var distance = Math.abs(slide.offsetLeft - viewport.scrollLeft);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        updateControls(nearestIndex);
      });
    }, { passive: true });

    carousel.addEventListener("mouseenter", pauseForInteraction);
    carousel.addEventListener("mouseleave", resumeAfterInteraction);
    carousel.addEventListener("focusin", pauseForInteraction);
    carousel.addEventListener("focusout", function (event) {
      if (!carousel.contains(event.relatedTarget)) resumeAfterInteraction();
    });

    // Not every video has a maxresdefault poster; fall back to the 4:3 hqdefault.
    carousel.querySelectorAll(".video-slide__poster img").forEach(function (poster) {
      poster.addEventListener("error", function () {
        if (poster.src.indexOf("maxresdefault") === -1) return;
        poster.src = poster.src.replace("maxresdefault", "hqdefault");
      });
    });

    carousel.querySelectorAll("[data-video-play]").forEach(function (playLink) {
      playLink.addEventListener("click", function (event) {
        event.preventDefault();
        videoPlaying = true;
        stopAutoRotate();

        var slide = playLink.closest("[data-video-slide]");
        var videoId = slide.getAttribute("data-youtube-id");
        var title = playLink.getAttribute("aria-label").replace(/^Play /, "");
        var iframe = document.createElement("iframe");

        iframe.src = "https://www.youtube-nocookie.com/embed/" + videoId + "?autoplay=1&rel=0";
        iframe.title = title;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.className = "video-slide__player";
        iframe.tabIndex = 0;

        playLink.replaceWith(iframe);
      });
    });

    document.addEventListener("visibilitychange", startAutoRotate);
    updateControls(0);
    startAutoRotate();
  });
})();
