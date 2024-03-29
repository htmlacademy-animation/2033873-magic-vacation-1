export default () => {
  let messageForm = document.getElementById(`message-form`);
  let messageField = document.getElementById(`message-field`);
  let messageList = document.getElementById(`messages`);
  let chatBlock = document.querySelector(`.js-chat`);
  let chatList = chatBlock.querySelector(`.chat__list`);

  messageForm.addEventListener(`submit`, function (e) {
    e.preventDefault();

    function scrollToBottom() {
      chatList.scrollTo({
        top: chatList.scrollHeight,
        behavior: "smooth",
      });
    }

    function getAnswer() {
      return new Promise((resolve) => {
        setTimeout(function () {
          let answerEl = document.createElement(`li`);
          let placeholder = document.createElement(`div`);
          let textEl = document.createElement(`p`);
          placeholder.classList.add(`chat__placeholder`);
          for (let i = 0; i < 3; i++) {
            let dot = document.createElement(`span`);
            placeholder.appendChild(dot);
          }
          answerEl.appendChild(placeholder);
          answerEl.classList.add(`chat__message`);
          answerEl.classList.add(`chat__message--incoming`);
          answerEl.classList.add(`chat__message--last`);
          let answer = Math.floor(Math.random() * 2);
          let answerText;

          if (answer) {
            answerText = `Да`;
          } else {
            answerText = `Нет`;
          }

          textEl.innerText = answerText;
          textEl.classList.add(`hidden`);
          answerEl.appendChild(textEl);
          messageList.appendChild(answerEl);
          scrollToBottom();

          setTimeout(function () {
            let lastMessage = document.querySelector(`.chat__message--last`);
            if (lastMessage) {
              let lastMessagePlaceholder =
                lastMessage.querySelector(`.chat__placeholder`);
              let lastMessageText = lastMessage.querySelector(`p`);
              lastMessagePlaceholder.classList.add(`chat__placeholder--hidden`);
              // eslint-disable-next-line max-nested-callbacks
              setTimeout(() => {
                lastMessagePlaceholder.remove();
              }, 400);
              lastMessageText.classList.remove(`hidden`);
              lastMessage.classList.remove(`chat__message--last`);
            }

            resolve();
          }, 700);
        }, 700);
      });
    }

    let postQuestion = async function () {
      if (messageField.value) {
        let messageEl = document.createElement(`li`);
        messageEl.classList.add(`chat__message`);
        let messageText = messageField.value;
        let text = document.createElement(`p`);
        text.innerText = messageText;
        messageEl.appendChild(text);
        messageEl.classList.add(`chat__message--outcoming`);
        messageList.appendChild(messageEl);
        messageField.value = ``;
        messageField.setAttribute(`disabled`, `true`);

        scrollToBottom();

        await getAnswer();

        messageField.removeAttribute(`disabled`);
        messageField.focus();
      }
    };

    postQuestion();
  });
};
