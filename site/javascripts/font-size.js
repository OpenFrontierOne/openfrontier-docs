(function () {
  var key = "ofo-doc-font-size";
  var sizes = ["small", "normal", "large", "xlarge"];
  var labels = {
    small: "A-",
    normal: "A",
    large: "A+",
    xlarge: "A++"
  };

  function getSize() {
    var saved = localStorage.getItem(key);
    return sizes.indexOf(saved) === -1 ? "normal" : saved;
  }

  function applySize(size) {
    if (size === "normal") {
      document.documentElement.removeAttribute("data-ofo-font-size");
    } else {
      document.documentElement.setAttribute("data-ofo-font-size", size);
    }
    localStorage.setItem(key, size);
    document.querySelectorAll("[data-ofo-font-size-button]").forEach(function (button) {
      button.setAttribute("aria-pressed", button.dataset.ofoFontSizeButton === size ? "true" : "false");
    });
  }

  function mount() {
    if (document.querySelector(".ofo-font-control")) {
      applySize(getSize());
      return;
    }

    var control = document.createElement("div");
    control.className = "ofo-font-control";
    control.setAttribute("aria-label", "Text size");

    sizes.forEach(function (size) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = labels[size];
      button.dataset.ofoFontSizeButton = size;
      button.setAttribute("aria-label", size === "normal" ? "Default text size" : size + " text size");
      button.addEventListener("click", function () {
        applySize(size);
      });
      control.appendChild(button);
    });

    document.body.appendChild(control);
    applySize(getSize());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(mount);
  }
})();
