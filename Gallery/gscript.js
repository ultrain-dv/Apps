const imageGrid = document.querySelector('.image-grid');
const imageViewer = document.getElementById('imageViewer');
const viewerImage = document.getElementById('viewerImage');
const closeViewer = document.getElementById('closeViewer');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let images = [
    'https://via.placeholder.com/500x300?text=Image+1',
    'https://via.placeholder.com/500x300?text=Image+2',
    'https://via.placeholder.com/500x300?text=Image+3',
    'https://via.placeholder.com/500x300?text=Image+4'
];

let currentIndex = 0;

// Function to open image viewer
function openViewer(index) {
    viewerImage.src = images[index];
    imageViewer.style.display = 'flex';
    currentIndex = index;
}

// Function to close image viewer
function closeViewerFunction() {
    imageViewer.style.display = 'none';
}

// Function to show previous image
function prevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    viewerImage.src = images[currentIndex];
}

// Function to show next image
function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    viewerImage.src = images[currentIndex];
}

// Render images in the grid
function renderImages() {
    imageGrid.innerHTML = '';
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Image ${index + 1}`;
        img.addEventListener('click', () => openViewer(index));
        imageGrid.appendChild(img);
    });
}

// Event listeners for navigation
closeViewer.addEventListener('click', closeViewerFunction);
prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

// Initialize the gallery
renderImages();
