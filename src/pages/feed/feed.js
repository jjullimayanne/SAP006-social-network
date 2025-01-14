/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import { getTheRoad, logOut, sendImageToDatabase } from '../../lib/auth.js';
import { editPost, getPosts, deletePost } from './services.js';
import {
  updateLikes, getComments, getCurrentCommentsToComment, getCurrentCommentLikes,
  getCurrentCommentsToDelete,
} from './data.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.className = 'feed-container';
  rootElement.innerHTML = `
  <main class="all-container" id="all-container">
    <div class="feed-left-section">
      <aside>  
        <section class='profile-area'>
          <div class='div-perfil'>
            <img src='images/name-icon.png' class='feed-icon-aside feed-icon-aside-up'>
            <br>
            <img src="${firebase.auth().currentUser.photoURL}" id='photo' class='photo feed-user-photo'>
            <img src='images/name-icon.png' class='feed-icon-aside feed-icon-aside-bottom'>
            <div class = "feed-welcome-user">
              <p> Bem vinde </p>
              <p class='name-user' id="name-user"></p> 
            </div>
          </div>
        </section>
        <div class="feed-settings-container">
          <div class="feed-settings">
            <button class="text-icon home-icon" id=""><span>Home</span></button>
          </div>
          <div class="feed-settings">
            <button class="perfil-icon text-icon" id="perfil-icon"><span>Configurações</span></button>
          </div>
          <div class="feed-settings">
            <button class="text-icon dark-icon" id="button-dark"><span>Escuro</span></button>
          </div>
          <div class="feed-settings">
            <button class="text-icon singout-icon" id="button-signout"><span>Sair</span></button>
          </div>
        </div>
      </aside>
    </div>
    <div class="feed-right-section">
      <div class="wrap">
  
      <div class="container-carousel">
      
        <span id="previous" class="slide-to-left"><i data-feather="chevron-left"> < </i></span>
        <span id="next" class="slide-to-right"><i data-feather="chevron-right">  > </i></span>
        <div id="slider" class="slider">
        <a href="https://blog.bonitour.com.br/confira-os-4-melhores-lugares-para-praticar-mergulho-no-brasil/" target="_blank"> <img class="pictures" src="./images/stories/1.png"></img></a>
        <a href="https://www.nattrip.com.br/blog/10-trekkings-no-brasil/" target="_blank"> <img class="pictures" src="./images/stories/2.png"></img></a>
        <a href="https://www.feriasbrasil.com.br/especial/index.cfm?IDPagina=73" target="_blank"> <img class="pictures" src="./images/stories/3.png"></img></a>
        <a href="https://freesider.com.br/esportes-radicais/melhores-dicas-de-surf/" target="_blank"><img class="pictures" src="./images/stories/4.png"></img></a>
        <a href="https://apuamarafting.com.br/tudo-sobre-rapel-e-dica-de-roteiro/" target="_blank"><img class="pictures" src="./images/stories/5.png"></img></a>
        <a href="https://www.bluhome.com.br/blog/dicas/dicas-para-organizar-uma-viagem-de-motorhome" target="_blank"><img class="pictures" src="./images/stories/6.png"></img></a>
        <a href="https://www.viajali.com.br/lugares-no-brasil-relaxar-nas-ferias/" target="_blank"><img class="pictures" src="./images/stories/7.png"></img></a>
        <a href="https://blog.caffeinearmy.com.br/mente/yoga-para-iniciantes-o-que-e-beneficios-e-dicas-para-comecar-hoje/" target="_blank"><img class="pictures" src="./images/stories/8.png"></img></a>
        <a href="https://medium.com/@itau/17-dicas-que-v%C3%A3o-facilitar-a-vida-de-qualquer-ciclista-iniciante-708428d4e079" target="_blank"><img class="pictures" src="./images/stories/9.png"></img></a>
        <a href="https://www.thule.com/pt-br/articles/tips/kayaking-for-beginners" target="_blank"><img class="pictures" src="./images/stories/10.png"></img>
        <a href="https://www.atletasdobem.com.br/melhores-dicas-paraquedistas-iniciantes/" target="_blank"><img class="pictures" src="./images/stories/11.png"></img></a>
        </div>
      </div>
  
    </div>
    
        <form action = "" id="postForm" class="publication-form">
          <textarea class="feed-text-area" id='postText' rows='15' placeholder='O que você quer compartilhar?'>
        </textarea> 
          <input class="feed-hide-url" id="hide-url"> </input>
          <div class='share-area-buttons'>
          <button id='publish-img-btn' class='publish-img-btn'></button>
          <div class='publish-img-form-box'>
            <form method="post">
              <input type="file" id="image_uploads" class='share-area-img-btn' accept=".jpg, .jpeg, .png, .gif">
             </form>
          </div>
         
          <button id='publicar' class='btn-form'>PUBLICAR</button>
        </form>
      </div>
      <section id='postado' class='posts-container'> </section>
    </div>
  </main>
  `;
  const showUrlOfImagesToPublish = (urlFile) => {
    rootElement.querySelector('#hide-url').value = `${urlFile}`;
  };

  const uploadImage = () => {
    rootElement.querySelector('.publish-img-form-box').style.opacity = 1;
    rootElement.querySelector('#image_uploads').onchange = (event) => {
      sendImageToDatabase(event.target.files[0], showUrlOfImagesToPublish);
      rootElement.querySelector('.publish-img-form-box').style.opacity = 0;
      rootElement.querySelector('#postText').placeholder = 'Imagem carregada';
    };
  };

  const imageToUpload = rootElement.querySelector('#image_uploads');

  const getUpLoadImgClick = () => {
    rootElement.querySelector('#publish-img-btn').addEventListener('click', () => {
      uploadImage();
      imageToUpload.style.opacity = 1;
    });
  };
  getUpLoadImgClick();

  const perfil = rootElement.querySelector('.perfil-icon');
  perfil.addEventListener('click', (event) => {
    event.preventDefault();
    getTheRoad('/profile');
  });
  const photoPerfil = rootElement.querySelector('.photo');
  const nomeP = rootElement.querySelector('.name-user');
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      nomeP.innerHTML = user.displayName;
      photoPerfil.src = user.photoURL;
    } else {
      nomeP.innerHTML = user.email;
      photoPerfil.src = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    }
  });

  const darkMode = () => {
    rootElement.querySelector('#button-dark').addEventListener('click', () => {
      const change = rootElement.querySelector('#all-container');
      const changeAside = rootElement.querySelector('aside');
      const changeFeed = rootElement.querySelector('.feed-left-section');
      change.style.background = 'rgb(30, 35, 41)';
      changeAside.style.background = 'rgb(19, 22, 26)';
      changeFeed.style.background = 'rgb(19, 22, 26)';
    });
  };
  darkMode();

  const postsCollection = firebase.firestore().collection('posts');
  const currentUserEmail = firebase.auth().currentUser.email;
  function createPostTemplate(post) {
    const postTemplate = `
          <p class="user-post"> ${post.data().user_id} <br>${post.data().data} </p>
          <div class="data-post-id" data-postid="${post.id}" data-postOwner="${post.data().user_id}">
          ${((user) => {
    if (user === currentUserEmail) {
      return `<button type="submit" data-deletePostButton="${post.id}"  data-item ="deletepost" class="delete-button"> </button>`;
    } return `<button type="submit" data-deletePostButton="${post.id}" class="delete-button" hidden> </button>`;
  })(post.data().user_id)}
          ${((user) => {
    if (user === currentUserEmail) {
      return `<button type="submit" data-editPostButton="${post.id}" class="btn-edit"></button>`;
    } return `<button type="submit" data-editPostButton="${post.id}" class="btn-edit" hidden></button>`;
  })(post.data().user_id)}
            <button type="submit" data-cancelEditionPostButton="${post.id}" class="btn-cancel-edit" style="background-color: rgb(255, 255, 255)"
             hidden> Cancelar</button>
            <button type="submit" data-saveEditionPostButton="${post.id}" class="btn-edit-save" style="background-color: rgb(255, 255, 255)"
            hidden> Salvar </button>
          </div>
          <p class="txt"> ${post.data().text} </p>
          <textarea class='edit-text-area' data-edit-text-area='${post.id}' hidden>${post.data().text}</textarea>
          ${((url) => {
    if (url !== '') {
      return `<img class="img-po" src="${post.data().url}"> </img>`;
    } return `<img id="hide-img" src="${post.data().url}"> </img>`;
  })(post.data().url)}
          <section class="likes-comments-bar">
          ${((likes) => {
    if (likes.length > 0) {
      if (likes.includes(currentUserEmail)) {
        return `<button class="like-btn full-like-btn" id="like-btn" data-likePostButton = "${post.id}"></button>`;
      } return `<button class="like-btn empty-like-btn" id="like-btn" data-likePostButton = "${post.id}"></button>`;
    } return `<button class="like-btn empty-like-btn" id="like-btn" data-likePostButton = "${post.id}"></button>`;
  })(post.data().likes)}
            ${((quantityOfLikes) => {
    if (quantityOfLikes === 1) {
      return `<p class="f-20 like-value" data-likes-id="${post.id}"> 
                <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> 
                <span data-like-text-to-be-changed="${post.id}">Curtida&nbsp </span> 
              </p>`;
    } if (quantityOfLikes > 1) {
      return `<p class="f-20 like-value" data-likes-id="${post.id}">
                <span data-like-value-to-be-changed="${post.id}"> ${quantityOfLikes} </span> 
                <span data-like-text-to-be-changed="${post.id}">Curtidas </span> 
              </p>`;
    } return `<p class="f-20 like-value" data-likes-id="${post.id}"> 
                <span data-like-value-to-be-changed="${post.id}"> ${0} </span>
                <span data-like-text-to-be-changed="${post.id}">Curtidas </span> 
              </p>`;
  })(post.data().likes.length)}
            <button type="submit" data-showCommentsDiv="${post.id}" class="btn-show-comments-div"></button>
          </section>
          <div class="comments" data-commentsDiv="${post.id}">
            <input required data-commentPostInput="${post.id}" placeholder='O que você quer comentar?' class="input-comment"></input>
            <button class="comment-button" data-commentPostButton="${post.id}"> Comentar </button> 
            <ul data-commentPostUl="${post.id}"> </ul>
        </div>
        <div class="confirm-delete">
          <div class="modal-delete">
          <div class="h1-modal">Você tem certeza que quer excluir esse post?</div>
          <button class="delete-buttons-modal" id="confirm-delete-modal">Confirmar</button>
          <button class="delete-butons-modal" id="cancel-delete-modal"> Cancelar </button>
          </div>
          </div>
        <div class="comments">
          <ul data-comment-post-id="${post.id}"> </ul>
        </div>
      </div>
      `;

    return postTemplate;
  }

  function createAndPrintAllPosts(post) {
    const postElement = document.createElement('div');
    postElement.id = post.id;
    postElement.classList.add('div-postados');
    rootElement.querySelector('#hide-url').value = '';
    const postTemplate = createPostTemplate(post);
    postElement.innerHTML = postTemplate;
    // const showheat = postElement.querySelector('#like-btn');
    // showheat.addEventListener('click', () => {
    // const element = postElement.querySelector('.anim-like'); element.style.opacity = 1;});
    rootElement.querySelector('#postado').appendChild(postElement);
  }

  function loadPosts() {
    getPosts(createAndPrintAllPosts);
  }

  const postData = () => {
    const data = new Date();
    return data.toLocaleString('pt-BR');
  };

  rootElement.querySelector('#postForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const postText = rootElement.querySelector('#postText');
    const text = rootElement.querySelector('#postText').value;
    const url = rootElement.querySelector('#hide-url').value;

    const post = {
      text,
      url,
      user_id: currentUserEmail,
      data: postData(),
      likes: [],
      comments: [],
    };

    if (postText.value === '') {
      return;
    }
    postsCollection.add(post).then(() => {
      rootElement.querySelector('#postText').value = '';
      rootElement.querySelector('#postado').innerHTML = '';
      loadPosts();
    });
  });

  const postsContainer = rootElement.querySelector('.posts-container');
  // eslint-disable-next-line consistent-return
  postsContainer.addEventListener('click', (e) => {
    const { target } = e;
    const postID = target.parentNode.parentNode.id;
    const postIDForComments = target.parentNode.parentNode.parentNode.parentNode.id;
    const printComments = (commentsToPrint, parentID) => {
      const commentArea = rootElement.querySelector(`[data-commentPostUl="${parentID}"]`);
      commentArea.innerHTML = '';
      commentsToPrint.forEach((comment) => {
        const newItem = `
            <li class="comment-f-20" id="${comment.id}">
              <span class="comment-owner"> ${comment.owner} comentou em ${comment.date}: </span>
      ${((user) => {
    if (user === currentUserEmail) {
      return `<button class="delete-comment-btn" data-deleteCommentButton="${comment.id}"> </button>`;
    } return `<button class="delete-comment-btn" data-deleteCommentButton="${comment.id}" hidden> </button>`;
  })(comment.owner)}
              <p class="comment-content"> ${comment.content}</p>
  ${((likes) => {
    if (likes.length > 0) {
      if (likes.includes(currentUserEmail)) {
        return `<button class="like-comment-btn full-like-btn" data-likeCommentButton="${comment.id}"></button>`;
      } return `<button class="like--comment-btn empty-like-btn" data-likeCommentButton="${comment.id}"></button>`;
    } return `<button class="like-comment-btn empty-like-btn" data-likeCommentButton="${comment.id}"></button>`;
  })(comment.commentLikes)}
            ${((quantityOfLikes) => {
    if (quantityOfLikes === 1) {
      return `<span class="f-20 like-comment-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> </span>`;
    } if (quantityOfLikes > 1) {
      return `<span class="f-20 like-comment-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${quantityOfLikes} </span> </span>`;
    }
    return `<span class="f-20 like-comment-value" data-comment-likes-id="${comment.id}"> <span data-comment-likes-value-to-be-changed="${comment.id}"> ${0} </span> </span>`;
  })(comment.commentLikes.length)}
  <hr class="comments-division">
            `;
        commentArea.innerHTML += newItem;
      });
    };
    const editButton = target.dataset.editpostbutton;
    if (editButton) {
      rootElement.querySelector(`[data-editPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-cancelEditionPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-saveEditionPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-edit-text-area="${postID}"]`).hidden = false;
    }

    const cancelEditionButton = target.dataset.canceleditionpostbutton;
    if (cancelEditionButton) {
      rootElement.querySelector(`[data-editPostButton="${postID}"]`).hidden = false;
      rootElement.querySelector(`[data-cancelEditionPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-saveEditionPostButton="${postID}"]`).hidden = true;
      rootElement.querySelector(`[data-edit-text-area="${postID}"]`).hidden = true;
    }

    const saveEditionButton = target.dataset.saveeditionpostbutton;
    if (saveEditionButton) {
      const newText = rootElement.querySelector(`[data-edit-text-area="${postID}"]`).value;
      editPost(newText, postID);
      rootElement.querySelector('#postado').innerHTML = '';
      loadPosts();
    }

    // delete post com modal:
    if (target.dataset.item === 'deletepost') {
      const divConfirmDelete = target.parentNode.parentNode.children[7];
      const divConfirmDeleteModal = target.parentNode.parentNode.children[7]
        .children[0].children[1];
      const divCancelDeleteModal = target.parentNode.parentNode.children[7].children[0].children[2];
      divConfirmDelete.style.display = 'block';
      divConfirmDeleteModal.addEventListener('click', () => {
        rootElement.querySelector('#postado').innerHTML = '';
        deletePost(postID, loadPosts);
        divConfirmDelete.style.display = 'none';
      });

      divCancelDeleteModal.addEventListener('click', () => {
        divConfirmDelete.style.display = 'none';
      });
    }

    // Like Post:
    const likeButton = target.dataset.likepostbutton;
    if (likeButton) {
      const valueToBeChanged = rootElement.querySelector(`[data-like-value-to-be-changed="${postID}"]`);
      const textToBeChanged = rootElement.querySelector(`[data-like-text-to-be-changed="${postID}"]`);
      const amountOfLikes = parseInt(valueToBeChanged.textContent, 10);
      const likeStatus = rootElement.querySelector(`[data-likePostButton="${postID}"]`);
      updateLikes(postID, currentUserEmail, valueToBeChanged,
        textToBeChanged, amountOfLikes, likeStatus);
    }

    // Show Post Comments Div:
    const showCommentsDivButton = target.dataset.showcommentsdiv;
    if (showCommentsDivButton) {
      rootElement.querySelector(`[data-commentsDiv="${postID}"]`).style.display = 'block';
      getComments(postID, printComments);
    }

    // Comment Post:
    const commentButton = target.dataset.commentpostbutton;
    if (commentButton) {
      const newCommentInput = rootElement.querySelector(`[data-commentPostInput="${postID}"]`);
      const newCommentText = newCommentInput.value;
      getCurrentCommentsToComment(postID, newCommentText,
        currentUserEmail, printComments);
    }

    // Like Post Comment:
    const likeCommentButton = target.dataset.likecommentbutton;
    if (likeCommentButton) {
      const commentID = target.dataset.likecommentbutton;
      const valueToBeChanged = rootElement.querySelector(`[data-comment-likes-value-to-be-changed="${commentID}"]`);
      const textToBeChanged = rootElement.querySelector(`[data-comment-likes-text-to-be-changed="${commentID}"]`);
      const amountOfLikes = parseInt(valueToBeChanged.textContent, 10);
      const likeStatus = rootElement.querySelector(`[data-likeCommentButton="${commentID}"]`);
      getCurrentCommentLikes(postIDForComments, currentUserEmail, commentID,
        valueToBeChanged, textToBeChanged, amountOfLikes, likeStatus);
    }

    // Delete Post Comment:
    const deleteCommentButton = target.dataset.deletecommentbutton;
    if (deleteCommentButton) {
      const commentID = target.dataset.deletecommentbutton;
      const deleteConfirmation = confirm('Você realmente gostaria de deletar este Comentário?');
      if (deleteConfirmation) {
        getCurrentCommentsToDelete(postIDForComments, commentID, printComments);
      } else {
        return false;
      }
    }
  });

  // Sign Out
  const btnSignOut = rootElement.querySelector('#button-signout');
  btnSignOut.addEventListener('click', logOut);

  // Slider Bolinhas
  const nextEl = rootElement.querySelector('#next');
  const previousEl = rootElement.querySelector('#previous');
  const sliderEl = rootElement.querySelector('#slider');

  function onNextClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft += imgWidth;
  }

  function onPreviousClick() {
    const imgWidth = sliderEl.offsetWidth;
    sliderEl.scrollLeft -= imgWidth;
  }

  nextEl.addEventListener('click', onNextClick);
  previousEl.addEventListener('click', onPreviousClick);

  loadPosts();
  return rootElement;
};
