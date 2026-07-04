function openModal(src) {
            document.getElementById('modal-img').src = src;
            document.getElementById('image-modal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('image-modal').style.display = 'none';
        }

        let dummyHidden = false;
        let genreShown = false;
        let currentConfirmAction = null;

        function executeConfirm() {
            if (currentConfirmAction) currentConfirmAction();
        }

        function toggleGenreShow() {
            if (genreShown) {
                executeShowGenreToggle();
                return;
            }
            const text = "各画像に、問題ジャンルを表示しますか？<br>「QUIZ」、「RIDDLE」のどちらかが各画像に表示されます。<br><span style='font-size:13px;color:#777;display:block;margin-top:10px;'>※正解のない画像にはどちらかが適当に表示されます。</span>";
            currentConfirmAction = executeShowGenreToggle;
            document.getElementById('confirm-text').innerHTML = text;
            document.getElementById('confirm-modal').style.display = 'flex';
        }

        function executeShowGenreToggle() {
            closeConfirmModal();
            genreShown = !genreShown;
            const btn = document.getElementById('show-genre-btn');

            if (genreShown) {
                btn.classList.add('active');
                const genres = ['Quiz', 'Riddle', 'Riddle', 'Riddle', 'Quiz', 'Quiz', 'Riddle', 'Quiz', 'Quiz', 'Riddle'];
                genres.forEach((genre, index) => {
                    const qNum = index + 1;
                    const wrapper = document.querySelector(`#q-block-${qNum} .img-wrapper`);
                    if (wrapper) {
                        const badge = document.createElement('div');
                        badge.className = `genre-badge genre-${genre.toLowerCase()}`;
                        badge.id = `genre-badge-${qNum}`;
                        badge.innerText = genre;
                        wrapper.appendChild(badge);
                    }
                });
            } else {
                btn.classList.remove('active');
                document.querySelectorAll('.genre-badge').forEach(el => el.remove());
            }
        }

        function toggleDummyQuestions() {
            if (dummyHidden) {
                executeToggle();
                return;
            }
            const text = "正解のない画像を区別しますか？<br>該当する画像が暗転し、解答欄への入力が出来なくなります。";
            currentConfirmAction = executeToggle;
            document.getElementById('confirm-text').innerHTML = text;
            document.getElementById('confirm-modal').style.display = 'flex';
        }

        function closeConfirmModal() {
            document.getElementById('confirm-modal').style.display = 'none';
        }

        function executeToggle() {
            closeConfirmModal();
            dummyHidden = !dummyHidden;
            const btn = document.getElementById('toggle-dummy-btn');

            if (dummyHidden) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }

            const dummyIndices = [4, 6, 9];
            dummyIndices.forEach(qNum => {
                const qDiv = document.getElementById(`q-block-${qNum}`);
                const input = document.getElementById(`q${qNum}`);
                if (qDiv && input) {
                    if (dummyHidden) {
                        qDiv.classList.add('dummy-hidden');
                        input.disabled = true;
                        input.value = '';
                    } else {
                        qDiv.classList.remove('dummy-hidden');
                        input.disabled = false;
                    }
                }
                const resultItem = document.getElementById(`result-item-${qNum}`);
                if (resultItem) {
                    const btn = resultItem.querySelector('.reveal-btn');
                    if (dummyHidden) {
                        resultItem.classList.add('dummy-hidden');
                        if (btn) btn.disabled = true;
                    } else {
                        resultItem.classList.remove('dummy-hidden');
                        if (btn) btn.disabled = false;
                    }
                }
            });
        }

        const imageFiles = [
            'q1.jpg',
            'q2.jpg',
            'q3.jpg',
            'q4.jpg',
            'q5.jpg',
            'q6.jpg',
            'q7.jpg',
            'q8.jpg',
            'q9.jpg',
            'q10.jpg'
        ];

        const container = document.getElementById('questions-area');
        imageFiles.forEach((file, index) => {
            const qNum = index + 1;
            const html = `
                <div id="q-block-${qNum}" class="question">
                    <div class="img-wrapper">
                        <img src="image/${file}" alt="問題${qNum}" style="cursor: pointer;" onclick="openModal(this.src)">
                    </div>
                    <div class="input-wrap">
                        <input type="text" id="q${qNum}" placeholder="解答を入力">
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', html);
        });

        // 半角カナ→全角カナの対応表
        const kanaMap = {
            'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
            'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
            'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
            'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
            'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
            'ｳﾞ': 'ヴ',
            'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
            'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
            'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
            'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
            'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
            'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
            'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
            'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
            'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
            'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
            'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
            'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
            'ｰ': 'ー', '･': '・', 'ﾞ': '゛', 'ﾟ': '゜'
        };

        function normalizeText(text) {
            if (!text) return "";

            // 1. 全角英数字を半角英数字に変換
            let str = text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });

            // 2. 半角カタカナを全角カタカナに変換（濁点分離を結合）
            // 2文字のもの（濁点・半濁点付き）を先に置換
            let reg2 = new RegExp(Object.keys(kanaMap).filter(k => k.length === 2).join('|'), 'g');
            str = str.replace(reg2, match => kanaMap[match]);
            // 1文字のものを置換
            let reg1 = new RegExp(Object.keys(kanaMap).filter(k => k.length === 1).join('|'), 'g');
            str = str.replace(reg1, match => kanaMap[match]);

            // 3. 全角カタカナを「ひらがな」に変換
            str = str.replace(/[\u30A1-\u30F6]/g, function (match) {
                return String.fromCharCode(match.charCodeAt(0) - 0x0060);
            });

            // 4. 文字列内の空白（スペース）を全て削除
            str = str.replace(/[\s\u3000]+/g, '');

            // 5. アルファベットを全て小文字に統一
            str = str.toLowerCase();

            return str;
        }

        function _d(arr) {
            return arr.map(s => decodeURIComponent(atob(s)));
        }

        function checkAnswers() {
            let score = 0;
            const results = Array(10).fill(false);

            const ans1 = normalizeText(document.getElementById('q1').value);
            if (_d(['NCVFNSU4OCU4NjMzJUU3JUE3JTky', 'NCVFNSU4OCU4NjMz', 'NCczMw==', 'NCczMyUyMg==', 'NCUzQTMz']).includes(ans1)) { score++; results[0] = true; }

            const ans2 = normalizeText(document.getElementById('q2').value);
            const q2GrpA = _d(['JUU2JTk1JUIwJUU1JUFEJTk3', 'JUU4JUE1JUJGJUU2JTlBJUE2', 'JUUzJTgxJUE4JUUzJTgxJTk3', 'JUU1JUI5JUI0', 'JUUzJTgxJTk5JUUzJTgxJTg2JUUzJTgxJTk4', 'JUU4JUFBJUFEJUUzJTgxJUJG', 'JUUzJTgyJTg4JUUzJTgxJUJG', 'JUUzJTgxJUIyJUUzJTgyJTg5JUUzJTgxJThDJUUzJTgxJUFB', 'JUUzJTgxJThCJUUzJTgxJUFB']);
            const q2GrpB = _d(['JUU2JTk2JTg3JUU1JUFEJTk3JUU2JTk1JUIw', 'JUU1JUFEJTk3JUU2JTk1JUIw', 'JUUzJTgxJThCJUUzJTgxJTlB', 'JUU2JTk1JUIw']);
            if (q2GrpB.some(w => ans2.includes(w)) || (q2GrpA.some(w => ans2.includes(w)) && q2GrpB.some(w => ans2.includes(w)))) {
                score++; results[1] = true;
            }

            const ans3 = normalizeText(document.getElementById('q3').value);
            if (_d(['cGVu', 'JUUzJTgxJUJBJUUzJTgyJTkz']).includes(ans3)) { score++; results[2] = true; }

            const ans5 = normalizeText(document.getElementById('q5').value);
            const q5GrpA = _d(['JUU1JUI3JUE4JUU0JUJBJUJB', 'JUUzJTgxJThEJUUzJTgyJTg3JUUzJTgxJTk4JUUzJTgyJTkz', 'Z2lhbnQ=']);
            const q5GrpB = _d(['JUU4JTgyJUE5', 'JUUzJTgxJThCJUUzJTgxJTlG', 'c2hvdWxkZXI=']);
            const q5GrpC = _d(['JUU3JUFCJThCJUUzJTgxJUE0', 'JUUzJTgxJTlGJUUzJTgxJUE0', 'c3RhbmQ=', 'JUU0JUI5JTk3JUUzJTgyJThC', 'JUUzJTgxJUFFJUUzJTgyJThC']);
            if (q5GrpA.some(w => ans5.includes(w)) &&
                q5GrpB.some(w => ans5.includes(w)) &&
                q5GrpC.some(w => ans5.includes(w))) {
                score++; results[4] = true;
            }

            const ans7 = normalizeText(document.getElementById('q7').value);
            if (_d(['JUUzJTgxJThCJUUzJTgyJTg5JUUzJTgxJUE2JUUzJTgxJThC', 'JUU3JUE5JUJBJUU2JTg5JThCJUU1JUFFJUI2']).includes(ans7)) { score++; results[6] = true; }

            const ans8 = normalizeText(document.getElementById('q8').value);
            const numsOnly = ans8.replace(/[^0-9]/g, '');
            if (_d(['MTUwMA==']).includes(numsOnly)) { score++; results[7] = true; }

            const ans10 = normalizeText(document.getElementById('q10').value);
            if (_d(['JUUzJTgxJUI1JUUzJTgyJTg5JUUzJTgxJTg0JUUzJTgxJUE4', 'ZmxpZ2h0']).includes(ans10)) { score++; results[9] = true; }

            const origGenreShown = genreShown;
            const origDummyHidden = dummyHidden;

            const resultEl = document.getElementById('result');
            resultEl.innerText = `正解数: ${score} / 7`;
            if (score === 7) {
                resultEl.classList.add('perfect');
                if (!genreShown) executeShowGenreToggle();
                if (!dummyHidden) executeToggle();
            } else {
                resultEl.classList.remove('perfect');
            }
            renderDetails(results, score === 7);
            renderShareButton(score, origGenreShown, origDummyHidden);
            renderWarningText();
        }

        function renderWarningText() {
            let warningP = document.getElementById('share-warning');
            if (!warningP) {
                warningP = document.createElement('p');
                warningP.id = 'share-warning';
                warningP.style.textAlign = 'center';
                warningP.style.marginTop = '25px';
                warningP.style.fontSize = '14px';
                warningP.style.color = '#718096';
            }
            warningP.innerText = '※このページのスクリーンショットなどの共有は禁止';
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.appendChild(warningP);
            }
        }

        function renderShareButton(score, gs = genreShown, dh = dummyHidden) {
            let shareBtn = document.getElementById('share-x-btn');

            if (score === 0) {
                if (shareBtn) shareBtn.remove();
                return;
            }

            if (!shareBtn) {
                shareBtn = document.createElement('button');
                shareBtn.id = 'share-x-btn';
                shareBtn.className = 'share-x-btn';
                shareBtn.innerText = 'Xで結果を共有';
                const detailsDiv = document.getElementById('details-area');
                if (detailsDiv) {
                    detailsDiv.insertAdjacentElement('afterend', shareBtn);
                }
            }

            let headline = "";
            if (!gs && !dh) {
                headline = "　クイズ/謎解き/ダミーを見極め\n　　7問中【" + score + "問】解き明かした";
            } else if (gs && !dh) {
                headline = "　　　　 ダミーを見極め\n　　7問中【" + score + "問】解き明かした";
            } else if (!gs && dh) {
                headline = "　　　クイズ/謎解きを見極め\n　　7問中【" + score + "問】解き明かした";
            } else if (gs && dh) {
                headline = "　　　　クイズ/謎解きを\n　　7問中【" + score + "問】解き明かした";
            }

            const text = "◆ーーーーーーーーーーーーーー◆\n" + headline + "\n◆ーーーーーーーーーーーーーー◆\n\n#Quiddless\n\n挑戦⇒https://araradesu.github.io/quiddless/";
            const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            shareBtn.onclick = function() {
                window.open(xUrl, '_blank');
            };
        }

        function renderDetails(results, isPerfect) {
            let detailsDiv = document.getElementById('details-area');
            if (!detailsDiv) {
                detailsDiv = document.createElement('div');
                detailsDiv.id = 'details-area';
                detailsDiv.className = 'details-area';
                document.getElementById('result').insertAdjacentElement('afterend', detailsDiv);
            }

            let html = '';
            const dummyIndices = [4, 6, 9];
            for (let i = 0; i < 10; i++) {
                const qNum = i + 1;
                const isCorrect = results[i];
                const isDummyHidden = dummyHidden && dummyIndices.includes(qNum);
                const hiddenClass = isDummyHidden ? ' dummy-hidden' : '';
                const btnDisabled = isDummyHidden ? 'disabled' : '';

                let resultOrBtn = `<button class="reveal-btn" onclick="revealResult(this, ${isCorrect})" ${btnDisabled}>正誤を表示</button>`;
                if (isPerfect && !isDummyHidden) {
                    resultOrBtn = `<span class="revealed-result ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '○' : '×'}</span>`;
                }

                html += `
                    <div class="detail-item${hiddenClass}" id="result-item-${qNum}">
                        <span>問題${qNum}</span>
                        ${resultOrBtn}
                    </div>
                `;
            }
            detailsDiv.innerHTML = html;
        }

        window.revealResult = function (btn, isCorrect) {
            const resultHtml = `<span class="revealed-result ${isCorrect ? 'correct' : 'incorrect'}">${isCorrect ? '○' : '×'}</span>`;
            btn.outerHTML = resultHtml;
        };
