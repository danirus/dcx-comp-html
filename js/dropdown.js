// Look for elements with the class "dropdown".
function init() {
  const dropdowns = document.getElementsByClassName("dropdown");
  for (let i = 0; i < dropdowns.length; i++) {
    const select = dropdowns[i].getElementsByTagName("select")[0];

    // For each element, create a new div that will act as the selected item.
    const opt_sel = document.createElement("div");
    opt_sel.setAttribute("class", "option-selected");
    opt_sel.innerHTML = select.options[select.selectedIndex].innerHTML;
    dropdowns[i].appendChild(opt_sel);

    // For each element, create a new DIV that will contain the option list.
    const items = document.createElement("div");
    items.setAttribute("class", "select-items select-hide");

    for (let j = 1; j < select.length; j++) {
      // For each option in the original select element,
      // create a new DIV that will act as an option item.
      const opt_div = document.createElement("div");
      opt_div.innerHTML = select.options[j].innerHTML;
      opt_div.addEventListener("click", function(e) {
        // When an item is clicked, update the original
        // select box and the selected item.
        const _select = this.parentNode.parentNode
                          .getElementsByTagName("select")[0];
        const _hhh = this.parentNode.previousSibling;
        for (let k = 0; k < _select.length; k++) {
          if (select.options[k].innerHTML == this.innerHTML) {
            select.selectedIndex = k;
            _hhh.innerHTML = this.innerHTML;
            const _yyy = this.parentNode
                            .getElementsByClassName("same-as-selected");
            for (let l = 0; l < _yyy.length; l++) {
              _yyy[l].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        _hhh.click();
      });
      items.appendChild(opt_div);
    }
    dropdowns[i].appendChild(items);
    opt_sel.addEventListener("click", function(e) {
      // When the select box is clicked, close any other
      // select boxes, and open/close the current select box.
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  // If the user clicks anywhere outside the
  // select box, then close all select boxes.
  document.addEventListener("click", closeAllSelect);
}

function closeAllSelect(elmnt) {
  // A function that will close all select boxes
  // in the document, except the current select box.
  var x, y, i, xl, yl, arrNo = [];
  const items = document.getElementsByClassName("select-items");
  const opt_sel = document.getElementsByClassName("option-selected");
  for (let i = 0; i < opt_sel.length; i++) {
    if (elmnt == opt_sel[i]) {
      arrNo.push(i)
    } else {
      opt_sel[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < items.length; i++) {
    if (arrNo.indexOf(i)) {
      items[i].classList.add("select-hide");
    }
  }
}


window.addEventListener("load", (_) => init());

export default init;