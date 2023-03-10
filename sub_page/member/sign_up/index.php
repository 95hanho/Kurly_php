<?
    include_once('./_common.php');
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>회원가입 | 마켓컬리</title>
    <link rel="shortcut icon" href="<?=$path?>img/Icon_114.png" type="image/x-icon">
    <link rel="stylesheet" href="./css/style.css">
    <script src="<?=$path?>js/lib/jquery-1.12.4.min.js"></script>
    <script src="<?=$path?>js/lib/jquery.easing.1.3.js"></script>
    <script src="<?=$path?>js/lib/postcode.v2.js"></script>

</head>
<body>
<div id="wrap">

<?
    include_once($path.'header.php');
?>

<main>   
    <section id="formSection">
        <div class="container">
            <div class="content">
                <h2>회원가입</h2>
                <div class="sub-title">
                    <span><i>*</i>필수입력사항</span>
                </div>
                <form id="memberForm" name='member_form' autocomplete="off"  method="get"   action="./response.php">
                <ul>
                        <li>
                            <div class="left-box">
                                <span>아이디<i>*</i></span>
                            </div>
                            <div class="right-box">
                                <input maxlength="16" type="text" id="id" name="id" value="" placeholder="아이디를 입력해주세요.">
                                <button  type='button' class="right-btn idok-btn" title="중복확인">중복확인</button>
                                <p class="guid-id">6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>비밀번호<i>*</i></span>
                            </div>
                            <div class="right-box">
                                <input maxlength="16" type="password" id="pw1" name="pw1" value="" placeholder="비밀번호를 입력해주세요.">                                
                                <p class="guid-pw1">최소 10자 이상 입력</p>
                                <!-- 조건2 : 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합 -->
                                <!-- 조건3 : 동일한 숫자 3개 이상 연속 사용 불가 -->
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>비밀번호확인<i>*</i></span>
                            </div>
                            <div class="right-box">
                                <input maxlength="16" type="password" id="pw2" name="pw2" value="" placeholder="비밀번호룰 한번더 입력해주세요.">                                
                                <p class="guid-pw2">동일한 비밀번호를 입력</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>이름<i>*</i></span>
                            </div>
                            <div class="right-box">
                                <input type="text" id="irum" name="irum" value="" placeholder="이름울 입력해주세요.">                                
                                <p class="guid-irum">이름을 입력해 주세요..</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>이메일<i>*</i></span>
                            </div>
                            <div class="right-box">
                                <input type="email" id="email" name="email" value="" placeholder="예: marketkurly@kurly.com">                                
                                <button class="right-btn emailok-btn" title="중복확인">중복확인</button>
                                <p class="guid-email">이메일 형식으로 입력해 주세요.</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>휴대폰<i>*</i></span>
                            </div>
                            <div class="right-box">
                                <input maxlength="11" type="text" id="hp" name="hp" value="" placeholder="숫자만 입력해주세요.">
                                <button class="right-btn hp-btn off" disabled title="인증번호받기">인증번호받기</button>
                                <p class="guid-hp">휴대폰 번호를 입력해 주세요.</p>

                                <input maxlength="6" type="text" id="hp2" class="" name="hp2" value="" placeholder="인증번호를 입력해주세요.">
                                <button class="right-btn hp2-btn off" disabled title="인증번호확인">인증번호확인</button>                  
                                
                                <!-- 카운트 타이머 -->
                                <!-- 2 : 59 ~ 0 : 00 -->
                                <div id="countTimer">
                                    <span class="minutes"></span> : <span class="seconds"></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>주소<i>*</i></span>
                            </div>
                            <div class="right-box address">
                                <input type="text" id="address1" class="addr" name="address1" value="" placeholder="검색 주소">
                                <input type="text" id="address2" class="addr" name="address2" value="" placeholder="나머지 주소를 입력해주세요.">
                                <button class="right-btn addr addr-btn"  title="주소검색"><i class="fa fa-search"></i><span>주소검색</span></button>
                                <p class="star"></p>
                                <p class="">배송지에 따라 상품 정보가 달라질 수 있습니다.</p>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>성별</span>
                            </div>
                            <div class="right-box radio-box">
                                <label for="male"><input type="radio" id="male" class="gender-btn" name="gender" value="남자"> 남자</label>
                                <label for="female"><input type="radio" id="female" class="gender-btn" name="gender" value="여자"> 여자</label>
                                <label for="none"><input type="radio" id="none" class="gender-btn" name="gender" value="선택안함" checked> 선택안함</label>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>생년월일</span>
                            </div>
                            <div class="right-box">
                                <div class="birth-box">
                                    <ul>
                                        <li><input type="text" id="year" name="year" maxlength="4" value="" placeholder="YYYY"></li>
                                        <li><i>/</i></li>
                                        <li><input type="text" id="month" name="month" maxlength="2" value="" placeholder="MM"></li>
                                        <li><i>/</i></li>
                                        <li><input type="text" id="date" name="date" maxlength="2" value="" placeholder="DD"></li>
                                    </ul>
                                </div>
                                <p class="birth-text"></p>
                            </div>
                        </li>
                        <li>
                            <div class="left-box">
                                <span>추가입력 사항</span>
                            </div>
                            <div class="right-box radio-box">
                                <label><input type="radio" id="addId"    class="chooga-btn"  name="add_input" value="추천인 아이디"> 추천인 아이디</label>
                                <label><input type="radio" id="addEvent" class="chooga-btn"  name="add_input" value="참여 이벤트명"> 참여 이벤트명</label>                                
                            </div>                            
                        </li>
                        <li>
                            <div class="left-box">
                                
                            </div>
                            <div class="right-box">
                                <input type="text" id="addInputText" name="add_input_text" value="" placeholder="추천인 아이디를 입력해주세요.">
                                <p class="chooga-text">
                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.<br>
                                    가입 이후는 수정이 불가능 합니다.<br>
                                    대소문자 및 띄어쓰기에 유의해주세요.<br>
                                </p>
                            </div>
                        </li>

                        <li>
                            <hr class="middle-line">
                        </li>
                        
                        <li>
                            <div class="left-box">
                                <span>이용약관동의<i>*</i></span>
                            </div>
                            <div class="right-box check-box">
                                <div>
                                    <label><input type="checkbox" id="chk0" name="chk0"  value="전체동의합니다"> 전체동의합니다.</label> 
                                    <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>    
                                </div>
                                <div>
                                    <label><input type="checkbox" id="chk1" class="chk-btn" name="chk1" value="이용약관동의(필수)"> 이용약관동의(필수)</label> 
                                </div>
                                <div>
                                    <label><input type="checkbox" id="chk2" class="chk-btn" name="chk2" value="개인정보 수집 이용동의(필수)"> 개인정보 수집 이용동의(필수)</label> 
                                </div>
                                <div>
                                    <label><input type="checkbox" id="chk3" class="chk-btn" name="chk3" value="개인정보 수집 이용동의(선택)"> 개인정보 수집 이용동의(선택)</label> 
                                </div>
                                <div class="sns-email-box">
                                    <label><input type="checkbox" id="chk4" class="chk-btn" name="chk4" value="무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)"> 무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)</label>
                                    <div>
                                        <label><input type="checkbox" id="chk5" class="chk-btn" name="chk5" value="SNS"> SNS</label>
                                        <label><input type="checkbox" id="chk6" class="chk-btn" name="chk6" value="이메일"> 이메일</label>
                                    </div>
                                    <P>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</P>                                    
                                </div>
                                <div>
                                    <label><input type="checkbox" id="chk7" class="chk-btn" name="chk7" value="본인은 만 14세 이상입니다.(필수)"> 개인정보 수집 이용동의(필수)</label> 
                                </div>

                            </div>                            
                        </li>

                        <li>
                            <hr class="end-line">

                        </li>

                        <li>
                            <button class="submit-btn" type="submit">가입하기</button>
                        </li>

                </ul> 

                </form>
            </div>
        </div>
    </section>
</main>

<?
    include_once($path.'footer.php');
?>

</div>

<script src="./js/form_uiux_design.js"></script>

</body>
</html>