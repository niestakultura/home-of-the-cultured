/**
 * Let's write some modern JavaScript but with a twist from the 
 * naughties (90s), before major JS garbage frameworks existed
 * and IE was king.
 * 
 * Let's Go!
 */
(() => {
    const ROUTE_MAP_INDEX = {
        id: "index",
        location: "/index.html",
        pathname: "/"
    };

    const ROUTE_MAP_ABOUT = {
        id: "about",
        location: "/about.html",
        pathname: "/about"
    };

    const ROUTE_MAP = {
        "": ROUTE_MAP_INDEX,
        "/": ROUTE_MAP_INDEX,
        "/index.html": ROUTE_MAP_INDEX,
        "/about": ROUTE_MAP_ABOUT,
        "/about.html": ROUTE_MAP_ABOUT
    };

    const content = document.querySelector(".content");

    const CONTENT_STORE = {
        "index": undefined,
        "about": undefined
    };

    /**
     * Loads page content and sets the history state
     * @param {string} pageId 
     * @param {boolean} restoreState 
     */
    async function loadPageContent(pageId, restoreState) {
        const route = ROUTE_MAP[pageId];
        if (!route) {
            alert("You're a nauhty one, aren't you... ;)");
        }

        if (!restoreState && route.pathname === location.pathname) {
            return;
        }

        if (!CONTENT_STORE[route.id]) {
            const response = await fetch(route.location);
            if (response.status !== 200) {
                alert("You're a nauhty one, aren't you... ;)");
            }
    
            const responseData = await response.text();
    
            const mockElement = document.createElement("div");
            mockElement.innerHTML = responseData;
    
            const innerHtml = mockElement.querySelector(".content").innerHTML;
            CONTENT_STORE[route.id] = innerHtml;
        }
        
        content.innerHTML = CONTENT_STORE[route.id];

        if (restoreState) {
            return;
        }

        history.pushState({}, "", route.pathname);
    }

    async function interceptClickEvent(e) {
        const target = e.target || e.srcElement;
        if (target.tagName !== "A") {
            return;
        }

        e.preventDefault();
        const href = target.getAttribute("href");

        loadPageContent(href);
    }

    if (document.addEventListener) {
        document.addEventListener("click", interceptClickEvent);
    } else if (document.attachEvent) {
        document.attachEvent("onclick", interceptClickEvent);
    }

    window.addEventListener("popstate", (event) => {
        const { pathname } = location;
        loadPageContent(pathname, true);
    });
})();