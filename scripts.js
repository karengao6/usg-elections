const presCandidates = [
  {
    id: 1,
    name: 'Isaac Bernstein',
    photo: '/photos/isaac-bernstein.jpg',
    year: '2028',
    major: 'UNKNOWN',
    summary: 'Filler filler filler filler. Person proposes blah blah blah, more text and more text.',
    background: '<background for the English junior candidate>',
    proposals: '<proposals from the English junior candidate>',
    progress: '<progress measures from the English junior candidate>',
    endorsed: true,
  },
  {
    id: 2,
    name: 'Marvel Jem Roth',
    year: 'Junior',
    major: 'SPIA',
    summary: 'Brief blurb. Brief blurb. Brief blurb. Brief blurb. Brief blurb. Brief blurb.',
    background: '<background for the SPIA junior candidate>',
    proposals: '<proposals from the SPIA junior candidate>',
    progress: '<progress measures from the SPIA junior candidate>',
    endorsed: false,
  },
]

const presidentGrid = document.querySelector('#president-grid')
const vicePresidentGrid = document.querySelector('#vice-president-grid')
const treasurerGrid = document.querySelector('#treasurer-grid')
const studentLifeGrid = document.querySelector('#student-life-grid')
const sustainabilityGrid = document.querySelector('#sustainability-grid')
const deiGrid = document.querySelector('#dei-grid')
const mentalHealthGrid = document.querySelector('#mental-health-grid')
const senator2028Grid = document.querySelector('#senator-2028-grid')
const senator2029Grid = document.querySelector('#senator-2029-grid')
const senator2030Grid = document.querySelector('#senator-2030-grid')
const academicsGrid = document.querySelector('#academics-grid')
const socialGrid = document.querySelector('#social-grid')
const campusCommunityGrid = document.querySelector('#campus-community-grid')

const profileModal = document.querySelector('#profile-modal')
const profileArticle = document.querySelector('.profile-article')
const closeProfileButton = document.querySelector('#close-profile')
let profileTrigger = null

function createCandidateCard(candidate) {
  const card = document.createElement('article')
  card.className = 'candidate-card'
  card.tabIndex = 0
  card.setAttribute('role', 'button')
  card.setAttribute('aria-haspopup', 'dialog')
  card.setAttribute('aria-label', `View ${candidate.name}'s candidate profile`)

  const symbolAsset = candidate.endorsed ? 'ab01d.svg' : '7836e.svg'

  card.innerHTML = `
    <div class="candidate-identity">
      <div class="portrait" aria-hidden="true" style="background-image: url('${candidate.photo}')">
        <div class="status-mark ${candidate.endorsed ? 'is-endorsed' : 'not-endorsed'}">
          <img class="status-symbol" src="/assets/${symbolAsset}" alt="" />
        </div>
      </div>
      <p class="candidate-office">USG PRESIDENT</p>
      <h3>${candidate.name}</h3>
      <p class="candidate-study">${candidate.year} · ${candidate.major}</p>
    </div>
    <img class="card-divider" src="/assets/8231d.svg" alt="" />
    <div class="candidate-summary">
      <p>${candidate.summary}</p>
    </div>
    <span class="read-profile">
      Read profile
      <img src="/assets/a03f5.svg" alt="" />
    </span>
  `

  card.addEventListener('click', () => {
    openProfile(candidate, card)
  })

  card.addEventListener('keydown', (event) => {
    if (event.target === card && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      openProfile(candidate, card)
    }
  })

  return card
}

function setProfileText(selector, value) {
  document.querySelector(selector).textContent = value
}

function openProfile(candidate, trigger) {
  profileTrigger = trigger
  document.querySelector('.portrait-large').style.backgroundImage = `url('${candidate.photo}')`
  const profileStatusMark = document.querySelector('#profile-status-mark')
  const profileStatusSymbol = document.querySelector('#profile-status-symbol')
  profileStatusMark.classList.toggle('is-endorsed', candidate.endorsed)
  profileStatusMark.classList.toggle('not-endorsed', !candidate.endorsed)
  profileStatusSymbol.src = `/assets/${candidate.endorsed ? 'ab01d.svg' : '7836e.svg'}`
  setProfileText('#profile-title', candidate.name)
  setProfileText('#profile-study', `${candidate.year}, ${candidate.major}`)
  setProfileText('#profile-experience', `<experience for candidate ${candidate.id}>`)
  setProfileText('#profile-summary', candidate.summary)
  setProfileText('#profile-background', candidate.background)
  setProfileText('#profile-proposals', candidate.proposals)
  setProfileText('#profile-progress', candidate.progress)

  profileModal.hidden = false
  document.body.classList.add('modal-open')
  profileModal.scrollTop = 0
  profileArticle.scrollTop = 0
  closeProfileButton.focus()
}

function closeProfile() {
  profileModal.hidden = true
  document.body.classList.remove('modal-open')
  profileTrigger?.focus()
  profileTrigger = null
}

profileModal.addEventListener('click', (event) => {
  if (event.target === profileModal) {
    closeProfile()
  }
})

presCandidates.forEach((candidate) => {
  presidentGrid.append(createCandidateCard(candidate))
})

closeProfileButton.addEventListener('click', closeProfile)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !profileModal.hidden) {
    closeProfile()
  }
})
