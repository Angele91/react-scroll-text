import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class ScrollText extends React.Component {

  static propTypes = {
    speed: PropTypes.number,
    children: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['scroll', 'pingpong']),
    infinite: PropTypes.boolean
  }

  static defaultProps = {
    speed: 100
  }

  handleDurationUpdate = () => {
    if (this.textRef && (
      this.state.clientWidth !== this.textRef.clientWidth ||
      this.state.scrollWidth !== this.textRef.scrollWidth
    )) {
      this.setState({
        clientWidth: this.textRef.clientWidth,
        scrollWidth: this.textRef.scrollWidth,
        duration: (this.textRef.clientWidth + this.textRef.scrollWidth) / this.props.speed
      })
    }
  }

  constructor(props) {
    super()
    this.state = {
      clientWidth: 0,
      scrollWidth: 0,
      duration: 5
    }
  }

  componentDidMount() {
    this.handleDurationUpdate()
  }

  componentDidUpdate() {
    this.handleDurationUpdate()
  }

  render() {
    const {
      clientWidth,
      scrollWidth,
      duration
    } = this.state

    const {
      mode,
      infinite
    } = this.props;

    const Container = styled.div`
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      width: 100%;
    `

    const ScrollText = styled.div`
      animation: ${scrollWidth > clientWidth ? `${mode} ${duration}s linear ${infinite ? 'infinite' : ''}` : 'none'};
      animation-fill-mode: ${inifine ? 'forwards' : 'both'};

      @keyframes scroll {
          0% {
              transform: translateX(${clientWidth}px);
          }
          100% {
              transform: translateX(-${scrollWidth}px);
          }
      }

      @keyframes pingpong {
        0% {
            transform: translateX(${clientWidth}px);
        }

        50% {
            transform: translateX(-${scrollWidth}px);
        }
        100% {
            transform: translateX(${scrollWidth}px);
        }
    }
  `

    return (
      <Container {...this.props}>
        <ScrollText ref={e => { this.textRef = e }}>
          {this.props.children}
        </ScrollText>
      </Container>
    )
  }
}
