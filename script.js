/**
     * Let's write some modern JavaScript but with twist from the naughties (90s)
     * before major JS garbafe frameworks existed and IE was king.
     * 
     * Let's Go!
     */
(() => {
    const ROUTE_MAP = {
        "": {
            location: "/index.html",
            pathname: "/"
        },
        "/": {
            location: "/index.html",
            pathname: "/"
        },
        "/index.html": {
            location: "/index.html",
            pathname: "/"
        },
        "about": {
            location: "/about.html",
            pathname: "/about"
        },
        "/about.html": {
            location: "/about.html",
            pathname: "/about"
        },
    };

    const content = document.querySelector(".content");

    async function loadPageContent(pageId) {
        const route = ROUTE_MAP[pageId];
        if (!route) {
            alert("You're a nauhty one, aren't you... ;)");
        }

        const response = await fetch(route.location);
        if (response.status !== 200) {
            alert("You're a nauhty one, aren't you... ;)");
        }

        const responseData = await response.text();

        const mockElement = document.createElement("div");
        mockElement.innerHTML = responseData;

        content.innerHTML = mockElement.querySelector(".content").innerHTML;
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
})();