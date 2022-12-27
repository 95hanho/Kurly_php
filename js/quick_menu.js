(function ($, window, document) {
  const Kurly = {
    init: function () {
      this.view();
      this.quickMenu();
    },
    view() {
      let quickTF = 78 < ($(window).width() - $("section .gap").width()) / 2;
      if (!quickTF) {
        $("#quickMenu").addClass("hide");
      }
      $(window).resize(function () {
        quickTF = 78 < ($(window).width() - $("section .gap").width()) / 2;
        if (!quickTF) {
          $("#quickMenu").addClass("hide");
        } else {
          $("#quickMenu").removeClass("hide");
        }
      });
    },
    quickMenu: function () {
      let quickTop = 0;

      function quickMenuFn() {
        // 섹션2의 슬라이드 컨테이너가 없으면 오류발생
        // 예외처리
        try {
          //트라이 실행하고 오류가 발생하면 아래 캣치에서 잡는다.

          if (
            $(window).scrollTop() >=
            $("#section2  .slide-container").offset().top
          ) {
            quickTop = ($(window).height() - 554) / 2 + $(window).scrollTop();
            $("#quickMenu")
              .stop()
              .animate({ top: quickTop }, 300, "easeOutExpo");
          } else {
            $("#quickMenu")
              .stop()
              .animate(
                { top: $("#section2  .slide-container").offset().top },
                300,
                "easeOutExpo"
              );
          }
        } catch {
          //캣치

          if ($(window).scrollTop() >= 248) {
            quickTop = ($(window).height() - 554) / 2 + $(window).scrollTop();
            $("#quickMenu")
              .stop()
              .animate({ top: quickTop }, 300, "easeOutExpo");
          } else {
            $("#quickMenu").stop().animate({ top: 248 }, 300, "easeOutExpo");
          }
        }
      }
      quickMenuFn();

      $(window).scroll(function () {
        quickMenuFn();
      });
    },
  };

  Kurly.init();
})(jQuery, window, document);
