const THEMES = {
  custom: {},
  theme1: {
    themeBackground: "#dee8f1",
    theme1: "#1d4e89",
    theme2: "#3b7aa4",
    theme3: "#f79256",
    textDark: "#403335",
    fontFamily: '"Comfortaa"',
    editableFontSize: "22px",
  },
  theme2: {
    themeBackground: "#FFE3E3",
    theme1: "#F96E46",
    theme2: "#F9C846",
    theme3: "#00E8FC",
    textDark: "#403335",
    fontFamily: '"Roboto"',
    editableFontSize: "20px",
  },
  theme3: {
    themeBackground: "#E5D4CE",
    theme1: "#7A6563",
    theme2: "#7FD1B9",
    theme3: "#E56399",
    textDark: "#403335",
    fontFamily: '"Pacifico"',
    editableFontSize: "24px",
  },
};

let simplifyColor = false;
let backgroundColor;
let color;

function checkSimplifyColor(status) {
  if (!status) {
    $(".simplifyWhite").removeClass("ON");
    $(".simplifyBlack").removeClass("ON");
    $(simplifyColorON).attr("disabled", false);
    $(simplifyColorOFF).attr("disabled", true);
  } else {
    $(".simplifyWhite").addClass("ON");
    $(".simplifyBlack").addClass("ON");
    $(simplifyColorON).attr("disabled", true);
    $(simplifyColorOFF).attr("disabled", false);
  }
}

function loadStyles() {
  const fontFamily = $(":root").css("--fontFamily");
  $(fontFamilyInput).val(fontFamily.substring(1, fontFamily.length - 1));
  $(fontSizeInput).val($(":root").css("--editableFontSize").slice(0, -2));

  loadStylesColors();
}

function loadStylesColors() {
  backgroundColor = $(":root").css("--themeBackground");
  color = $(":root").css("--textDark");

  if (simplifyColor) {
    $(backgroundColorInput).val("#000000");
    $(colorInput).val("#ffffff");
  } else {
    $(backgroundColorInput).val(backgroundColor);
    $(colorInput).val(color);
  }
}

function setCustomTheme() {
  $(themeInput).val("custom");
}

function fontSizeIncDec(increase) {
  const fontSize = $(":root").css("--editableFontSize").slice(0, -2);
  const newFontSize = increase ? Number(fontSize) + 1 : Number(fontSize) - 1;
  $(":root").css("--editableFontSize", newFontSize + "px");
  $(fontSizeInput).val(newFontSize);
  setCustomTheme();
}

// on document ready -> cargar valores de los inputs
$(document).ready(function () {
  $(themeInput).val("theme1");
  loadStyles();
  checkSimplifyColor(simplifyColor);
});

// font size input change
$(fontFamilyInput).change(() => {
  $(":root").css("--fontFamily", $(fontFamilyInput).val());
  setCustomTheme();
});

// font size input change
$(fontSizeInput).change(() => {
  $(":root").css("--editableFontSize", $(fontSizeInput).val() + "px");
  setCustomTheme();
});

// background color input change
$(backgroundColorInput).change(() => {
  $(":root").css("--themeBackground", $(backgroundColorInput).val());
  loadStylesColors();
  setCustomTheme();
});

// color input change
$(colorInput).change(() => {
  $(":root").css("--textDark", $(colorInput).val());
  loadStylesColors();
  setCustomTheme();
});

// theme input change
$(themeInput).change(() => {
  const colorsChange = ["themeBackground", "theme1", "theme2", "theme3", "textDark", "fontFamily", "editableFontSize"];
  const theme = THEMES[$(themeInput).val()];

  colorsChange.forEach((item) => {
    $(":root").css("--" + item, theme[item]);
  });

  loadStyles();
});

// Click en simplifyColorON o simplifyColorOFF
$(".simplifyColor").click(() => {
  simplifyColor = !simplifyColor;
  checkSimplifyColor(simplifyColor);
  loadStyles();
});

// Click en fontSizeMore
$(fontSizeMore).click(() => {
  fontSizeIncDec(true);
});

// Click en fontSizeLess
$(fontSizeLess).click(() => {
  fontSizeIncDec(false);
});
