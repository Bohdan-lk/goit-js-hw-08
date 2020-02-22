'use strict';

import galleryItems from './gallery-items.js';

const gallery = {
    jsGallery: document.querySelector ('.js-gallery'),
    lightbox: document.querySelector ('.js-lightbox'),
    ghtboxImage: document.querySelector ('.lightbox__image'),
    ghtboxContent: document.querySelector ('.lightbox__content'),
    ghtboxButton: document.querySelector ('.lightbox__button'),
    ghtboxOverlay: document.querySelector ('.lightbox__overlay'),
};

let nextCount = 0;

const addList = galleryItems
    .map ((elem, indx) => `<li class = gallery__item> 
<a class = gallery__link href=${elem.original}>
<img class = gallery__image 
src=${elem.preview} 
data-source=${elem.original} 
data-alt=${elem.description} data-pos=${indx} />
 </a>
 </li>`).join (" ");

gallery.jsGallery.insertAdjacentHTML ("beforeend", addList);

const openLightbox = (event) => {

    const galleryLink = Array.from (document.querySelectorAll ('.gallery__link'));
    galleryLink.forEach (item => {
        if (
            event.target.getAttribute ('data-source') === item.getAttribute ('href')
        ) {
            item.removeAttribute ('href');
        }

    });

    gallery.lightbox.classList.add ('is-open');
    gallery.ghtboxImage.setAttribute ('src', event.target.getAttribute ('data-source'));
    gallery.ghtboxImage.setAttribute ('alt', event.target.getAttribute ('alt'));

};

function closeLightbox(event) {
    gallery.lightbox.classList.remove ('is-open');
    gallery.ghtboxImage.setAttribute ('src', '');
    gallery.ghtboxImage.setAttribute ('alt', '');
};

function closeEsc(event) {
    if (event.keyCode === 27) closeLightbox ();
};

function closeOverlay(event) {
    if (event.target === gallery.ghtboxContent) closeLightbox (event);
};


const handleClickBtn = evt => {

    if (evt.target.className === "next") {
        nextCount++;
        console.log ("click next");
        console.log (nextCount);
        if (nextCount <= galleryItems.length) {
            gallery.ghtboxImage.setAttribute ('src', `${galleryItems[nextCount].original}`)
        } else {
            nextCount = 0;
        }
    } else if (evt.target.className === "prev") {
        nextCount--;
        console.log ("click prev");
        console.log (nextCount);
        gallery.ghtboxImage.setAttribute ('src', `${galleryItems[nextCount].original}`);
    }
};

gallery.jsGallery.addEventListener ('click', openLightbox);
gallery.ghtboxButton.addEventListener ('click', closeLightbox);
window.addEventListener ('keydown', closeEsc);
gallery.ghtboxContent.addEventListener ('click', closeOverlay);
gallery.ghtboxButton.addEventListener ('click', handleClickBtn);