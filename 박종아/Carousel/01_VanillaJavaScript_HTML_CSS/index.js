const slideList = document.querySelector('.slide_list');
const slideContents = document.querySelectorAll('.slide_content');
const slideBtnNext = document.querySelector('.slide_btn_next');
const slideBtnPrev = document.querySelector('.slide_btn_prev');
const pagination = document.querySelector('.slide_pagination');
const slideLen = slideContents.length;
const slideWidth = 400;
const slideSpeed = 300;
const startNum = 0;

// width 값ㅇ을 넓힌다. (앞뒤 복제 붙이는 것까지 합해 x6)
slideList.style.width = slideWidth * (slideLen + 2) + 'px';

let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

// clone을 만든 이유는 1번과 5번 앞뒤로 넣어놓기 위해서이다. (자연스러운 이동 애니메이션 0.3초)
// 0.3초가 지나자마자 (원본) 1번 슬라이드 위치로 이동한다.

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

// appendChild 맨 뒤에 붙는다.
// insertBefore 특정 요소 앞에 붙는다.
// append() 여러 개의 자식 요소 설정 vs appendChild() 하나의 노드만 추가

let pageChild = '';
for (let i = 0; i < slideLen; i++) {
  pageChild += '<li class="dot';
  pageChild += i === startNum ? ' dot_active' : '';
  pageChild += ' "data-index="' + i + '"><a href="#"></a></li>';
}

pagination.innerHTML = pageChild;
const pageDots = document.querySelectorAll('.dot');

// 성능 textContent > innerText > innerHTML
// innerHTML은 보안에 취약하다.
// 그러나 textContent, innerText은 string으로 바꿔기 때문에 태그 활성화가 안 된다.

slideList.style.transform =
  'translateX(-' + slideWidth * (startNum + 1) + 'px)';

// translate3d는 x,y,z축으로 이동할 수 있다.
// slide는 x축만 움직이기 때문에 translateX 썼다.

let curIndex = startNum;
let curSlide = slideContents[curIndex];
curSlide.classList.add('slide_active');

// Next 버튼을 누른다면
slideBtnNext.addEventListener('click', function () {
  // 마지막 페이지가 아니라면 다음페이지로 이동한다.
  if (curIndex <= slideLen - 1) {
    slideList.style.transition = slideSpeed + 'ms';
    slideList.style.transform =
      'translateX(-' + slideWidth * (curIndex + 2) + 'px)';
  }
  // 마지막 페이지라면 0.3초동안 이동하고 -1위치로 변경된다.
  if (curIndex === slideLen - 1) {
    setTimeout(function () {
      slideList.style.transition = '0ms';
      slideList.style.transform = 'translateX(-' + slideWidth + 'px)';
    }, slideSpeed);
    curIndex = -1;
  }
  curSlide.classList.remove('slide_active');
  // 마지막 페이지라면 dot 활성화가 없어지고, 첫번째 페이지 dot이 활성화 된다.
  pageDots[curIndex === -1 ? slideLen - 1 : curIndex].classList.remove(
    'dot_active'
  );
  // 다음 페이지가 활성화된다.
  curSlide = slideContents[++curIndex];
  curSlide.classList.add('slide_active');
  pageDots[curIndex].classList.add('dot_active');
});

// Prev 버튼을 누른다면
slideBtnPrev.addEventListener('click', function () {
  // 첫번째 페이지가 아니라면 이전페이지로 이동한다.
  if (curIndex >= 0) {
    slideList.style.transition = slideSpeed + 'ms';
    slideList.style.transform = 'translateX(-' + slideWidth * curIndex + 'px)';
  }
  // 첫번째 페이지라면 0.3초동안 이동하고 마지막페이지로 이동한다.
  if (curIndex === 0) {
    setTimeout(function () {
      slideList.style.transition = '0ms';
      slideList.style.transform =
        'translateX(-' + slideWidth * slideLen + 'px)';
    }, slideSpeed);
    curIndex = slideLen;
  }
  curSlide.classList.remove('slide_active');
  // 첫번째 페이지라면 dot 활성화가 없어지고, 마지막 페이지 dot이 활성화 된다.
  pageDots[curIndex === slideLen ? 0 : curIndex].classList.remove('dot_active');
  // 이전 페이지가 활성화된다.
  curSlide = slideContents[--curIndex];
  curSlide.classList.add('slide_active');
  pageDots[curIndex].classList.add('dot_active');
});

// 페이지 버튼 누른다면
let curDot;
Array.prototype.forEach.call(pageDots, function (dot, i) {
  dot.addEventListener('click', function (e) {
    // 새로 이동되는 것을 막아준다. 기본으로 정의된 이벤트를 작동 못하게 한다.
    // 클릭이 바로 발생하는 것이 아니라 아래의 과정을 하게 한다.
    // event.stopPropagation()는 부모로 전달되는 이벤트를 막는다.
    e.preventDefault();
    curDot = document.querySelector('.dot_active');
    curDot.classList.remove('dot_active');

    // this는 여기에서 마우스 클릭한 것을 표시한 것이다.
    curDot = this;
    this.classList.add('dot_active');

    // 활성화를 전부 없애고 해당 위치만 활성화를 넣는다.
    curSlide.classList.remove('slide_active');
    curIndex = Number(this.getAttribute('data-index'));
    curSlide = slideContents[curIndex];
    curSlide.classList.add('.slide_active');
    slideList.style.transition = slideSpeed + 'ms';
    slideList.style.transform =
      'translateX(-' + (slideWidth * (curIndex + 1) + 'px)');
  });
});
