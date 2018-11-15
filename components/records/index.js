/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import { Entity } from "aframe-react";
import CloseButton from "../close-button";
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

class Record extends Component {
  constructor() {
    super();

    this.state = {
      // peek: false
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
      onPeek,
      peekIndex
    } = this.props;

    const yPos = -0.22;
    const xPos = baseRecordPosition - index / 50;

    return (
      <Entity
        position={`${xPos} ${yPos} 0`}
        scale={{ x: 1, y: 1, z: 1 }}
        rotation="15 269 180"
        animation__peek-rotate-sideways={{
          property: "rotation",
          to: `${
            isPeekingEnabled && peekIndex < index ? "-5.260" : "15"
          } 269 180`,
          loop: false,
          dur: 100,
          delay: 0,
          dir: "alternate"
        }}
        animation__peek-bring-forward={{
          property: "position",
          to: `${
            isPeekingEnabled && peekIndex < index ? xPos - 0.1 : xPos
          } ${yPos} 0`,
          loop: false,
          dur: 100,
          delay: 0,
          dir: "alternate"
        }}
      >
        {/* Hit area for peeking */}
        <RecordSleeveEntity
          material="shader: flat; opacity: 0; color: #0000ff"
          className="clickable"
          events={{
            click: () => {
              SoundManager.whoosh();
              onSelect(index);
            },
            mouseenter: () => {
              onPeek(index);
              SoundManager.whip();
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

export default class Records extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peekIndex: 20
    };
  }

  render() {
    const {
      tracks,
      viewingRecordIndex,
      openRecordIndex,
      onRecordSelect,
      onRecordClose,
      onRecordOpen
    } = this.props;
    const { peekIndex } = this.state;

    return (
      <>
        {mapIndexed(
          (trackData, index) => (
            <Record
              src={trackData.src}
              isPeekingEnabled={index !== viewingRecordIndex}
              isSelected={index === viewingRecordIndex}
              whooshEnabled={viewingRecordIndex === false}
              isOpen={openRecordIndex === index}
              onSelect={onRecordSelect}
              onOpen={onRecordOpen}
              onClose={onRecordClose}
              key={index}
              index={index}
              peekIndex={peekIndex}
              onPeek={newPeekIndex =>
                this.setState({
                  peekIndex: newPeekIndex
                })
              }
            />
          ),
          tracks
        )}
      </>
    );
  }
}
