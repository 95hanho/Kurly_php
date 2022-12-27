<?
    $id         = $_POST['id'];
    $pw         = $_POST['pw'];
    $irum       = $_POST['irum'];
    $email      = $_POST['email'];
    $hp         = $_POST['hp'];
    $addr       = $_POST['addr'];
    $gender     = $_POST['gender'];
    $birth      = $_POST['birth'];
    $chooga     = $_POST['chooga'];
    $service    = $_POST['service'];
    $gaib       = $_POST['gaib'];

    // AJAX로 보내진 데이터 확인
    echo $id     .'<br>';
    echo $pw     .'<br>';
    echo $irum   .'<br>';
    echo $email  .'<br>';
    echo $hp     .'<br>';
    echo $addr   .'<br>';
    echo $gender .'<br>';
    echo $birth  .'<br>';
    echo $chooga .'<br>';
    echo $service.'<br>';
    echo $gaib   .'<br>';

    // 위 확인이 끝나면
    // 데이터베이스(MYSQL)에 저장

?>