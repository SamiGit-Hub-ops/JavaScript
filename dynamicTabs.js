document.addEventListener("DOMContentLoaded", () => {
    
// Cache currently active tab and content for optimization (state tracking )
    let activeTab = document.querySelector(".tab.active");
    let activeContent = document.querySelector(".content.active");

/* so that now in the helper function we only undo these above 2 variables, 
and assign the active class for clicked tab, content only.
Since click and key press are possible events, better to have Core logic
: switch tab & content in seperate function */

    const switchTab = (tabNumber) => {

    // Remove 'active' only from currently active elements
        if(activeTab) activeTab.classList.remove("active");
        if(activeContent) activeContent.classList.remove("active");

    // Activate the new tab(& show its content) 
    // the tab which is clicked or keyed(1,2,3)
        activeTab = document.querySelector(`.tab[data-tab='${tabNumber}']`);
        if(activeTab) activeTab.classList.add("active");

        activeContent = document.querySelector(`.content[data-tab='${tabNumber}']`);
        if(activeContent) activeContent.classList.add("active");


    /* Optional: custom event for tab change
    we can create custom event here only as tab switching logic
    and its details are here only. These details can be made 
    available through the custom event */

        const myEvent = new CustomEvent(
            'tabChanged',
            { detail: document.querySelector(`.tab[data-tab='${tabNumber}']`).textContent

            }
        );

        //must dispatch event for listeners
        document.dispatchEvent(myEvent);
    };


/* we would have needed below 2 lines if we were to iterate through 
them and remove active class */
// const tabs = document.querySelectorAll(".tab");
// const contents = document.querySelectorAll(".content"); 


    const tabHeader = document.querySelector(".tab-headers");

// Tab clicked 1 / 2 / 3
    tabHeader.addEventListener("click", (e) => {
        const clicked = e.target;
        if(!clicked.classList.contains("tab")) return;

        const tabNumb = clicked.dataset.tab;
        switchTab(tabNumb);
    });

// Keyboard shortcuts: 1, 2, 3
    document.addEventListener("keydown", (e) => {
        const keyPressed = e.key;
        if(!["1", "2", "3"].includes(keyPressed)) return;

        switchTab(keyPressed);

    });

   
});

/* imagine we have a system that monitors what tab users are visiting/switching
 to we can have a custom event dispatched from above switchToTab function 
 and a listener for it wherever needed, here we are adding below for
 illustration */
/* name of the event we have to listen to is tabChanged 
and not tabChangeEvent. tabChangeEvent is the custom event 
that holds the event name (tabChanged) that we want to capture*/

 document.addEventListener('tabChanged', (e) => {
        console.log(`Tab switched to '${e.detail}'`);
    
    });
