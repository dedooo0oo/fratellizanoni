const gallery = document.querySelector('.gallery');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

let currentImageIndex;

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        currentImageIndex = Array.from(gallery.children).indexOf(e.target);
        showImage();
    }
});

lightbox.addEventListener('click', (e) => {
    if (e.target.classList.contains('lightbox') || e.target.classList.contains('close-btn')) {
        lightbox.style.display = 'none';
    } else {
        showNextImage();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        }
    }
});

function showImage() {
    const imgSrc = gallery.children[currentImageIndex].src;
    lightbox.innerHTML = `<span class="close-btn">&times;</span><img src="${imgSrc}" alt="enlarged image">`;
    lightbox.style.display = 'flex';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % gallery.children.length;
    showImage();
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + gallery.children.length) % gallery.children.length;
    showImage();
}
function showImage() {
    const imgSrc = gallery.children[currentImageIndex].src;
    lightbox.innerHTML = `
        <span class="close-btn">&times;</span>
        <div class="image-container">
            <img src="${imgSrc}" alt="enlarged image">
            <div class="button-container">
                <button class="nav-btn prev-btn">Previous</button>
                <button class="nav-btn next-btn">Next</button>
                <button class="save-btn">Save Image</button>
            </div>
        </div>
    `;
    lightbox.style.display = 'flex';

    const saveButton = lightbox.querySelector('.save-btn');
    saveButton.addEventListener('click', () => {
        saveImage(imgSrc);
    });

    const prevButton = lightbox.querySelector('.prev-btn');
    prevButton.addEventListener('click', () => {
        showPreviousImage();
    });

    const nextButton = lightbox.querySelector('.next-btn');
    nextButton.addEventListener('click', () => {
        showNextImage();
    });
}

function saveImage(imgSrc) {
    // Create a link element
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = 'image.jpg'; // You can customize the filename if needed
    link.target = '_blank';

    // Trigger a click event on the link to initiate the download
    const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
    });

    link.dispatchEvent(clickEvent);
}
gallery.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'IMG') {
        lightbox.style.display = 'none';
    }
});

gallery.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        currentImageIndex = Array.from(gallery.children).indexOf(e.target);
        showImage();
    }
});

