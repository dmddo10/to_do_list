document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const inputSection = document.getElementById('inputSection');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let contextMenu = null;

    // 할 일 추가 버튼 클릭 이벤트
    addButton.addEventListener('click', function() {
        inputSection.style.display = 'block';
        taskInput.focus();
    });

    // 입력창 엔터키 이벤트
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            addNewTask(this.value.trim());
            this.value = '';
            inputSection.style.display = 'none';
        }
    });

    // 새로운 할 일 추가 함수
    function addNewTask(text) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('div');
        checkbox.className = 'checkbox';
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;

        // Delete button for the task
        const deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = '삭제';
        
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        // 체크박스 클릭 이벤트 (컨텍스트 메뉴 표시)
        checkbox.addEventListener('click', function(e) {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY, checkbox);
        });

        // Delete button click event
        deleteButton.addEventListener('click', function() {
            li.remove();  // Remove the task item from the list
        });
    }

    // 컨텍스트 메뉴 생성 및 표시
    function showContextMenu(x, y, checkbox) {
        if (contextMenu) {
            contextMenu.remove();
        }

        contextMenu = document.createElement('div');
        contextMenu.className = 'context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item" data-action="complete">✓ 완료</div>
            <div class="context-menu-item" data-action="fail">✕ 실패</div>
        `;

        contextMenu.style.position = 'fixed';
        contextMenu.style.left = x + 'px';
        contextMenu.style.top = y + 'px';
        contextMenu.style.display = 'block';

        contextMenu.addEventListener('click', function(e) {
            const action = e.target.getAttribute('data-action');
            if (action === 'complete') {
                checkbox.innerHTML = '✓';
                checkbox.className = 'checkbox completed';
            } else if (action === 'fail') {
                checkbox.innerHTML = '✕';
                checkbox.className = 'checkbox failed';
            }
            contextMenu.remove();
        });

        document.body.appendChild(contextMenu);

        document.addEventListener('click', function closeMenu(e) {
            if (!contextMenu.contains(e.target) && e.target !== checkbox) {
                contextMenu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }
});
