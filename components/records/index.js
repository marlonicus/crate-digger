/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";
import { Entity } from "aframe-react";
import { pathOr } from "ramda";
import RecordControls from "../record-controls";
import SoundManager from "../../utils/sound";
import { mapIndexed } from "../../utils/misc";
import spotify from "../../utils/spotify";

const baseRecordPosition = 0.5;
const recordSize = 1.8;

const RecordSleeveEntity = props => (
  <Entity
    geometry={{
      primitive: "box",
      width: recordSize,
      height: recordSize,
      depth: 0.05
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
      flipped: false
    };
  }

  render() {
    const {
      isPeekingEnabled,
      isSelected,
      uri,
      src,
      index,
      onSelect,
      onOpen,
      onClose,
      onPeek,
      peekIndex,
      crateIndex,
      albumArtImage
    } = this.props;

    const yPos = 0.1;
    const xPos = baseRecordPosition - index / 15;

    return (
      <Entity
        position={`${xPos} ${yPos} 0`}
        scale={{ x: 1, y: 1, z: 1 }}
        rotation="15 89 0"
        animation__peek-rotate-sideways={{
          property: "rotation",
          to: `${isPeekingEnabled && peekIndex < index ? "-5.260" : "15"} 89 0`,
          loop: false,
          dur: 100,
          delay: 0,
          dir: "alternate"
        }}
        animation__peek-bring-forward={{
          property: "position",
          to: `${
            isPeekingEnabled && peekIndex < index ? xPos - 0.4 : xPos
          } ${yPos} 0`,
          loop: false,
          dur: 100,
          delay: 0,
          dir: "alternate"
        }}
        animation__active-slide-up-if-selected={{
          property: "position",
          to: `${xPos} ${isSelected ? "2" : "0"} 0`,
          loop: false,
          dur: 100,
          delay: 0,
          dir: "alternate"
        }}
        animation__active-face-forward-if-selected={{
          property: "rotation",
          to: `${isSelected ? "0" : "15"} 89 0`,
          loop: false,
          dur: 100,
          delay: 0,
          dir: "alternate"
        }}
      >
        {/* Hit area for peeking */}
        <RecordSleeveEntity
          material="shader: flat; opacity: 0; color: #0000ff"
          className={`${!isSelected && "clickable"}`}
          position={`0 0.05 ${isSelected ? "1" : "-0.05"}`}
          events={{
            click: () => {
              if (isSelected) return;
              SoundManager.whoosh();
              onSelect({ recordIndex: index, crateIndex });
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
          animation__peek-flip={{
            property: "rotation",
            to: `0 ${this.state.flipped ? "180" : "0"} 0`,
            loop: false,
            dur: 300,
            delay: 0,
            dir: "alternate"
          }}
          events={{
            click: () =>
              isSelected &&
              this.setState(({ flipped }) => ({
                flipped: !flipped
              }))
          }}
        >
        <Entity
          geometry={{
            primitive: "plane",
            width: recordSize,
            height: recordSize,
          }}

          position="0 0 0.03"
          rotation="0 0 0"
          material={{
            src: albumArtImage
          }}
        />
        </RecordSleeveEntity>
        {isSelected && (
          <RecordControls
            closeHandler={onClose}
            saveHandler={() => spotify.saveToPlaylist({ uri })}
          />
        )}
      </Entity>
    );
  }
}

export default class Records extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      peekIndex: 10
    };
  }

  render() {
    const {
      tracks,
      viewingRecordIndex,
      openRecordIndex,
      openCrateIndex,
      onRecordSelect,
      onRecordClose,
      onRecordOpen,
      crateIndex
    } = this.props;
    const { peekIndex } = this.state;

    return (
      <>
        {mapIndexed(
          (trackData, index) => (
            <Record
              albumArtImage={trackData.albumArtImage}
              uri={trackData.uri}
              src={pathOr(null, ["album", "images", 1, "url"], trackData)}
              isPeekingEnabled={
                index !== viewingRecordIndex || crateIndex !== openCrateIndex
              }
              isSelected={
                index === viewingRecordIndex && crateIndex === openCrateIndex
              }
              isOpen={
                openRecordIndex === index && crateIndex === openCrateIndex
              }
              onSelect={onRecordSelect}
              onOpen={onRecordOpen}
              onClose={onRecordClose}
              key={index}
              index={index}
              crateIndex={crateIndex}
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
