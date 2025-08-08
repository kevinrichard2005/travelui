 document.addEventListener("DOMContentLoaded", () => {
 const stays = [
  {
    id: 7,
    name: "Santorini Cliff House",
    city: "Santorini",
    country: "Greece",
    lat: 36.3932,
    lng: 25.4615,
    price: 135,
    rating: 4.8,
    tags: ["Sea View", "Luxury", "Couples"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop"
  },

  {
    id: 2,
    name: "Paris City Loft",
    city: "Paris",
    country: "France",
    lat: 48.8566,
    lng: 2.3522,
    price: 120,
    rating: 4.8,
    tags: ["City View", "Near Metro", "Kitchen"],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Goa Beach Shack",
    city: "Goa",
    country: "India",
    lat: 15.2993,
    lng: 74.1240,
    price: 55,
    rating: 4.4,
    tags: ["Beachfront", "Café", "Scooter Rent"],
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Swiss Alps Chalet",
    city: "Zermatt",
    country: "Switzerland",
    lat: 46.0207,
    lng: 7.7491,
    price: 150,
    rating: 4.9,
    tags: ["Mountain", "Fireplace", "Breakfast"],
    image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Dubai Marina Suite",
    city: "Dubai",
    country: "UAE",
    lat: 25.2048,
    lng: 55.2708,
    price: 130,
    rating: 4.5,
    tags: ["Skyline", "Gym", "Pool"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop"
  }
 ];


    const cardsEl = document.getElementById('cards');
    const locInput = document.getElementById('locationInput');

    function renderCards(list){
      cardsEl.innerHTML = '';
      list.forEach(s => {
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <div class="card-img">
            <img src="${s.image}" alt="${s.name}">
            <span class="chip badge"><i class="fa-solid fa-location-dot"></i> ${s.city}</span>
          </div>
          <div class="card-body">
            <div class="card-title">
              <h3>${s.name}</h3>
              <div class="rating"><i class="fa-solid fa-star" style="color:#FBBF24"></i> ${s.rating}</div>
            </div>
            <div class="card-meta">${s.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div>
            <div class="card-actions">
              <div class="price">₹ ${(s.price * 83).toLocaleString('en-IN')} / night</div>
              <button class="book-btn"><i class="fa-solid fa-bolt"></i> Book now</button>
            </div>
          </div>
        `;
        cardsEl.appendChild(card);
      });
    }

    const map = L.map('map', { zoomControl: true, scrollWheelZoom: false });
   L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap, CartoDB'
}).addTo(map);

    function addMarkers(list){
      const markers = [];
      list.forEach(s => {
        const marker = L.marker([s.lat, s.lng]).addTo(map);
        marker.bindPopup(`<strong>${s.name}</strong><br>${s.city}, ${s.country}`);
        markers.push(marker);
      });
      if(markers.length){
        const bounds = L.latLngBounds(markers.map(m => m.getLatLng()));
        map.fitBounds(bounds, { padding:[30,30] });
      } else {
        map.setView([20.5937, 78.9629], 4);
      }
    }

    function filterData(){
      const q = locInput.value.trim().toLowerCase();
      return stays.filter(s =>
        !q || s.city.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
      );
    }

    document.getElementById('searchForm').addEventListener('submit', e => {
      e.preventDefault();
      const list = filterData();
      renderCards(list);
      addMarkers(list);
    });

    document.querySelectorAll('.hint .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        locInput.value = chip.textContent.trim();
        const list = filterData();
        renderCards(list);
        addMarkers(list);
      });
    });

    renderCards(stays);
    addMarkers(stays);
});