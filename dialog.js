function showDialog(titleText,contentText,showCancelBtn = true) {
     // 加载css
    const link = document.createElement('link'); 
    link.rel = 'stylesheet';
    link.href = './dialog.css';
    document.head.appendChild(link);

    // 创建弹窗主体
    const mainView = document.createElement('div');
    mainView.id = 'dialog-mainView';
    
    // 创建弹窗背景
    const backGround = document.createElement('div');
    backGround.appendChild(mainView);
    backGround.id = 'dialog-backGround';
    backGround.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    document.body.appendChild(backGround);

    // 创建弹窗标题
    const title = document.createElement('h1');
    title.innerText = titleText;
    title.style.width = '100%';
    title.style.margin = '0';
    mainView.appendChild(title);

    // 创建弹窗内容
    const content = document.createElement('p');
    content.innerHTML = contentText;
    content.style.margin = '10px 0';
    content.style.width = '100%';
    mainView.appendChild(content);

    // 创建弹窗按钮组
    const btnGroup = document.createElement('div');
    btnGroup.id = 'dialog-btnGroup';
    mainView.appendChild(btnGroup);

    // 创建弹窗确认按钮
    const confirmBtn = document.createElement('button');
    confirmBtn.innerText = '确认';
    confirmBtn.style.margin = '10px 0';
    confirmBtn.style.width = '100%';
    btnGroup.appendChild(confirmBtn);
    confirmBtn.addEventListener('click',function(){
        hideDialog();      
        return true;
        
    })

    // 创建弹窗取消按钮
    if (showCancelBtn) {
        const cancelBtn = document.createElement('button');
        cancelBtn.innerText = '取消';
        cancelBtn.style.margin = '10px 0';
        cancelBtn.style.width = '100%';
        btnGroup.appendChild(cancelBtn);
        cancelBtn.addEventListener('click',function(){
            hideDialog();      
            return false;
        })
    }

}

// 隐藏弹窗
function hideDialog() {
    document.getElementById('dialog-mainView').style.animation = 'dialogHide 0.3s ease forwards';
    document.getElementById('dialog-backGround').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    setTimeout(() => {
        document.getElementById('dialog-backGround').remove();
    }, 300);
}
