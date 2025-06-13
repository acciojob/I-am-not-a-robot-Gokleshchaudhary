//your code here
const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg",
    "https://picsum.photos/seed/picsum/200/300" // Duplicate image
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(images);

const container = document.getElementById('image-container');
images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.id = `img${index}`;
    img.addEventListener('click', handleImageClick);
    container.appendChild(img);
});

let selectedImages = [];

function handleImageClick(event) {
    const img = event.target;
    if (selectedImages.length < 2 && !selectedImages.includes(img)) {
        selectedImages.push(img);
        img.classList.add('selected');

        if (selectedImages.length === 1) {
            document.getElementById('reset').style.display = 'block';
        } else if (selectedImages.length === 2) {
            document.getElementById('verify').style.display = 'block';
        }
    }
}

document.getElementById('reset').addEventListener('click', () => {
    selectedImages.forEach(img => img.classList.remove('selected'));
    selectedImages = [];
    document.getElementById('reset').style.display = 'none';
    document.getElementById('verify').style.display = 'none';
    document.getElementById('para').textContent = '';
});

document.getElementById('verify').addEventListener('click', () => {
    if (selectedImages[0].src === selectedImages[1].src) {
        document.getElementById('para').textContent = "You are a human. Congratulations!";
    } else {
        document.getElementById('para').textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    document.getElementById('verify').style.display = 'none';
});