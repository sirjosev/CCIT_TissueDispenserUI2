import { db, collection, getDocs } from './firebase';

const tissueDispensers = [
  { id: 'Lt1A01', status: 'HABIS', location: 'Lantai 1 A 02' },
  { id: 'Lt2A01', status: 'TERSEDIA', location: 'Lantai 2 A 01' },
  { id: 'Lt2B01', status: 'HABIS', location: 'Lantai 2 B 01' },
  // Add more dispensers here...
];

const cardContainer = document.getElementById('cardContainer');

function createCard(dispenser) {
  const card = `
    <div class="col">
      <div class="card shadow-sm">
        <svg class="bd-placeholder-img card-img-top" width="100%" height="225">
          <image xlink:href="${dispenser.status === 'TERSEDIA' ? '../assets/brand/toilet.svg' : ''}" width="100%" height="100%"/>
        </svg>
        <div class="card-body">
          <p class="card-text">${dispenser.status}</p>
          <small class="text-body-secondary">${dispenser.location}</small>
        </div>
      </div>
    </div>
  `;
  return card;
}

function displayCards(dispensers) {
  cardContainer.innerHTML = ''; // Clear the container
  dispensers.forEach(dispenser => {
    cardContainer.innerHTML += createCard(dispenser);
  });
}

async function fetchDispensers() {
  const dispensersRef = collection(db, 'tissue_dispensers');

  try {
    const snapshot = await getDocs(dispensersRef);
    const updatedDispensers = [];
    snapshot.forEach(doc => {
      updatedDispensers.push(doc.data());
    });
    displayCards(updatedDispensers);
  } catch (error) {
    console.error("Error fetching dispensers:", error);
  }
}

displayCards(tissueDispensers);
setInterval(fetchDispensers, 5000);

export { createCard, displayCards, fetchDispensers };