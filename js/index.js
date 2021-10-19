$(function () {
  $("[data-toggle='tooltip']").tooltip();
  $("[data-toggle='popover']").popover();
  $(".carousel").carousel({
    interval: 2000,
  });

  $("#contacto").on("show.bs.modal", function (e) {
    console.log("el modal contacto se esta mostrando");

    $("#contactoBtn").removeClass("btn-outline-success");
    $("#contactoBtn").addClass("btn-primary");
    $("#contactoBtn").prop("disabled", true);
  });

  $("#contacto").on("shown.bs.modal", function (e) {
    console.log("el modal contacto se mostro");
  });

  $("#contacto").on("hide.bs.modal", function (e) {
    console.log("el modal contacto se oculto");
  });

  $("#contacto").on("hidden.bs.modal", function (e) {
    console.log("el modal contacto se mostro");
    $("#contactoBtn").prop("disabled", false);
  });
});
