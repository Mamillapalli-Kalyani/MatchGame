import {Component} from 'react'
import './App.css'

const tabsList = [
  {tabId: 'FRUIT', displayText: 'Fruits'},
  {tabId: 'ANIMAL', displayText: 'Animals'},
  {tabId: 'PLACE', displayText: 'Places'},
]

const imagesList = [
  {
    id: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '04ac6b9f-b7e7-45f7-a8fc-fd48f3f72526',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/panda-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/panda-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: 'a132f546-5b2b-4c0d-b9e4-e524bdf904cc',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/zebra-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/zebra-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: 'd89386da-94db-4275-9cb5-249c6e071a19',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/paris-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/paris-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: 'd810bbb0-1683-407a-8db6-898fe7b75782',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/giraffe-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/giraffe-thumbnail-img.png',
    category: 'ANIMAL',
  },
  {
    id: '176aab62-e86a-4ccd-8b89-5b83c3f02506',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/taj-mahal-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/taj-mahal-thumbnail-img.png',
    category: 'PLACE',
  },
  {
    id: '7a72c38e-a83d-48eb-b9ce-ae3c0361cc49',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/pineapple-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/pineapple-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '97a33ed5-98ed-4c95-a8f0-1595880b3b69',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/strawberry-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/strawberry-thumbnail-img.png',
    category: 'FRUIT',
  },
  {
    id: '49865ac4-b5e8-4d04-893b-d69ad6004da8',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/watermelon-img.png',
    thumbnailUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/watermelon-thumbnail-img.png',
    category: 'FRUIT',
  },
]

class App extends Component {
  state = {
    activeTab: 'FRUIT',
    score: 0,
    time: 60,
    isGameOver: false,
    matchImage: imagesList[0],
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    this.setState(prevState => {
      if (prevState.time === 1) {
        clearInterval(this.timerId)
        return {time: 0, isGameOver: true}
      }
      return {time: prevState.time - 1}
    })
  }

  changeTab = tabId => {
    this.setState({activeTab: tabId})
  }

  getRandomImage = () => {
    const {matchImage} = this.state
    let newImage

    do {
      const randomIndex = Math.floor(Math.random() * imagesList.length)
      newImage = imagesList[randomIndex]
    } while (newImage.id === matchImage.id)

    return newImage
  }

  // clickThumbnail = id => {
  //   const {matchImage} = this.state

  //   if (id === matchImage.id) {
  //     this.setState(prevState => ({
  //       score: prevState.score + 1,
  //       matchImage: this.getRandomImage(),
  //     }))
  //   } else {
  //     clearInterval(this.timerId)
  //     this.setState({isGameOver: true})
  //   }
  // }

  clickThumbnail = id => {
    const {matchImage} = this.state

    const clickedImage = imagesList.find(each => each.id === id)

    if (clickedImage.imageUrl === matchImage.imageUrl) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        matchImage: this.getRandomImage(),
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  playAgain = () => {
    clearInterval(this.timerId)
    this.setState({
      score: 0,
      time: 60,
      isGameOver: false,
      activeTab: 'FRUIT',
      matchImage: imagesList[0],
    })
    this.timerId = setInterval(this.tick, 1000)
  }

  render() {
    const {activeTab, score, time, isGameOver, matchImage} = this.state

    const filteredImages = imagesList.filter(
      each => each.category === activeTab,
    )

    return (
      <div>
        {/* NAVBAR */}
        <nav>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul>
            <li>
              <p>Score</p>
              <p>{score}</p>
            </li>
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
              />
              <p>{time} sec</p>
            </li>
          </ul>
        </nav>

        {!isGameOver ? (
          <>
            <img src={matchImage.imageUrl} alt="match" />

            {/* TABS */}
            <ul>
              {tabsList.map(tab => (
                <li key={tab.tabId} data-testid={`tab-${tab.tabId}`}>
                  <button
                    onClick={() => this.changeTab(tab.tabId)}
                    type="button"
                  >
                    {tab.displayText}
                  </button>
                </li>
              ))}
            </ul>

            {/* THUMBNAILS */}
            <ul>
              {filteredImages.map(img => (
                <li key={img.id} data-testid={`thumbnail-${img.id}`}>
                  <button
                    onClick={() => this.clickThumbnail(img.id)}
                    type="button"
                  >
                    <img src={img.thumbnailUrl} alt="thumbnail" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
            />
            <p>YOUR SCORE</p>
            <h1>{score}</h1>
            <button onClick={this.playAgain} type="button">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
              />
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default App
