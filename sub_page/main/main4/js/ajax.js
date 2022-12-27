(($)=>{  // 화살표 함수 ES6

  bannerFn=()=>{

        $.ajax({
            url:'./data_json/banner.json',
            dataType:'JSON',
            success(result){
               const {특가혜택} = result;
               let txt = '';

               특가혜택.map(function(item, idx, arr){
                    const {번호,제목,이미지,소개} = item;
                   txt += `<li data-num='${번호}'><a href="#" title='${제목}'><img src="./img/${이미지}" alt="${소개}"></a></li>`;
               });

               // 배너리스트 출력
               // $('.banner-list').html( txt );
               $('.banner-list').append( txt );

            },
            error(error){
                console.log('AJAX 실패!' + error );
            }
        });

  }
  bannerFn();

})(jQuery);