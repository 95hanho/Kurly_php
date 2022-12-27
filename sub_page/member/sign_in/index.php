<?
    include_once('./_common.php');
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 | 마켓컬리</title>
    <link rel="shortcut icon" href="<?=$path?>img/Icon_114.png" type="image/x-icon">
    <link rel="stylesheet" href="./css/style.css">
    <script src="<?=$path?>js/lib/jquery-1.12.4.min.js"></script>
    <script src="<?=$path?>js/lib/jquery.easing.1.3.js"></script>

</head>
<body>
<div id="wrap">

<?
    include_once($path.'modal.php');
    include_once($path.'header.php');
?>

    <main id="main">
        
        <section id="signIn">
            <div class="container">
                <div class="title">
                    <h2>로그인</h2>
                </div>
                <div class="content">
                    <form id="signIn" name="sign_in" method="post" action="./response.php">
                        <ul>
                            <li><input type="text" id="id" name="id" placeholder="아이디를 입력해주세요"></li>
                            <li><input type="password" id="pw" name="pw" placeholder="비밀번호를 입력해주세요"></li>
                            <li><a href="#">아이디찾기</a><i>|</i><a href="#">비밀번호찾기</a></li>
                            <li><button type="submit" class="submit-btn">로그인</button></li>
                            <li><button type="button" class="member-signin-btn">회원가입</button></li>
                        </ul>    
                    </form>
                </div>
            </div>
        </section>

    </main>

<?
    include_once($path.'footer.php');
    include_once($path.'go_top.php');
?>

</div>

<script src="<?=$path?>js/modal.js"></script>    
<script src="<?=$path?>js/go_top.js"></script> 

</body>
</html>