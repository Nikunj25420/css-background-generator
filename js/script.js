var bgWrapperClass = ".background-wrapper";
var colorPickerClass = ".gradient-color-picker";
var currentBgClass = ".current-background";
var gradientSettingClass = ".gradient-setting";
var angleSliderClass = ".angle-slider";
var radialButtonClassFull = gradientSettingClass + "__radial-button";
var linearButtonClassFull = gradientSettingClass + "__linear-button";
var angleSliderClassFull = gradientSettingClass + "__angle-slider";
var clipboardWrapperClassFull = bgWrapperClass + "__clipboard-wrapper";

var bgWrapper = document.querySelector(bgWrapperClass);
var clipboardWrapper = document.querySelector(clipboardWrapperClassFull);
var copiedTooltip = document.querySelector(bgWrapperClass + "__copied-tooltip");
var currentBg = document.querySelector(bgWrapperClass + "__current-background");
var currentBgContent = document.querySelector(currentBgClass + "__content");
var colorFirst = document.querySelector(colorPickerClass + "__color-first");
var colorSecond = document.querySelector(colorPickerClass + "__color-second");
var colorRandom = document.querySelector(colorPickerClass + "__color-random");
var linearButton = document.querySelector(linearButtonClassFull);
var radialButton = document.querySelector(radialButtonClassFull);
var angleSlider = document.querySelector(angleSliderClassFull);
var angleValue = document.querySelector(angleSliderClass + "__slider");

var currentBgClipBoard = null;
var currentGradientAngle = 0;
var gradientIsLinear = true;

function getRandomRgb() {
  var rgbDec = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];
  var rgbHex = "#";

  rgbDec.forEach(function (decValue) {
    var hexValue = decValue.toString(16);
    rgbHex += hexValue.length < 2 ? "0" + hexValue : hexValue;
  });

  return rgbHex;
}

function setGradient(color1, color2, isLinear, angle) {
  bgWrapper.style.background =
    "linear-gradient(" + angle + "deg," + color1 + ", " + color2 + ")";
  if (!isLinear) {
    bgWrapper.style.background =
      "radial-gradient( circle," + color1 + ", " + color2 + ")";
  }
  currentBgContent.textContent = bgWrapper.style.background;
  if (ClipboardJS.isSupported()) {
    currentBg.setAttribute("data-clipboard-text", bgWrapper.style.background);
  }
}

function randomGradient() {
  var color1 = getRandomRgb();
  var color2 = getRandomRgb();
  colorFirst.value = color1;
  colorSecond.value = color2;
  setGradient(color1, color2, gradientIsLinear, currentGradientAngle);
}

function specificGradient() {
  var color1 = colorFirst.value;
  var color2 = colorSecond.value;
  setGradient(color1, color2, gradientIsLinear, currentGradientAngle);
}

function setGradientLinear() {
  gradientIsLinear = true;
  linearButton.classList.add("gradient-setting__linear-button--select");
  radialButton.classList.remove("gradient-setting__radial-button--select");
  angleSlider.classList.remove("gradient-setting__angle-slider--hidden");
  setGradientAngle();
}

function setGradientRadial() {
  gradientIsLinear = false;
  linearButton.classList.remove("gradient-setting__linear-button--select");
  radialButton.classList.add("gradient-setting__radial-button--select");
  angleSlider.classList.add("gradient-setting__angle-slider--hidden");
  specificGradient();
}

function setGradientAngle() {
  currentGradientAngle = angleValue.value;
  specificGradient();
}

function showCopiedTooltip() {
  copiedTooltip.style.display = "block";
}

function hideCopiedTooltip() {
  copiedTooltip.style.display = "none";
}

angleValue.addEventListener("input", setGradientAngle);
colorFirst.addEventListener("input", specificGradient);
colorSecond.addEventListener("input", specificGradient);
colorRandom.addEventListener("click", randomGradient);
linearButton.addEventListener("click", setGradientLinear);
radialButton.addEventListener("click", setGradientRadial);

if (ClipboardJS.isSupported()) {
  currentBgClipBoard = new ClipboardJS(currentBg);
  clipboardWrapper.addEventListener("mouseleave", hideCopiedTooltip);
  currentBgClipBoard.on("success", showCopiedTooltip);
} else {
  hideCopiedTooltip();
  currentBg.style.cursor = "default";
}

setGradientLinear();
randomGradient();