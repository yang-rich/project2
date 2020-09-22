$(() => {
  $(".main-gallery").flickity({
    // options
    cellAlign: "left",
    contain: true,
  });
  // There's the library and the div1
  var $library = $(".flex-container"),
    $div1 = $("#dz1"),
    $div2 = $("#dz2"),
    $div3 = $("#dz3"),
    $div4 = $("#dz4"),
    $div5 = $("#dz5");
  console.log($library);
  console.log($div1);

  // Let the library items be draggable
  $(".cards", $library).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    // helper: "clone",
    // cursor: "move",
  });

  // Let the div1 be droppable, accepting the library items
  $div1.droppable({
    // accept: ".flex-container > .cards",
    // classes: {
    //   "ui-droppable-active": "ui-state-highlight",
    // },
    // drop: function (event, ui) {
    //   // deleteImage(ui.draggable);
    // },
  });
  $div2.droppable({
    // accept: ".flex-container > .cards",
    // classes: {
    //   "ui-droppable-active": "ui-state-highlight",
    // },
    // drop: function (event, ui) {
    //   // deleteImage(ui.draggable);
    // },
  });
  $div3.droppable({
    // accept: ".flex-container > .cards",
    // classes: {
    //   "ui-droppable-active": "ui-state-highlight",
    // },
    // drop: function (event, ui) {
    //   // deleteImage(ui.draggable);
    // },
  });
  $div4.droppable({
    // accept: ".flex-container > .cards",
    // classes: {
    //   "ui-droppable-active": "ui-state-highlight",
    // },
    // drop: function (event, ui) {
    //   // deleteImage(ui.draggable);
    // },
  });
  $div5.droppable({
    // accept: ".flex-container > .cards",
    // classes: {
    //   "ui-droppable-active": "ui-state-highlight",
    // },
    // drop: function (event, ui) {
    //   // deleteImage(ui.draggable);
    // },
  });
  // Let the library be droppable as well, accepting items from the div1
  $library.droppable({
    //   accept: "#div1 .cards",
    //   classes: {
    //     "ui-droppable-active": "custom-state-active",
    //   },
    //   drop: function (event, ui) {
    //     // recycleImage(ui.draggable);
    //   },
  });
});
