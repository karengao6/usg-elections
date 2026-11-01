const candidates = [
  {
    id: 1,
    name: 'First Last',
    year: 'Junior',
    major: 'English',
    slogan: '2–3 word slogan?',
    summary: 'Filler filler filler filler. Person proposes blah blah blah, more text and more text.',
    background: '<background for the English junior candidate>',
    proposals: '<proposals from the English junior candidate>',
    progress: '<progress measures from the English junior candidate>',
    endorsed: true,
  },
  {
    id: 2,
    name: 'First Last',
    year: 'Junior',
    major: 'SPIA',
    slogan: '2–5 word slogan?',
    summary: 'Brief blurb. Brief blurb. Brief blurb. Brief blurb. Brief blurb. Brief blurb.',
    background: '<background for the SPIA junior candidate>',
    proposals: '<proposals from the SPIA junior candidate>',
    progress: '<progress measures from the SPIA junior candidate>',
    endorsed: false,
  },
  {
    id: 3,
    name: 'First Last',
    year: 'Senior',
    major: 'Sociology',
    slogan: '2–5 word slogan?',
    summary: 'Filler filler filler filler. Person proposes blah blah blah, more text and more text.',
    background: '<background for the Sociology senior candidate>',
    proposals: '<proposals from the Sociology senior candidate>',
    progress: '<progress measures from the Sociology senior candidate>',
    endorsed: false,
  },
  {
    id: 4,
    name: 'First Last',
    year: 'Senior',
    major: 'Economics',
    slogan: '2–5 word slogan?',
    summary: 'Filler filler filler filler. Person proposes blah blah blah, more text and more text.',
    background: '<background for the Economics senior candidate>',
    proposals: '<proposals from the Economics senior candidate>',
    progress: '<progress measures from the Economics senior candidate>',
    endorsed: true,
  },
  {
    id: 5,
    name: 'First Last',
    year: 'Junior',
    major: 'Psychology',
    slogan: '2–5 word slogan?',
    summary: 'Filler filler filler filler. Person proposes blah blah blah and more text.',
    background: '<background for the Psychology junior candidate>',
    proposals: '<proposals from the Psychology junior candidate>',
    progress: '<progress measures from the Psychology junior candidate>',
    endorsed: true,
  },
]

const candidateGrid = document.querySelector('#candidate-grid')
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
      <div class="portrait" aria-hidden="true">
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
      <h4>${candidate.slogan}</h4>
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
  const profileStatusMark = document.querySelector('#profile-status-mark')
  const profileStatusSymbol = document.querySelector('#profile-status-symbol')
  profileStatusMark.classList.toggle('is-endorsed', candidate.endorsed)
  profileStatusMark.classList.toggle('not-endorsed', !candidate.endorsed)
  profileStatusSymbol.src = `/assets/${candidate.endorsed ? 'ab01d.svg' : '7836e.svg'}`
  setProfileText('#profile-title', candidate.name)
  setProfileText('#profile-slogan', candidate.slogan)
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

candidates.forEach((candidate) => {
  candidateGrid.append(createCandidateCard(candidate))
})

closeProfileButton.addEventListener('click', closeProfile)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !profileModal.hidden) {
    closeProfile()
  }
})
