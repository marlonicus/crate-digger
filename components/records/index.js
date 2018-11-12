import { Component, Fragment } from 'react'
import { Entity } from 'aframe-react'
import { partial } from 'ramda'
import { mapIndexed } from '../../utils/misc'

const baseRecordPosition = 0.22
const recordSize = 0.65

const RecordSleeveEntity = props => (
  <Entity
    geometry={{
      primitive: 'box',
      width: recordSize,
      height: recordSize,
      depth: 0.01
    }}
    position='0 0 0'
    rotation='0 0 0'
    {...props}
  />
)

const CloseButton = props => (
  <Entity
    text={{
      value: 'x'
    }}
    position='0.26 0.26 0.01'
    geometry={{
      primitive: 'plane',
      width: '0.1',
      height: '0.1'
    }}
    {...props}
    color='#ffff00'
  />
)

class Record extends Component {
  constructor () {
    super()

    this.state = {
      peek: false
    }
  }

  render () {
    const {
      isPeekingEnabled,
      isSelected,
      isOpen,
      src,
      index,
      onSelect,
      onOpen,
      onClose
    } = this.props

    const yPos = -0.22
    const xPos = baseRecordPosition - index / 50

    return (
      <Entity
        position={`${xPos} ${yPos} 0`}
        scale={{ x: 1, y: 1, z: 1 }}
        rotation={`15 265.65 180`}
      >
        {/* Hit area for peeking */}
        <RecordSleeveEntity
          material='shader: flat; opacity: 0; color: #0000ff'
          className='clickable'
          events={{
            click: () => onSelect(index),
            mouseenter: () => this.setState({ peek: true }),
            mouseleave: () => this.setState({ peek: false })
          }}
        />

        {/* Sleeve art */}
        <RecordSleeveEntity
          material={{ src, side: 'double' }}
          className={`${isSelected && 'clickable'}`}
          events={{
            click: () => isSelected && onOpen(index)
          }}
          animation__peek-rotate-sideways={{
            property: 'rotation',
            to: `0 0 ${isPeekingEnabled && this.state.peek ? '5' : '0'}`,
            loop: false,
            dur: 100,
            delay: 0,
            dir: 'alternate'
          }}
          animation__peek-slide-up={{
            property: 'position',
            to: `0 ${isPeekingEnabled && this.state.peek ? '0.05' : '0'} 0`,
            loop: false,
            dur: 100,
            delay: 0,
            dir: 'alternate'
          }}
          animation__active-slide-up={{
            property: 'position',
            to: `0 ${isSelected ? '0.7' : '0'} 0`,
            loop: false,
            dur: 100,
            delay: 0,
            dir: 'alternate'
          }}
        >
          {isSelected && (
            <CloseButton className='clickable' events={{ click: onClose }} />
          )}
        </RecordSleeveEntity>

        {/* Vinyl disc */}
        {isOpen && (
          <Entity
            geometry={{
              primitive: 'circle',
              radius: 0.3
            }}
            rotation='0 0 0'
            position='-0.016 0.6635028876078138 0.00485874037035066'
            material='side: double'
            animation__active-slide-out={{
              property: 'position',
              to: '-0.24821838023253517 0.7072501217878021 0.003737822410264894',
              loop: false,
              dur: 100,
              delay: 0,
              dir: 'alternate'
            }}
          />
        )}
      </Entity>
    )
  }
}

const renderRecord = (
  {
    viewingRecordIndex,
    openRecordIndex,
    onRecordSelect,
    onRecordClose,
    onRecordOpen
  },
  trackData,
  index
) => (
  <Record
    {...trackData}
    isPeekingEnabled={index !== viewingRecordIndex}
    isSelected={index === viewingRecordIndex}
    isOpen={openRecordIndex === index}
    onSelect={onRecordSelect}
    onOpen={onRecordOpen}
    onClose={onRecordClose}
    key={index}
    index={index}
  />
)

export default ({
  tracks,
  viewingRecordIndex,
  openRecordIndex,
  onRecordSelect,
  onRecordClose,
  onRecordOpen
}) => (
  <Fragment>
    {mapIndexed(
      partial(renderRecord, [
        {
          viewingRecordIndex,
          openRecordIndex,
          onRecordSelect,
          onRecordClose,
          onRecordOpen
        }
      ]),
      tracks
    )}
  </Fragment>
)
