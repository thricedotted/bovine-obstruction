/* utility random functions */
function randRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function randChoice(array) {
  return array[randRange(0, array.length)]
}

function generatePlaceholderBullshit() {
  // get it??? """bull""" shit??????? tee hee :o)
  const verbs = ['Share', 'Type', 'Input', 'Jot', 'Write', 'Express']
  const adjs = [
    'innermost',
    'deepest',
    'most brilliant',
    'world-changing',
    'world-shaking',
    'industry disrupting',
    'naughtiest'
  ]
  const nouns = ['thoughts', 'wishes', 'dreams', 'feelings', 'words', 'ideas']
  return `${randChoice(verbs)} your ${randChoice(adjs)} ${randChoice(
    nouns
  )} here...`
}

function moo() {
  return `M${'O'.repeat(randRange(2, 7))}`
}

let nKeystrokes = 0
const growThreshold = 150

const body = document.querySelector('body')
const textarea = document.querySelector('textarea')

const cowPromise = fetch('/cows.json').then(res => res.json())

// just to, like, make it more interesting 
// aka lol i can't get away away from some kind of text generation in anything
textarea.setAttribute('placeholder', generatePlaceholderBullshit())

textarea.addEventListener('focus', () => {
  const header = document.querySelector('header')
  header.classList.add('fade')
})

textarea.addEventListener('keydown', e => {
  if (!nKeystrokes) {
    const brut = document.querySelector('.brutalist')
    brut.innerHTML = 'MOOtalist'
    brutalistChanged = true
  }

  nKeystrokes += 1

  if (nKeystrokes < growThreshold) {
    if (Math.random() < 0.02) {
      // The variable name `mooValue` is a pun on `newValue`
      // This means it's not just a bad variable name,
      // it's an *awful* one.
      const mooValue =
        textarea.value.substr(0, textarea.selectionStart) +
        moo() +
        textarea.value.substr(textarea.selectionEnd)

      textarea.value = mooValue
    }

    if (Math.random() < 0.2) {
      cowPromise.then(data => {
        const cowImages = data['images']

        const img = document.createElement('img')

        img.setAttribute('src', randChoice(cowImages))
        img.setAttribute('alt', 'Clip art of a cow.')

        const style = `
          position: absolute;
          left: ${randRange(0, 100)}%;
          top: ${randRange(0, 100)}%;
          width: ${randRange(20, 200)}px;
          transform: scale(${randChoice([1, -1])}) rotate(${Math.random()}turn);
          z-index: -1;
        `

        img.setAttribute('style', style)
        body.append(img)
      })
    }
  } 

  else if (nKeystrokes == growThreshold) {
    const desc = document.querySelector('header p')
    const descWords = desc.innerHTML.split(' ')
    let mooWords = ""
    for (let i = 0; i < descWords.length; i++) {
      mooWords += moo() + ' '
    }
    desc.innerHTML = mooWords

    const fullDiv = document.querySelector('full')
    const growImg = document.createElement('img')
    growImg.setAttribute('src', 'cow.jpg')
    growImg.setAttribute('style', 'width: 0px;')

    setInterval(() => {
      const prevStyle = window.getComputedStyle(growImg)
      const width = parseInt(prevStyle.width)

      growImg.setAttribute('style', `width: ${width + 1}px`)
    }, 25)

    full.setAttribute('style', 'z-index: 1')
    full.append(growImg)
  }

  else {
    e.preventDefault()

    const beforeCursor = textarea.value.substr(0, textarea.selectionStart)
    const afterCursor = textarea.value.substr(textarea.selectionEnd)

    if (beforeCursor.slice(-2) == 'OO') {
      const nextLetter = randChoice(['M', 'O', 'O'])
      textarea.value = `${beforeCursor}${nextLetter}${afterCursor}`
    } else {
      const nextLetter = 'O'
      textarea.value = `${beforeCursor}${nextLetter}${afterCursor}`
    }
  }


  if (Math.random() < 0.08) {
    cowPromise.then(data => {
      const cowSounds = data['sounds']

      const audio = document.createElement('audio')

      audio.setAttribute('src', randChoice(cowSounds))
      audio.setAttribute('autoplay', 'autoplay')

      const style = `display: none; width: 0; height: 0`
      audio.setAttribute('style', style)

      audio.addEventListener('ended', () => { audio.remove() })

      body.append(audio)
    })
  }
})
