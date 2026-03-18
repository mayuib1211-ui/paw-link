function lockScroll() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}



/* header / menu */
const header = document.querySelector('header');
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-open');
    header.classList.toggle('is-open');
    header.classList.toggle('is-nav-open');
});


/* ★spナビ用 クリック（全リンク対応版） ★ */
document.querySelectorAll('.sp-nav a').forEach(link => {

    link.addEventListener('click', () => {
        if (
            typeof ScrollTrigger !== 'undefined' &&
            !document.body.classList.contains('page-contact')
        ) {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    });
});

/* ★ PCナビ用 クリック */
document.querySelectorAll('.header__nav a').forEach(link => {
    link.addEventListener('click', () => {
        // とにかくメニューを閉じる
        header.classList.remove('is-open', 'is-nav-open');
        menuBtn.classList.remove('is-open');

        // ScrollTriggerをリフレッシュ
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 100);
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('is-scrolled');
    } else {
        header.classList.remove('is-scrolled');
    }
});

/* ★ トップページmvフェイドイン */
window.addEventListener('load', () => {
    const targets = document.querySelectorAll('.mainvisual, .volunteer__mv');
    if (!targets.length) return;

    targets.forEach(el => el.classList.add('is-show'));
});

/* 猫モーダルデータ / カード埋め込み */
const cats = {
    konbu: {
        name: "名前 : こんぶ",
        age: "2才",
        gender: "女の子",
        text: "人が大好きな甘えんぼさんです",
        img: "img/adoption/adoption-img5.webp",
        vaccine: " 済",
        neutered: "済",
        location: " 大阪"
    },
    nyanta: {
        name: "名前 : にゃんた",
        age: "5才",
        gender: "男の子",
        text: "おっとりしていてマイペースな性格です",
        img: "img/adoption/adoption-img1.webp",
        vaccine: " 済",
        neutered: "済",
        location: " 京都"
    },
    ikura: {
        name: "名前 : いくら",
        age: "3才",
        gender: "女の子",
        text: "少し恥ずかしがり屋ですが、慣れると甘えてくれます",
        img: "img/adoption/adoption-img2.webp",
        vaccine: " 未",
        neutered: "未",
        location: " 大阪"
    },
    kazunoko: {
        name: "名前 : かずのこ",
        age: "4才",
        gender: "男の子",
        text: "元気いっぱいで遊ぶのが大好きな子です",
        img: "img/adoption/adoption-img3.jpg",
        vaccine: " 済",
        neutered: "済",
        location: " 兵庫"
    },
    kuromame: {
        name: "名前 : くろまめ",
        age: "1才",
        gender: "男の子",
        text: "まだ子猫で好奇心旺盛。人にもすぐ慣れます",
        img: "img/adoption/adoption-img4.jpg",
        vaccine: " 済",
        neutered: "未",
        location: " 奈良"
    }
};

document.querySelectorAll('.cat__card').forEach(card => {
    const cat = cats[card.dataset.id];
    if (!cat) return;

    const nameEls = card.querySelectorAll('.js-name');
    if (nameEls.length > 0) nameEls[0].textContent = cat.name;

    card.querySelector('.js-meta').textContent = `${cat.age} / ${cat.gender}`;

    const img = card.querySelector('.js-img');
    img.src = cat.img;
    img.alt = `里親募集中の猫 ${cat.name}`;
});

/* ========================== 
   猫モーダル 
========================== */
const modal = document.getElementById('catModal');

if (!modal) {
    console.error('❌ catModal element not found');
} else {
    const modalImg = modal.querySelector('.cat-modal__img');
    const modalName = modal.querySelector('.cat-modal__name');
    const modalDesc = modal.querySelector('.cat-modal__desc');
    const modalAge = modal.querySelector('.js-age');
    const modalGender = modal.querySelector('.js-gender');
    const modalVaccine = modal.querySelector('.js-vaccine');
    const modalNeutered = modal.querySelector('.js-neutered');
    const modalLocation = modal.querySelector('.js-location');

    if (
        !modalImg ||
        !modalName ||
        !modalDesc ||
        !modalAge ||
        !modalGender ||
        !modalVaccine ||
        !modalNeutered ||
        !modalLocation
    ) {
        console.error('❌ Modal elements missing:', {
            modalImg: !!modalImg,
            modalName: !!modalName,
            modalDesc: !!modalDesc,
            modalAge: !!modalAge,
            modalGender: !!modalGender,
            modalVaccine: !!modalVaccine,
            modalNeutered: !!modalNeutered,
            modalLocation: !!modalLocation
        });
    } else {
        function closeModal() {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            unlockScroll();
        }

        document.querySelectorAll('.cat__card').forEach(card => {
            card.addEventListener('click', () => {
                const cat = cats[card.dataset.id];
                if (!cat) return;

                modalImg.src = cat.img;
                modalImg.alt = cat.name;
                modalName.textContent = cat.name;
                modalAge.innerHTML = `<span class="label">年齢</span> ${cat.age}`;
                modalGender.innerHTML = `<span class="label">性別</span> ${cat.gender}`;
                modalDesc.innerHTML = `<span class="label">性格</span> ${cat.text}`;
                modalVaccine.innerHTML = `<span class="label">ワクチン</span> ${cat.vaccine}`;
                modalNeutered.innerHTML = `<span class="label">去勢手術</span> ${cat.neutered}`;
                modalLocation.innerHTML = `<span class="label">地域</span> ${cat.location}`;

                modal.classList.add('is-open');
                modal.setAttribute('aria-hidden', 'false');
                lockScroll();
            });
        });

        const closeBtn = modal.querySelector('.cat-modal__close');
        const overlay = modal.querySelector('.cat-modal__overlay');

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);
    }
}

/* ============================================
   カードスタックアニメーション（Activities）
   ============================================ */


function initCardStackAnimation() {

    const isMobile = window.innerWidth <= 900;

    // 📱 モバイルは必ず通常表示に戻して終了
    if (isMobile) {
        console.log('📱 Mobile: force reset cards');

        // ScrollTrigger 全解除
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }

        // wrapper削除前にカードを戻す
        const existingWrapper = document.querySelector('.cards-wrapper');
        const mainArea = document.querySelector('.activities__main');

        if (existingWrapper && mainArea) {
            // wrapperの中にあるカードを全て取得
            const cardsInWrapper = existingWrapper.querySelectorAll('.activities__card');
            console.log(`📱 Moving ${cardsInWrapper.length} cards back to mainArea`);

            // カードをmainAreaに戻す
            cardsInWrapper.forEach(card => {
                mainArea.appendChild(card);

                // JSで設定したインラインスタイルを全てクリア
                card.style.cssText = '';
            });

            // 空になったwrapperを削除
            existingWrapper.remove();
        } else if (mainArea) {
            // wrapperがなくても、カードのスタイルをクリア
            const allCards = mainArea.querySelectorAll('.activities__card');
            allCards.forEach(card => {
                card.style.cssText = '';
            });
        }

        // 高さも戻す
        const pinArea = document.querySelector('.activities__scroll');
        if (pinArea) {
            pinArea.style.height = 'auto';
        }

        console.log('✅ Mobile cards reset complete');
        return; // ← ここで終了（GSAPに触らせない）
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('❌ GSAP or ScrollTrigger is not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector('.activities__inner');
    const pinArea = document.querySelector('.activities__scroll');
    const sidebar = document.querySelector('.activities__side');

    // カードを取得（必ず.activities__main内を基準にする）
    const mainArea = document.querySelector('.activities__main');
    if (!mainArea) {
        console.error('❌ .activities__main not found');
        return;
    }

    // console.log('🔍 Debug: mainArea found:', mainArea);
    // console.log('🔍 Debug: mainArea children count:', mainArea.children.length);
    // console.log('🔍 Debug: mainArea innerHTML length:', mainArea.innerHTML.length);

    let cards = Array.from(mainArea.querySelectorAll('.activities__card'));

    // console.log('🔍 Debug: cards found:', cards.length);
    if (cards.length === 0) {
        // console.log('🔍 Debug: Trying to find cards anywhere in document...');
        const allCards = document.querySelectorAll('.activities__card');
        // console.log('🔍 Debug: Total cards in document:', allCards.length);
        allCards.forEach((card, i) => {
            // console.log(`🔍 Debug: Card ${i} parent:`, card.parentElement?.className);
        });
    }

    if (!section || !pinArea || cards.length === 0) {
        console.error('❌ Required elements not found');
        console.log('Debug info:');
        console.log('- section:', section);
        console.log('- pinArea:', pinArea);
        console.log('- cards found:', cards.length);
        console.log('- mainArea:', mainArea);
        return;
    }

    console.log(`✅ Initializing ${cards.length} cards with master pin`);

    // 既存の ScrollTrigger を全 kill
    ScrollTrigger.getAll().forEach(t => t.kill());

    // 既存のwrapperを削除（カードは先に戻す）
    const existingWrapper = document.querySelector('.cards-wrapper');
    if (existingWrapper) {
        // カードをactivities__mainに戻してからwrapperを削除
        cards.forEach(card => {
            if (card.parentElement === existingWrapper) {
                mainArea.appendChild(card);
            }
        });
        existingWrapper.remove();
    }

    // 調整パラメータ - 各カードの表示時間を個別設定
    const cardDurations = [200, 200, 150]; // 1枚目:200vh, 2枚目:200vh, 3枚目:150vh
    const pinPadding = 80;

    // 合計vh を計算
    const totalVh = cardDurations.reduce((sum, vh) => sum + vh, 0);
    const pinEndAmount = totalVh + pinPadding;

    // セクション全体の高さ確保
    pinArea.style.height = `${pinEndAmount}vh`;


    // wrapper を作成
    const headerHeight = document.querySelector('header')?.offsetHeight || 120;
    const wrapper = document.createElement('div');

    wrapper.className = 'cards-wrapper';

    Object.assign(wrapper.style, {
        position: 'sticky',
        top: `${headerHeight - 50}px`,
        height: 'auto',
        minHeight: '600px',
        maxHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'visible'
    });

    // PC用の初期状態
    gsap.set(cards, {
        autoAlpha: 0,
        y: 50,
        scale: 0.95,
    });

    const parent = cards[0].parentElement;
    parent.appendChild(wrapper);

    cards.forEach((card, i) => {
        wrapper.appendChild(card);

        // PC用スタイル
        Object.assign(card.style, {
            position: 'absolute',
            inset: '0',
            opacity: '0',
            transform: 'translateY(50px) scale(0.95)',
            maxWidth: '650px',
        });
    });

    // PCのピン設定
    ScrollTrigger.create({
        trigger: pinArea,
        start: 'top top',
        end: `+=${pinEndAmount}vh`,
        pin: '.activities__inner',
        pinSpacing: true,
        anticipatePin: 1,
        id: 'masterPin'
    });

    // 各カードのタイムラインアニメーション
    let currentPosition = 0;

    cards.forEach((card, i) => {
        const duration = cardDurations[i];
        const startVh = currentPosition;
        const endVh = currentPosition + duration;

        console.log(`Card ${i}: start=${startVh}vh, end=${endVh}vh, duration=${duration}vh`);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: pinArea,
                start: `top+=${startVh}vh top`,
                end: `top+=${endVh}vh top`,
                scrub: 1,
                // markers: { startColor: "green", endColor: "red", fontSize: "12px" },
                id: `card-${i}`
            }
        });

        // カードをすばやく表示（10%）
        tl.to(card, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.1,
            ease: 'power2.out',
            onStart: () => {
                card.style.zIndex = 1000 + i;
            }
        });

        // カードをしっかり保持（90%）
        tl.to(card, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9
        });

        // 次のカード用に位置を更新
        currentPosition += duration;
    });

    ScrollTrigger.refresh();
    console.log('✅ Card stack animation initialized');
}



/* 安全自動初期化 */
(function () {
    function waitFor(cond, timeout = 5000, interval = 50) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            (function check() {
                try {
                    if (cond()) return resolve();
                } catch (e) { }
                if (Date.now() - start > timeout) return reject(new Error('waitFor timeout'));
                setTimeout(check, interval);
            })();
        });
    }

    async function safeInit() {
        try {
            // DOMの読み込みを待つ
            await waitFor(() => document.readyState === 'complete' || document.readyState === 'interactive', 5000);

            // GSAPの読み込みを待つ
            await waitFor(() => typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined', 5000);

            // contactページはここで完全終了
            if (document.body.classList.contains('page-contact')) {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.getAll().forEach(t => t.kill());
                }
                unlockScroll();
                console.log('📄 Contact page: ScrollTrigger disabled');
                return;
            }

            // Activitiesページじゃなければ何もしない
            const activitiesSection = document.querySelector('.activities__inner');
            if (!activitiesSection) {
                console.log('safeInit: activities section not found — skip');
                return;
            }

            // Activitiesページだけ待つ
            await waitFor(() => {
                const cards = document.querySelectorAll('.activities__card');
                const pinArea = document.querySelector('.activities__scroll');
                return cards.length > 0 && pinArea;
            }, 5000);

            console.log('safeInit: ready');

            initCardStackAnimation();

            // モバイル + トップ時のガクつき対策
            const isMobile = window.innerWidth <= 900;
            if (isMobile && window.scrollY === 0) {
                setTimeout(() => {
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                }, 500);
            }
        }
        catch (err) {
            console.error('safeInit failed:', err);
            console.log('Elements check:');
            console.log('- .activities__inner:', document.querySelector('.activities__inner'));
            console.log('- .activities__card count:', document.querySelectorAll('.activities__card').length);
            console.log('- .activities__scroll:', document.querySelector('.activities__scroll'));
        }
    }

    // DOMContentLoadedイベントで確実に初期化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeInit);
    } else {
        safeInit();
    }

    // リサイズ時の再初期化
    let resizeTimer;
    let lastWidth = window.innerWidth;

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const currentWidth = window.innerWidth;
            const wasPC = lastWidth > 900;
            const isPC = currentWidth > 900;

            // PC⇔モバイルの切り替え時のみ再初期化
            if (wasPC !== isPC) {
                console.log(`♻️ Resize: ${wasPC ? 'PC→Mobile' : 'Mobile→PC'} switch detected`);

                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.getAll().forEach(t => t.kill());
                }

                if (typeof initCardStackAnimation === 'function') {
                    initCardStackAnimation();
                }

                lastWidth = currentWidth;
            }
        }, 300);
    });

    // デバッグ用：再初期化
    window.reinitCards = function () {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
        document.querySelectorAll('.cards-wrapper').forEach(el => el.remove());
        if (typeof initCardStackAnimation === 'function') initCardStackAnimation();
    };
})();


/* ============================================
   // スタッフリードモア
============================================ */
document.addEventListener('DOMContentLoaded', () => {
    const detailsList = document.querySelectorAll('.staff__details');

    detailsList.forEach((details) => {
        details.addEventListener('toggle', (e) => {
            // イベントの伝播を止める
            e.stopPropagation();

            if (details.open) {
                // 他の開いているdetailsを閉じる
                detailsList.forEach((other) => {
                    if (other !== details && other.open) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
});

/* ============================================
   //faq
============================================ */

document.querySelectorAll('.faq__question').forEach(button => {
    button.addEventListener('click', () => {
        const currentItem = button.closest('.faq__item');
        const currentAnswer = button.nextElementSibling;
        const isOpen = button.getAttribute('aria-expanded') === 'true';

        // いったん全部閉じる
        document.querySelectorAll('.faq__question').forEach(btn => {
            btn.setAttribute('aria-expanded', 'false');
            btn.nextElementSibling.hidden = true;
        });

        // クリックしたやつだけ開く
        if (!isOpen) {
            button.setAttribute('aria-expanded', 'true');
            currentAnswer.hidden = false;

            // 👇 ここが自動スクロール
            currentItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

/* ============================================
   ボランティアカード
============================================ */
document.querySelectorAll('.volunteer__card-front button').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();

        const card = btn.closest('.volunteer__contents-card');
        const isOpen = card.classList.toggle('is-open');

        btn.setAttribute('aria-expanded', isOpen);
    });
});


window.addEventListener('load', () => {
    unlockScroll();
    if (document.body.classList.contains('page-contact')) {
        window.scrollTo(0, 0);
    }
});

document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener('click', () => {
        if (
            typeof ScrollTrigger !== 'undefined' &&
            !document.body.classList.contains('page-contact')
        ) {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    });
});