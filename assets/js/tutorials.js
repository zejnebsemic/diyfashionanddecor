function viewMore(imgSrc, title, longDescription) {
    const url = `tutorialdetails.html?imgSrc=${encodeURIComponent(imgSrc)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(longDescription)}`;
    window.open(url, '_blank'); 
}

$(document).ready(function () {
    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: true,
        progressBar: true,
        positionClass: "toast-top-right",
        preventDuplicates: true,
        showDuration: "500",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    };

    $('form').on('submit', function (e) {
        e.preventDefault();

        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        const message = $('#contactMessage').val().trim();

        if (name && email && message) {
            toastr.success("Your message has been sent successfully!");
            $('#contactName').val('');
            $('#contactEmail').val('');
            $('#contactMessage').val('');
        } else {
            toastr.error("All fields are required. Please complete the form.");
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const themeSelector = document.getElementById('theme-selector');
    const savedTheme = localStorage.getItem('theme') || 'default';

    document.body.className = `${savedTheme}-theme`;
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', function () {
        const selectedTheme = themeSelector.value;

        document.body.className = '';
        document.body.classList.add(`${selectedTheme}-theme`);

        localStorage.setItem('theme', selectedTheme);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.querySelector(".video-container");

    fetch("../assets/data/videos.json")
        .then(response => response.json())
        .then(videos => {
            const groupedVideos = videos.reduce((groups, video) => {
                if (!groups[video.category]) {
                    groups[video.category] = [];
                }
                groups[video.category].push(video);
                return groups;
            }, {});

            for (const [category, videos] of Object.entries(groupedVideos)) {
                const categorySection = document.createElement("div");
                categorySection.classList.add("category-section");

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category;
                categoryTitle.classList.add("category-title");
                categorySection.appendChild(categoryTitle);

                const videosWrapper = document.createElement("div");
                videosWrapper.classList.add("videos-wrapper");

                videos.forEach(video => {
                    const videoElement = document.createElement("div");
                    videoElement.classList.add("video-wrapper");
                    videoElement.innerHTML = `
                        <video controls>
                            <source src="${video.source}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <p>${video.description}</p>
                    `;
                    videosWrapper.appendChild(videoElement);
                });

                categorySection.appendChild(videosWrapper);
                videoContainer.appendChild(categorySection);
            }
        })
        .catch(error => console.error("Error loading videos:", error));
});
