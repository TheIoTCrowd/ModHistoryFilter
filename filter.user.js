// ==UserScript==
// @name         Mod History Filter
// @namespace    https://github.com/TheIoTCrowd/ModHistoryFilter
// @version      0.1.0
// @description  Filter for /admin/history for moderators.
// @author       Aurora0001
// @match        https://*.stackexchange.com/admin/history/*
// @match        https://stackoverflow.com/admin/history/*
// @match        https://superuser.com/admin/history/*
// @match        https://serverfault.com/admin/history/*
// @match        https://askubuntu.com/admin/history/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle(".filter-item { padding-left: 4px; padding-right: 4px; } #mod-user-history { padding-top: 10px; }");

    function countMatches() {
        var matchingPosts = $("#mod-user-history > li:visible").size().toString();
        $("#matchCounter").html('<br /><span class="bounty-indicator-tab supernovabg">' + matchingPosts + '</span> matching posts with relevant events');
    }

    function filterItems(criterion) {
        $("#mod-user-history > li").each(function() {
            var shouldShowItem = false;
            $(this).find("ul > li").each(function() {
                if (this.innerText.indexOf(criterion) !== -1 || criterion === "") {
                    shouldShowItem = true;
                }
            });

            if (shouldShowItem) {
                $(this).css("display", "block");
            } else {
                $(this).css("display", "none");
            }
        });
    }

    function createFilterLink(title, parent, criterion, subitems, isSubitem) {
        if (criterion === undefined) {
            criterion = title;
        }
        var filter = document.createElement("a");
        filter.classList += "filter-item";
        filter.innerText = title;
        filter.onclick = () => {
            if (isSubitem === undefined || !isSubitem) {
                clearSubItems();
            }
            showSubItems(filter, subitems);
            filterItems(criterion);
            countMatches();
        };
        parent.appendChild(filter);
    }

    function showSubItems(filter, subitems) {
        if (subitems === undefined || subitems.length === 0) { return; }
        var subitemList = document.createElement("span");
        subitemList.classList += "filter-subitem";

        var openBracket = document.createElement("span");
        openBracket.innerText = "(";
        subitemList.appendChild(openBracket);

        subitems.forEach((item, index) => {
            if (index !== 0) {
                var interpunct = document.createElement("span");
                interpunct.innerHTML = "&middot;";
                subitemList.appendChild(interpunct);
            }
            createFilterLink(item.title, subitemList, item.criterion, undefined, true);
        });

        var closeBracket = document.createElement("span");
        closeBracket.innerText = ")";
        subitemList.appendChild(closeBracket);
        $(subitemList).insertAfter(filter);
    }

    function clearSubItems() {
        $(".filter-subitem").remove();
    }

    $(document).ready(() => {
        var matchCounter = document.createElement("div");
        matchCounter.id = "matchCounter";
        $("#mod-user-history").parent().prepend(matchCounter);
        
        var filterLinks = document.createElement("div");
        filterLinks.innerText = "Filter: ";

        createFilterLink("flag processed", filterLinks, "Flag processed", [
            {
                title: "helpful",
                criterion: "Helpful"
            },
            {
                title: "declined",
                criterion: "Declined"
            }
        ]);
        createFilterLink("post actions", filterLinks, "♦", [
            {
                title: "closed",
                criterion: "Post Closed"
            },
            {
                title: "reopened",
                criterion: "Post Reopened"
            },
            {
                title: "deleted",
                criterion: "Post Deleted"
            },
            {
                title: "undeleted",
                criterion: "Post Undeleted"
            },
            {
                title: "protected",
                criterion: "rotected" // Catches both Protect and Unprotect (a nasty hack, but we're using jQuery anyway, so we aren't going to win any competitions...)
            },
            {
                title: "migrated",
                criterion: "Post Migrated Away"
            },
            {
                title: "comment deleted",
                criterion: "Comment deleted"
            }
        ]);
        createFilterLink("user actions", filterLinks, "user", [
            {
                title: "annotated",
                criterion: "User annotated"
            },
            {
                title: "messaged",
                criterion: "contacts user"
            },
            {
                title: "deleted",
                criterion: "deletes user"
            },
            {
                title: "destroyed",
                criterion: "destroys user"
            }
        ]);
        createFilterLink("clear filters", filterLinks, "");

        $("#mod-user-history").parent().prepend(filterLinks);
    });
})();
