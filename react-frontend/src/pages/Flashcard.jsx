import React from 'react';
import "../assets/styles/Flashcard.css";
import { Link } from 'react-router-dom';

class Flashcards extends React.Component{
  constructor() {
    super();
    this.state = {
      cards: [
        { front: "ひがい (被害)", back: "thiệt hại, tổn thất" },
        { front: "こくど (国土)", back: "lãnh thổ quốc gia" },
        { front: "りくち(陸地)", back: "lục địa" },
        { front: "たった", back: "chỉ, mỗi" },
        { front: "ひじょう(非常)", back: "khẩn cấp,cấp bách" },
      ],
    };
  }
  render() {
    return (
      <div className="flashcard">
        <header className="flashcard__header">
          <div className="flashcard__container">
            <div className="flashcard__1">
              <h5>Flashcard</h5>
            </div>
            <div className="flashcard__2">
			<h3 className="flashcard__progress">1 / 408</h3>
			<h3 className="flashcard__code" >
				<a className="flashcard__link" href="/">
					JPD113
				</a>
			</h3>
			</div>
            <div className="flashcard__3">
				<div className="flashcard__option">
					<button>Option</button>
				</div>
				<div className="flashcard__close">
				    <Link>&times;</Link>
				</div>
			</div>
          </div>
        </header>
		<Flashcard cards={this.state.cards} />
      </div>
    );
  }
}

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardIndex: 0,
    };
  }
  arrowHandler = (left) => {
    const { cardIndex } = this.state;
    if (left) {
      if (cardIndex - 1 >= 0) {
        this.setState({ cardIndex: cardIndex - 1 });
      }
    } else {
      if (cardIndex + 1 < this.props.cards.length) {
        this.setState({ cardIndex: cardIndex + 1 });
      }
    }
  };
  render() {
    return (
      <div className="flashcard-viewer noselect">
        <div className="flashcard-item-wrapper">
          <FlashcardItem
            cardIndex={this.state.cardIndex}
            card={this.props.cards[this.state.cardIndex]}
          />
        </div>
        <div>
          <NavButtons
            arrowHandler={this.arrowHandler}
            cardIndex={this.state.cardIndex}
            cardLength={this.props.cards.length}
          />
        </div>
      </div>
    );
  }
}

class FlashcardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      flipStyle: { transition: "transform 0.5s" },
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cardIndex !== this.props.cardIndex) {
      this.setState({
        flipped: false,
        flipStyle: {},
      });
    }
  }
  clickHandler = () => {
    this.setState({
      flipped: !this.state.flipped,
      flipStyle: { transition: "transform 0.5s" },
    });
  };
  render() {
    const rotation = this.state.flipped ? 180 : 0;
    const frontStyle = {
      ...this.state.flipStyle,
      transform: `rotateX(${rotation}deg)`,
    };
    const backStyle = {
      ...this.state.flipStyle,
      transform: `rotateX(${180 + rotation}deg)`,
    };
    return (
      <div className="flashcard-item" onClick={() => this.clickHandler()}>
        <div className="flashcard-item-inner" style={frontStyle}>
          {this.props.card.front}
        </div>
        <div className="flashcard-item-inner" style={backStyle}>
          {this.props.card.back}
        </div>
      </div>
    );
  }
}

export const NavButtons = (props) => {
  const leftStyle = props.cardIndex - 1 < 0 ? { opacity: 0.5 } : {};
  const rightStyle =
    props.cardIndex + 1 >= props.cardLength ? { opacity: 0.5 } : {};
  return (
    <div className="nav-buttons-wrapper">
      <div
        className="nav-arrow-btn"
        style={leftStyle}
        onClick={() => props.arrowHandler(true)}
      >
        &larr;
      </div>
      {`${props.cardIndex + 1}/${props.cardLength}`}
      <div
        className="nav-arrow-btn"
        style={rightStyle}
        onClick={() => props.arrowHandler(false)}
      >
        &rarr;
      </div>
    </div>
  );
};
export default Flashcards;
