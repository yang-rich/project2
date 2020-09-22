$(() => {
  $("#datepicker").datepicker();

  $(function () {
    initFlickety();
  });

  function initFlickety() {
    $(".main-gallery").flickity({
      freeScroll: true,
      wrapAround: true,
      freeScrollFriction: 0.0,
    });
  }
  // There's the library and the div1
  var $library = $(".flex-container"),
    $div1 = $("#dz1"),
    $div2 = $("#dz2"),
    $div3 = $("#dz3"),
    $div4 = $("#dz4"),
    $div5 = $("#dz5"),
    $library2 = $(".main-gallery");
  console.log($library);
  console.log($div1);

  // var sPositions = localStorage.positions || "{}",
  //   positions = JSON.parse(sPositions);
  // $.each(positions, function (id, pos) {
  //   $("#" + id).css(pos);
  // });

  // Let the library items be draggable
  $(".cards", $library).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    // helper: "clone",
    cursor: "move",
    stop: function (event, ui) {
      // positions[this.id] = ui.position;
      // localStorage.positions = JSON.stringify(positions);
    },
  });

  $(".gallery-cell", $library2).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    // helper: "clone",
    cursor: "move",
    stop: function (event, ui) {},
  });

  // Let the div1 be droppable, accepting the library items
  $div1.droppable({
    accept: function (item) {
      return $(this).data("color") == item.data("color");
    },
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        },
      });
    },
  });
  $div2.droppable({
    accept: function (item) {
      return $(this).data("color") == item.data("color");
    },
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        },
      });
    },
  });
  $div3.droppable({
    accept: function (item) {
      return $(this).data("color") == item.data("color");
    },
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        },
      });
    },
  });
  $div4.droppable({
    accept: function (item) {
      return $(this).data("color") == item.data("color");
    },
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        },
      });
    },
  });
  $div5.droppable({
    accept: function (item) {
      return $(this).data("color") == item.data("color");
    },
    drop: function (event, ui) {
      var $this = $(this);
      ui.draggable.position({
        my: "center",
        at: "center",
        of: $this,
        using: function (pos) {
          $(this).animate(pos, 200, "linear");
        },
      });
    },
  });
});
