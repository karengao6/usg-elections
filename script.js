const candidates = [
    {
        id: "president-1",
        section: "president",
        role: "President",
        name: "Candidate Name",
        tagline: "A concise summary of this candidate's platform and priorities.",
        bio: "Add the candidate's full statement here. Include their background, why they are running, what they hope to accomplish, and how they plan to work with students and administrators.",
        priorities: [
            "Priority one",
            "Priority two",
            "Priority three"
        ]
    },
    {
        id: "president-2",
        section: "president",
        role: "President",
        name: "Candidate Name",
        tagline: "A short introduction to the candidate's approach to student government.",
        bio: "Add the candidate's full statement here. Replace this placeholder with the candidate's verified responses and platform.",
        priorities: [
            "Priority one",
            "Priority two",
            "Priority three"
        ]
    },
    {
        id: "executive-1",
        section: "executive",
        role: "Executive Board",
        name: "Candidate Name",
        tagline: "A concise summary of the candidate's experience and goals.",
        bio: "Add the candidate's longer description here, including relevant experience and specific proposals.",
        priorities: [
            "Priority one",
            "Priority two"
        ]
    },
    {
        id: "executive-2",
        section: "executive",
        role: "Executive Board",
        name: "Candidate Name",
        tagline: "A concise summary of the candidate's experience and goals.",
        bio: "Add the candidate's longer description here, including relevant experience and specific proposals.",
        priorities: [
            "Priority one",
            "Priority two"
        ]
    },
    {
        id: "senate-1",
        section: "senate",
        role: "Senate",
        name: "Candidate Name",
        tagline: "A summary of the candidate's priorities for their class or constituency.",
        bio: "Add the candidate's longer description here. Explain the issues they want to address and how they plan to represent students.",
        priorities: [
            "Priority one",
            "Priority two"
        ]
    },
    {
        id: "senate-2",
        section: "senate",
        role: "Senate",
        name: "Candidate Name",
        tagline: "A summary of the candidate's priorities for their class or constituency.",
        bio: "Add the candidate's longer description here. Explain the issues they want to address and how they plan to represent students.",
        priorities: [
            "Priority one",
            "Priority two"
        ]
    }
];

const gridIds = {
    president: "president-grid",
    executive: "executive-grid",
    senate: "senate-grid"
};

const dialog = document.querySelector("#candidate-dialog");
const closeButton = document.querySelector(".dialog-close");
const menuButton = document.querySelector("#menu-icon");
const navLinks = document.querySelector("#nav-links");

/**
 * Create a clickable candidate card.
 */
function makeCard(candidate) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "candidate-card";
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute(
        "aria-label",
        `Read more about ${candidate.name}, ${candidate.role}`
    );

    const photo = document.createElement("span");
    photo.className = "photo-placeholder";
    photo.setAttribute("aria-hidden", "true");

    const body = document.createElement("span");
    body.className = "card-body";

    const role = document.createElement("span");
    role.className = "card-role";
    role.textContent = candidate.role;

    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = candidate.name;

    const tagline = document.createElement("span");
    tagline.className = "card-tagline";
    tagline.textContent = candidate.tagline;

    const link = document.createElement("span");
    link.className = "card-link";
    link.textContent = "Read candidate statement";

    body.append(role, name, tagline, link);
    card.append(photo, body);

    card.addEventListener("click", () => {
        openCandidate(candidate);
    });

    return card;
}

/**
 * Show the full candidate statement in the modal.
 */
function openCandidate(candidate) {
    document.querySelector("#dialog-role").textContent =
        candidate.role;

    document.querySelector("#dialog-name").textContent =
        candidate.name;

    document.querySelector("#dialog-tagline").textContent =
        candidate.tagline;

    document.querySelector("#dialog-bio").textContent =
        candidate.bio;

    const priorities = document.querySelector("#dialog-priorities");
    priorities.replaceChildren();

    candidate.priorities.forEach((priority) => {
        const item = document.createElement("li");
        item.textContent = priority;
        priorities.append(item);
    });

    dialog.showModal();
    closeButton.focus();
}

/**
 * Generate cards and hide empty sections.
 */
function renderCandidates() {
    Object.entries(gridIds).forEach(([section, gridId]) => {
        const grid = document.getElementById(gridId);

        if (!grid) return;

        const sectionCandidates = candidates.filter(
            (candidate) => candidate.section === section
        );

        sectionCandidates.forEach((candidate) => {
            grid.append(makeCard(candidate));
        });

        if (sectionCandidates.length === 0) {
            document.getElementById(section).hidden = true;
        }
    });
}

/**
 * Mobile navbar toggle.
 */
menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
});

/**
 * Close the mobile menu after selecting a section.
 */
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
    });
});

/**
 * Modal close controls.
 */
closeButton.addEventListener("click", () => {
    dialog.close();
});

// Clicking outside the modal content closes it.
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

// Escape closes the dialog.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog.open) {
        dialog.close();
    }
});

renderCandidates();