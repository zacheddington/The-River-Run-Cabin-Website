const qaList = [
  {
    q: "Is there an experienced river guide you would recommend?",
    a: 'We recommend visiting <a href="https://threeriversranch.com/" target="_blank" rel="noopener">Three Rivers Ranch</a> for guide information.',
  },
  {
    q: "Where can I rent boats, tubes, or motorsports equipment?",
    a: `
      <table class="rental-table">
        <tr><td>Float Boat Rentals</td><td><a href="https://millerdriftboats.com/" target="_blank" rel="noopener">Miller Drift Boats</a></td><td>Ashton</td></tr>
        <tr><td>Kayak, Tube, and Raft Rentals</td><td><a href="https://rapidriverrentals.com/" target="_blank" rel="noopener">Rapid River Rentals</a></td><td>Ashton</td></tr>
        <tr><td>Motorsport Rentals (ATV/UTV/Snowmobile)</td><td><a href="https://www.gspikeidaho.com/" target="_blank" rel="noopener">Goldenspike Powersports</a></td><td>Ashton</td></tr>
        <tr><td></td><td><a href="https://islandparkadventures.com/" target="_blank" rel="noopener">Island Park Adventures</a></td><td>Island Park</td></tr>
      </table>
      <div style="font-size:0.95em;margin-top:0.5em;">Note: Machines are not provided with your cabin rental. Rentals are available from the providers above.</div>
    `,
  },
  {
    q: "Where are the nearest airports?",
    a: `<table class="airport-table">
      <tr><td>Idaho Falls (IDA)</td><td>54 miles</td><td>1h</td></tr>
      <tr><td>Pocatello (PIC)</td><td>111 miles</td><td>1h 40m</td></tr>
      <tr><td>Jackson, WY (JAC)</td><td>86 miles</td><td>1h 50m</td></tr>
      <tr><td>Bozeman, MT (BZN)</td><td>143 miles</td><td>2h 40m</td></tr>
      <tr><td>Boise (BOI)</td><td>334 miles</td><td>4h 40m</td></tr>
      <tr><td>Yellowstone Airport (WYS)</td><td>55 miles</td><td>1h (Summer Only!)</td></tr>
    </table>`,
  },
  {
    q: "Local Restaurants?",
    a: `
      <table class="restaurant-table">
        <tr><td>Ashton (4 miles)</td><td><a href="https://ashtonidaho.com/membership/dining/big-juds" target="_blank" rel="noopener">Big Jud's</a></td></tr>
        <tr><td></td><td><a href="https://www.511mainashton.com/" target="_blank" rel="noopener">511 Main Fountain & Pizzeria</a></td></tr>
        <tr><td></td><td><a href="https://ashtonidaho.com/membership/dining/el-rincon" target="_blank" rel="noopener">El Rincon Mexican</a></td></tr>
        <tr><td></td><td><a href="https://trailsinnrestaurantashton.com/" target="_blank" rel="noopener">Trails Inn</a></td></tr>
        <tr><td></td><td><a href="https://frostopdrivein.com/" target="_blank" rel="noopener">Frost Top Drive-In</a></td></tr>
        <tr><td></td><td><a href="https://restaurants.subway.com/united-states/id/ashton/921-north-hwy-20" target="_blank" rel="noopener">Subway & Hot Stuff Pizza</a></td></tr>
        <tr><td></td><td><a href="https://www.davesjubilee.com/" target="_blank" rel="noopener">Dave's Market & Deli</a></td></tr>
        <tr><td>St. Anthony (18 miles)</td><td><a href="http://fongcafe.top/" target="_blank" rel="noopener">Fong's Cafe</a></td></tr>
        <tr><td></td><td><a href="https://www.crissyschicken.com/" target="_blank" rel="noopener">Crissy's Chicken To Go</a></td></tr>
        <tr><td></td><td><a href="https://soulflypizza.com/" target="_blank" rel="noopener">Soul Fly Pizza</a></td></tr>
        <tr><td>Island Park (20-30 miles)</td><td><a href="https://trouthunt.com/bar-grill/" target="_blank" rel="noopener">Last Chance Bar & Grill at TroutHunter</a></td></tr>
        <tr><td></td><td><a href="https://www.cafesabor.com/" target="_blank" rel="noopener">Cafe Sabor</a></td></tr>
        <tr><td></td><td><a href="https://www.lakesidelodgeandresort.com/restaurant" target="_blank" rel="noopener">Lakeside Lodge Restaurant and Bar</a></td></tr>
        <tr><td></td><td><a href="https://www.pondslodge.com/menus/" target="_blank" rel="noopener">Pond's Lodge Restaurant</a></td></tr>
      </table>
    `,
  },
  {
    q: "Fly Shops?",
    a: `
      <table class="flyshop-table">
        <tr><td>TRR Outfitters Fly Shop</td><td>Ashton</td><td>208-652-3008</td></tr>
        <tr><td>TRR Outfitters Fly Shop</td><td>Island Park</td><td>208-558-7501</td></tr>
        <tr><td>Trout Hunter</td><td>Island Park</td><td>208-558-8006</td></tr>
        <tr><td>Henry's Fork Anglers</td><td>Island Park</td><td>208-558-7525</td></tr>
      </table>
    `,
  },
];

const container = document.querySelector(".qa-list");
qaList.forEach((item) => {
  const div = document.createElement("div");
  div.className = "qa-item";
  let answerHtml = item.a;
  // Wrap tables in a scrollable div for mobile
  answerHtml = answerHtml.replace(
    /(<table[^>]*>.*?<\/table>)/gs,
    '<div class="table-scroll">$1</div>'
  );
  div.innerHTML = `<h2>${item.q}</h2><p>${answerHtml}</p>`;
  container.appendChild(div);
});
