// var cropdetail;
var cropper;
var PICTWIDTH = 30;
var PICTHEIGHT = 40;
function setsize() {
  var height = parseFloat($("#height").val());
  var width = parseFloat($("#width").val());
  PICTHEIGHT = height;
  PICTWIDTH = width;
  cropper.setAspectRatio(width/height);
}
function draw() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = 2102; //89mm
  canvas.width = 3000; //127mm
  var hei = (canvas.height / 89) * PICTHEIGHT;
  var wid = (canvas.width / 127) * PICTWIDTH;
  var buf = (canvas.width / 127) * 2; // 5mm buffer
  var x = buf;
  var y = buf;
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(0,0,0)";
  while (y < canvas.height) {
    while (x < canvas.width) {
      ctx.drawImage(cropper.getCroppedCanvas(), x, y, wid, hei);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + wid, y);
      ctx.lineTo(x + wid, y + hei);
      ctx.lineTo(x, y + hei);
      ctx.lineTo(x, y);
      ctx.stroke();
      x += wid + buf;
    }
    y += hei + buf;
    x = buf;
  }
  var outputjpg = canvas.toDataURL("image/jpeg");
  $("#output").attr("src", outputjpg);
  $("#outlink").attr("href", outputjpg);
}
function crop() {
  draw();
}
function fileselect(e) {
  var file = e.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
    var dataurl = reader.result;
    document.getElementById("image").src = dataurl;
    var $image = $("#image");

    $image.cropper({
      aspectRatio: PICTWIDTH / PICTHEIGHT,
      autoCropArea: 1,
      // crop: function(event) {
      //   cropdetail = event.detail;
      // }
    });

    // Get the Cropper.js instance after initialized
    cropper = $image.data("cropper");
  };
}
document.getElementById("file").addEventListener("change", fileselect);
document.getElementById("setsize").addEventListener("click", setsize);
document.getElementById("crop").addEventListener("click", crop);