let _target = false;

const getTarget = () => {
  if (!_target) {
    _target = {
      canvas: document.getElementById("canvas"),
      ctx: document.getElementById("canvas").getContext("2d")
    }
  }
  return _target;
}

export default {
  text: string => {
    const { canvas, ctx } = getTarget();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 96px Arial";
    ctx.textAlign = "center";
    ctx.fillText(string.toUpperCase(), 400, 240);
   return canvas.toDataURL();
  }
}
