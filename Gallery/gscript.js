const imageInput = document.getElementById('imageInput');
const viewerImage = document.getElementById('viewerImage');
const closeViewer = document.getElementById('closeViewer');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let images = [];
let currentIndex = 0;

// Handle image selection
imageInput.addEventListener('change', (event) => {
    images = Array.from(event.target.files).map(file => URL.createObjectURL(file));
    if (images.length > 0) {
        showImage(0);
    }
});

// Show the selected image in the viewer
function showImage(index) {
    if (images[index]) {
        viewerImage.src = images[index];
        currentIndex = index;
        document.querySelector('.image-viewer').classList.add('show');
    } else {
        console.error("Image at index " + index + " not found.");
    }
}

// Close the image viewer
closeViewer.addEventListener('click', () => {
    document.querySelector('.image-viewer').classList.remove('show');
});

// Show previous image
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
});

// Show next image
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
});
