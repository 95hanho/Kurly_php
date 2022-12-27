<header id="header">
    <div class="row1">
        <div class="row1-1">
            <span><a href="<?=$sub2_path?>sign_up/" class="on">회원가입</a></span>
            <span><i>|</i></span>
            <span><a href="<?=$sub2_path?>sign_in/">로그인</a></span>
            <span><i>|</i></span>
            <span><a href="<?=$sub2_path?>customer_center/">고객센터<span></span></a></span>
        </div>
        <div class="row1-2">
            <div class="left">
                <ul>
                    <li>
                        <h1><a href="<?=$path?>" title="Kurly Home"><img src="<?=$path?>img/logo_kurly.svg" alt="Logo Kurly"> <span>마켓컬리</span></a></h1>
                    </li>
                    <li>
                        <i>|</i>
                    </li>
                    <li>
                        <a href="#" title="뷰티컬리">뷰티컬리<img src="<?=$path?>img/n.svg" alt=""></a>
                    </li>
                </ul>
            </div>
            <div class="center">
                <input type="text" id="search" name="search" placeholder="검색어를 입력해주세요" autocomplete="off">
                <a href="#" title="search" class="search-btn"><img src="<?=$path?>img/search.svg" alt=""></a>
            </div>
            <div class="right">
                <!-- 속성 어트리뷰트 Attribute(attr()) == 속성 프로퍼티 Property(prop) -->
                <!-- parent(부모) => children(자식) source(이미지 소스) -->
                <a href="#" title="map"  class="map-btn"><img src="<?=$path?>img/map.svg" alt=""></a>
                <a href="#" title="heart"  class="heart-btn"><img src="<?=$path?>img/heart.svg" alt=""></a>
                <a href="#" title="cart"  class="cart-btn"><img src="<?=$path?>img/cart.svg" alt=""></a>
            </div>
        </div>
    </div>

    <!--햄버거 메뉴바 카테고리 & 네비게이션(메인메뉴) -->
    <div class="row2">
        <div class="row2-container">
            <div class="left">
                <a href="#" title="카테고리" class="ham-bar-btn"><img src="<?=$path?>img/menu_bar.svg" alt=""> <span>카테고리</span></a>
            </div>
            <div class="center">
                <nav id="nav">
                    <span><a href="<?=$sub_path?>main1/" class="main-btn" title="신상품">신상품</a></span>
                    <span><a href="<?=$sub_path?>main2/" class="main-btn" title="베스트">베스트</a></span>
                    <span><a href="<?=$sub_path?>main3/" class="main-btn" title="알뜰쇼핑">알뜰쇼핑</a></span>
                    <span><a href="<?=$sub_path?>main4/" class="main-btn" title="특가/혜택">특가/혜택</a></span>
                </nav>
            </div>
            <div class="right">
                <a href="#">
                    <strong>샛별・낮</strong>
                    <span>배송안내</span>
                </a>
            </div>
        </div>
    </div>
</header>

<script src="<?=$path?>js/header.js"></script>