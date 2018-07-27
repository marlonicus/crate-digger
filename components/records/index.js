import { Entity } from "aframe-react";
import { map, addIndex, partial, head } from "ramda";
import { mapIndexed } from "../../utils/misc";

const baseRecordPosition = -2.7;
const recordSize = 0.65;

const RecordSleeveEntity = props => (
  <Entity
    geometry={{
      primitive: "box",
      width: recordSize,
      height: recordSize,
      depth: 0.01
    }}
    position="0 0 0"
    rotation="0 0 0"
    {...props}
  />
);

const CloseButton = props => (
  <Entity
    text={{
      value: "x"
    }}
    position="0.26 0.26 0.01"
    color="#ffff00"
    geometry={{
      primitive: "plane",
      width: "0.1",
      height: "0.1"
    }}
    {...props}
  />
);

class Record extends React.Component {
  constructor() {
    super();

    this.state = {
      peek: false
    };
  }

  render() {
    const {
      id,
      isPeekingEnabled,
      isSelected,
      src,
      index,
      color,
      onClick,
      onClose
    } = this.props;

    const yPos = 0.34330848836327094;
    const xPos = baseRecordPosition - index / 25;

    return (
      <Entity
        position={`${xPos} ${yPos} -6.7`}
        scale={{ x: 2, y: 2, z: 2 }}
        rotation="-15 85.66 0"
      >
        {/* Hit area for peeking */}
        <RecordSleeveEntity
          material="shader: flat; opacity: 0; color: #0000ff"
          className="clickable"
          events={{
            click: () => onClick(index),
            mouseenter: () => this.setState({ peek: true }),
            mouseleave: () => this.setState({ peek: false })
          }}
        />

        {/* Sleeve art */}
        <RecordSleeveEntity
          material={{ src, side: 'double' }}
          className={`${isSelected && 'clickable'}`}
          animation__peek-rotate-sideways={{
            property: "rotation",
            to: `0 0 ${isPeekingEnabled && this.state.peek ? "5" : "0"}`,
            loop: false,
            dur: 100,
            delay: 0,
            dir: "alternate"
          }}
          animation__peek-slide-up={{
            property: "position",
            to: `0 ${isPeekingEnabled && this.state.peek ? "0.05" : "0"} 0`,
            loop: false,
            dur: 100,
            delay: 0,
            dir: "alternate"
          }}
          animation__active-slide-up={{
            property: "position",
            to: `0 ${isSelected ? "0.7" : "0"} 0`,
            loop: false,
            dur: 100,
            delay: 0,
            dir: "alternate"
          }}
        >
          {isSelected && (
            <CloseButton className="clickable" events={{ click: onClose }} />
          )}
        </RecordSleeveEntity>
      </Entity>
    );
  }
}

const renderRecord = (
  { activeIndex, onRecordSelect, onRecordClose },
  trackData,
  index
) => (
  <Record
    {...trackData}
    isPeekingEnabled={index !== activeIndex}
    isSelected={index === activeIndex}
    onClick={onRecordSelect}
    onClose={onRecordClose}
    key={index}
    index={index}
  />
);

export default ({ tracks, activeIndex, onRecordSelect, onRecordClose }) => (
  <React.Fragment>
    {mapIndexed(
      partial(renderRecord, [{ activeIndex, onRecordSelect, onRecordClose }]),
      tracks
    )}
  </React.Fragment>
);
