const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg",
    "https://picsum.photos/seed/picsum/200/300" // Duplicate image
];

// Shuffle function to randomize the order of images
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the images when the page loads
shuffle(images);

// Get the image container from the DOM
const container = document.getElementById('image-container');

// Create image elements and add click event listeners
images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = `img${index}`; // Assigning a class name for testing
    img.addEventListener('click', handleImageClick);
    container.appendChild(img);
});

let selectedImages = [];

// Handle image click events
function handleImageClick(event) {
    const img = event.target;
    if (selectedImages.length < 2 && !selectedImages.includes(img)) {
        selectedImages.push(img);
        img.classList.add('selected'); // Highlight the selected image

        if (selectedImages.length === 1) {
            document.getElementById('reset').style.display = 'block'; // Show reset button
        } else if (selectedImages.length === 2) {
            document.getElementById('verify').style.display = 'block'; // Show verify button
        }
    }
}

// Reset functionality
document.getElementById('reset').addEventListener('click', () => {
    selectedImages.forEach(img => img.classList.remove('selected')); // Remove highlights
    selectedImages = [];
    document.getElementById('reset').style.display = 'none'; // Hide reset button
    document.getElementById('verify').style.display = 'none'; // Hide verify button
    document.getElementById('para').textContent = ''; // Clear result message
});

// Verification functionality
document.getElementById('verify').addEventListener('click', () => {
    if (selectedImages[0].src === selectedImages[1].src) {
        document.getElementById('para').textContent = "You are a human. Congratulations!";
    } else {
        document.getElementById('para').textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    document.getElementById('verify').style.display = 'none'; // Hide verify button
});
describe('robot blocker works correctly', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); // Ensure this URL is correct
    });

    it('checks if images are there', () => {
        cy.get('img').should('have.length', 6); // Check if there are 6 images
    });

    it('checks if reset button is shown', () => {
        cy.get('#reset').should('not.be.visible'); // Initially, the reset button should not be visible
        cy.get('img').first().click(); // Simulate clicking the first image
        cy.get('#reset').should('be.visible'); // Now it should be visible
    });

    it('checks if verify button is shown', () => {
        cy.get('img').first().click(); // Click the first image
        cy.get('img').eq(1).click(); // Click the second image
        cy.get('#verify').should('be.visible'); // Verify button should be visible now
    });
});