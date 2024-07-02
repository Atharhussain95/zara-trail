document.addEventListener("DOMContentLoaded", function () {
    // Initialize Lenis
    const lenis = new Lenis();
  
    lenis.on('scroll', (e) => {
      console.log(e);
    });
  
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
  
    requestAnimationFrame(raf);
  
    // GSAP Animations
    let t1 = gsap.timeline({ paused: true });
  
    t1.to(".menu-overlay", {
      duration: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power2.out",
    });
  
    t1.from(
      ".menu-link, .btn",
      {
        opacity: 0,
        y: 60,
        stagger: 0.05,
        duration: 0.75,
        ease: "power1.inOut",
      },
      "<"
    );
  
    t1.to(
      ".video-preview",
      {
        duration: 1,
        height: "200px",
        ease: "power2.out",
      },
      "<"
    );
  
    t1.to(
      ".menu-divider",
      {
        duration: 2,
        width: "100%",
        ease: "power4.out",
      },
      "<"
    );
  
    function openMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "all";
      t1.play();
    }
  
    function closeMenu() {
      document.querySelector(".menu-overlay").style.pointerEvents = "none";
      t1.reverse();
    }
  
    document.querySelector(".menu-open-btn").addEventListener("click", openMenu);
    document.querySelector(".menu-close-btn").addEventListener("click", closeMenu);
  
    // Centering GSAP effect
    gsap.fromTo(
      "nav",
      { opacity: 0, y: "-50%" },
      { opacity: 1, y: "0%", duration: 1 }
    );
  
    // Additional animations
    
    gsap.fromTo(
      ".header",
      { opacity: 0, y: "50%" },
      { opacity: 1, y: "0%", duration: 1, delay: 1 }
    );
  
    const menuOpenBtn = document.querySelector(".menu-open-btn");
    const menuCloseBtn = document.querySelector(".menu-close-btn");
  
    menuOpenBtn.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
      menuOpenBtn.classList.add("hidden");
      menuCloseBtn.classList.remove("hidden"); 
    });
  
    menuCloseBtn.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
      menuOpenBtn.classList.remove("hidden");
      menuCloseBtn.classList.add("hidden");
    });
  
    // Audio Controls
    let soundButton = document.querySelector(".soundbutton"),
      audio = document.querySelector(".audio");
  
    soundButton.addEventListener("click", (e) => {
      soundButton.classList.toggle("paused");
      audio.paused ? audio.play() : audio.pause();
    });
  
    window.onfocus = function () {
      soundButton.classList.contains("paused") ? audio.pause() : audio.play();
    };
  
    window.onblur = function () {
      audio.pause();
    };
  
    // Image Upload
    const dropArea = document.getElementById("drop-area");
    const inputFile = document.getElementById("input-file");
    const imageView = document.getElementById("img-view");
  
    inputFile.addEventListener("change", uploadImage);
  
    function uploadImage() {
      let imgLink = URL.createObjectURL(inputFile.files[0]);
      imageView.style.backgroundImage = `url(${imgLink})`;
      imageView.textContent = "";
      imageView.style.border = 0;
    }
  
    dropArea.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
  
    dropArea.addEventListener("drop", function (e) {
      e.preventDefault();
      inputFile.files = e.dataTransfer.files;
      uploadImage();
    });
  
    // Scroll animations with GSAP and Lenis
    const selector = {
      paragraph: Splitting({
        target: '.hero_paragraph_text',
        by: 'words',
      }),
      image: document.querySelector('.hero_background'),
      navItems: document.querySelectorAll('.nav_item'),
    };
  
    const initLenis = () => {
      const lenis = new Lenis({
        lerp: 0.05,
        smoothWheel: true,
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      initScroll();
    };
  
    const initScroll = () => {
      gsap.set(selector.image, { autoAlpha: 1, scale: 1, yPercent: 0 });
      gsap.set('.word', { autoAlpha: 0.4 });
  
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
  
      tl.to('.word', {
        duration: 2,
        autoAlpha: 1,
        stagger: 1,
      })
        .to(
          selector.image,
          {
            duration: 20,
            scale: 0.95,
            autoAlpha: 0,
            yPercent: -5,
          },
          0
        )
        .to(
          [selector.navItems[1], selector.navItems[2]],
          {
            duration: 20,
            yPercent: -100,
            autoAlpha: 0,
          },
          0
        );
    };
  
    window.addEventListener('DOMContentLoaded', initLenis);
  });
  
  //scrolling text 
  document.addEventListener("DOMContentLoaded", function () {
    const imageSources = [
        "https://images.unsplash.com/photo-1617566347924-ad5ebdaa014e?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1620632523414-054c7bea12ac?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1620632523414-054c7bea12ac?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1620632523414-054c7bea12ac?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1620632523414-054c7bea12ac?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach((item) => {
        const copyElements = item.querySelectorAll(".info, .name, .tag");

        copyElements.forEach((div) => {
            const copy = div.querySelector("p");

            if (copy) {
                const duplicateCopy = document.createElement("p");
                duplicateCopy.textContent = copy.textContent;
                div.appendChild(duplicateCopy);
            }
        });
    });

    const appendImages = (src) => {
        const preview1 = document.querySelector(".preview-img-1");
        const preview2 = document.querySelector(".preview-img-2");

        const img1 = document.createElement("img");
        const img2 = document.createElement("img");

        img1.src = src;
        img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        img2.src = src;
        img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        preview1.appendChild(img1);
        preview2.appendChild(img2);

        gsap.to([img1, img2], {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
            onComplete: function () {
                removeExtraImages(preview1);
                removeExtraImages(preview2);
            },
        });
    };

    function removeExtraImages(container) {
        while (container.children.length > 10) {
            container.removeChild(container.firstChild);
        }
    }

    document.querySelectorAll(".menu-item").forEach((item, index) => {
        item.addEventListener("mouseover", () => {
            mouseOverAnimation(item);
            appendImages(imageSources[index]);
        });

        item.addEventListener("mouseout", () => {
            mouseOutAnimation(item);
        });
    });

    const mouseOverAnimation = (elem) => {
        gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
            top: "-100%",
            duration: 0.3,
        });
        gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
            top: "0%",
            duration: 0.3,
        });
    };

    const mouseOutAnimation = (elem) => {
        gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
            top: "0%",
            duration: 0.3,
        });
        gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
            top: "100%",
            duration: 0.3,
        });
    };

    document.querySelector(".menu").addEventListener("mouseout", function () {
        gsap.to(".preview-img img", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            ease: "power3.out",
        });
    });

    document.addEventListener("mousemove", function (e) {
        const preview = document.querySelector(".preview");
        gsap.to(preview, {
            x: e.clientX + 300,
            y: e.clientY,
            duration: 1,
            ease: "power3.out",
        });
    });
});



//left //right
document.querySelector(".left")
.addEventListener("mousemove", function(){
    document.querySelector(".c-center-one").style.height = "100vh"
    document.querySelector("#btn-lft").style.backgroundColor = "#333"
    document.querySelector("#btn-lft").style.color = "#fff"
    document.querySelector("#btn-lft").style.border = "none"
    document.querySelector(".left").style.cursor = "pointer"
    document.querySelector("#one").style.width = "25vw"
    document.querySelector("#one").style.height = "25vh"
    document.querySelector("#one").style.opacity = "1"
    document.querySelector("#one").style.filter= "blur(0.5px)"
    document.querySelector("#two").style.width = "15vw"
    document.querySelector("#two").style.height = "17vh"
    document.querySelector("#two").style.opacity = "1"
    document.querySelector("#two").style.filter= "blur(5px)"
    document.querySelector("#three").style.width = "10vw"
    document.querySelector("#three").style.height = "12vh"
    document.querySelector("#three").style.opacity = "0.5"
    document.querySelector("#three").style.filter= "blur(20px)"
    document.querySelector("#four").style.width = "7vw"
    document.querySelector("#four").style.height = "7vh"
    document.querySelector("#four").style.opacity = "0.3"
    document.querySelector("#four").style.filter= "blur(20px)"

})

document.querySelector(".left")
.addEventListener("mouseleave", function(){
    document.querySelector(".c-center-one").style.height = "0vh"
    document.querySelector("#btn-lft").style.backgroundColor = "initial"
    document.querySelector("#btn-lft").style.border = "1px solid #333"
    document.querySelector("#btn-lft").style.color = "initial"
    document.querySelector("#one").style.width = "15vw"
    document.querySelector("#one").style.height = "10vh"
    document.querySelector("#one").style.opacity= "0"
    document.querySelector("#one").style.filter= "blur(10px)"
    document.querySelector("#two").style.width = "10vw"
    document.querySelector("#two").style.height = "10vh"
    document.querySelector("#two").style.opacity= "0"
    document.querySelector("#two").style.filter= "blur(10px)"
    document.querySelector("#three").style.width = "7vw"
    document.querySelector("#three").style.height = "9vh"
    document.querySelector("#three").style.opacity= "0"
    document.querySelector("#three").style.filter= "blur(50px)"
    document.querySelector("#four").style.width = "5vw"
    document.querySelector("#four").style.height = "5vh"
    document.querySelector("#four").style.opacity= "0"
    document.querySelector("#four").style.filter= "blur(50px)"
})


document.querySelector(".right")
.addEventListener("mousemove", function(){
    document.querySelector(".c-center-two").style.height = "100vh"
    document.querySelector("#btn-rght").style.backgroundColor = "#333"
    document.querySelector("#btn-rght").style.color = "#fff"
    document.querySelector("#btn-rght").style.border = "none"
    document.querySelector(".right").style.cursor = "pointer"
    document.querySelector("#five").style.width = "25vw"
    document.querySelector("#five").style.height = "25vh"
    document.querySelector("#five").style.opacity = "1"
    document.querySelector("#five").style.filter= "blur(0.5px)"
    document.querySelector("#six").style.width = "15vw"
    document.querySelector("#six").style.height = "17vh"
    document.querySelector("#six").style.opacity = "1"
    document.querySelector("#six").style.filter= "blur(5px)"
    document.querySelector("#seven").style.width = "10vw"
    document.querySelector("#seven").style.height = "12vh"
    document.querySelector("#seven").style.opacity = "0.5"
    document.querySelector("#seven").style.filter= "blur(20px)"
    document.querySelector("#eight").style.width = "7vw"
    document.querySelector("#eight").style.height = "7vh"
    document.querySelector("#eight").style.opacity = "0.3"
    document.querySelector("#eight").style.filter= "blur(20px)"
})

document.querySelector(".right")
.addEventListener("mouseleave", function(){
    document.querySelector(".c-center-two").style.height = "0vh"
    document.querySelector("#btn-rght").style.backgroundColor = "initial"
    document.querySelector("#btn-rght").style.border = "1px solid #333"
    document.querySelector("#btn-rght").style.color = "initial"
    document.querySelector("#five").style.width = "15vw"
    document.querySelector("#five").style.height = "10vh"
    document.querySelector("#five").style.opacity= "0"
    document.querySelector("#five").style.filter= "blur(10px)"
    document.querySelector("#six").style.width = "10vw"
    document.querySelector("#six").style.height = "10vh"
    document.querySelector("#six").style.opacity= "0"
    document.querySelector("#six").style.filter= "blur(10px)"
    document.querySelector("#seven").style.width = "7vw"
    document.querySelector("#seven").style.height = "9vh"
    document.querySelector("#seven").style.opacity= "0"
    document.querySelector("#seven").style.filter= "blur(50px)"
    document.querySelector("#eight").style.width = "5vw"
    document.querySelector("#eight").style.height = "5vh"
    document.querySelector("#eight").style.opacity= "0"
    document.querySelector("#eight").style.filter= "blur(50px)"
})

//image reveal
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector('#page4 .section');
  const sectionListItem = section.querySelectorAll('.section_list_item');
  const sectionListItemText = section.querySelectorAll('.section_list_item > h1');
  const sectionListFigure = section.querySelectorAll('.section_list_item_figure');
  const sectionMedia = section.querySelectorAll('.section_media');
  const page4 = document.getElementById('page4');

  const clipPath = {
      top: 'polygon(0 100%, 0 100%, 100% 100%, 100% 100%)',
      full: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      bottom: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
  };

  gsap.set(sectionMedia, { clipPath: clipPath.top });

  const initAnimation = () => {
      gsap.set(sectionListItemText, { y: '100%' });

      const tlText = gsap.timeline({ defaults: { duration: 1.2, ease: 'power3.inOut' } });
      tlText.to(sectionListItemText, {
          y: '0%',
          stagger: 0.04,
      }).from(
          sectionListFigure,
          {
              width: 0,
              stagger: 0.04,
          },
          0.8
      );

      addEventListeners();
  };

  const addEventListeners = () => {
      sectionListItem.forEach((item, index) => {
          const images = sectionMedia[index]?.children;

          item.addEventListener('mouseenter', () => {
              for (let i = 0; i < images.length; i++) {
                  gsap.timeline({
                      defaults: { duration: 0.4, ease: 'power3.inOut', overwrite: true },
                  }).to(sectionMedia[index], {
                      clipPath: clipPath.full,
                  });
              }
              sectionListItem.forEach((otherItem) => {
                  if (otherItem === item) {
                      otherItem.style.color = 'orange';
                  } else {
                      otherItem.style.opacity = 0.5;
                  }
              });
          });

          item.addEventListener('mouseleave', () => {
              for (let i = 0; i < images.length; i++) {
                  gsap.timeline({
                      defaults: { duration: 0.6, ease: 'power3.inOut', overwrite: true },
                  }).to(sectionMedia[index], {
                      clipPath: clipPath.bottom,
                      onComplete: () => {
                          gsap.set(sectionMedia[index], {
                              clipPath: clipPath.top,
                          });
                      },
                  });
              }
              sectionListItem.forEach((otherItem) => {
                  if (otherItem === item) {
                      otherItem.style.color = '#181818'; // Revert color back to original
                  } else {
                      otherItem.style.opacity = 1;
                  }
              });
          });
      });
  };

  const observerOptions = {
      root: null, // use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5 // trigger when 50% of the page4 is visible
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              initAnimation();
              observer.unobserve(entry.target); // Stop observing once the animation starts
          }
      });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(page4);
});



let tl = gsap.timeline({
  scrollTrigger: {
      trigger: '.main-section',
      pin: true,
      start: '50% 50%',
      end: '300% 50%',
      scrub: true,
      // markers: true,
  }
});

tl.to("#animation", {
  opacity: 1,
  filter: "blur(0px)"
})
  .to("#logo", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#social", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#seo", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#adobe", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#reels", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#html", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#digital", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#webflow", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#figma", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#javascript", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#wordpress", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })
  .to("#css", {
      opacity: 1,
      filter: "blur(0px)",
      delay: -0.3
  })


  