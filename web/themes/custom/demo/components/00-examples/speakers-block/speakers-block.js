
(function (Drupal) {
  'use strict';

  Drupal.behaviors.speakersBlock = {
    attach: function (context, settings) {

      const splideElements = context.querySelectorAll('.speakers-carousel:not(.is-initialized)');
      
      splideElements.forEach(function(element) {
        element.classList.add('is-initialized');

        const splide = new Splide(element, {
          type: 'slide',
          perPage: 3,
          perMove: 1,
          gap: '20px',
          pagination: false,
          arrows: true,
          drag: true,
          snap: true,
          speed: 800,
          padding: '20px',
          breakpoints: {
            1200: {
              perPage: 3,
            },
            992: {
              perPage: 2,
            },
            576: {
              perPage: 1,
            }
          },
        });


        splide.mount();


        const prevArrow = element.querySelector('.splide__arrow--prev');
        const nextArrow = element.querySelector('.splide__arrow--next');

        if (prevArrow) {
          prevArrow.addEventListener('click', () => {
            splide.go('<');
          });
        }

        if (nextArrow) {
          nextArrow.addEventListener('click', () => {
            splide.go('>');
          });
        }


        splide.on('mounted moved', () => {

          if (splide.index === 0) {
            prevArrow.classList.add('is-disabled');
          } else {
            prevArrow.classList.remove('is-disabled');
          }


          if (splide.index === splide.length - splide.options.perPage) {
            nextArrow.classList.add('is-disabled');
          } else {
            nextArrow.classList.remove('is-disabled');
          }
        });
      });

      const modal = context.querySelector('#speaker-modal');
      const modalClose = modal?.querySelector('#modal-close');
      const speakerCards = context.querySelectorAll('.speaker-card:not(.is-processed)');

      speakerCards.forEach(card => {
        card.classList.add('is-processed');
        
        card.addEventListener('click', function() {
          const data = this.dataset;
          modal.style.display = "none";
          modal.querySelector('#modal-image').src = data.image;
          modal.querySelector('#modal-name').innerHTML = data.name;
          modal.querySelector('#modal-designation').innerHTML = data.designation;
          modal.querySelector('#modal-company').innerHTML = data.organization;
          modal.querySelector('#modal-bio').innerHTML = data.bio;
          modal.querySelector('#social-drupal').href = data.socialDrupal.trim();
          modal.querySelector('#social-x').href = data.socialX.trim();
          modal.querySelector('#social-linkedin').href = data.socialLinkedin.trim();
          
          modal.classList.add('is-active');
          modal.style.display = "block";

        });
      });

      if (modalClose) {
        modalClose.addEventListener('click', function() {
          modal.classList.remove('is-active');
          document.body.style.overflow = 'auto';
          modal.style.display = "none";
        });
      }

      if (modal) {
        modal.addEventListener('click', function(event) {
          if (event.target === modal) {
            modal.classList.remove('is-active');
            document.body.style.overflow = 'auto';
          }
        });
      }
    }
  };
})(Drupal);