var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var FileStore = require('session-file-store')(session);

var app = express();

app.use('/img', express.static('img'));
app.use('/tts', express.static('tts'));
app.use('/main.html',express.static('main.html'));

var cart = []; //장바구니

var result_price; //총 결제금액 변수

//var server_url = "http://localhost:80";
var server_url = "http://52.21.241.198:80";  //나중에 서버 배포시 바꿔얗 하는 내용

var mode = 1; //1은 가이드 모드, 2는 결과창 모드
var scenario = 1; //각 숫자 별로 담당 시나리오가 다르다.

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: '123412sadfF1312@#!F',
    resave: false,
    saveUninitialized: true,
    store : new FileStore({path : './sessions'})
}));

function starthtml(){ //귀찮은 html도입부 자동작성
    return(`
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ProtoType</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  </head>
  <body>
    `);
}
function endhtml(){ //귀찮은 html 끝부분 자동 작성
    return(`
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
  </body>
</html>
    `);
}

function order_main_cart_html(){

result_price = 0;
    
var output = `<ul>`;

for(var i=0; i<cart.length; i++){ //cart에 담긴 리스트를 출력해주는 반복문
  output += `<li>` + `${cart[i].name} 주문 수량 : ${cart[i].count} 가격 : ${cart[i].total}` + `</li>`
  result_price += parseInt(cart[i].total)
}


output = output + `</ul>`;


return(output);


}

//여기서부터 커피 상세메뉴 모달창

function americano_modal(){
    return(`
<form action="${server_url}/order_main" method="post">
    <div class="modal fade" id="americano" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!--여기에 프로필 편집창 내용물을 삽입-->
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <!--프로필1번 내용물-->
            <div class = "container justify-content-center mt-3">
                <div class = "row">
                    <div class="col">
                        <img src='${server_url}/img/americano.png' alt="Logo" width="140" height="140">
                        <input type = "hidden" value = '${server_url}/img/americano.png' name = "img_src">
                    </div>
    
                    <div class = "col">
                        <p class="text-center">상품명 - 아메리카노</p>
                        <input type = "hidden" value = "아메리카노" name = "product_name">
                        <p class="text-center">가격 - 3200원</p>
                        <input type = "hidden" value = "3200" name = "basic_price">
                    </div>
                </div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <!---->
                        <th scope="row">사이즈 선택</th>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                        <input type="radio" name="size" class="custom-control-input" id="ck1a" value = "0" checked>
                        <label class="custom-control-label" for="ck1a">
                        레귤러<br>+0
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                        <input type="radio" name="size" class="custom-control-input" id="ck1b" value = "1000">
                        <label class="custom-control-label" for="ck1b">
                        엑스트라<br>+1000
                        </label>
                    </div>
                        </td>

                      </tr>


                      <tr>
                        <th scope="row">얼음 선택</th>
                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                        <input type="radio" name="ice" class="custom-control-input" id="ck1c" value = "0,S">
                        <label class="custom-control-label" for="ck1c">
                        조금<br>+0
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="ice" class="custom-control-input" id="ck1d" value = "0,M" checked>
                            <label class="custom-control-label" for="ck1d">
                            보통<br>+0
                            </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="ice" class="custom-control-input" id="ck1e" value = "0,L">
                            <label class="custom-control-label" for="ck1e">
                            많이<br>+0
                            </label>
                    </div>
                        </td>
                      </tr>


                      <tr>
                        <th scope="row">토핑 선택</th>

                        <td>
                    <div class="custom-control custom-checkbox image-checkbox">
                        <input type="checkbox" name="topping1" class="custom-control-input" id="ck1f" value = "500">
                        <label class="custom-control-label" for="ck1f">
                        샷 추가<br>+500
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-checkbox image-checkbox">
                        <input type="checkbox" name="topping2" class="custom-control-input" id="ck1g" value = "500">
                        <label class="custom-control-label" for="ck1g">
                        휘핑크림<br>+500
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-checkbox image-checkbox">
                        <input type="checkbox" name="topping3" class="custom-control-input" id="ck1h" value = "300">
                        <label class="custom-control-label" for="ck1h">
                        시럽<br>+300
                        </label>
                    </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                

                           
            </div>
          </div>

        </div>

        <select class="form-select" name = "count" aria-label="Default select example">
  <option value="1" selected>수량 선택</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
        </select>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="submit" class="btn btn-primary">장바구니에 추가</button>

        </div>

      </div>
    </div>
  </div>
</div>

</form>
    `);


}
function bubble_black_modal(){
    return(`
    <form action="${server_url}/order_main" method="post">
        <div class="modal fade" id="bubble_black" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <!--여기에 프로필 편집창 내용물을 삽입-->
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                <!--프로필1번 내용물-->
                <div class = "container justify-content-center mt-3">
                    <div class = "row">
                        <div class="col">
                            <img src='${server_url}/img/bubble_black.png' alt="Logo" width="140" height="140">
                            <input type = "hidden" value = '${server_url}/img/bubble_black.png' name = "img_src">
                            </div>
        
                        <div class = "col">
                        <p class="text-center">상품명 - 버블흑당콜드브루</p>
                        <input type = "hidden" value = "버블흑당콜드브루" name = "product_name">
                        <p class="text-center">가격 - 4700원</p>
                        <input type = "hidden" value = "4700" name = "basic_price">
                        </div>
                    </div>
                    <table class="table">
                        <thead>
                          <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <!---->
                            <th scope="row">사이즈 선택</th>
    
                            <td>
                        <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="size" class="custom-control-input" id="ak1a" value = "0" checked>
                            <label class="custom-control-label" for="ak1a">
                            레귤러<br>+0
                            </label>
                        </div>
                            </td>
    
                            <td>
                        <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="size" class="custom-control-input" id="ak1b" value = "1000">
                            <label class="custom-control-label" for="ak1b">
                            엑스트라<br>+1000
                            </label>
                        </div>
                            </td>
    
                          </tr>
    
    
                          <tr>
                            <th scope="row">얼음 선택</th>
                            <td>
                        <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="ice" class="custom-control-input" id="ak1c" value = "0,S">
                            <label class="custom-control-label" for="ak1c">
                            조금<br>+0
                            </label>
                        </div>
                            </td>
    
                            <td>
                        <div class="custom-control custom-radio image-checkbox">
                                <input type="radio" name="ice" class="custom-control-input" id="ak1d" value = "0,M" checked>
                                <label class="custom-control-label" for="ak1d">
                                보통<br>+0
                                </label>
                        </div>
                            </td>
    
                            <td>
                        <div class="custom-control custom-radio image-checkbox">
                                <input type="radio" name="ice" class="custom-control-input" id="ak1e" value = "0,L">
                                <label class="custom-control-label" for="ak1e">
                                많이<br>+0
                                </label>
                        </div>
                            </td>
                          </tr>
    
    
                          <tr>
                            <th scope="row">토핑 선택</th>
    
                            <td>
                        <div class="custom-control custom-checkbox image-checkbox">
                            <input type="checkbox" name="topping1" class="custom-control-input" id="ak1f" value = "500">
                            <label class="custom-control-label" for="ak1f">
                            샷 추가<br>+500
                            </label>
                        </div>
                            </td>
    
                            <td>
                        <div class="custom-control custom-checkbox image-checkbox">
                            <input type="checkbox" name="topping2" class="custom-control-input" id="ak1g" value = "500">
                            <label class="custom-control-label" for="ak1g">
                            휘핑크림<br>+500
                            </label>
                        </div>
                            </td>
    
                            <td>
                        <div class="custom-control custom-checkbox image-checkbox">
                            <input type="checkbox" name="topping3" class="custom-control-input" id="ak1h" value = "300">
                            <label class="custom-control-label" for="ak1h">
                            시럽<br>+300
                            </label>
                        </div>
                            </td>
                          </tr>
    
                        </tbody>
                      </table>
                    
    
                               
                </div>
              </div>
    
            </div>

            <select class="form-select" name = "count" aria-label="Default select example">
            <option value="1" selected>수량 선택</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            </select>


            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
              <button type="submit" class="btn btn-primary">장바구니에 추가</button>
    
            </div>
    
          </div>
        </div>
      </div>
    </div>
    
    </form>
        `);
}
function einstephener_modal() {

  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="einstephener" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/einstephener.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/einstephener.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 아인슈페너</p>
                  <input type = "hidden" value = "아인슈페너" name = "product_name">
                  <p class="text-center">가격 - 3700</p>
                  <input type = "hidden" value = "3700" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="ek1a" value = "0" checked>
                      <label class="custom-control-label" for="ek1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="ek1b" value = "1000">
                      <label class="custom-control-label" for="ek1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>

                    </tr>


                    <tr>
                      <th scope="row">얼음 선택</th>
                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="ice" class="custom-control-input" id="ek1c" value = "0,S">
                      <label class="custom-control-label" for="ek1c">
                      조금<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="ek1d" value = "0,M" checked>
                          <label class="custom-control-label" for="ek1d">
                          보통<br>+0
                          </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="ek1e" value = "0,L">
                          <label class="custom-control-label" for="ek1e">
                          많이<br>+0
                          </label>
                  </div>
                      </td>
                    </tr>


                    <tr>
                      <th scope="row">토핑 선택</th>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping1" class="custom-control-input" id="ek1f" value = "500">
                      <label class="custom-control-label" for="ek1f">
                      샷 추가<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping2" class="custom-control-input" id="ek1g" value = "500">
                      <label class="custom-control-label" for="ek1g">
                      휘핑크림<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping3" class="custom-control-input" id="ek1h" value = "300">
                      <label class="custom-control-label" for="ek1h">
                      시럽<br>+300
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              

                         
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;


}
function cafe_latte_modal(){

  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="cafe_latte" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/cafe_latte.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/cafe_latte.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 카페라떼</p>
                  <input type = "hidden" value = "카페라떼" name = "product_name">
                  <p class="text-center">가격 - 3700</p>
                  <input type = "hidden" value = "3700" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="bk1a" value = "0" checked>
                      <label class="custom-control-label" for="bk1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="bk1b" value = "1000">
                      <label class="custom-control-label" for="bk1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>

                    </tr>


                    <tr>
                      <th scope="row">얼음 선택</th>
                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="ice" class="custom-control-input" id="bk1c" value = "0,S">
                      <label class="custom-control-label" for="bk1c">
                      조금<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="bk1d" value = "0,M" checked>
                          <label class="custom-control-label" for="bk1d">
                          보통<br>+0
                          </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="bk1e" value = "0,L">
                          <label class="custom-control-label" for="bk1e">
                          많이<br>+0
                          </label>
                  </div>
                      </td>
                    </tr>


                    <tr>
                      <th scope="row">토핑 선택</th>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping1" class="custom-control-input" id="bk1f" value = "500">
                      <label class="custom-control-label" for="bk1f">
                      샷 추가<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping2" class="custom-control-input" id="bk1g" value = "500">
                      <label class="custom-control-label" for="bk1g">
                      휘핑크림<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping3" class="custom-control-input" id="bk1h" value = "300">
                      <label class="custom-control-label" for="bk1h">
                      시럽<br>+300
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              

                         
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;

}
function cold_brew_modal(){

  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="cold_brew" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/cold_brew.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/cold_brew.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 콜드브루라떼</p>
                  <input type = "hidden" value = "콜드브루라떼" name = "product_name">
                  <p class="text-center">가격 - 4200</p>
                  <input type = "hidden" value = "4200" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="a1" value = "0" checked>
                      <label class="custom-control-label" for="a1">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="a2" value = "1000">
                      <label class="custom-control-label" for="a2">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>

                    </tr>


                    <tr>
                      <th scope="row">얼음 선택</th>
                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="ice" class="custom-control-input" id="a3" value = "0,S">
                      <label class="custom-control-label" for="a3">
                      조금<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="a4" value = "0,M" checked>
                          <label class="custom-control-label" for="a4">
                          보통<br>+0
                          </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="a5" value = "0,L">
                          <label class="custom-control-label" for="a5">
                          많이<br>+0
                          </label>
                  </div>
                      </td>
                    </tr>


                    <tr>
                      <th scope="row">토핑 선택</th>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping1" class="custom-control-input" id="a6" value = "500">
                      <label class="custom-control-label" for="a6">
                      샷 추가<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping2" class="custom-control-input" id="a7" value = "500">
                      <label class="custom-control-label" for="a7">
                      휘핑크림<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping3" class="custom-control-input" id="a8" value = "300">
                      <label class="custom-control-label" for="a8">
                      시럽<br>+300
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              

                         
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;


}
function cold_brew_americano_modal(){

  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="cold_brew_americano" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/cold_brew_americano.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/cold_brew_americano.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 콜드브루아메리카노</p>
                  <input type = "hidden" value = "콜드브루아메리카노" name = "product_name">
                  <p class="text-center">가격 - 3700</p>
                  <input type = "hidden" value = "3700" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="dk1a" value = "0" checked>
                      <label class="custom-control-label" for="dk1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="dk1b" value = "1000">
                      <label class="custom-control-label" for="dk1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>

                    </tr>


                    <tr>
                      <th scope="row">얼음 선택</th>
                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="ice" class="custom-control-input" id="dk1c" value = "0,S">
                      <label class="custom-control-label" for="dk1c">
                      조금<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="dk1d" value = "0,M" checked>
                          <label class="custom-control-label" for="dk1d">
                          보통<br>+0
                          </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                          <input type="radio" name="ice" class="custom-control-input" id="dk1e" value = "0,L">
                          <label class="custom-control-label" for="dk1e">
                          많이<br>+0
                          </label>
                  </div>
                      </td>
                    </tr>


                    <tr>
                      <th scope="row">토핑 선택</th>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping1" class="custom-control-input" id="dk1f" value = "500">
                      <label class="custom-control-label" for="dk1f">
                      샷 추가<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping2" class="custom-control-input" id="dk1g" value = "500">
                      <label class="custom-control-label" for="dk1g">
                      휘핑크림<br>+500
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-checkbox image-checkbox">
                      <input type="checkbox" name="topping3" class="custom-control-input" id="dk1h" value = "300">
                      <label class="custom-control-label" for="dk1h">
                      시럽<br>+300
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
              

                         
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;

}
function strawberry_modal(){
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="strawberry" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/strawberry.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/strawberry.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 딸기쉐이크</p>
                  <input type = "hidden" value = "딸기쉐이크" name = "product_name">
                  <p class="text-center">가격 - 4800</p>
                  <input type = "hidden" value = "4800" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="fk1a" value = "0" checked>
                      <label class="custom-control-label" for="fk1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="fk1b" value = "1000">
                      <label class="custom-control-label" for="fk1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
                
                <br><br><br><br><br><br><br>
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>
      </div>
    </div>
  </div>
</div>
</div>

</form>
  `;
}
function lemonade_modal(){
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="lemonade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/lemonade.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/lemonade.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 레몬에이드</p>
                  <input type = "hidden" value = "레몬에이드" name = "product_name">
                  <p class="text-center">가격 - 3800</p>
                  <input type = "hidden" value = "3800" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="gk1a" value = "0" checked>
                      <label class="custom-control-label" for="gk1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="gk1b" value = "1000">
                      <label class="custom-control-label" for="gk1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
                
                <br><br><br><br><br><br><br>
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>
      </div>
    </div>
  </div>
</div>
</div>

</form>
  `;
}
function green_grape_modal(){
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="green_grape" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/green_grape.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/green_grape.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 청포도에이드</p>
                  <input type = "hidden" value = "청포도에이드" name = "product_name">
                  <p class="text-center">가격 - 3800</p>
                  <input type = "hidden" value = "3800" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="hk1a" value = "0" checked>
                      <label class="custom-control-label" for="hk1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="hk1b" value = "1000">
                      <label class="custom-control-label" for="hk1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
                
                <br><br><br><br><br><br><br>
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>
      </div>
    </div>
  </div>
</div>
</div>

</form>
  `;
}
function peach_modal(){
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="peach" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/peach.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/peach.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 피치얼그레이</p>
                  <input type = "hidden" value = "피치얼그레이" name = "product_name">
                  <p class="text-center">가격 - 3200</p>
                  <input type = "hidden" value = "3200" name = "basic_price">
                  </div>
              </div>
              <table class="table">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!---->
                      <th scope="row">사이즈 선택</th>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="ik1a" value = "0" checked>
                      <label class="custom-control-label" for="ik1a">
                      레귤러<br>+0
                      </label>
                  </div>
                      </td>

                      <td>
                  <div class="custom-control custom-radio image-checkbox">
                      <input type="radio" name="size" class="custom-control-input" id="ik1b" value = "1000">
                      <label class="custom-control-label" for="ik1b">
                      엑스트라<br>+1000
                      </label>
                  </div>
                      </td>
                    </tr>

                  </tbody>
                </table>
                
                <br><br><br><br><br><br><br>
          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>
      </div>
    </div>
  </div>
</div>
</div>

</form>
  `;
}
function delicious_waffle_modal(){
  
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="delicious_waffle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/delicious_waffle.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/delicious_waffle.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 맛있는와플</p>
                  <input type = "hidden" value = "맛있는와플" name = "product_name">
                  <p class="text-center">가격 - 3000</p>
                  <input type = "hidden" value = "3000" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>


      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;
}
function cream_waffle(){
    
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="cream_waffle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/cream_waffle.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/cream_waffle.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 생크림와플</p>
                  <input type = "hidden" value = "생크림와플" name = "product_name">
                  <p class="text-center">가격 - 2500</p>
                  <input type = "hidden" value = "2500" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>

      <br><br>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;
}
function cheese_cake_modal(){  
      
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="cheese_cake" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/cheese_cake.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/cheese_cake.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 수플레치즈케이크</p>
                  <input type = "hidden" value = "수플레치즈케이크" name = "product_name">
                  <p class="text-center">가격 - 3900</p>
                  <input type = "hidden" value = "3900" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>

      <br><br>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;

}
function origin_shake_modal(){

        
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="origin_shake" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/origin_shake.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/origin_shake.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 오리진쉐이크</p>
                  <input type = "hidden" value = "오리진쉐이크" name = "product_name">
                  <p class="text-center">가격 - 4300</p>
                  <input type = "hidden" value = "4300" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>

      <br><br>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;

}
function tiramisu_modal(){
          
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="tiramisu" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/tiramisu.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/tiramisu.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 초코티라미수</p>
                  <input type = "hidden" value = "초코티라미수" name = "product_name">
                  <p class="text-center">가격 - 3900</p>
                  <input type = "hidden" value = "3900" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>

      <br><br>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;


}
function cream_cheese_waffle(){
            
  return`
  <form action="${server_url}/order_main" method="post">
  <div class="modal fade" id="cream_cheese_waffle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/cream_cheese_waffle.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/cream_cheese_waffle.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 크림치즈와플</p>
                  <input type = "hidden" value = "크림치즈와플" name = "product_name">
                  <p class="text-center">가격 - 3000</p>
                  <input type = "hidden" value = "3000" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>

      <br><br>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>
  `;



}

//모달창 불러오기 끝

function payment_cart_html(){

  // <!--한세트시작-->

  // <div class="row justify-content-center">    

  // <div class="card m-1" style="width: 18rem;">
  // <img src="img/아메리카노.jpg" class="card-img-top" alt="...">
  // <div class="card-body">
  //     <h5 class="card-title">아메리카노</h5>
  //     <p class="card-text">사이즈 : TALL (+1000)<br>
  //         얼음 추가 : 가득 (+0)
  //     </p>
  // </div>
  // </div>

  // <div class="card m-1" style="width: 18rem;">
  //     <img src="img/아메리카노.jpg" class="card-img-top" alt="...">
  //     <div class="card-body">
  //         <h5 class="card-title">아메리카노</h5>
  //         <p class="card-text">사이즈 : TALL (+1000)<br>
  //             얼음 추가 : 가득 (+0)
  //         </p>
  //     </div>
  //     </div>
      
  // </div>

  // <!--한세트끝-->

  var output = ``;

  for(var i=0; i < cart.length; i++){

    if(i % 2 === 0){ //세트의 시작
      output += `<div class="row justify-content-center">`;
    }

    output += `<div class="card m-1" style="width: 18rem;">`;
    output += `<img src="${cart[i].img_src}" class="card-img-top" alt="...">`;
    output += `<div class="card-body">`;
    output += `<h5 class="card-title">${cart[i].name}</h5>`;
    output += `<p class="card-text">`;

    if(cart[i].size){
      if(cart[i].size === "0"){
      output += `사이즈 : 레귤러 (+0) <br>`;
      }else{
      output += `사이즈 : 엑스트라 (+1000) <br>`;
      }
    }

    if(cart[i].ice){
      var arr = cart[i].ice.split(",");
      if(arr[1] === "S"){
        output += `얼음 : 적게 (+0) <br>`;
      }else if(arr[1] === "M"){
        output += `얼음 : 보통 (+0) <br>`;
      }else if(arr[1] === "L"){
        output += `얼음 : 많이 (+0) <br>`;
      }
    }

    if(cart[i].topping1 || cart[i].topping2 || cart[i].topping3){
      output += `토핑 : `;
    if(cart[i].topping1){
      output += `샷(+500) `;
    }

    if(cart[i].topping2){
      output += `휘핑크림(+500) `;
    }

    if(cart[i].topping3){
      output += `시럽(+300)`;
    }
  }

  if(cart[i].count){
    output += '<br>수량:' + cart[i].count;
  }

    output += `</p>`;
    output += `</div>`;
    output += `</div>`;


    if(i % 2 === 1){ //세트의 끝
      output += `</div>`;
    }

  }

  return output;
}


app.get('/',function(req,res){ //아무런 pathname없이 들어왔을 경우 main 키오스크 화면으로 보내준다.
    res.redirect('/main');
})

app.get('/mode_guide', (req,res) => {
  mode = 1;

  res.redirect('/');
})

app.get('/mode_result', (req,res) => {
  mode = 2;

  res.redirect('/');
})

app.get('/scenario1', (req,res) => {
  scenario = 1;

})

app.get('/scenario2', (req,res) => {
  scenario = 2;

  res.redirect('/');
})

app.get('/scenario3', (req,res) => {
  scenario = 3;

  res.redirect('/');
})

app.get('/scenario4', (req,res) => {
  scenario = 4;

  res.redirect('/');
})

app.get('/scenario9', (req,res) => {
  scenario = 9;

  res.redirect('/');
})

app.get('/scenario10', (req,res) => {
  scenario = 10;

  res.redirect('/');
})

app.get('/scenario11', (req,res) => {
  scenario = 11;

  res.redirect('/');
})

app.get('/scenario12', (req,res) => {
  scenario = 12;

  res.redirect('/');
})

app.get('/mode_change', (req,res) => {

  var output=`
  ${starthtml()}

  <p>
  <ul>
    <li><a href = '/mode_guide'>모드 : 가이드</a></li>
    <li><a href = '/mode_result'>모드 : 결과창 출력</a></li>
  </ul>
  </p>

  <p><br><br><br><br><br><br></p>

  
  <h1>난이도 하</h1>
  <p>
  <ul>
  <li><a href = '/scenario1'>시나리오1 : 초코티라미수랑 아메리카노 주문해줘</a></li>
  <li><a href = '/scenario2'>시나리오2 : 피치 얼그레이 한 잔 주문해줘</a></li>
  <li><a href = '/scenario3'>시나리오3 : 아메리카노 엑스트라 사이즈로 두 잔 주문해줘</a></li>
  <li><a href = '/scenario4'>시나리오4 : 아인슈페너 한 잔 주문해줘</a></li>
  </ul>
  </p>  


  <h1>난이도 상</h1>
  <p>
  <ul>
  <li><a href = '/scenario9'>시나리오9 : 아메리카노 한 잔 이랑, 청포도 에이드 한 잔, 생크림 와플 두 개 주문해줘</a></li>
  <li><a href = '/scenario10'>시나리오10 : 카페라떼 휘핑크림이랑 샷 추가해서 한 잔, 아메리카노 한 잔에 시럽 추가하고 딸기 쉐이크 한 잔 주문해줘 </a></li>
  <li><a href = '/scenario11'>시나리오11 : 콜드 부르 아메리카노 샷 추가해서 한 잔, 오리진 쉐이크 한 잔 주문해줘</a></li>
  <li><a href = '/scenario12'>시나리오12 : 아메리카노 그냥 한 잔, 시럽 추가해서 한 잔, 그리고 수플레 치즈 케이크 하나 주문해줘</a></li>
  </ul>
  </p>

  ${endhtml()}
  `;
  res.send(output);
})

app.get('/main', function(req,res){ //키오스크 메인화면, 주문하기 버튼이 주요 요소임.

    var output = `
    ${starthtml()}


    <div class="container justify-content-center">
        
        <div class="row text-center" style="width: 100%">
 
            <div style="width: 30%; float:none; margin:0 auto" >
                    <h1>HCI & UX</h1>
            </div>
        </div>

        <!--이곳에 음성 안내메세지 출력-->

        <audio autoplay="autoplay">
        <source src="${server_url}/tts/main.mp3" type="audio/mpeg" />
        </audio> 
    
        <div class="container justify-content-center m-1">
        <div class="row text-center" style="width: 100%">
        <h5><img src='${server_url}/img/speak.png' alt ="#">AI의 도움이 필요하시다면 가운데의 빨간점을 눌러주세요</h5> 
        </div>
        </div>
    
        <!--출력 종료-->

        <p><br><br><br><br><br><br><br><br><br><br></p>
        
  <div class="d-flex justify-content-center">
  <form class="row justify-content-center " >
      <a href="/start_scenario" class="btn btn-lg" tabindex="-1" role="button">
          <div class="spinner-grow text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
  </a>
  </form>
  </div>

        <p><br><br><br><br><br><br><br><br><br><br></p>

            <div class="container justify-content-center border mt-5">
                <div class="row justify-content-center">
                  
                    <button class="btn" id = "btn" type = "submit">
                        <a href = "./order_main">
                        <img src='${server_url}/img/order_button.png' alt="#">
                        </a>
                    </button>
                    
                </div>
              </div>



              <p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></p>

              <a href = '/mode_change'>모드 변경</a>
              <p>현재 모드 : ${mode}</p>
              <p>현재 시나리오 : ${scenario}</p>
    ${endhtml()}
    `;
    res.send(output);
});


//여기서부터 시나리오1을 위한 코드 목록

app.get("/scenario1/result_mode/1", (req,res) => { //시나리오1 결과창을 바로 입력요청 했을시


  var temp_1 ={ //장바구니에 내용을 추가할 객체
    name : '초코티라미수',
    price : '3900',
    count : '1',
    total : '3900',
    img_src : server_url+'/img/tiramisu.png'
  };

  result_price += 3900;

  cart.push(temp_1); 

  var temp_2 ={ //장바구니에 내용을 추가할 객체
    name : '아메리카노',
    price : '3200',
    size : '0',
    ice : '0,M',
    count : '1',
    total : '3200',
    img_src : server_url+'/img/americano.png'
  };

  result_price += 3200;

  cart.push(temp_2); 

  console.log(result_price);

  res.redirect('/payment');
})


app.get("/scenario1/guide_mode/3", (req,res) => {
  
  var output = `
    ${starthtml()}

    <!--상세 메뉴의 상단 부분을 구성하는 ui 시작 지점-->
    <div class="container justify-content-center">
        
    <div class="row text-center" style="width: 100%">

        <div style="width: 30%; float:none; margin:0 auto" >
                <h1>HCI & UX</h1>
        </div>
    </div>

    <!--이곳에 음성 안내메세지 출력-->

    <audio autoplay="autoplay">
    <source src="${server_url}/tts/scenario1_3.mp3" type="audio/mpeg" />
    </audio> 

    <div class="container justify-content-center m-1">
    <div class="row text-center" style="width: 100%">
    <h5><img src='${server_url}/img/speak.png' alt ="#">결제하기 버튼을 눌러 결제를 진행해주세요.</h5> 
    </div>
    </div>

    <!--출력 종료-->

    <nav class="navbar">
        <div class="container-fluid">
            
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">커피</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" disabled>음료/에이드</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" disabled>디저트</button>
            </li>
          </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
          <!--커피 상세 메뉴-->
          
            <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#americano" disabled>
                              <img class = "btn-img m-3" src='${server_url}/img/americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">아메리카노</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#bubble_black" disabled>
                      <img class = "btn-img m-3" src='${server_url}/img/bubble_black.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">버블흑당콜드브루</h5>
                          <p class="card-text">4700원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cafe_latte" disabled>
                                  <img class = "btn-img m-3" src='${server_url}/img/cafe_latte.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">카페라떼</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew_americano" disabled>
                          <img class = "btn-img m-3" src='${server_url}/img/cold_brew_americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">콜드브루아메리카노</h5>
                              <p class="card-text">3700원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

                    <!--한 세트 시작-->

                    <div class="row justify-content-center">
                      
                        <div class="col-5 m-2 border"  >
                          <div class="row justify-content-center">
                              
                              <div class="card m-1" style="width: 18rem;">
                                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew" disabled>
                                      <img class = "btn-img m-3" src='${server_url}/img/cold_brew.png' alt="#">
                                    </button>
                                  <div class="card-body">
                                      <h5 class="card-title">콜드브루라떼</h5>
                                      <p class="card-text">4200원
                                      </p>
                                  </div>
                                  </div>
                          </div>
                        </div>
        
                        <div class="col-5 m-2 border">
                        <div class="row justify-content-center">
                              
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#einstephener" disabled>
                              <img class = "btn-img m-3" src='${server_url}/img/einstephener.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">아인슈페너</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                          </div>
                        </div>
        
                        </div>
        
                        <!--한 세트 끝-->


            </div>
          </div>

          <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
          <!--음료, 에이드 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#strawberry">
                              <img class = "btn-img m-3" src='${server_url}/img/strawberry.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">딸기쉐이크</h5>
                              <p class="card-text">4800원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#lemonade">
                      <img class = "btn-img m-3" src='${server_url}/img/lemonade.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">레몬에이드</h5>
                          <p class="card-text">3800원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#green_grape">
                                  <img class = "btn-img m-3" src='${server_url}/img/green_grape.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">청포도에이드</h5>
                                  <p class="card-text">3800원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#peach">
                          <img class = "btn-img m-3" src='${server_url}/img/peach.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">피치얼그레이</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

            </div>

          </div>

          <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
          <!--디저트 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

          <!--한 세트 시작-->

          <div class="row justify-content-center">
            
              <div class="col-5 m-2 border"  >
                <div class="row justify-content-center">
                    
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#delicious_waffle" disabled>
                            <img class = "btn-img m-3" src='${server_url}/img/delicious_waffle.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">맛있는와플</h5>
                            <p class="card-text">3000원
                            </p>
                        </div>
                        </div>
                </div>
              </div>

              <div class="col-5 m-2 border">
              <div class="row justify-content-center">
                    
                <div class="card m-1" style="width: 18rem;">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_waffle" disabled>
                    <img class = "btn-img m-3" src='${server_url}/img/cream_waffle.png' alt="#">
                      </button>
                    <div class="card-body">
                        <h5 class="card-title">생크림와플</h5>
                        <p class="card-text">2500원
                        </p>
                    </div>
                    </div>
                </div>
              </div>

              </div>

              <!--한 세트 끝-->



              <!--한 세트 시작-->

              <div class="row justify-content-center">
                
                  <div class="col-5 m-2 border"  >
                    <div class="row justify-content-center">
                        
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cheese_cake" disabled>
                                <img class = "btn-img m-3" src='${server_url}/img/cheese_cake.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">수플레치즈케이크</h5>
                                <p class="card-text">3900원
                                </p>
                            </div>
                            </div>
                    </div>
                  </div>
  
                  <div class="col-5 m-2 border">
                  <div class="row justify-content-center">
                        
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#origin_shake" disabled>
                        <img class = "btn-img m-3" src='${server_url}/img/origin_shake.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">오리진쉐이크</h5>
                            <p class="card-text">4300원
                            </p>
                        </div>
                        </div>
                    </div>
                  </div>
  
                  </div>
  
                  <!--한 세트 끝-->

                  <!--한 세트 시작-->

                  <div class="row justify-content-center">
                    
                      <div class="col-5 m-2 border"  >
                        <div class="row justify-content-center">
                            
                            <div class="card m-1" style="width: 18rem;">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#tiramisu">
                                    <img class = "btn-img m-3" src='${server_url}/img/tiramisu.png' alt="#">
                                  </button>
                                <div class="card-body">
                                    <h5 class="card-title">초코티라미수</h5>
                                    <p class="card-text">3900원
                                    </p>
                                </div>
                                </div>
                        </div>
                      </div>
      
                      <div class="col-5 m-2 border">
                      <div class="row justify-content-center">
                            
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_cheese_waffle" disabled>
                            <img class = "btn-img m-3" src='${server_url}/img/cream_cheese_waffle.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">크림치즈와플</h5>
                                <p class="card-text">3000원
                                </p>
                            </div>
                            </div>
                        </div>
                      </div>
      
                      </div>
      
                      <!--한 세트 끝-->

          </div>

          </div>
        </div>
        </div>

        <div class="container justify-content-center border mt-5">
        <p>${order_main_cart_html()}</p>
        </div>

        <div class="container justify-content-center">
        <h3>총 가격 : ${result_price} 원</h3>
        </div>

        <div class="container justify-content-end">
        <a href="/payment" class="btn btn-primary btn-lg m-1" tabindex="-1" role="button">결제하기</a>
        </div>


      </nav>
</div>
    <!--상세 메뉴의 상단을 구분하는 ui 종료지점-->

    <!--여기서부터 modal창들을 불러오는 함수-->

    <!--종료-->
    ${endhtml()}
    `;


    res.send(output);
  
  

})
app.post("/scenario1/guide_mode/2",(req,res) => { //받아온 수식 또 계산
  
  var total_price = parseInt(req.body.basic_price)

  if(req.body.size){
    total_price += parseInt(req.body.size); //존재할 경우에만 더해주어야 한다.
  }

  if(req.body.ice){
    var arr = req.body.ice.split(",");
    total_price += parseInt(arr[0]);
  }

  if(req.body.topping1){
    total_price += parseInt(req.body.topping1)
  }
  
  if(req.body.topping2){
    total_price += parseInt(req.body.topping2)
  }

  if(req.body.topping3){
    total_price += parseInt(req.body.topping3)
  }


  total_price = total_price * parseInt(req.body.count)

  var temp ={ //장바구니에 내용을 추가할 객체
    name : req.body.product_name,
    price : req.body.basic_price,
    size : req.body.size,
    ice : req.body.ice,
    topping1 : req.body.topping1,
    topping2 : req.body.topping2,
    topping3 : req.body.topping3,
    count : req.body.count,
    total : total_price,
    img_src : req.body.img_src
  };

  cart.push(temp); 

  res.redirect("/scenario1/guide_mode/3");

})
app.get("/scenario1/guide_mode/2", (req,res) =>{  //시나리오1 가이드 모드의 2단계

  var output = `
    ${starthtml()}

    <!--상세 메뉴의 상단 부분을 구성하는 ui 시작 지점-->
    <div class="container justify-content-center">
        
    <div class="row text-center" style="width: 100%">

        <div style="width: 30%; float:none; margin:0 auto" >
                <h1>HCI & UX</h1>
        </div>
    </div>

    <!--이곳에 음성 안내메세지 출력-->

    <audio autoplay="autoplay">
    <source src="${server_url}/tts/scenario1_2.mp3" type="audio/mpeg" />
    </audio> 

    <div class="container justify-content-center m-1">
    <div class="row text-center" style="width: 100%">
    <h5><img src='${server_url}/img/speak.png' alt ="#">다음으로 커피 탭에서 아메리카노를 주문해주세요.</h5> 
    </div>
    </div>

    <!--출력 종료-->

    <nav class="navbar">
        <div class="container-fluid">
            
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">커피</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" disabled>음료/에이드</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" disabled>디저트</button>
            </li>
          </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
          <!--커피 상세 메뉴-->
          
            <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#americano">
                              <img class = "btn-img m-3" src='${server_url}/img/americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">아메리카노</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#bubble_black" disabled>
                      <img class = "btn-img m-3" src='${server_url}/img/bubble_black.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">버블흑당콜드브루</h5>
                          <p class="card-text">4700원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cafe_latte" disabled>
                                  <img class = "btn-img m-3" src='${server_url}/img/cafe_latte.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">카페라떼</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew_americano" disabled>
                          <img class = "btn-img m-3" src='${server_url}/img/cold_brew_americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">콜드브루아메리카노</h5>
                              <p class="card-text">3700원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

                    <!--한 세트 시작-->

                    <div class="row justify-content-center">
                      
                        <div class="col-5 m-2 border"  >
                          <div class="row justify-content-center">
                              
                              <div class="card m-1" style="width: 18rem;">
                                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew" disabled>
                                      <img class = "btn-img m-3" src='${server_url}/img/cold_brew.png' alt="#">
                                    </button>
                                  <div class="card-body">
                                      <h5 class="card-title">콜드브루라떼</h5>
                                      <p class="card-text">4200원
                                      </p>
                                  </div>
                                  </div>
                          </div>
                        </div>
        
                        <div class="col-5 m-2 border">
                        <div class="row justify-content-center">
                              
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#einstephener" disabled>
                              <img class = "btn-img m-3" src='${server_url}/img/einstephener.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">아인슈페너</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                          </div>
                        </div>
        
                        </div>
        
                        <!--한 세트 끝-->


            </div>
          </div>

          <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
          <!--음료, 에이드 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#strawberry">
                              <img class = "btn-img m-3" src='${server_url}/img/strawberry.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">딸기쉐이크</h5>
                              <p class="card-text">4800원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#lemonade">
                      <img class = "btn-img m-3" src='${server_url}/img/lemonade.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">레몬에이드</h5>
                          <p class="card-text">3800원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#green_grape">
                                  <img class = "btn-img m-3" src='${server_url}/img/green_grape.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">청포도에이드</h5>
                                  <p class="card-text">3800원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#peach">
                          <img class = "btn-img m-3" src='${server_url}/img/peach.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">피치얼그레이</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

            </div>

          </div>

          <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
          <!--디저트 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

          <!--한 세트 시작-->

          <div class="row justify-content-center">
            
              <div class="col-5 m-2 border"  >
                <div class="row justify-content-center">
                    
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#delicious_waffle" disabled>
                            <img class = "btn-img m-3" src='${server_url}/img/delicious_waffle.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">맛있는와플</h5>
                            <p class="card-text">3000원
                            </p>
                        </div>
                        </div>
                </div>
              </div>

              <div class="col-5 m-2 border">
              <div class="row justify-content-center">
                    
                <div class="card m-1" style="width: 18rem;">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_waffle" disabled>
                    <img class = "btn-img m-3" src='${server_url}/img/cream_waffle.png' alt="#">
                      </button>
                    <div class="card-body">
                        <h5 class="card-title">생크림와플</h5>
                        <p class="card-text">2500원
                        </p>
                    </div>
                    </div>
                </div>
              </div>

              </div>

              <!--한 세트 끝-->



              <!--한 세트 시작-->

              <div class="row justify-content-center">
                
                  <div class="col-5 m-2 border"  >
                    <div class="row justify-content-center">
                        
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cheese_cake" disabled>
                                <img class = "btn-img m-3" src='${server_url}/img/cheese_cake.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">수플레치즈케이크</h5>
                                <p class="card-text">3900원
                                </p>
                            </div>
                            </div>
                    </div>
                  </div>
  
                  <div class="col-5 m-2 border">
                  <div class="row justify-content-center">
                        
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#origin_shake" disabled>
                        <img class = "btn-img m-3" src='${server_url}/img/origin_shake.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">오리진쉐이크</h5>
                            <p class="card-text">4300원
                            </p>
                        </div>
                        </div>
                    </div>
                  </div>
  
                  </div>
  
                  <!--한 세트 끝-->

                  <!--한 세트 시작-->

                  <div class="row justify-content-center">
                    
                      <div class="col-5 m-2 border"  >
                        <div class="row justify-content-center">
                            
                            <div class="card m-1" style="width: 18rem;">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#tiramisu">
                                    <img class = "btn-img m-3" src='${server_url}/img/tiramisu.png' alt="#">
                                  </button>
                                <div class="card-body">
                                    <h5 class="card-title">초코티라미수</h5>
                                    <p class="card-text">3900원
                                    </p>
                                </div>
                                </div>
                        </div>
                      </div>
      
                      <div class="col-5 m-2 border">
                      <div class="row justify-content-center">
                            
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_cheese_waffle" disabled>
                            <img class = "btn-img m-3" src='${server_url}/img/cream_cheese_waffle.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">크림치즈와플</h5>
                                <p class="card-text">3000원
                                </p>
                            </div>
                            </div>
                        </div>
                      </div>
      
                      </div>
      
                      <!--한 세트 끝-->

          </div>

          </div>
        </div>
        </div>

        <div class="container justify-content-center border mt-5">
        <p>${order_main_cart_html()}</p>
        </div>

        <div class="container justify-content-center">
        <h3>총 가격 : ${result_price} 원</h3>
        </div>


      </nav>
</div>
    <!--상세 메뉴의 상단을 구분하는 ui 종료지점-->

    <!--여기서부터 modal창들을 불러오는 함수-->

    <!--아메리카노모달-->

    <form action="${server_url}/scenario1/guide_mode/2" method="post">
    <div class="modal fade" id="americano" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!--여기에 프로필 편집창 내용물을 삽입-->
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
            <!--프로필1번 내용물-->
            <div class = "container justify-content-center mt-3">
                <div class = "row">
                    <div class="col">
                        <img src='${server_url}/img/americano.png' alt="Logo" width="140" height="140">
                        <input type = "hidden" value = '${server_url}/img/americano.png' name = "img_src">
                    </div>
    
                    <div class = "col">
                        <p class="text-center">상품명 - 아메리카노</p>
                        <input type = "hidden" value = "아메리카노" name = "product_name">
                        <p class="text-center">가격 - 3200원</p>
                        <input type = "hidden" value = "3200" name = "basic_price">
                    </div>
                </div>
                <table class="table">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <!---->
                        <th scope="row">사이즈 선택</th>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                        <input type="radio" name="size" class="custom-control-input" id="ck1a" value = "0" checked>
                        <label class="custom-control-label" for="ck1a">
                        레귤러<br>+0
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                        <input type="radio" name="size" class="custom-control-input" id="ck1b" value = "1000">
                        <label class="custom-control-label" for="ck1b">
                        엑스트라<br>+1000
                        </label>
                    </div>
                        </td>

                      </tr>


                      <tr>
                        <th scope="row">얼음 선택</th>
                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                        <input type="radio" name="ice" class="custom-control-input" id="ck1c" value = "0,S">
                        <label class="custom-control-label" for="ck1c">
                        조금<br>+0
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="ice" class="custom-control-input" id="ck1d" value = "0,M" checked>
                            <label class="custom-control-label" for="ck1d">
                            보통<br>+0
                            </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-radio image-checkbox">
                            <input type="radio" name="ice" class="custom-control-input" id="ck1e" value = "0,L">
                            <label class="custom-control-label" for="ck1e">
                            많이<br>+0
                            </label>
                    </div>
                        </td>
                      </tr>


                      <tr>
                        <th scope="row">토핑 선택</th>

                        <td>
                    <div class="custom-control custom-checkbox image-checkbox">
                        <input type="checkbox" name="topping1" class="custom-control-input" id="ck1f" value = "500">
                        <label class="custom-control-label" for="ck1f">
                        샷 추가<br>+500
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-checkbox image-checkbox">
                        <input type="checkbox" name="topping2" class="custom-control-input" id="ck1g" value = "500">
                        <label class="custom-control-label" for="ck1g">
                        휘핑크림<br>+500
                        </label>
                    </div>
                        </td>

                        <td>
                    <div class="custom-control custom-checkbox image-checkbox">
                        <input type="checkbox" name="topping3" class="custom-control-input" id="ck1h" value = "300">
                        <label class="custom-control-label" for="ck1h">
                        시럽<br>+300
                        </label>
                    </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                

                           
            </div>
          </div>

        </div>

        <select class="form-select" name = "count" aria-label="Default select example">
  <option value="1" selected>수량 선택</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
        </select>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="submit" class="btn btn-primary">장바구니에 추가</button>

        </div>

      </div>
    </div>
  </div>
</div>

</form>

    <!--종료-->
    ${endhtml()}
    `;


    res.send(output);
})
app.post("/scenario1/guide_mode/1", (req,res) => {

  var total_price = parseInt(req.body.basic_price)

  if(req.body.size){
    total_price += parseInt(req.body.size); //존재할 경우에만 더해주어야 한다.
  }

  if(req.body.ice){
    var arr = req.body.ice.split(",");
    total_price += parseInt(arr[0]);
  }

  if(req.body.topping1){
    total_price += parseInt(req.body.topping1)
  }
  
  if(req.body.topping2){
    total_price += parseInt(req.body.topping2)
  }

  if(req.body.topping3){
    total_price += parseInt(req.body.topping3)
  }


  total_price = total_price * parseInt(req.body.count)

  var temp ={ //장바구니에 내용을 추가할 객체
    name : req.body.product_name,
    price : req.body.basic_price,
    size : req.body.size,
    ice : req.body.ice,
    topping1 : req.body.topping1,
    topping2 : req.body.topping2,
    topping3 : req.body.topping3,
    count : req.body.count,
    total : total_price,
    img_src : req.body.img_src
  };

  cart.push(temp); 

  res.redirect("/scenario1/guide_mode/2");
})
app.get("/scenario1/guide_mode/1", (req,res) =>{

  var output = `
    ${starthtml()}

    <!--상세 메뉴의 상단 부분을 구성하는 ui 시작 지점-->
    <div class="container justify-content-center">
        
    <div class="row text-center" style="width: 100%">

        <div style="width: 30%; float:none; margin:0 auto" >
                <h1>HCI & UX</h1>
        </div>
    </div>

    <!--이곳에 음성 안내메세지 출력-->

    <audio autoplay="autoplay">
    <source src="${server_url}/tts/scenario1_1.mp3" type="audio/mpeg" />
    </audio> 

    <div class="container justify-content-center m-1">
    <div class="row text-center" style="width: 100%">
    <h5><img src='${server_url}/img/speak.png' alt ="#">먼저 디저트 탭을 누른 다음에, 초코티라미수를 주문해주세요.</h5> 
    </div>
    </div>

    <!--출력 종료-->

    <nav class="navbar">
        <div class="container-fluid">
            
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" disabled>커피</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" disabled>음료/에이드</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">디저트</button>
            </li>
          </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
          <!--커피 상세 메뉴-->
          
            <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#americano" disabled>
                              <img class = "btn-img m-3" src='${server_url}/img/americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">아메리카노</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#bubble_black" disabled>
                      <img class = "btn-img m-3" src='${server_url}/img/bubble_black.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">버블흑당콜드브루</h5>
                          <p class="card-text">4700원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cafe_latte" disabled>
                                  <img class = "btn-img m-3" src='${server_url}/img/cafe_latte.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">카페라떼</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew_americano" disabled>
                          <img class = "btn-img m-3" src='${server_url}/img/cold_brew_americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">콜드브루아메리카노</h5>
                              <p class="card-text">3700원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

                    <!--한 세트 시작-->

                    <div class="row justify-content-center">
                      
                        <div class="col-5 m-2 border"  >
                          <div class="row justify-content-center">
                              
                              <div class="card m-1" style="width: 18rem;">
                                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew" disabled>
                                      <img class = "btn-img m-3" src='${server_url}/img/cold_brew.png' alt="#">
                                    </button>
                                  <div class="card-body">
                                      <h5 class="card-title">콜드브루라떼</h5>
                                      <p class="card-text">4200원
                                      </p>
                                  </div>
                                  </div>
                          </div>
                        </div>
        
                        <div class="col-5 m-2 border">
                        <div class="row justify-content-center">
                              
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#einstephener" disabled>
                              <img class = "btn-img m-3" src='${server_url}/img/einstephener.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">아인슈페너</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                          </div>
                        </div>
        
                        </div>
        
                        <!--한 세트 끝-->


            </div>
          </div>

          <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
          <!--음료, 에이드 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#strawberry">
                              <img class = "btn-img m-3" src='${server_url}/img/strawberry.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">딸기쉐이크</h5>
                              <p class="card-text">4800원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#lemonade">
                      <img class = "btn-img m-3" src='${server_url}/img/lemonade.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">레몬에이드</h5>
                          <p class="card-text">3800원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#green_grape">
                                  <img class = "btn-img m-3" src='${server_url}/img/green_grape.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">청포도에이드</h5>
                                  <p class="card-text">3800원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#peach">
                          <img class = "btn-img m-3" src='${server_url}/img/peach.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">피치얼그레이</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

            </div>

          </div>

          <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
          <!--디저트 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

          <!--한 세트 시작-->

          <div class="row justify-content-center">
            
              <div class="col-5 m-2 border"  >
                <div class="row justify-content-center">
                    
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#delicious_waffle" disabled>
                            <img class = "btn-img m-3" src='${server_url}/img/delicious_waffle.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">맛있는와플</h5>
                            <p class="card-text">3000원
                            </p>
                        </div>
                        </div>
                </div>
              </div>

              <div class="col-5 m-2 border">
              <div class="row justify-content-center">
                    
                <div class="card m-1" style="width: 18rem;">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_waffle" disabled>
                    <img class = "btn-img m-3" src='${server_url}/img/cream_waffle.png' alt="#">
                      </button>
                    <div class="card-body">
                        <h5 class="card-title">생크림와플</h5>
                        <p class="card-text">2500원
                        </p>
                    </div>
                    </div>
                </div>
              </div>

              </div>

              <!--한 세트 끝-->



              <!--한 세트 시작-->

              <div class="row justify-content-center">
                
                  <div class="col-5 m-2 border"  >
                    <div class="row justify-content-center">
                        
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cheese_cake" disabled>
                                <img class = "btn-img m-3" src='${server_url}/img/cheese_cake.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">수플레치즈케이크</h5>
                                <p class="card-text">3900원
                                </p>
                            </div>
                            </div>
                    </div>
                  </div>
  
                  <div class="col-5 m-2 border">
                  <div class="row justify-content-center">
                        
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#origin_shake" disabled>
                        <img class = "btn-img m-3" src='${server_url}/img/origin_shake.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">오리진쉐이크</h5>
                            <p class="card-text">4300원
                            </p>
                        </div>
                        </div>
                    </div>
                  </div>
  
                  </div>
  
                  <!--한 세트 끝-->

                  <!--한 세트 시작-->

                  <div class="row justify-content-center">
                    
                      <div class="col-5 m-2 border"  >
                        <div class="row justify-content-center">
                            
                            <div class="card m-1" style="width: 18rem;">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#tiramisu">
                                    <img class = "btn-img m-3" src='${server_url}/img/tiramisu.png' alt="#">
                                  </button>
                                <div class="card-body">
                                    <h5 class="card-title">초코티라미수</h5>
                                    <p class="card-text">3900원
                                    </p>
                                </div>
                                </div>
                        </div>
                      </div>
      
                      <div class="col-5 m-2 border">
                      <div class="row justify-content-center">
                            
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_cheese_waffle" disabled>
                            <img class = "btn-img m-3" src='${server_url}/img/cream_cheese_waffle.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">크림치즈와플</h5>
                                <p class="card-text">3000원
                                </p>
                            </div>
                            </div>
                        </div>
                      </div>
      
                      </div>
      
                      <!--한 세트 끝-->

          </div>

          </div>
        </div>
        </div>

        <div class="container justify-content-center border mt-5">
        <p>${order_main_cart_html()}</p>
        </div>

        <div class="container justify-content-center">
        <h3>총 가격 : ${result_price} 원</h3>
        </div>


      </nav>
</div>
    <!--상세 메뉴의 상단을 구분하는 ui 종료지점-->

    <!--여기서부터 modal창들을 불러오는 함수-->

    <!--디저트모달-->
    
  <form action="${server_url}/scenario1/guide_mode/1" method="post">
  <div class="modal fade" id="tiramisu" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">상세 옵션</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!--여기에 프로필 편집창 내용물을 삽입-->
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
          <!--프로필1번 내용물-->
          <div class = "container justify-content-center mt-3">
              <div class = "row">
                  <div class="col">
                      <img src='${server_url}/img/tiramisu.png' alt="Logo" width="140" height="140">
                      <input type = "hidden" value = '${server_url}/img/tiramisu.png' name = "img_src">
                  </div>
  
                  <div class = "col">
                  <p class="text-center">상품명 - 초코티라미수</p>
                  <input type = "hidden" value = "초코티라미수" name = "product_name">
                  <p class="text-center">가격 - 3900</p>
                  <input type = "hidden" value = "3900" name = "basic_price">
                  </div>
              </div>
              
              <br><br><br><br><br><br><br><br>

          </div>
        </div>

      </div>

      <select class="form-select" name = "count" aria-label="Default select example">
      <option value="1" selected>수량 선택</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      </select>

      <br><br>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
        <button type="submit" class="btn btn-primary">장바구니에 추가</button>

      </div>

    </div>
  </div>
</div>
</div>

</form>

    <!--종료-->
    ${endhtml()}
    `;


    res.send(output);
})

//시나리오1 코드 종료


//시나리오 선택 및 진행을 위한 if문
app.get("/scenario_process", (req,res) =>{

  var output = `
  ${starthtml()}
  <body>

  <audio autoplay="autoplay">
  <source src="${server_url}/tts/scenario_process.mp3" type="audio/mpeg" />
  </audio> 

  <div class="container justify-content-center">
      <div class="row text-center" style="width: 100%">

          <div style="width: 100%; float:none; margin:0 auto" >
                  <h1>주문을 진행 중이에요.</h1>
          </div>
      </div>

      <p><br><br><br><br><br><br><br><br><br><br></p>


      <div class="d-flex justify-content-center">
          <form class="row justify-content-center " >
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              
            <span class="visually-hidden">Loading...</span>
          </div>

        </a>
        </form>
      </div>

      <p><br><br><br><br><br><br><br><br><br><br></p>


        <div class="row text-center" style="width: 100%">

          <div style="width: 100%; float:none; margin:0 auto" >
                  <h1>잠시만 기다려 주세요...</h1>
          </div>
      </div>


</div>`


//if문에 따라 어디로 이동시킬지 이곳에서 정한다.


if(mode === 1 && scenario === 1){ //시나리오 1 - 가이드 모드

  output += `  
<script>

setTimeout(function() {
  location.href = './scenario1/guide_mode/1';
}, 4500);

</script>
  `;

}else if(mode === 2 && scenario === 1){ //시나리오 1 - 결과창 모드

  output += `  
<script>

setTimeout(function() {
  location.href = './scenario1/result_mode/1';
}, 4500);

</script>
`;

}


//코드 예시
// output += `  
// <script>

// setTimeout(function() {
//   location.href = './';
// }, 3500);

// </script>
// `;

output += `
  ${endhtml()}
  `;

  res.send(output);

})

app.get("/start_scenario", (req,res) => {

  var output =`
  ${starthtml()}

  
  <div class="container justify-content-center">
        
  <div class="row text-center" style="width: 100%">

      <div style="width: 30%; float:none; margin:0 auto" >
              <h1>HCI & UX</h1>
      </div>
  </div>

  <br><br><br><br><br><br><br><br>

  <!--이곳에 음성 안내메세지 출력-->

  <audio autoplay="autoplay">
  <source src="${server_url}/tts/start_scenario.mp3" type="audio/mpeg" />
  </audio> 

  <div class="container justify-content-center m-1">
  <div class="row text-center" style="width: 100%">
  <h5><img src='${server_url}/img/speak.png' alt ="#">주문하기 버튼을 누르고 주문을 진행해주세요.</h5> 
  </div>
  </div>

  <!--출력 종료-->

  <p><br><br><br><br><br><br><br><br><br><br></p>

  <div class="row text-center" style="width: 100%">
  <input type="text" id="speech_result" readonly/>
  </div>

  <div class="row text-center" style="width: 100%">
  <div style="width: 30%; float:none; margin:0 auto" >
  <button type="button" class="btn btn-primary btn-lg m-1" onclick="startSpeechRecognition();">주문하기</button>
  </div>
  </div>

  <div class="row text-center" style="width: 100%">
  <div style="width: 30%; float:none; margin:0 auto" >
  <a href="/scenario_process" class="btn btn-primary btn-lg m-1" id="btn_end" tabindex="-1" role="button">주문완료</a>
  </div>
  </div>
  
  </div>



  
  <script>
  let recognition = null;

  function checkCompatibility() {
    recognition = new(window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "ko";
    recognition.maxAlternatives = 5;

    if (!recognition) {
      alert("You cannot use speech api.");
    }
  }

  function startSpeechRecognition() {
    console.log('Start');

    document.getElementById("speech_result").value = "입력중...";

    recognition.addEventListener("speechstart", () => {
      console.log('Speech Start');
    });

    recognition.addEventListener("speechend", () => {
      console.log('Speech End');
    });

    recognition.addEventListener("result", (event) => {
      console.log('Speech Result', event.results);
      const text = event.results[0][0].transcript;
      document.getElementById("speech_result").value = text;
    });

    recognition.start();
  }


  


  window.addEventListener('load', checkCompatibility);

  </script>

  
  ${endhtml()}
  `;



  res.send(output);

})

app.post('/order_main', function(req,res){ //장바구니에 넣고 order_main page로 돌려보낸다.
    

    var total_price = parseInt(req.body.basic_price)

    if(req.body.size){
      total_price += parseInt(req.body.size); //존재할 경우에만 더해주어야 한다.
    }

    if(req.body.ice){
      var arr = req.body.ice.split(",");
      total_price += parseInt(arr[0]);
    }

    if(req.body.topping1){
      total_price += parseInt(req.body.topping1)
    }
    
    if(req.body.topping2){
      total_price += parseInt(req.body.topping2)
    }

    if(req.body.topping3){
      total_price += parseInt(req.body.topping3)
    }
  

    total_price = total_price * parseInt(req.body.count)

    var temp ={ //장바구니에 내용을 추가할 객체
      name : req.body.product_name,
      price : req.body.basic_price,
      size : req.body.size,
      ice : req.body.ice,
      topping1 : req.body.topping1,
      topping2 : req.body.topping2,
      topping3 : req.body.topping3,
      count : req.body.count,
      total : total_price,
      img_src : req.body.img_src
    };

    console.log(temp)

    cart.push(temp); 

    console.log(cart);

    res.redirect('/order_main');

})

app.get('/order_main', function(req,res){ //커피 선택 메뉴

    var output = `
    ${starthtml()}

    <!--상세 메뉴의 상단 부분을 구성하는 ui 시작 지점-->
    <div class="container justify-content-center">
        
    <div class="row text-center" style="width: 100%">

        <div style="width: 30%; float:none; margin:0 auto" >
                <h1>HCI & UX</h1>
        </div>
    </div>

    <!--이곳에 음성 안내메세지 출력-->

    <audio autoplay="autoplay">
    <source src="${server_url}/tts/order_main.mp3" type="audio/mpeg" />
    </audio> 

    <div class="container justify-content-center m-1">
    <div class="row text-center" style="width: 100%">
    <h5><img src='${server_url}/img/speak.png' alt ="#">메뉴를 선택해주세요</h5> 
    </div>
    </div>

    <!--출력 종료-->

    <nav class="navbar">
        <div class="container-fluid">
            
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">커피</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">음료/에이드</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">디저트</button>
            </li>
          </ul>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab">
          <!--커피 상세 메뉴-->
          
            <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:800px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#americano">
                              <img class = "btn-img m-3" src='${server_url}/img/americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">아메리카노</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#bubble_black">
                      <img class = "btn-img m-3" src='${server_url}/img/bubble_black.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">버블흑당콜드브루</h5>
                          <p class="card-text">4700원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cafe_latte">
                                  <img class = "btn-img m-3" src='${server_url}/img/cafe_latte.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">카페라떼</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew_americano">
                          <img class = "btn-img m-3" src='${server_url}/img/cold_brew_americano.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">콜드브루아메리카노</h5>
                              <p class="card-text">3700원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

                    <!--한 세트 시작-->

                    <div class="row justify-content-center">
                      
                        <div class="col-5 m-2 border"  >
                          <div class="row justify-content-center">
                              
                              <div class="card m-1" style="width: 18rem;">
                                  <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cold_brew">
                                      <img class = "btn-img m-3" src='${server_url}/img/cold_brew.png' alt="#">
                                    </button>
                                  <div class="card-body">
                                      <h5 class="card-title">콜드브루라떼</h5>
                                      <p class="card-text">4200원
                                      </p>
                                  </div>
                                  </div>
                          </div>
                        </div>
        
                        <div class="col-5 m-2 border">
                        <div class="row justify-content-center">
                              
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#einstephener">
                              <img class = "btn-img m-3" src='${server_url}/img/einstephener.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">아인슈페너</h5>
                                  <p class="card-text">3700원
                                  </p>
                              </div>
                              </div>
                          </div>
                        </div>
        
                        </div>
        
                        <!--한 세트 끝-->


            </div>
          </div>

          <div class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab">
          <!--음료, 에이드 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

            <!--한 세트 시작-->

            <div class="row justify-content-center">
              
                <div class="col-5 m-2 border"  >
                  <div class="row justify-content-center">
                      
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#strawberry">
                              <img class = "btn-img m-3" src='${server_url}/img/strawberry.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">딸기쉐이크</h5>
                              <p class="card-text">4800원
                              </p>
                          </div>
                          </div>
                  </div>
                </div>

                <div class="col-5 m-2 border">
                <div class="row justify-content-center">
                      
                  <div class="card m-1" style="width: 18rem;">
                      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#lemonade">
                      <img class = "btn-img m-3" src='${server_url}/img/lemonade.png' alt="#">
                        </button>
                      <div class="card-body">
                          <h5 class="card-title">레몬에이드</h5>
                          <p class="card-text">3800원
                          </p>
                      </div>
                      </div>
                  </div>
                </div>

                </div>

                <!--한 세트 끝-->



                <!--한 세트 시작-->

                <div class="row justify-content-center">
                  
                    <div class="col-5 m-2 border"  >
                      <div class="row justify-content-center">
                          
                          <div class="card m-1" style="width: 18rem;">
                              <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#green_grape">
                                  <img class = "btn-img m-3" src='${server_url}/img/green_grape.png' alt="#">
                                </button>
                              <div class="card-body">
                                  <h5 class="card-title">청포도에이드</h5>
                                  <p class="card-text">3800원
                                  </p>
                              </div>
                              </div>
                      </div>
                    </div>
    
                    <div class="col-5 m-2 border">
                    <div class="row justify-content-center">
                          
                      <div class="card m-1" style="width: 18rem;">
                          <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#peach">
                          <img class = "btn-img m-3" src='${server_url}/img/peach.png' alt="#">
                            </button>
                          <div class="card-body">
                              <h5 class="card-title">피치얼그레이</h5>
                              <p class="card-text">3200원
                              </p>
                          </div>
                          </div>
                      </div>
                    </div>
    
                    </div>
    
                    <!--한 세트 끝-->

            </div>

          </div>

          <div class="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab">
          <!--디저트 상세 메뉴-->

          <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">

          <!--한 세트 시작-->

          <div class="row justify-content-center">
            
              <div class="col-5 m-2 border"  >
                <div class="row justify-content-center">
                    
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#delicious_waffle">
                            <img class = "btn-img m-3" src='${server_url}/img/delicious_waffle.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">맛있는와플</h5>
                            <p class="card-text">3000원
                            </p>
                        </div>
                        </div>
                </div>
              </div>

              <div class="col-5 m-2 border">
              <div class="row justify-content-center">
                    
                <div class="card m-1" style="width: 18rem;">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_waffle">
                    <img class = "btn-img m-3" src='${server_url}/img/cream_waffle.png' alt="#">
                      </button>
                    <div class="card-body">
                        <h5 class="card-title">생크림와플</h5>
                        <p class="card-text">2500원
                        </p>
                    </div>
                    </div>
                </div>
              </div>

              </div>

              <!--한 세트 끝-->



              <!--한 세트 시작-->

              <div class="row justify-content-center">
                
                  <div class="col-5 m-2 border"  >
                    <div class="row justify-content-center">
                        
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cheese_cake">
                                <img class = "btn-img m-3" src='${server_url}/img/cheese_cake.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">수플레치즈케이크</h5>
                                <p class="card-text">3900원
                                </p>
                            </div>
                            </div>
                    </div>
                  </div>
  
                  <div class="col-5 m-2 border">
                  <div class="row justify-content-center">
                        
                    <div class="card m-1" style="width: 18rem;">
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#origin_shake">
                        <img class = "btn-img m-3" src='${server_url}/img/origin_shake.png' alt="#">
                          </button>
                        <div class="card-body">
                            <h5 class="card-title">오리진쉐이크</h5>
                            <p class="card-text">4300원
                            </p>
                        </div>
                        </div>
                    </div>
                  </div>
  
                  </div>
  
                  <!--한 세트 끝-->

                  <!--한 세트 시작-->

                  <div class="row justify-content-center">
                    
                      <div class="col-5 m-2 border"  >
                        <div class="row justify-content-center">
                            
                            <div class="card m-1" style="width: 18rem;">
                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#tiramisu">
                                    <img class = "btn-img m-3" src='${server_url}/img/tiramisu.png' alt="#">
                                  </button>
                                <div class="card-body">
                                    <h5 class="card-title">초코티라미수</h5>
                                    <p class="card-text">3900원
                                    </p>
                                </div>
                                </div>
                        </div>
                      </div>
      
                      <div class="col-5 m-2 border">
                      <div class="row justify-content-center">
                            
                        <div class="card m-1" style="width: 18rem;">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cream_cheese_waffle">
                            <img class = "btn-img m-3" src='${server_url}/img/cream_cheese_waffle.png' alt="#">
                              </button>
                            <div class="card-body">
                                <h5 class="card-title">크림치즈와플</h5>
                                <p class="card-text">3000원
                                </p>
                            </div>
                            </div>
                        </div>
                      </div>
      
                      </div>
      
                      <!--한 세트 끝-->

          </div>

          </div>
        </div>
        </div>

        <div class="container justify-content-center border mt-5">
        <p>${order_main_cart_html()}</p>
        </div>

        <div class="container justify-content-center">
        <h3>총 가격 : ${result_price} 원</h3>
        </div>

      
        
        <div class="container justify-content-end">
        <a href="./vacate_cart" class="btn btn-primary btn-lg m-1" tabindex="-1" role="button">장바구니 비우기</a>
        <a href="./payment" class="btn btn-primary btn-lg m-1" tabindex="-1" role="button">결제하기</a>
        </div>


      </nav>
</div>
    <!--상세 메뉴의 상단을 구분하는 ui 종료지점-->

    <!--여기서부터 modal창들을 불러오는 함수-->

    <!--커피모달-->
    ${americano_modal()}
    ${bubble_black_modal()}
    ${cafe_latte_modal()}
    ${cold_brew_americano_modal()}
    ${cold_brew_modal()}
    ${einstephener_modal()}

    <!--음료모달-->
    ${strawberry_modal()}
    ${lemonade_modal()}
    ${green_grape_modal()}
    ${peach_modal()}

    <!--디저트모달-->
    ${delicious_waffle_modal()}
    ${cream_waffle()}
    ${cheese_cake_modal()}
    ${origin_shake_modal()}
    ${tiramisu_modal()}
    ${cream_cheese_waffle()}

    <!--종료-->
    ${endhtml()}
    `;


    res.send(output);
});

app.get("/vacate_cart",function(req,res){ //장바구니 비우기 버튼 클릭시
  cart = [];

  res.redirect("/order_main");
});

app.get("/payment", function(req,res){

  var output = `
  ${starthtml()}
  <div class="container justify-content-center">
        
        <div class="row text-center" style="width: 100%">
 
            <div style="width: 30%; float:none; margin:0 auto" >
                    <h1>결제</h1>
            </div>
        </div>

        
        <!--이곳에 음성 안내메세지 출력-->

        <audio autoplay="autoplay">
        <source src="${server_url}/tts/payment.mp3" type="audio/mpeg" />
        </audio> 
    
        <div class="container justify-content-center m-1">
        <div class="row text-center" style="width: 100%">
        <h5><img src='${server_url}/img/speak.png' alt ="#">결제를 진행해주세요</h5> 
        </div>
        </div>
    
        <!--출력 종료-->

        <nav class="navbar">
            <div class="container-fluid justify-content-center">
                
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">카드</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false" disabled>포인트</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false" disabled>삼성PAY</button>
                </li>        
              </ul>
            </div>
            </div>
            </nav>

           

            <div class="container justify-content-center mt-3">

            <div class="container justify-content-center mt-3" style="overflow:auto; width:1080px; height:500px;">


            <!--한세트시작-->


            <!--한세트끝-->

            ${payment_cart_html()}
            
          </div>
                    

                </div>

                <div class="row text-center mt-5 style="width: 100%">
                <div style="width: 70%; float:none; margin:0 auto" >
                        <h1>가격 합계 : ${result_price}원</h1>
                </div>
            </div>
    
                    
                    <form class="row justify-content-center " >
                        <a href="./payment_process" class="btn btn-primary m-5 btn-lg" tabindex="-1" role="button">결제하기</a>
                      </form>
              </div>
  ${endhtml()}
  `;

  res.send(output);
});

app.get("/payment_process",function(req,res){
  
  var output = `
  ${starthtml()}
  <body>

  <audio autoplay="autoplay">
  <source src="${server_url}/tts/payment_process.mp3" type="audio/mpeg" />
  </audio> 

  <div class="container justify-content-center">
      <div class="row text-center" style="width: 100%">

          <div style="width: 100%; float:none; margin:0 auto" >
                  <h1>결제가 진행 중 이에요</h1>
          </div>
      </div>

      <p><br><br><br><br><br><br><br><br><br><br></p>


      <div class="d-flex justify-content-center">
          <form class="row justify-content-center " >
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
              
            <span class="visually-hidden">Loading...</span>
          </div>

        </a>
        </form>
      </div>

      <p><br><br><br><br><br><br><br><br><br><br></p>


        <div class="row text-center" style="width: 100%">

          <div style="width: 100%; float:none; margin:0 auto" >
                  <h1>카드를 리더기에 꽂아주세요</h1>
          </div>
      </div>


</div>

<script>

setTimeout(function() {
  location.href = './payment_success';
}, 4500);

</script>

  ${endhtml()}
  `;

  res.send(output);
})

app.get("/payment_success",function(req,res){

  cart = []; //결제 종료와 동시에 장바구니를 비운다.
  result_price = 0;

  var output=`
  ${starthtml()}

  <audio autoplay="autoplay">
  <source src="${server_url}/tts/payment_success.mp3" type="audio/mpeg" />
  </audio> 

  <div class="container justify-content-center">
  <div class="row text-center" style="width: 100%">

      <div style="width: 100%; float:none; margin:0 auto" >
              <h1>결제가 완료 되었습니다!</h1>
      </div>
  </div>

  <p><br><br><br><br><br><br><br><br><br><br></p>


  <div class="d-flex justify-content-center">
      <form class="row justify-content-center " >
              <div class="spinner-grow text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
  </a>
</form>
    </div>

    <p><br><br><br><br><br><br><br><br><br><br></p>


    <div class="row text-center" style="width: 100%">

      <div style="width: 100%; float:none; margin:0 auto" >
              <h1>이용해주셔서 감사합니다.</h1>
      </div>
  </div>


</div>

<script>
setTimeout(function() {
  location.href = './';
}, 3000);
</script>

  ${endhtml()}
  
  `;

  res.send(output);
})



app.listen(80,function(){
    console.log('Connected 80 port!!');
});
