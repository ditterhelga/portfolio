(function () {
    if (window.__pepperedLenisBootstrap) return;
    window.__pepperedLenisBootstrap = true;

    var DESKTOP_MIN_WIDTH = 992;
    var REDUCED_MOTION_QUERY = window.matchMedia("(prefers-reduced-motion: reduce)");
    var lenisInstance = null;
    var rafId = null;
    var resizeTimer = null;
    var fallbackCompletionMs = 850;

    function expoOutEasing(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function hasLenisConstructor() {
        return typeof window.Lenis === "function";
    }

    function shouldUseLenis() {
        return window.innerWidth >= DESKTOP_MIN_WIDTH && !REDUCED_MOTION_QUERY.matches && hasLenisConstructor();
    }

    function updateScrollTrigger() {
        if (window.ScrollTrigger && typeof window.ScrollTrigger.update === "function") {
            window.ScrollTrigger.update();
        }
    }

    function raf(time) {
        if (!lenisInstance) return;
        lenisInstance.raf(time);
        rafId = window.requestAnimationFrame(raf);
    }

    function startLenis() {
        if (lenisInstance || !shouldUseLenis()) return;

        lenisInstance = new window.Lenis({
            duration: 1.3,
            easing: expoOutEasing,
            direction: "vertical",
            gestureDirection: "vertical",
            smoothWheel: true
        });

        window.__pepperedLenis = lenisInstance;
        lenisInstance.on("scroll", updateScrollTrigger);
        rafId = window.requestAnimationFrame(raf);
        document.documentElement.classList.add("has-lenis");
        updateScrollTrigger();
    }

    function stopLenis() {
        if (rafId !== null) {
            window.cancelAnimationFrame(rafId);
            rafId = null;
        }
        if (lenisInstance) {
            lenisInstance.destroy();
            lenisInstance = null;
        }
        window.__pepperedLenis = null;
        document.documentElement.classList.remove("has-lenis");
        updateScrollTrigger();
    }

    function evaluateLenisState() {
        if (shouldUseLenis()) {
            startLenis();
            return;
        }
        stopLenis();
    }

    window.__pepperedLenisScrollTo = function (target, options) {
        var resolvedOptions = Object.assign(
            { immediate: false, lock: false, force: true },
            options || {}
        );

        if (lenisInstance) {
            lenisInstance.scrollTo(target, resolvedOptions);
            return true;
        }

        var top = null;
        if (typeof target === "number" && Number.isFinite(target)) {
            top = target;
        } else if (target && target.nodeType === 1) {
            var rect = target.getBoundingClientRect();
            var manualOffset = typeof resolvedOptions.offset === "number" ? resolvedOptions.offset : 0;
            top = window.scrollY + rect.top + manualOffset;
        }

        if (top === null) return false;
        window.scrollTo({ top: top, behavior: resolvedOptions.immediate ? "auto" : "smooth" });
        return true;
    };

    window.__pepperedLenisOnScrollComplete = function (callback, durationMs) {
        if (typeof callback !== "function") return;
        window.setTimeout(callback, typeof durationMs === "number" ? durationMs : fallbackCompletionMs);
    };

    document.addEventListener(
        "click",
        function (event) {
            if (event.defaultPrevented || !lenisInstance) return;

            var anchor = event.target.closest('a[href^="#"]:not([href="#"])');
            if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
            if (anchor.hasAttribute("data-target") || anchor.hasAttribute("data-lenis-skip")) return;
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

            var hash = anchor.getAttribute("href");
            if (!hash || hash.length < 2) return;

            var targetId = decodeURIComponent(hash.slice(1));
            var targetElement = document.getElementById(targetId);
            if (!targetElement) return;

            event.preventDefault();

            var offsetAttr = Number(anchor.getAttribute("data-scroll-offset") || "0");
            var offset = Number.isFinite(offsetAttr) ? -offsetAttr : 0;
            window.__pepperedLenisScrollTo(targetElement, { offset: offset });

            if (window.history && typeof window.history.pushState === "function") {
                window.history.pushState(null, "", hash);
            }
        },
        true
    );

    window.addEventListener(
        "resize",
        function () {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(evaluateLenisState, 150);
        },
        { passive: true }
    );

    if (typeof REDUCED_MOTION_QUERY.addEventListener === "function") {
        REDUCED_MOTION_QUERY.addEventListener("change", evaluateLenisState);
    } else if (typeof REDUCED_MOTION_QUERY.addListener === "function") {
        REDUCED_MOTION_QUERY.addListener(evaluateLenisState);
    }

    window.addEventListener("load", function () {
        evaluateLenisState();
        updateScrollTrigger();
    });

    evaluateLenisState();
})();
