/**
 * Area Attractions Module
 * Dynamically loads local attractions into cards with a see-more modal.
 *
 * @author The River Run Cabin
 * @version 1.0.0
 */
(function () {
  "use strict";

  const container = document.querySelector(".attractions-list");
  if (!container) return;

  /** @type {Object[]} List of local attractions */
  const attractions = [
    {
      title: "Yellowstone National Park",
      description:
        "Just under one hour from the west entrance of the world-renowned Yellowstone National Park, you can visit some of the most impressive and famous geothermal lakes, geysers, mountains, and wildlife that the world has to offer.",
      image: "/assets/images/Area/Yellowstone.jpg",
      link: "https://www.nps.gov/yell/index.htm",
    },
    {
      title: "Mesa Falls Scenic Byway",
      description:
        "Roughly 30 minutes away, the Mesa Falls Scenic Byway heads northeast into the lush landscape of the Targhee National Forest. It's a loop that runs for nearly thirty impressive miles all the way to the Island Park area. This byway includes the popular Warm River campground and two of the most spectacular waterfalls in the West—lower and upper Mesa Falls. At the upper falls you can stop at the historic Big Falls interpretive center to learn about the geology and history of the area.",
      image: "/assets/images/Area/Mesa Falls.jpg",
      link: "https://visitidaho.org/things-to-do/horseback-riding/mesa-falls-scenic-byway/",
    },
    {
      title: "Harriman State Park",
      description:
        'Less than 20 minutes away, Harriman State Park lies within a 16,000-acre wildlife refuge in the Greater Yellowstone Ecosystem. Known for its beautiful scenery and wildlife, Harriman State Park offers 22 miles of hiking, mountain biking, and horseback riding trails that slink through the meadows, meander along riverbanks, and through lush evergreen forests. Some of the best fly-fishing waters in the nation flow through eight miles of Harriman State Park, known by anglers all over the world as "The Ranch." Moose, elk, and trumpeter swans, the world\'s largest waterfowl species, are a common sight at Harriman.',
      image: "/assets/images/Area/Harriman State Park.jpg",
      link: "https://parksandrecreation.idaho.gov/state-park/harriman-state-park/",
    },
    {
      title: "Yellowstone Bear World",
      description:
        "Located 5 miles south of Rexburg, ID on US Hwy 20. Yellowstone Bear World is a drive-thru wildlife park. You are surrounded by free-roaming wildlife of North America in the comfort of your personal vehicle. Expect to see Black and Grizzly Bear, Rocky Mountain Elk, Bison, Moose, White-tail Deer, and Rocky Mountain Goats.",
      image: "/assets/images/Area/Yellowstone Bear World.jpg",
      link: "https://yellowstonebearworld.com/",
    },
    {
      title: "Yellowstone Playhouse",
      description:
        "Just 45 minutes away, an evening at Yellowstone Playhouse is a must. Great family-friendly entertainment and an awesome dinner. Tickets go fast, so get yours early!",
      image: "/assets/images/Area/Yellowstone Playhouse.jpg",
      link: "https://yellowstoneplayhouse.com/",
    },
    {
      title: "Grand Teton National Park",
      description:
        "A 90-minute drive to the south entrance of Grand Teton National Park, enjoy endless bird-watching, horseback riding, hiking and biking trails, and scores of wildlife. This is a perfect place to unwind and enjoy nature at its finest.",
      image: "/assets/images/Area/Grand Teton National Park.jpg",
      link: "https://www.nps.gov/grte/index.htm",
    },
    {
      title: "Island Park",
      description:
        'Claiming to be the "Longest Main Street" in America at 33 miles long, there are endless activities just a 20-minute drive north to Island Park. Fishing, fly shops, ATV rentals, restaurants, national forest roads to explore, biking, and hiking—you can find it all in Island Park.',
      image: "/assets/images/Area/Island Park.jpg",
      link: "https://islandparkchamber.org/",
    },
    {
      title: "West Yellowstone",
      description:
        "Best known as the West Entrance to Yellowstone National Park, West Yellowstone is a destination for dining, IMAX theater, Wolf and Bear visitors center, guided Yellowstone trips (year-round), nightly rodeo (summer months), snow machine rentals (winter months), and an airport (summer months) that have multiple daily arrivals and departures.",
      image: "/assets/images/Area/West Yellowstone.jpg",
      link: "https://www.townofwestyellowstone.com/",
    },
    {
      title: "Jackson, WY",
      description:
        "A 90-minute drive from Ashton, ID and located just 10 miles from the south entrance to Grand Teton National Park, Jackson is a worldwide destination for year-round outdoor activities.",
      image: "/assets/images/Area/Jackson Hole.jpg",
      link: "https://www.jacksonwy.gov/",
    },
    {
      title: "Bar T5 Covered Wagon Cookout",
      description:
        "Looking for a great meal and a show? Bar T5 Covered Wagon Cookout is the place to go. Located 77 miles from Ashton in Jackson, WY.",
      image: "/assets/images/Area/Bar T5.jpg",
      link: "https://www.bart5.com/",
    },
    {
      title: "Rapid River Rentals",
      description:
        "Rent kayaks, rafts, and tubes for tons of fun on the rivers and lakes just in town!",
      image: "/assets/images/Area/Rapid River Rentals.jpg",
      link: "https://rapidriverrentals.com/",
    },
    {
      title: "Outdoor Recreation",
      description:
        "Explore hundreds of miles of scenic snowmobiling and ATV/UTV trails right from the Ashton area. Whether you visit in summer or winter, you'll find well-marked routes winding through forests, meadows, and along the river, offering adventure for all skill levels. Please note: machines are not provided with your cabin rental, but there are several local outfitters where you can rent snowmobiles or ATVs/UTVs for your outdoor excursions.",
      image: "/assets/images/Area/Group Snowmobiling.jpg",
      link: "https://www.gspikeidaho.com/",
    },
  ];

  /** @type {number} Maximum characters for truncated description */
  const MAX_DESC_LENGTH = 140;

  /**
   * Truncate text to a maximum length with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  function truncateText(text, maxLength = MAX_DESC_LENGTH) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  }

  // Create modal element
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.style.display = "none";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-title");
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" type="button" aria-label="Close">&times;</button>
      <h2 id="modal-title"></h2>
      <p id="modal-desc"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector("#modal-title");
  const modalDesc = modal.querySelector("#modal-desc");
  const modalClose = modal.querySelector(".modal-close");

  /**
   * Open the see-more modal with attraction details
   * @param {number} index - Attraction index
   */
  function openModal(index) {
    modalTitle.textContent = attractions[index].title;
    modalDesc.textContent = attractions[index].description;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  /**
   * Close the see-more modal
   */
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Event listeners for modal
  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Focus trap - keep focus on close button when modal is open
  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "Tab") {
      // Single focusable element, prevent Tab from leaving
      e.preventDefault();
      modalClose.focus();
    }
  });

  // Render attraction cards
  attractions.forEach((attraction, index) => {
    const card = document.createElement("div");
    card.className = "attraction-card";

    const truncated = truncateText(attraction.description);
    const needsSeeMore = attraction.description.length > MAX_DESC_LENGTH;

    card.innerHTML = `
      <img src="${attraction.image}" alt="${attraction.title}" loading="lazy">
      <h2>${attraction.title}</h2>
      <p>${truncated}${
      needsSeeMore
        ? ` <button class="see-more" type="button" data-idx="${index}">(see more)</button>`
        : ""
    }</p>
      <a href="${attraction.link}" target="_blank" rel="noopener">Visit Site</a>
    `;

    container.appendChild(card);
  });

  // Event delegation for see-more buttons
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("see-more")) {
      const idx = parseInt(e.target.dataset.idx, 10);
      openModal(idx);
    }
  });
})();
