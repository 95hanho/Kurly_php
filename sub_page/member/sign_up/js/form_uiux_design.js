(($) => {
  const Kurly = {
    init() {
      this.memberGaib();
    },
    memberGaib() {
      let num = 0; // 난수 변수 : 전화번호 인증번호 발송
      let setId = 0; // 전화번호 인증 3분 카운터 타이머 변수
      let genderVal = ""; //성별 값을 저장
      let choogaItem = ""; //추가입력사항 선택 항목
      let isIdOk = false; //아이디 중복확인 검증
      let isEmailOk = false; //이메일 중복확인 검증
      let isHpOk = false; //휴대폰 인증번호 검증

      //1. 아이디 : 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
      //이벤트 : 키업 keyup
      $("#id").on({
        keyup: function (e) {
          //정규표현식(regExp) 6자이상~16이하
          //const regExp = /^[A-Za-z0-9]{6,16}$/g; //1차 기본표현
          const regExp1 = /[`~!@#$%\^&*()\-_=+\\\|\{\}\[\]'";:\/?.>,<]/g; //특수문자는 자동으로 삭제
          const regExp2 = /.{6,16}/g; //6자이상
          const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g; //영문 또는 영문,숫자조합

          // 정규표현식.test(문자열); true 또는 false 6자이상, 영문혹은 영문숫자
          // 문자열.replace(정규표현식, '')  //특수문자는 삭제
          if (regExp1.test($("#id").val()) === true) {
            //특수문자이면
            $("#id").val($("#id").val().replace(regExp1, "")); //삭제
          } else if (regExp2.test($("#id").val()) === false) {
            // 6~16 범위가 아니면
            $(".guid-id").addClass("error");
            $(".guid-id").text("최소 6자 이상 입력");
          } else if (regExp3.test($("#id").val()) === false) {
            $(".guid-id").addClass("error");
            $(".guid-id").text("영문 또는 영문,숫자조합");
          } else {
            $(".guid-id").removeClass("error");
            $(".guid-id").text("");
          }
        },
      });

      //아이디 중복 확인
      $(".idok-btn").on({
        click: function (e) {
          e.preventDefault();
          alert();
          // 1. 공백이면 값을 입력하라고 메시지
          // 2. 아이디 휴효성검증

          // 3. 로컬스토레이지(데이터베이스) 데이터가 0 제로일 때 검증
          // 4. 저장된 아이디와 입력된 아이디를 중복 비교
          //    저장된 데이터 가져와서 아이디 비교
          const regExp1 = /[`~!@#$%\^&*()\-_=+\\\|\{\}\[\]'";:\/?.>,<]/g; //특수문자는 자동으로 삭제
          const regExp2 = /.{6,16}/g; //6자이상
          const regExp3 = /(?=.*[A-Za-z])+(?=.*[0-9])*[A-Za-z0-9]/g; //영문 또는 영문,숫자조합

          // 잘못된 경우의 조건문
          if (
            $("#id").val() === "" ||
            regExp1.test($("#id").val()) === true ||
            regExp2.test($("#id").val()) === false ||
            regExp3.test($("#id").val()) === false
          ) {
            $(".modal").fadeIn(600); //모달창 보이기
            $(".modal-msg").html(
              `6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`
            );
            return;
          } else {
            // 정상인 경우에 아이디 중복확인 수행
            // 로컬 데이터를 가져와야한다.
            if (localStorage.length === 0) {
              // 1. 데이터가 0 제로인경우
              $(".modal").fadeIn(600); //모달창 보이기
              $(".modal-msg").html(`사용가능한 아이디입니다.`);
              isIdOk = true;
            } else {
              // 데이터가 들어 있는경우
              for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) === $("#id").val()) {
                  $(".modal").fadeIn(600); //모달창 보이기
                  $(".modal-msg").html(`이미 등록된 아이디입니다.`);
                  return;
                } else {
                  $(".modal").fadeIn(600); //모달창 보이기
                  $(".modal-msg").html(`사용가능한 아이디입니다.`);
                  isIdOk = true;
                }
              }
            }
          }
        },
      });

      //2-1. 비밀번호 : 최소 10자 이상 입력
      //2-1. 비밀번호 : ((?=.*[영문])+((?=.*[숫자])+|(?=.*[특수문자])+)+)(공백 제외)만 허용하며, 2개 이상 조합
      $("#pw1").on({
        keyup: function () {
          //1. 10자이상
          //2. 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합
          //3. 동일한 숫자 3개 이상 연속 사용 불가
          //13142341moon ok
          const regExp1 = /.{10,}/g;
          const regExp2 =
            /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[\!\@\#\$\%\^\&\*\_\-])+)+)+[^\s][A-Za-z0-9\!\@\#\$\%\^\&\*\_\-]/g;
          const regExp3 = /(.)\1\1/g; //연속3자이면 true 이면 오류, 아니고 false 이면 정상

          //1. 10자이상이 아니면
          if (regExp1.test($(this).val()) === false) {
            $(".guid-pw1").text("최소 10자 이상 입력");
            $(".guid-pw1").addClass("error");
          } else {
            //2. 영문(필수) + (숫자 또는 특수문자)필수 (공백 제외)만 허용하며, 2개 이상 조합
            if (regExp2.test($(this).val()) === false) {
              $(".guid-pw1").text(
                "영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합"
              );
              $(".guid-pw1").addClass("error");
            } else if (regExp3.test($(this).val()) === true) {
              $(".guid-pw1").text("동일한 숫자 3개 이상 연속 사용 불가");
              $(".guid-pw1").addClass("error");
            } else {
              $(".guid-pw1").removeClass("error");
            }
          }
        },
      });

      //2-2 동일한 비밀번호를 입력
      $("#pw2").on({
        keyup: function () {
          if ($("#pw1").val() !== $("#pw2").val()) {
            $(".guid-pw2").addClass("error");
          } else {
            $(".guid-pw2").removeClass("error");
          }
        },
      });

      //3 이름 : 영문 숫자 한글을 제외한 모든문자 입력과 동시에 삭제('')
      $("#irum").on({
        keyup: function () {
          // 오류가 있으면 삭제하고 정상문자만 입력된다.
          const regExp = /[^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/g;
          if ($(this).val() === "") {
            $(".guid-irum").addClass("error");
          } else {
            $(".guid-irum").removeClass("error");
            $(this).val($(this).val().replace(regExp, ""));
          }
        },
      });

      //4. 이메일 : 93marketkurly@kurly.com
      //4. 이메일 : market.kurly@kurly_12.com
      //4. 이메일 : market234_kurly34235@kurly123.com
      //4. 이메일 : 33dfmarket2 .-_ kurl2y@kurly123.co.kr
      //4. 이메일 : market2kurl2y@kurly123.co.kr

      $("#email").on({
        keyup: function () {
          // 지정 표기된 정규표현식 내용만 입력을 받는다.
          regExp =
            /^[A-Z0-9]+([.\-_]?[A-Z0-9]*)*@[A-Z0-9]+([.\-_]?[A-Z0-9]*)*\.[A-Z]{2,3}$/gi; //   /i 영문대소문자 구별안함 + 1문자 이상  ? 0 또는 1 문자대응  * 0문자 이상

          if ($("#email").val() === "") {
            $(".guid-email").addClass("error");
            $(".guid-email").text("이메일을 입력해 주세요.");
          } else if (regExp.test($("#email").val()) === false) {
            $(".guid-email").addClass("error");
            $(".guid-email").text("이메일 형식으로 입력해 주세요.");
          } else {
            $(".guid-email").removeClass("error");
            $(".guid-email").text("");
          }
        },
      });

      //이메일 중복 확인
      $(".emailok-btn").on({
        click: function (e) {
          e.preventDefault();

          // 이메일 휴효성검증
          regExp =
            /^[A-Z0-9]+([.\-_]?[A-Z0-9]*)*@[A-Z0-9]+([.\-_]?[A-Z0-9]*)*\.[A-Z]{2,3}$/gi; //   /i 영문대소문자 구별안함 + 1문자 이상  ? 0 또는 1 문자대응  * 0문자 이상

          // 잘못된 경우의 조건문
          if ($("#email").val() === "") {
            $(".modal").fadeIn(600);
            $(".modal-msg").html(`이메일을 입력해주세요`);
            return;
          } else if (regExp.test($("#email").val()) === false) {
            $(".modal").fadeIn(600);
            $(".modal-msg").html(`이메일 형식으로 입력해주세요`);
            return;
          } else {
            // 정상인 경우에 아이디 중복확인 수행
            // 로컬 데이터를 가져와야한다.
            if (localStorage.length === 0) {
              // 1. 데이터가 0 제로인경우
              $(".modal").fadeIn(600);
              $(".modal-msg").html(`사용가능한 이메일입니다.`);
              isEmailOk = true;
            } else {
              // 데이터가 들어 있는경우
              for (let i = 0; i < localStorage.length; i++) {
                let obj = JSON.parse(localStorage.getItem(localStorage.key(i)));

                if (obj.이메일 === $("#email").val()) {
                  $(".modal").fadeIn(600); //모달창 보이기
                  $(".modal-msg").html(`이미 등록된 이메일입니다.`);
                  return;
                } else {
                  $(".modal").fadeIn(600); //모달창 보이기
                  $(".modal-msg").html(`사용가능한 이메일입니다.`);
                  isEmailOk = true;
                }
              }
            }
          }
        },
      });

      //휴대폰 : 01079425305
      //휴대폰 : 0103486441
      //오로지 숫자만 숫자제외는 모두 삭제

      // 010-7942-5305
      // 010-794-5305
      // 011-794-5305
      // 016-794-5305
      // 017-794-5305
      // 018-794-5305
      // 019-794-5305
      // 더 엄격한 규정의 정규표현식
      // 가정 : 010, 011, 016, 017, 018, 019
      //숫자 \digit  소문자 반드시   - \d
      // \D 숫자가 아닌것 부정 대문자 - \D
      $("#hp").on({
        keyup: function () {
          regExp = /[^0-9]/g;

          // 입력과 동시에 숫자를 제외하는 모든건 삭제
          $("#hp").val($("#hp").val().replace(regExp, "")); //숫자가 아니면 삭제

          // || ~또는( ~이거나 )  or 둘중에 하나만 만족하면 ~
          // && ~그리고(~하고, ~이면서) and  2가지 이상 모든 조건  만족하면 ~
          if ($("#hp").val() !== "") {
            //입력 계속
            $(".guid-hp").text("");
            $(".guid-hp").removeClass("error");

            if ($("#hp").val().length >= 10) {
              $(".hp-btn").removeClass("off");
              //속성 어트리뷰트 Attribute : attr 속성변경 disabled => false(해제)
              $(".hp-btn").attr("disabled", false); //false(해제)
            } else {
              $(".hp-btn").addClass("off");
              $(".hp-btn").attr("disabled", true); //true(설정)
            }
          } else {
            //공백이면 오류 발생 문자 보임
            $(".guid-hp").addClass("error");
            $(".guid-hp").text("휴대폰 번호를 입력해 주세요.");
          }
        },
      });

      // 휴대폰버튼 클릭 이벤트
      // 인증번호 발송 임의의(랜덤Random()) 숫자 6자리를 모달 또는 경고창으로 보내준다.
      $(".hp-btn").on({
        click: function (e) {
          e.preventDefault();

          regExp2 = /^01[0|1|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g; //규칙 : 010, 011, 016, 017, 018, 019, 010-7942-5035

          //다른번호 인증
          if ($(".hp-btn").text() === "다른번호인증") {
            $(".hp-btn").text("인증번호받기");
            $("#hp").attr("disabled", false); //입력상자 사용가능하게 해주고
            $("#hp").val(""); //입력값은 깨끗하게 지운다.
            $(".guid-hp").addClass("error");
            $(".guid-hp").text("휴대폰 번호를 입력해 주세요.");
            return; //여기서 버튼 이벤트 강제종료
          }

          //휴대폰번호 10자 이상이면 우측버튼 활성화(사용가능)
          if (regExp2.test($("#hp").val()) === false) {
            $(".modal").fadeIn(600); //모달창 보이기
            $(".modal-msg").html("휴대폰 번호를 확인해 주세요."); //모달창으로 제작 오류메시지
            $("#hp2").removeClass("on"); //인증번호 입력상자
            $(".hp2-btn").removeClass("on"); //인증번호확인버튼
            $("#countTimer").removeClass("on"); //타이머 숨김
          } else {
            //정상
            //임의의 난수 발생 그리고 6자리 전송
            // Math.random() 랜드함수() 난수
            // Math.round() 자리반올림  round()
            // Math.ceil() 자리올림  roundup()
            // Math.floor() 자리내림 rounddown()
            num = Math.floor(Math.random() * 900000 + 100000); //클릭할 때마다 값이 변경된다.
            $(".modal").fadeIn(600); //모달창 보이기
            $(".modal-msg").html(`인증번호[${num}]가 발송되었습니다.`); //모달창으로 제작 오류메시지
            $("#hp2").addClass("on"); //인증번호 입력상자
            $(".hp2-btn").addClass("on"); //인증번호확인버튼

            //타이머 텍스트보이고, 함수 실행
            $("#countTimer").addClass("on"); //타이머 나타남.
            timerCount();
          }
        },
      });

      // 타이머함수 timerCount()
      function timerCount() {
        let m = 2;
        let s = 59;

        clearInterval(setId); // 2번 이상 호출시 타이머 정지
        // 1초에 한번씩 타이머가 카운트
        setId = setInterval(function () {
          s--; //s=s-1;
          if (s <= 0) {
            //이하
            s = 59;
            m--; //2 1 0 -1
            if (m < 0) {
              s = 0;
              m = 0;
              // 종료
              clearInterval(setId);
              $("#countTimer").removeClass("on"); //타이머  숨기기
              $(".minutes").text("");
              $(".seconds").text("");
              return;
            }
          }
          $(".minutes").text(m);
          // 초가 10미만이면 1자리이니까 2자리로 맞춘다.
          ///2:00 2:01, 2:07 ... 2:09 1:10
          $(".seconds").text(s < 10 ? `0${s}` : s);
        }, 1000);
      }

      // 1. 휴대폰 인증번호 전송버튼
      // 다음시간 내일 숫자만 입력 6자리만 입력
      // 타이머 설정
      // 2. 다른번호인증
      $("#hp2").on({
        keyup: function () {
          regExp = /[^0-9]/g;
          // 입력과 동시에 숫자를 제외하는 모든건 삭제
          $("#hp2").val($("#hp2").val().replace(regExp, "")); //숫자가 아니면 삭제
          if ($("#hp2").val() !== "") {
            $(".hp2-btn").removeClass("off"); //인증번호확인버튼 컬러 보이기
            $(".hp2-btn").attr("disabled", false); //false(해제) 사용가능버튼
          } else {
            $(".hp2-btn").attr("disabled", true); //true(설정) 사용불가능버튼
            $(".hp2-btn").addClass("off"); //인증번호확인버튼 보이기
          }
        },
      });

      // 인증번호 확인 버튼
      $(".hp2-btn").on({
        click: function (e) {
          e.preventDefault();

          // 디버깅 : 오류 수정 개발단계
          // num 숫자(자료형)  integer(정수)
          // $('#hp2').val() 문자열(자료형)  string
          // console.log(`num : `,  num );
          // console.log(`num : `,  num.toString() ); //숫자를 문자열로 변경 string
          // console.log(`$('#hp2').val() : `, $('#hp2').val() );
          // console.log(`$('#hp2').val() : `, Number($('#hp2').val()) ); //문자열을 숫자로 변경 integer

          if (Number($("#hp2").val()) === num) {
            //=== 논리값까지 비교 숫자, 문자형의 숫자 구분
            $(".modal").fadeIn(600); //모달창 보이기
            $(".modal-msg").html("인증에 성공했습니다."); //모달창으로 제작 오류메시지

            isHpOk = true;

            $("#hp2").val(""); //입력상자 숫자 지우기
            $("#hp2").removeClass("on"); //인증번호 입력상자 숨기기
            $(".hp2-btn").removeClass("on"); //인증번호확인버튼 숨기기
            $(".hp-btn").text("다른번호인증");
            $("#hp").attr("disabled", true); //입력상자 사용불가

            //타이머 종료
            clearInterval(setId);
            $("#countTimer").removeClass("on"); //타이머  숨기기
            $(".minutes").text("");
            $(".seconds").text("");
          } else {
            $(".modal").fadeIn(600); //모달창 보이기
            $(".modal-msg").html("잘못된 인증 코드입니다."); //모달창으로 제작 오류메시지
            $("#hp2").addClass("on"); //인증번호 입력상자 숨기기
            $(".hp2-btn").addClass("on"); //인증번호확인버튼 숨기기
          }
        },
      });

      // 모달창 닫기
      $(".modal-close-btn").on({
        click: function (e) {
          e.preventDefault();
          $(".modal").fadeOut(600);
        },
      });

      // 주소
      // 카카오 다음 주속 검색 사용
      $(".addr-btn").on({
        click: function (e) {
          e.preventDefault();

          //1. 버튼의 자식요소 span 텍스트 내용이
          //   조건1 : '주소검색'이면
          //   버튼 클래스 addr 을 삭제한다.

          //   조건2 : '재검색'이면
          //   버튼 클래스 addr 을 추가한다.

          // console.log($(this).find("span").text());

          if ($(this).find("span").text() === "주소검색") {
            $(this).removeClass("addr");
            $(".addr").val(""); //입력상자에 내용 주소 삭제
            $("#address1, #address2").removeClass("addr");
            $(this).find("span").text("재겸색");
            //주소검색 API 함수 가져와서 실행하기
            daumAddress();
          } else {
            $("#address1, #address2").val("");
            $(".address").find("p").removeClass("addr-p");
            daumAddress();
          }
        },
      });

      // 주소검색 API
      function daumAddress() {
        new daum.Postcode({
          oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
            $("#address1").val(`${data.zonecode}, ${data.address}`);
            $(".address").find("p").addClass("addr-p");
            // 조회(검색)
            // 다음시간에
            // 서울 경기

            //indexOf()  찾기
            //search()   찾기
            //indexOf('서울')  -1 //찾지 못한경우
            //search('서울')   -1 //찾지 못한경우
            //indexOf('서울')  0 //찾았다 글자 시작위치 첫번째
            //search('서울')   0 //찾았다 글자 시작위치 첫번째
            // let txt = '새우 꽃게 복숭아 서울 대구 부산';

            //찾으면 0이상의 숫자가 글자위치의 자릿수 이므로 >= 라고 표현한다.
            //못찾으면 -1
            // console.log(`indexOf('서울') `, txt.indexOf('서울') );
            // console.log(`search('서울')  `, txt.search('서울') );

            //주문싯점 시간에 따라 배송 방법이 달라진다.
            //우리는 주소검색을 하는 싯점을 상품을 구매하는 싯점으로 하겠다.
            //수도권(서울+경기) + 충청지역은 밤 11이전에 주문시 샛별배송 아니면 낮배송
            //대구지역은 밤 8이전에 주문시 샛별배송 아니면 낮배송
            //부산울산은 밤 6이전에 주문시 샛별배송 아니면 낮배송

            // let newDate = new Date();
            let nowH = new Date().getHours(); //24 시간제
            // console.log( '현재 시(Hourse) ',  newDate );
            // console.log( '현재 시(Hourse) ', nowH );

            if (
              nowH < 23 &&
              (data.address.indexOf("서울") >= 0 ||
                data.address.indexOf("인천") >= 0 ||
                data.address.indexOf("경기") >= 0 ||
                data.address.indexOf("충청") >= 0)
            ) {
              $(".star").text("샛별배송");
            } else if (nowH < 20 && data.address.indexOf("대구") >= 0) {
              $(".star").text("샛별배송");
            } else if (
              nowH < 18 &&
              (data.address.indexOf("부산") >= 0 ||
                data.address.indexOf("울산") >= 0)
            ) {
              $(".star").text("샛별배송");
            } else {
              $(".star").text("낮배송");
            }
          },
        }).open();
      }

      // 성별
      $(".gender-btn").on({
        change: function () {
          genderVal = $(this).val();
        },
      });

      // 생년
      $("#year").on({
        keyup: function () {
          const regExp1 = /[^0-9]/g;
          $("#year").val($("#year").val().replace(regExp1, "")); //숫자가 아니면 삭제

          //생년이 비어있으면 메시지 삭제
          if ($("#year").val() === "") {
            $(".birth-text").removeClass("error").text("");
            return;
          }

          //생년월일 유효성 체크 함수
          birthCheck();
        },
      });

      // 생월
      $("#month").on({
        keyup: function () {
          const regExp1 = /[^0-9]/g;
          $("#month").val($("#month").val().replace(regExp1, "")); //숫자가 아니면 삭제

          //생월이 비어있으면 메시지 삭제
          if ($("#month").val() === "") {
            $(".birth-text").removeClass("error").text("");
            return;
          }

          //생년월일 유효성 체크 함수
          birthCheck();
        },
      });

      // 생일
      $("#date").on({
        keyup: function () {
          const regExp1 = /[^0-9]/g;
          $("#date").val($("#date").val().replace(regExp1, "")); //숫자가 아니면 삭제

          //생월이 비어있으면 메시지 삭제
          if ($("#date").val() === "") {
            $(".birth-text").removeClass("error").text("");
            return;
          }

          //생년월일 유효성 체크 함수
          birthCheck();
        },
      });

      //년 > 월 > 일 체크 순서
      function birthCheck() {
        //생년월일 모든 조건
        const regExpYear = /^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g; //생년 1900 ~ 2999
        const regExpMonth = /^(?:0?[1-9]|1[0-2])$/g; //생월 01~09 | 10~12
        const regExpDate = /^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g; //생일 01~09 | 10 ~ 19 | 20~29 | 30 ~ 31

        const nowYear = new Date().getFullYear(); //년도 4자리

        //생년 체크
        if (regExpYear.test($("#year").val()) === false) {
          $(".birth-text")
            .addClass("error")
            .text("태어난 년도 4자리를 정확하게 입력해주세요.");
        }
        //숫자와 숫자형문자열 비교 안된다.
        else if (Number($("#year").val()) > nowYear) {
          $(".birth-text")
            .addClass("error")
            .text("생년월일이 미래로 입력 되었습니다.");
        }
        //만 14세
        else if (Number($("#year").val()) >= nowYear - 14) {
          $(".birth-text")
            .addClass("error")
            .text("만 14세 미만은 가입이 불가합니다.");
        } else {
          //생년이 정상 체크되면
          //정상이면 오류메시지 삭제
          $(".birth-text").addClass("error").text("");

          //생월 체크
          // if( (Number($('#month').val()) < 1 || Number($('#month').val()) > 12) ||  $('#month').val()==='' ){
          if (regExpMonth.test($("#month").val()) === false) {
            $(".birth-text")
              .addClass("error")
              .text("태어난 월을 정확하게 입력해주세요.");
          } else {
            //생월이 정상 체크되면
            //정상이면 오류메시지 삭제
            $(".birth-text").removeClass("error").text("");

            //생일 체크
            if (regExpDate.test($("#date").val()) === false) {
              $(".birth-text")
                .addClass("error")
                .text("태어난 일을 정확하게 입력해주세요.");
            } else {
              //생일이 정상 체크되면
              //정상이면 오류메시지 삭제
              $(".birth-text").addClass("error").text("");
            }
          }
        }
      }

      //추가입력 사항
      // 클래스 chooga-btn 라디오 버튼을 선택하면
      // 아래 입력상자에 placeholder 속성(prop ; properties 프로퍼티이스 / attr ; attribute  어트리뷰트)  내용이 바뀐다.
      // 라디오, 체크박스, 셀렉트박스 : 체인지 이벤트
      $(".chooga-btn").on({
        change: function (e) {
          // 이벤트 결과
          // console.log( e );
          // console.log( e.currentTarget.id );
          // console.log( e.currentTarget.value );

          // console.log( e.originalEvent.target.id );
          // console.log( e.originalEvent.target.value );

          // if( $(this).val()==='추천인 아이디' ){  //추천인 아이디를 선택하면
          //     $('#addInputText').attr('placeholder', '추천인 아이디를 입력해주세요.');
          // }
          // else { //참여 이벤트 명을 선택하면
          //     $('#addInputText').attr('placeholder', '참여 이벤트명을 입력해주세요.');
          // }

          $(".chooga-text").show(); //가이드 텍스트
          // $('.chooga-text').fadeIn(600);
          // $('.chooga-text').slideDown(600);
          choogaItem = $(this).val();
          //이벤트로 처리하는 방법
          if (e.currentTarget.id === "addId") {
            $("#addInputText").attr(
              "placeholder",
              "추천인 아이디를 입력해주세요."
            );
          } else {
            $("#addInputText").attr(
              "placeholder",
              "참여 이벤트명을 입력해주세요."
            );
          }
        },
      });

      // 이용약관동의
      // 체크박스 이벤트
      // 모두 체크 이벤트 구현
      // 라디오 체크박스 셀렉트등 속성 변경 지정은 porp 을 많이 사용 권장
      $("#chk0").on({
        change: function () {
          // 내가 체크 선택하면 모두 체크 true
          // 내가 체크 해제하면 모두 해제 false
          // 모두체크박스가 선택이되면 true
          // 아니면 false
          if ($(this).is(":checked")) {
            //true 이면
            $(".chk-btn").prop("checked", true);
          } else {
            $(".chk-btn").attr("checked", false);
          }
        },
      });

      //전체 체크박스 7개중 모두 체크되면 전체체크버튼 체크 되게하고,
      //한개라도 체크 해제하면 전체체크버튼 해제한다.
      // 7개를 체크버튼을 반복으로 돌려서 체크된 갯수를 카운트하고
      // 7개가 되면 체크 아니면 해제
      let cnt = 0;
      //제이쿼리 each() 메서든 반드시 function()을 사용 화살표함수 사용 하지말것
      // $('.chk-btn').each(function(idx, item){ //0 ~ 6 : 7개
      //     $(this).on({
      //         change: function(){
      //             // console.log('현재 선택된 체크박스버튼 번호 : ', index );
      //             // console.log('현재 선택된 체크박스버튼 항목 : ', item );
      //             // console.log('현재 선택된 체크박스버튼 항목.id : ', item.id );
      //             // console.log('현재 선택된 체크박스버튼 항목.name : ', item.name );
      //             console.log('인덱스 : ', idx );
      //             console.log('현재 선택된 체크박스버튼 항목.value : ', item.id );

      //             checkAllFn();

      //         }
      //     });
      // });

      $(".chk-btn").on({
        change: function () {
          checkAllFn();
        },
      });

      //함수
      //
      function checkAllFn() {
        //체크할 때 마다 즉시 전체 체크된 갯수를 확인
        cnt = 0;
        // for(let i=0; i<$('.chk-btn').length; i++){
        //     if( $('.chk-btn').eq(i).is(':checked')===true ){
        //         cnt++;
        //     }
        // }

        // 클래서 .chk-btn 체크버튼이 체크된 것만 검사해서 갯수를 카운트
        $(".chk-btn").each(function (i, item) {
          if ($(".chk-btn").eq(i).is(":checked") === true) {
            cnt++;
          }
        });

        //console.log('체크된 갯수 ',  cnt );
        if (cnt === 7) {
          //모두 체크되면
          $("#chk0").prop("checked", true);
        } else {
          //7개 미만 (모두 체크된 안되면)
          $("#chk0").prop("checked", false);
        }
      }

      // 체크4, 체크5, 체크6
      // 4번이 체크되면 5,6 둘다체크된다.
      $("#chk4").on({
        change: function () {
          if ($(this).is(":checked") === true) {
            //체크되면
            // 4번이 체크되면 5,6 둘다체크된다.
            $("#chk5, #chk6").prop("checked", true);
          } else {
            //체크안되면
            $("#chk5, #chk6").prop("checked", false);
          }
          checkAllFn();
        },
      });

      //5번 6번 둘다( and  && ) 체크되면
      $("#chk5").on({
        change: function () {
          if (
            $("#chk5").is(":checked") === true &&
            $("#chk6").is(":checked") === true
          ) {
            $("#chk4").prop("checked", true);
          } else {
            $("#chk4").prop("checked", false);
          }

          checkAllFn();
        },
      });

      //5번 6번 둘다( and  && ) 체크되면
      $("#chk6").on({
        change: function () {
          if (
            $("#chk5").is(":checked") === true &&
            $("#chk6").is(":checked") === true
          ) {
            $("#chk4").prop("checked", true);
          } else {
            $("#chk4").prop("checked", false);
          }

          checkAllFn();
        },
      });

      $(".submit-btn").on({
        click: function (e) {
          e.preventDefault();
          //유효성검사 : 필수 입력사항 빈칸 허용안함
          //입력데이터가 모두 정상이면 전송 submit => 로컬스토레이지 1차저장
          //로컬스토레이지 1차저장 완료되면 중복검사 알고리즘 구현

          //2차 서버단에서 구현 그런다음 닷홈에 PHP / MYSQL 서버에 저장 영구 저장
          //로그인 구현, 구키 구현
          //앞단 JQUERY.JS(AJAX) / REACT.JS(AXIOS)  ==> 백단 연동 PHP / MYSQL

          // 1. 입력화면에 빈칸이 없도록 검증(필수입력)
          // 아이디 필수
          if ($("#id").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("아이디를 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 비밀번호 필수
          if ($("#pw1").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("비밀번호를 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 비밀번호확인 필수
          if ($("#pw2").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("비밀번호확인을 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 이름 필수
          if ($("#irum").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("이름을 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 이메일 필수
          if ($("#email").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("이메일을 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 휴대폰 필수
          if ($("#hp").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("휴대폰을 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 주소1 필수
          if ($("#address1").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("주소를 검색 해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          //    // 주소2 필수
          if ($("#address2").val() === "") {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("나머지 주소를 입력해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          //약관동의 필수항목 3개 검증
          //단 조건은 반드시 체크된 항목만 카운트
          //선택된 항목은 값을 배열에 저장한다.

          let cnt = 0;
          let arr = [];
          //    arr.push('사과');
          //    arr.push('자몽');
          //    arr.push('딸기');
          //    arr.push('바나나');

          //    arr = ['사과', '자몽', '딸기', '바나나', ...];

          $(".chk-btn").each(function (idx, item) {
            //체크된것 중에서 팔슈룰 찾았다
            if (
              $(".chk-btn").eq(idx).is(":checked") === true &&
              item.value.indexOf("필수") !== -1
            ) {
              cnt++;
            }

            if ($(".chk-btn").eq(idx).is(":checked") === true) {
              arr.push($(".chk-btn").eq(idx).val()); //누적 저장
              // n++; // 0 1 ...
              // arr[n] = $('.chk-btn').eq(idx).val();
            }
          });

          if (cnt < 3) {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("약관동의 필수항목을 선택해주세요.");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          if (isIdOk === false) {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("아이디 중복검사 하세요");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          if (isEmailOk === false) {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("이메일 중복검사 하세요");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          if (isHpOk === false) {
            $(".modal").stop().fadeIn(300); //모달창 보이기
            $(".modal-msg").html("휴대폰 인증을 하세요");
            return; //전송버튼 취소
          } else {
            $(".modal").stop().fadeOut(300); //모달창 숨기기
            $(".modal-msg").html("");
          }

          // 여기까지 정상이면 저장소(로컬스토레이지)에 저장하기
          // 저장방법은 객체(obj)에 보관 후 텍스트 형식 변환하여 저장소(로컬스토레이지)에 저장한다.
          let 회원 = {
            아이디: $("#id").val(),
            비밀번호: $("#pw1").val(),
            이름: $("#irum").val(),
            이메일: $("#email").val(),
            휴대폰: $("#hp").val(),
            주소: `${$("#address1").val()} ${$("#address2").val()}`,
            성별: genderVal,
            생년월일: `${$("#year").val()}-${$("#month").val()}-${$(
              "#date"
            ).val()}`,
            추가입력사항: `${choogaItem}: ${$("#addInputText").val()}`,
            약관동의: arr,
          };

          // 객체확인
          // console.log( 회원 );

          // 로컬스토레이지에 저장
          // 객체를 문자열로 변환 JSON.stringify(회원)
          localStorage.setItem(회원.아이디, JSON.stringify(회원));

          // 서버에 AJAX(비동기전송)를 이용 정보전송
          // POST 방식 사용
          $.ajax({
            url: "./response.php",
            method: "post",
            data: {
              // 데이터 속성이 PHP(./response.php)에게 보내진다.
              id: $("#id").val(),
              pw: $("#pw1").val(),
              irum: $("#irum").val(),
              email: $("#email").val(),
              hp: $("#hp").val(),
              addr: `${$("#address1").val()} ${$("#address2").val()}`,
              gender: genderVal,
              birth: `${$("#year").val()}-${$("#month").val()}-${$(
                "#date"
              ).val()}`,
              chooga: `${choogaItem}: ${$("#addInputText").val()}`,
              service: arr,
              gaib: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
            },
            success(res) {
              console.log(res);
              $(".modal").stop().fadeIn(300); //모달창 숨기기
              $(".modal-msg").html("저장완료");
            },
            error(err) {
              console.log("AJAX 실패" + err);
            },
          });
        },
      });
    }, //memberGaib end
  };

  Kurly.init();
})(jQuery);
