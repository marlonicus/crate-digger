import { Component, Fragment } from "react";
import { Entity } from "aframe-react";
import { partial } from "ramda";
import { mapIndexed } from "../../utils/misc";
import SoundManager from "../../utils/sound";

const baseRecordPosition = 0.22;
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
    position="0.28 0.28 0.01"
    geometry={{
      primitive: "plane",
      width: "0.05",
      height: "0.05w",
      color: "#ffff00"
    }}
    material={{ color: "black", roughness: 0.5 }}
    {...props}
  >
    <Entity text={{ value: "x" }} position="0.482 0.005 0" />
  </Entity>
);

class Record extends Component {
  constructor() {
    super();

    this.state = {
      peek: false
    };
  }

  render() {
    const {
      isPeekingEnabled,
      isSelected,
      src,
      index,
      onSelect,
      onOpen,
      onClose,
      whooshEnabled
    } = this.props;

    const yPos = -0.22;
    const xPos = baseRecordPosition - index / 50;

    return (
      <Entity
        position={`${xPos} ${yPos} 0`}
        scale={{ x: 1, y: 1, z: 1 }}
        rotation="15 265.65 180"
      >
        {/* Hit area for peeking */}
        <RecordSleeveEntity
          material="shader: flat; opacity: 0; color: #0000ff"
          className="clickable"
          events={{
            click: () => {
              SoundManager.swipe();
              onSelect(index);
            },
            mouseenter: () => {
              if (whooshEnabled) SoundManager.whoosh();
              this.setState({ peek: true });
            },
            mouseleave: () => {
              this.setState({ peek: false });
            }
          }}
        />
        {/* Sleeve art */}
        <RecordSleeveEntity
          material={{ src, side: "double" }}
          className={`${isSelected && "clickable"}`}
          events={{
            click: () => isSelected && onOpen(index)
          }}
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
            dur: 500,
            delay: 0,
            dir: "alternate"
          }}
        >
          {isSelected && (
            <CloseButton className="clickable" events={{ click: onClose }} />
          )}
        </RecordSleeveEntity>
        )}
      </Entity>
    );
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
    whooshEnabled={viewingRecordIndex === false}
    isOpen={openRecordIndex === index}
    onSelect={onRecordSelect}
    onOpen={onRecordOpen}
    onClose={onRecordClose}
    key={index}
    index={index}
  />
);

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
);
