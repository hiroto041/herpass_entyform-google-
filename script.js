// モーダルを表示
window.onload = function() {
    const modal = document.getElementById('modal');
    modal.classList.add('show');  // モーダルをフェードインで表示
    pushHistoryState();  // 履歴に初期状態を追加
};

// モーダルを閉じてSTEP1に移行
function selectIntent(intent) {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');  // モーダルをフェードアウト
    setTimeout(() => {
        modal.style.display = 'none';  // フェードアウト後にモーダルを完全に非表示
        showStep(0);  // STEP1を表示
    }, 500);  // 500msでフェードアウトアニメーションが完了
}

// 戻るボタン用モーダルの表示
window.onpopstate = function(event) {
    const backModal = document.getElementById('backModal');
    if (backModal) {  // backModalが存在するか確認
        backModal.classList.add('show');  // 「質問回答に戻る」モーダルを表示
    }
};

// 質問回答に戻るボタンが押されたときにSTEP1に戻る処理
function returnToStep1() {
    const backModal = document.getElementById('backModal');
    if (backModal) {
        backModal.classList.remove('show');  // モーダルを閉じる
    }
    showStep(0);  // STEP1に戻る
}

// 選択されたオプションを保存するオブジェクト
let selectedOptions = {
    experience: null,
    timing: null,
    salary: null
};

// 選択肢が選ばれたときに次のステップに進む＋選択状態を保存
function selectOption(option, category) {
    selectedOptions[category] = option;  // 選択されたオプションを保存
    highlightSelectedOption(category);   // 選択肢にハイライトを適用
    console.log('選択されたオプション:', selectedOptions); // デバッグ用
    nextStep();  // 自動で次のステップへ進む
}

// 選択されたオプションにハイライトを適用する関数
function highlightSelectedOption(category) {
    // 現在のステップ内で該当するオプションをハイライト
    const options = document.querySelectorAll(`.step.active .option-button`);
    
    options.forEach((button) => {
        const buttonText = button.textContent.trim();
        if (buttonText === selectedOptions[category]) {
            button.classList.add('selected');  // 選択されたボタンにクラスを追加
        } else {
            button.classList.remove('selected');  // 他のボタンからクラスを削除
        }
    });
}


// ステップ表示を制御する関数
let currentStep = 0;

function showStep(stepIndex) {
    const steps = document.querySelectorAll('.step');
    const mainVisual = document.querySelector('.main-visual'); 
    steps.forEach((step, index) => {
        step.style.display = (index === stepIndex) ? 'block' : 'none';
    });


    // 各ステップに戻った時に選択内容をハイライト
    if (stepIndex === 0) highlightSelectedOption('experience');
    if (stepIndex === 1) highlightSelectedOption('timing');
    if (stepIndex === 2) highlightSelectedOption('salary');

    // STEP2, 3, 4, 5の時のみメインビジュアルを非表示
    if (stepIndex >= 1 && stepIndex <= 4) {
        mainVisual.style.display = 'none';  // メインビジュアルを非表示
    } else {
        mainVisual.style.display = 'block';  // それ以外のステップでは表示
    }

    updateProgressBar(stepIndex);
    currentStep = stepIndex;  // 現在のステップを更新
}


// 次のステップに進む
function nextStep() {
    const steps = document.querySelectorAll('.step');
    // 現在のステップに関連する選択がされているか確認
    if (currentStep === 0 && !selectedOptions.experience) {
        alert('選択してください: 経験年数');
        return;
    }
    if (currentStep === 1 && !selectedOptions.timing) {
        alert('選択してください: 転職希望時期');
        return;
    }
    if (currentStep === 2 && !selectedOptions.salary) {
        alert('選択してください: 現在の年収');
        return;
    }

    if (currentStep < steps.length - 1) {
        showStep(currentStep + 1);  // 次のステップを表示
    }
}

// 前のステップに戻る
function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);  // 前のステップを表示
    }
}



// プログレスバーを更新する関数
function updateProgressBar(stepIndex) {
    const progressItems = document.querySelectorAll('.progress-bar li');
    progressItems.forEach((item, index) => {
        item.classList.toggle('active', index <= stepIndex);
    });
}

// ブラウザの履歴に状態を追加
function pushHistoryState() {
    history.pushState(null, null, window.location.pathname);  // 履歴に状態を追加
}


// 現在の日付をフォーマットして表示
window.onload = function() {
    const updateDate = document.getElementById('update-date');
    const today = new Date();
    const formattedDate =  (today.getMonth() + 1) + '月' + today.getDate() + '日';
    updateDate.textContent = formattedDate;  // 日付を挿入
};
