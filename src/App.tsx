import { useState, useEffect, useRef } from 'react'
import './App.css'

type Page = 'letter' | 'question' | 'reasons' | 'moreReasons' | 'whatIf' | 'please' | 'memories' | 'success'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('letter')
  const [letterOpened, setLetterOpened] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([])
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  // Continuous heart animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => {
        if (prev.length > 30) return prev.slice(-20)
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: -10,
            delay: Math.random() * 2,
            size: Math.random() * 0.5 + 0.8,
          },
        ]
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  // Sparkle effects
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles(prev => {
        if (prev.length > 20) return prev.slice(-15)
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 1,
          },
        ]
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // Particle effects for success page
  useEffect(() => {
    if (currentPage === 'success') {
      const interval = setInterval(() => {
        setParticles(prev => {
          if (prev.length > 100) return prev.slice(-80)
          return [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * 100,
              y: -10,
              delay: Math.random() * 2,
            },
          ]
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [currentPage])

  const handleYesClick = () => {
    setCurrentPage('memories')
    setTimeout(() => {
      setCurrentPage('success')
    }, 4000)
  }

  const handleNoClick = () => {
    setCurrentPage('reasons')
  }

  const handleBackToQuestion = () => {
    setCurrentPage('question')
  }

  const handleReasonsYes = () => {
    setCurrentPage('memories')
    setTimeout(() => {
      setCurrentPage('success')
    }, 4000)
  }

  const scrollToTopAndGoTo = (page: Page, delayMs = 450) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      setCurrentPage(page)
    }, delayMs)
  }

  const handleContinueThinking = () => {
    scrollToTopAndGoTo('moreReasons')
  }

  const handleMoreReasonsYes = () => {
    setCurrentPage('memories')
    setTimeout(() => {
      setCurrentPage('success')
    }, 4000)
  }

  const handleStillThinking = () => {
    scrollToTopAndGoTo('whatIf')
  }

  const handleWhatIfYes = () => {
    setCurrentPage('memories')
    setTimeout(() => {
      setCurrentPage('success')
    }, 4000)
  }

  const handleStillNotSure = () => {
    scrollToTopAndGoTo('please')
  }

  const handlePleaseYes = () => {
    setCurrentPage('memories')
    setTimeout(() => {
      setCurrentPage('success')
    }, 4000)
  }

  const handleLetterOpen = () => {
    if (letterOpened) return
    setLetterOpened(true)
    
    if (letterRef.current) {
      letterRef.current.classList.add('opening')
    }
    
    setTimeout(() => {
      setCurrentPage('question')
    }, 2000)
  }

  // Letter Opening Animation
  if (currentPage === 'letter') {
    return (
      <div className="app-container page-letter" ref={containerRef}>
        <div className="letter-sparkles">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        <div className="letter-container">
          <div 
            className={`letter-envelope ${letterOpened ? 'opening' : ''}`}
            ref={letterRef}
            onClick={handleLetterOpen}
          >
            <div className="envelope-flap"></div>
            <div className="envelope-body"></div>
            <div className="letter-paper">
              <div className="letter-lines"></div>
              <div className="letter-content">
                <div className="letter-date">February 2024</div>
                <div className="letter-greeting">My Dearest,</div>
                <div className="letter-body">
                  <p>I have something special to ask you...</p>
                </div>
                <div className="letter-signature">
                  <div className="letter-heart">💌</div>
                  <div className="letter-name">With all my love</div>
                </div>
              </div>
              <div className="letter-seal">💌</div>
            </div>
          </div>
          {!letterOpened && <p className="letter-hint">Tap to open</p>}
        </div>
      </div>
    )
  }

  // Question Page
  if (currentPage === 'question') {
    return (
      <div className="app-container page-question" ref={containerRef}>
        <div className="sparkle-container">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        <div className="heart-rain">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
                transform: `scale(${heart.size})`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div className="content fade-in">
          <div className="title-container">
            <div className="heart-decoration">💖</div>
            <h1 className="main-title">Will You Be My Valentine?</h1>
            <p className="subtitle">
              I've been thinking about this for a while, and I'd love to spend Valentine's Day with you.
            </p>
          </div>

          <div className="button-container">
            <button className="yes-button" onClick={handleYesClick}>
              Yes, I'd love to! 💕
            </button>
            <button className="no-button-static" onClick={handleNoClick}>
              Let me think... 🤔
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Reasons Page
  if (currentPage === 'reasons') {
    const reasons = [
      { icon: '💝', text: 'You make every day brighter' },
      { icon: '🌟', text: 'Your smile is my favorite thing' },
      { icon: '💕', text: 'I love spending time with you' },
      { icon: '🎁', text: 'You deserve the world' },
      { icon: '🌹', text: 'You make my heart skip a beat' },
    ]

    return (
      <div className="app-container page-reasons" ref={containerRef}>
        <div className="sparkle-container">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        <div className="heart-rain">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div key={currentPage} className="content page-enter">
          <div className="title-container">
            <h1 className="main-title">Wait, Let Me Tell You Why... 💭</h1>
            <p className="subtitle">Here are just a few reasons why I'd love to be your Valentine:</p>
          </div>

          <div className="reasons-list">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="reason-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className="reason-icon">{reason.icon}</span>
                <span className="reason-text">{reason.text}</span>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="yes-button" onClick={handleReasonsYes}>
              Okay, Yes! 💕
            </button>
            <button className="continue-button" onClick={handleContinueThinking}>
              Still thinking... 🤔
            </button>
            <button className="back-button" onClick={handleBackToQuestion}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // More Reasons Page
  if (currentPage === 'moreReasons') {
    const moreReasons = [
      { icon: '💖', text: 'Every moment with you is special' },
      { icon: '✨', text: 'You bring magic into my life' },
      { icon: '🌺', text: 'Your laugh is the best sound' },
      { icon: '💐', text: 'I want to make you happy' },
      { icon: '🎀', text: 'You mean everything to me' },
      { icon: '💗', text: 'I can\'t imagine Valentine\'s without you' },
    ]

    return (
      <div className="app-container page-reasons" ref={containerRef}>
        <div className="sparkle-container">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        <div className="heart-rain">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div key={currentPage} className="content page-enter">
          <div className="title-container">
            <h1 className="main-title">Okay, Here Are More Reasons... 💝</h1>
            <p className="subtitle">I have so many reasons why I want to be your Valentine:</p>
          </div>

          <div className="reasons-list">
            {moreReasons.map((reason, index) => (
              <div
                key={index}
                className="reason-item"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="reason-icon">{reason.icon}</span>
                <span className="reason-text">{reason.text}</span>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="yes-button" onClick={handleMoreReasonsYes}>
              Yes! I'm convinced! 💕
            </button>
            <button className="continue-button" onClick={handleStillThinking}>
              Still not sure... 🤷
            </button>
            <button className="back-button" onClick={() => setCurrentPage('reasons')}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // What If Page
  if (currentPage === 'whatIf') {
    const scenarios = [
      { icon: '🌅', text: 'What if we watch the sunset together?' },
      { icon: '🍫', text: 'What if I bring your favorite treats?' },
      { icon: '🎵', text: 'What if we dance to our favorite songs?' },
      { icon: '💌', text: 'What if I write you love letters?' },
      { icon: '🎨', text: 'What if we create beautiful memories?' },
    ]

    return (
      <div className="app-container page-reasons" ref={containerRef}>
        <div className="sparkle-container">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        <div className="heart-rain">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div key={currentPage} className="content page-enter">
          <div className="title-container">
            <h1 className="main-title">What If...? 💭</h1>
            <p className="subtitle">Just imagine what Valentine's Day could be like:</p>
          </div>

          <div className="reasons-list">
            {scenarios.map((scenario, index) => (
              <div
                key={index}
                className="reason-item"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="reason-icon">{scenario.icon}</span>
                <span className="reason-text">{scenario.text}</span>
              </div>
            ))}
          </div>

          <div className="button-container">
            <button className="yes-button" onClick={handleWhatIfYes}>
              That sounds amazing! Yes! 💕
            </button>
            <button className="continue-button" onClick={handleStillNotSure}>
              Hmm, still thinking... 🤔
            </button>
            <button className="back-button" onClick={() => setCurrentPage('moreReasons')}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Please Page
  if (currentPage === 'please') {
    return (
      <div className="app-container page-reasons" ref={containerRef}>
        <div className="sparkle-container">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${sparkle.delay}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
        <div className="heart-rain">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div key={currentPage} className="content page-enter">
          <div className="title-container">
            <div className="please-icon">🥺</div>
            <h1 className="main-title">Pretty Please? 🙏</h1>
            <p className="subtitle">
              I really, really want to be your Valentine.<br />
              It would mean the world to me! 💕
            </p>
          </div>

          <div className="please-content">
            <div className="please-message">
              <p>I promise to make it the most special day!</p>
              <p>Will you please say yes? 🥺💖</p>
            </div>
          </div>

          <div className="button-container">
            <button className="yes-button" onClick={handlePleaseYes}>
              Okay, Yes! You Win! 💕
            </button>
            <button className="back-button" onClick={() => setCurrentPage('whatIf')}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Memories Page (transition)
  if (currentPage === 'memories') {
    return (
      <div className="app-container page-memories" ref={containerRef}>
        <div className="heart-rain">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="floating-heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        <div className="content fade-in">
          <div className="title-container">
            <div className="success-icon">💖</div>
            <h1 className="main-title">This is going to be amazing! ✨</h1>
            <p className="subtitle">Get ready for the best Valentine's Day ever...</p>
          </div>
        </div>
      </div>
    )
  }

  // Success Page
  return (
    <div className="app-container page-success" ref={containerRef}>
      <div className="particle-container">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          >
            {['💕', '💖', '💗', '💝', '❤️', '✨', '🌟'][Math.floor(Math.random() * 7)]}
          </div>
        ))}
      </div>
      <div className="heart-rain">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      <div className="content fade-in">
        <div className="success-content">
          <div className="success-icon">💕</div>
          <h1 className="success-title">Yes! I'm So Happy! 🎉</h1>
          <p className="success-message">
            You just made my day!<br />
            I can't wait to celebrate Valentine's Day with you! ❤️
          </p>
          <div className="celebration-text">
            <p>This is going to be the best Valentine's Day ever! 🌹</p>
            <p>Thank you for saying yes! 💖</p>
            <div className="meetup-details">
              <p className="meetup-label">Meet me on</p>
              <p className="meetup-date">13th Feb at 8 AM</p>
              <p className="meetup-place">Zad al Baher Restaurant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
