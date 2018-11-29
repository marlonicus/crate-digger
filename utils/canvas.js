import { reduce, map, join, prop } from "ramda";

let _target = false;

const getTarget = (type) => {
  if (!_target) {
    _target = {
      crateLabel: {
        canvas: document.getElementById("canvas-crate-label"),
        ctx: document.getElementById("canvas-crate-label").getContext("2d")
      },

      albumInfo: {
        canvas: document.getElementById("canvas-album-info"),
        ctx: document.getElementById("canvas-album-info").getContext("2d")
      }
    }
  }


  return _target[type];
}

export default {
  label: string => {
    const { canvas, ctx } = getTarget('crateLabel');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 96px Arial";
    ctx.textAlign = "center";
    ctx.fillText(string.toUpperCase(), 400, 240);
   return canvas.toDataURL();
 },

 albumInfo: track => {
   const trackTitle = track.name;
   const albumName = track.album.name;
   const artists = join(", ", map(prop("name"), track.artists))//reduce((prev, curr) => `${prev}, ${curr.name}`, ``, track.artists)

   const { canvas, ctx } = getTarget('albumInfo');
   ctx.fillStyle = "#000000";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = "#ffffff";
   ctx.font = "bold 48px Arial";
   ctx.textAlign = "center";

   ctx.fillText(trackTitle, 400, 240);

   ctx.font = "bold 38px Arial";
   ctx.fillText(artists, 400, 340);
   ctx.fillText(albumName, 400, 740);
   
   return canvas.toDataURL();
 }
}
