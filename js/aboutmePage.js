document.addEventListener("DOMContentLoaded", function () {
    const accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const content = button.nextElementSibling;

            button.classList.toggle("active");
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }

            document.querySelectorAll(".accordion-content").forEach((item) => {
                if (item !== content) {
                    item.style.display = "none";
                }
            });

            document.querySelectorAll(".accordion-button").forEach((btn) => {
                if (btn !== button) {
                    btn.classList.remove("active");
                }
            });
        });
    });

    const voices = [
        {
            id: 1,
            name: "Emily Johnson",
            quote: "Crafted With Love gave me the inspiration to create gorgeous new outfits out of my old clothing. I'm thrilled that their tutorials given me the courage to begin my do-it-yourself adventure."
        },
        {
            id: 2,
            name: "Michael Lee",
            quote: "This site has introduced me to creative and sustainable life! I now view commonplace objects differently and look for innovative ways to reuse and recycle them."
        },
        {
            id: 3,
            name: "Sophia Grace" ,
            quote: "Crafted With Love has been revolutionary for me as someone who enjoys making personalised presents. The concepts are original, and the detailed instructions make everything incredibly simple."
        }
    ];

    const inspirationList = document.querySelector(".inspiration-list");

    function renderVoices() {
        inspirationList.innerHTML = "";
        voices.forEach((voice, index) => {
            const card = `
                <div class="inspiration-card card mt-3" data-id="${voice.id}">
                    <div class="card-body">
                        <h5 class="card-title">${voice.name}</h5>
                        <p class="card-text">"${voice.quote}"</p>
                        <button class="btn btn-warning btn-edit" data-index="${index}">Edit</button>
                        <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
                    </div>
                </div>
            `;
            inspirationList.innerHTML += card;
        });
    }

    renderVoices();

    document.getElementById("add-voice").addEventListener("click", () => {
        const name = prompt("Enter Name:");
        const quote = prompt("Enter Quote or Inspiration:");
        if (name && quote) {
            const newVoice = {
                id: voices.length + 1,
                name,
                quote
            };
            voices.push(newVoice);
            toastr.success("Voice of Inspiration added successfully!");
            renderVoices();
        } else {
            toastr.error("Invalid input. Voice not added.");
        }
    });

    inspirationList.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("btn-edit")) {
            const voice = voices[index];
            const newName = prompt("Edit Name:", voice.name);
            const newQuote = prompt("Edit Quote:", voice.quote);
            if (newName && newQuote) {
                voice.name = newName;
                voice.quote = newQuote;
                toastr.success("Voice of Inspiration updated successfully!");
                renderVoices();
            } else {
                toastr.error("Edit canceled or invalid input.");
            }
        }
        if (event.target.classList.contains("btn-delete")) {
            const confirmed = confirm("Are you sure you want to delete this Voice of Inspiration?");
            if (confirmed) {
                voices.splice(index, 1);
                toastr.success("Voice of Inspiration deleted successfully!");
                renderVoices();
            }
        }
    });
});

$(document).ready(function () {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "showDuration": "500",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    $('form').on('submit', function (e) {
        e.preventDefault(); 

        const name = $('#contactName').val().trim();;
        const email = $('#contactEmail').val().trim();;
        const message = $('#contactMessage').val().trim();;

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
    const toggleButtons = document.querySelectorAll(".toggle-button");

    toggleButtons.forEach(button => {
        button.addEventListener("click", function () {
            const fullDesc = this.previousElementSibling;
            const shortDesc = fullDesc.previousElementSibling; 

            if (fullDesc.style.display === "none") {
                fullDesc.style.display = "block";
                shortDesc.style.display = "none";
                this.textContent = "Show Less";
            } else {
                fullDesc.style.display = "none";
                shortDesc.style.display = "block";
                this.textContent = "Show More";
            }
        });
    });
});