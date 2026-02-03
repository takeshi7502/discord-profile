// API Configuration
const API_URL = 'http://localhost:3000/api/config';
let config = null;

// Fetch configuration from server
async function loadConfig() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success) {
            config = result.data;
            applyConfig();
        } else {
            console.error('Failed to load config:', result.error);
            // Fallback to hardcoded values if API fails
            useFallbackConfig();
        }
    } catch (error) {
        console.error('Error fetching config:', error);
        // Fallback to hardcoded values if API fails
        useFallbackConfig();
    }
}

// Apply configuration to the page
function applyConfig() {
    if (!config) return;

    // Update Profile Info
    updateProfile();

    // Update Images
    updateImages();

    // Update Social Links
    updateSocialLinks();

    // Setup Auto-rotation
    setupAutoRotation();

    // Update Audio
    updateAudio();
}

function updateProfile() {
    const { profile } = config;

    // Update display name
    const displayNameEl = document.querySelector('.display-name');
    if (displayNameEl) displayNameEl.textContent = profile.displayName;

    // Update username
    const usernameEl = document.querySelector('.username');
    if (usernameEl) usernameEl.textContent = profile.username;

    // Update pronouns
    const pronounsEl = document.querySelector('.pronouns');
    if (pronounsEl) pronounsEl.textContent = profile.pronouns;

    // Update bio - this one is more complex as it contains HTML
    // We'll just update the first text content
    const bioEl = document.querySelector('.about-me');
    if (bioEl) {
        // Keep the existing HTML structure but update the main text
        const firstTextNode = Array.from(bioEl.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if (firstTextNode) {
            firstTextNode.textContent = profile.bio;
        }
    }
}

function updateImages() {
    const { images } = config;

    // Update avatar
    const avatarEl = document.getElementById('avatar-image');
    if (avatarEl && images.avatar) avatarEl.src = images.avatar;

    // Update effect
    const effectEl = document.getElementById('effect-image');
    if (effectEl && images.effect) effectEl.src = images.effect;

    // Update banner (initial)
    const bannerEl = document.getElementById('banner-image');
    if (bannerEl && images.banners && images.banners.length > 0) {
        bannerEl.src = images.banners[0];
    }

    // Update status
    const statusEl = document.getElementById('status-image');
    if (statusEl && images.status) statusEl.src = images.status;

    // Update decoration (initial)
    const decorationEl = document.getElementById('avatar-decoration');
    if (decorationEl && images.decorations && images.decorations.length > 0) {
        decorationEl.src = './data/decoration/' + images.decorations[0];
    }
}

function updateSocialLinks() {
    const { socialLinks } = config;
    if (!socialLinks || socialLinks.length === 0) return;

    const socialsContainer = document.querySelector('.socials');
    if (!socialsContainer) return;

    // Clear existing social links (but keep the structure)
    const columns = socialsContainer.querySelectorAll('.column');
    columns.forEach(col => col.innerHTML = '');

    // Add social links (distribute between two columns)
    socialLinks.forEach((link, index) => {
        const columnIndex = index % 2;
        const column = columns[columnIndex];

        if (column) {
            const linkEl = document.createElement('a');
            linkEl.className = 'platform';
            linkEl.href = link.url;
            linkEl.rel = 'noreferrer noopener';
            linkEl.target = '_blank';

            linkEl.innerHTML = `
                <img class="platform-icon" alt=" " aria-hidden="true" src="${link.icon}" />
                <div class="text-base platform-username">${link.username}</div>
                <div>
                    <img alt=" " id="link" aria-hidden="true" src="./data/icons/link.svg" class="connect" />
                </div>
            `;

            column.appendChild(linkEl);
        }
    });
}

function setupAutoRotation() {
    const { images, settings } = config;

    // Setup decoration rotation
    if (images.decorations && images.decorations.length > 0) {
        const decorationImage = document.getElementById('avatar-decoration');
        if (decorationImage) {
            setInterval(() => {
                const randomImage = images.decorations[Math.floor(Math.random() * images.decorations.length)];
                decorationImage.src = './data/decoration/' + randomImage;
            }, settings.decorationInterval || 5000);
        }
    }

    // Setup banner rotation
    if (images.banners && images.banners.length > 0) {
        const bannerImage = document.getElementById('banner-image');
        if (bannerImage) {
            setInterval(() => {
                const randomImage = images.banners[Math.floor(Math.random() * images.banners.length)];
                bannerImage.src = randomImage;
            }, settings.bannerInterval || 10000);
        }
    }
}

function updateAudio() {
    const { settings } = config;
    if (!settings) return;

    const audioPlayer = document.querySelector('#audio-player audio');
    if (audioPlayer) {
        // Update audio source if provided
        if (settings.audioFile) {
            const source = audioPlayer.querySelector('source');
            if (source) {
                source.src = settings.audioFile;
                audioPlayer.load();
            }
        }

        // Update volume
        if (settings.audioVolume !== undefined) {
            audioPlayer.volume = settings.audioVolume;
        }
    }
}

function useFallbackConfig() {
    console.log('Using fallback configuration - original hardcoded values');
    // Original scripts will handle this
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    loadConfig();
});
