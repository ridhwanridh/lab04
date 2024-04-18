/* STEP 2: Bind the HEADER and the SECTION elements above to variables */
const header = document.querySelector("header");
const section = document.querySelector("section");

// STEP 3a: Create the asynchronous function populate()
async function populate() {
    // Introducing JavaScript Object Notation (JSON): https://json.org/
    // STEP 4a: Create i-scream.json file with companyName, headOffice, established, active, topFlavors(name, calories, type, ingredients, image) */
    // STEP 4b: Store the URL of a JSON file in a variable */
    const url = "https://ridhwanridh.github.io/lab04//js/i-scream.json";
    // STEP 5: Use the new URL to create a new request object
    const request = new Request(url);
    // STEP 6: Make a network request with the fetch() function, which returns a Response object
    const response = await fetch(request);
    // STEP 7: Capture the returned Response object and covert to a JSON object using json()
    const responseJson = await response.json();
    // STEP 8: Output the iScream JSON object to the console
    console.log(responseJson);
    // STEP 9a: Invoke the populateHeader function here, then build it below
    populateHeader(responseJson);
    // STEP 10a: Invoke the showTopFlavors function here, then build it below
    showTopFlavors(responseJson);
}

// STEP 3b: Call the populate() function
populate();

/* STEP 9b: Build out the populateHeader() function */
function populateHeader(jsonData) {
    // Create the H1 element
    let h1 = document.createElement("h1");
    // Grab the company name from the JSON object and use it for the text node
    h1.textContent = jsonData.companyName;
    // Inject the complete H1 element into the DOM, inside the HEADER
    header.appendChild(h1);
}

/* STEP 10b: Assemble the showTopFlavors() function */
function showTopFlavors(jsonData) {
    const topFlavors = jsonData.topFlavors;

    // Creating tab list
    const tabList = document.createElement("ul");
    tabList.className = 'tab-list';

    // Creating container for tab content
    const tabContent = document.createElement("div");
    tabContent.className = 'tab-content';

    for (let i = 0; i < topFlavors.length; i++) {
        // Tab buttons
        const tabButton = document.createElement("button");
        tabButton.className = 'tab';
        tabButton.textContent = topFlavors[i].name;
        tabButton.onclick = function () {
            openTab(event, 'flavor' + i);
        };
        const li = document.createElement("li");
        li.appendChild(tabButton);
        tabList.appendChild(li);

        // Content for each tab
        const flavorContent = document.createElement("div");
        flavorContent.id = 'flavor' + i;
        flavorContent.className = 'tab-pane';

        let h2 = document.createElement("h2");
        let image = document.createElement("img");
        let p1 = document.createElement("p");
        let p2 = document.createElement("p");
        let list = document.createElement("ul");

        h2.textContent = topFlavors[i].name;
        p1.textContent = "Calories: " + topFlavors[i].calories;
        p2.textContent = "Type: " + topFlavors[i].type;
        image.src = topFlavors[i].image;

        flavorContent.appendChild(h2);
        flavorContent.appendChild(image);
        flavorContent.appendChild(p1);
        flavorContent.appendChild(p2);

        topFlavors[i].ingredients.forEach(ingredient => {
            let listItem = document.createElement("li");
            listItem.textContent = ingredient;
            list.appendChild(listItem);
        });

        flavorContent.appendChild(list);
        tabContent.appendChild(flavorContent);
    }

    section.appendChild(tabList);
    section.appendChild(tabContent);
}
function openTab(evt, tabName) {
    const tabPanes = document.getElementsByClassName("tab-pane");
    for (let i = 0; i < tabPanes.length; i++) {
        tabPanes[i].style.display = "none";
    }
    const tabs = document.getElementsByClassName("tab");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// STEP 11: Add a 3rd flavour of ice cream to the local JSON file, making use of the /images/strawberry-sprinkle.svg image

// Lab: Extend the JavaScript application built in class to include two more flavors of ice cream.

// This page inspired by and adapted from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// A special thanks to https://openclipart.org/detail/285225/ice-cream-cones for the awesome ice cream cone illustrations
