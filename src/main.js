import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Lenis  from 'lenis'

document.addEventListener("DOMContentLoaded", () => {

    const percentText = document.querySelector("#percent");

    const circle = document.querySelector("#loader-circle");
    const length = circle.getTotalLength();

// Make stroke-dasharray and offset equal to length (circle is invisible initially)
    circle.style.strokeDasharray = length;
    circle.style.strokeDashoffset = length;

    gsap.to(circle, {
        strokeDashoffset: 0,
        duration: 3,
        ease: "power2.inOut"
      });

      let progress = { value: 0 };

        gsap.to(progress, {
        value: 1,               // 0 → 100%
        duration: 3,
        ease: "power2.inOut",
        onUpdate: () => {
            // Update circle trace
            const offset = length * (1 - progress.value);
            circle.style.strokeDashoffset = offset;

            // Update number text
            const percent = Math.round(progress.value * 100);
            percentText.textContent = percent + "%";
        }
        });

})
window.addEventListener("load", () => {
    gsap.to(".preloader", {
        opacity: 0,
        duration: 0.8,
        delay: 3,
        ease: "power2.out",
        onComplete() {
            document.querySelector(".preloader").style.display = "none";

            // fade in site
            gsap.to("#app", {
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis()
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)


    
    const infoTracks = [
        {
            id: 1,
            title: "Pleasant Hills",
            production: "Produced by: Creating PARADI$E",
            director: "Director: GIRLSLOVETREY",
            artist: "Artist: Larry June",
            location: "Shot in Da Crib"

        },
        {
            id: 2,
            title: "Ya Feel Me",
            production: "Produced By: Cardo Got Wings",
            director: "Director: ShotByDJX",
            artist: "Artist: Larry June",
            location: "The Bay"

        },
        {
            id: 3,
            title: "Solid Plan",
            production: "Produced By: The Alchemist",
            director: "Director: Sean Kelly",
            artist: "Artist: Larry June",
            location: "Brooklyn, NY"

        },
        {
            id: 4,
            title: "30 Day Run",
            production: "Produced By: K.Fisha",
            director: "Director: Creating PARADI$E",
            artist: "Artist: Larry June",
            location: "Shot In Da Crib"

        },
    
    ]

   

    // User Scroll Opening Menu Logic 

    const gradient = 'radial-gradient(circle, transparent 46%, black 36%)';
    const gradientTwo = 'radial-gradient(circle, transparent 56%, black 36%)';
    const gradientThree = 'radial-gradient(circle, transparent 36%, black 36%)';

    function openMenu() {
        let bigHole = document.querySelector('.bigger-hole')
        let wheel = document.querySelector('.donut')
        let wheelContainer = document.querySelector('.modal-container')

        bigHole.style.opacity = 0;
        wheel.style.mask = gradient
        wheelContainer.style.mask = gradientThree
        gsap.to('.header-text', {
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.navigation', {
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.back', {
            scale: 1.1,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,
            filter: "blur(5px)",



        })
        
    }
    function closeMenu() {
        let bigHole = document.querySelector('.bigger-hole')
        let wheel = document.querySelector('.donut')
        let wheelContainer = document.querySelector('.modal-container')

        bigHole.style.opacity = 1;
        wheel.style.mask = gradientTwo
        wheelContainer.style.mask = gradient

        gsap.to('.header-text', {
            opacity: 1,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.navigation', {
            opacity: 1,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.back', {
            opacity: 1,
            scale: 1,
            filter: "blur(3px)",

            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })


    }
    function getSection(angle) {
        angle = ((angle % 360 ) + 360) % 360; 

        if (angle >= 0 && angle < 20) return 1;
        if (angle >= 20 && angle < 67) return 2;
        if (angle >= 67 && angle < 112) return 3;
        if (angle >= 112 && angle < 158) return 4;
        if (angle >= 158 && angle < 202) return 1;
        if (angle >= 202 && angle < 247) return 2;
        if (angle >= 247 && angle < 292) return 3;
        if (angle >= 292 && angle < 337) return 4;
        if (angle >= 337 && angle <= 360) return 1;

    }
    function updatePseudo(section) {
        if (section === 1) {
            gsap.set(".modal-container .line", {
                "--track-name": `"30 Day Run"`
              });            
              
              console.log('Updating the Track')

        } 
        else if(section === 2) {
            gsap.set(".modal-container .line", {
                "--track-name": `"Solid Plan"`
              });            
        }
        else if(section === 3) {
            gsap.set(".modal-container .line", {
                "--track-name": `"Ya Feel Me"`
              });            
        }
        else if(section === 4) {
            gsap.set(".modal-container .line", {
                "--track-name": `"Pleasant Hills"`
              });            
        }
    }
    
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        // User IS scrolling → open menu
        openMenu();
    
        // Clear previous timer
        clearTimeout(scrollTimeout);
    
        // Set a new timer — if no scroll happens for 150ms, user stopped
        scrollTimeout = setTimeout(() => {
            closeMenu();
        }, 150);
    });




    ScrollTrigger.create({
        trigger: ".back",
        start: "top top",
        end: "+=600%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onUpdate: ({progress}) => {
            const rotation = (progress * 360) * 5
            gsap.set(".modal-container", { rotation: rotation,
                ease: "power3.out",
                duration: 2,
                onUpdate: () => {
                    const current = gsap.getProperty('.modal-container', 'rotation')
                    const section = getSection(current)
                    console.log(section)
                    updatePseudo(section);
                }
             });

             const opp = (progress*360) * -10
             gsap.set(".line-container", {rotation: opp,
                duration: 2,
                ease: "power3.out"
             })
             gsap.to(".modal-container .line", {
                "--tip-rotation": `${rotation}deg`,   // no deg if variable already includes `deg`
                duration: 0.5,
                ease: "power3.out"
              });
        
              


        }
        
    })

    // Handle User Entry into Donut on Desktop
    const headerContainer = document.querySelector('.main-top')
    const donut = document.querySelector('.donut')
    const slice1 = document.querySelector('.slice1')
    const slice2 = document.querySelector('.slice2')
    const slice3 = document.querySelector('.slice3')
    const slice4 = document.querySelector('.slice4')


    const video = document.querySelector('.video')
    const videoInterface = document.querySelector('.video-play-interface')
    donut.addEventListener("mouseenter", () => {
        console.log("Donut Hover")
        openMenu()
        gsap.delayedCall(0.5, () => {
            slice1.style.zIndex = 80;
            slice2.style.zIndex = 80;
            slice3.style.zIndex = 80;
            slice4.style.zIndex = 80;

          });
    })
    donut.addEventListener("mouseleave", () => {
        console.log("Donut Left")
        closeMenu()
        gsap.delayedCall(0.1, () => {
            slice1.style.zIndex = 50;
            slice2.style.zIndex = 50;
            slice3.style.zIndex = 50;
            slice4.style.zIndex = 50;
          });
    })


    // Information Swap + User Select

    const title = document.querySelector('.title')
    const producer = document.querySelector('.producer')
    const director = document.querySelector('.director')
    const artist = document.querySelector('.artist')
    const location = document.querySelector('.location')



    slice1.addEventListener("click", () => {
        video.src = '/pleasant_short.mp4'
        video.muted = false
        video.loop = false
        title.textContent = infoTracks[0].title;
        producer.textContent = infoTracks[0].production
        director.textContent = infoTracks[0].director
        artist.textContent = infoTracks[0].artist
        location.textContent = infoTracks[0].location
        videoInterface.style.display = "flex"
        gsap.to('.main-top', {
            scale: 1.2,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,
        })
        gsap.to('.modal-container', {
            scale: 0.8,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            delay: 1,
        })
        gsap.to('.video-play-interface', {
            opacity: 1,
            delay: 1.5
        })
        gsap.to('.back', {
            filter: "blur(0px)"
        })
    })
    slice2.addEventListener("click", () => {
        console.log('slice 2')
        video.src = '/yafeelme.mp4'
        video.muted = false
        video.loop = false
        title.textContent = infoTracks[1].title;
        producer.textContent = infoTracks[1].production
        director.textContent = infoTracks[1].director
        artist.textContent = infoTracks[1].artist
        location.textContent = infoTracks[1].location
        videoInterface.style.display = "flex"
        gsap.to('.main-top', {
            scale: 1.2,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.back', {
            filter: "blur(0px)"
        })
        gsap.to('.modal-container', {
            scale: 0.8,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            delay: 1,
        })
        gsap.to('.video-play-interface', {
            opacity: 1,
            delay: 1.5
        })
    })
    slice3.addEventListener("click", () => {
        video.src = '/solidplan.mp4'
        video.muted = false
        video.loop = false
        title.textContent = infoTracks[2].title;
        producer.textContent = infoTracks[2].production
        director.textContent = infoTracks[2].director
        artist.textContent = infoTracks[2].artist
        location.textContent = infoTracks[2].location
        videoInterface.style.display = "flex"

        gsap.to('.main-top', {
            scale: 1.2,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.modal-container', {
            scale: 0.8,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            delay: 1,
        })
        gsap.to('.video-play-interface', {
            opacity: 1,
            delay: 1.5
        })
        gsap.to('.back', {
            filter: "blur(0px)"
        })
    })
    slice4.addEventListener("click", () => {
        video.src = '/thirtydays.mp4'
        video.muted = false
        video.loop = false
        title.textContent = infoTracks[3].title;
        producer.textContent = infoTracks[3].production
        director.textContent = infoTracks[3].director
        artist.textContent = infoTracks[3].artist
        location.textContent = infoTracks[3].location
        videoInterface.style.display = "flex"
        gsap.to('.main-top', {
            scale: 1.2,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            duration: 1,

        })
        gsap.to('.back', {
            filter: "blur(0px)"
        })
        gsap.to('.modal-container', {
            scale: 0.8,
            opacity: 0,
            pointerEvents: false,
            ease: "power3.out",
            delay: 1,
        })
        gsap.to('.video-play-interface', {
            opacity: 1,
            delay: 1.5
        })
    })




    // Video Play Settings
    const playBtn = document.querySelector('[data-play]');
    const pauseBtn = document.querySelector('[data-pause]');
    const volumenBtn = document.querySelector('.volume')
    const onHandle = document.querySelector('[data-on]');
    const offHandle = document.querySelector('[data-off]');
    const scrubber = document.querySelector('.scrubber');
    const thumb = document.querySelector('.thumb');
    const track = document.querySelector('.track')

    let status = false


    playBtn.addEventListener('click', () => {
        video.play()

        playBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    });
    pauseBtn.addEventListener('click', () => {
        video.pause()
        playBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';

    });
    volumenBtn.addEventListener('click', () => {

        if (status) {
            onHandle.style.display = 'none';
            offHandle.style.display = 'inline-block'
            video.muted = false
            status = false;
        }
        else {
            onHandle.style.display = 'inline-block';
            offHandle.style.display = 'none'
            video.muted = true

            status = true;
        }
    })



// Calculate thumb position based on click or drag
function updateFromClientX(clientX) {
    const rect = scrubber.getBoundingClientRect();
    let x = clientX - rect.left;
  
    // clamp value
    x = Math.max(0, Math.min(x, rect.width));
  
    // move thumb
    const percent = x / rect.width;
    thumb.style.left = `${percent * 100}%`;
    track.style.width = `${percent * 100}%`;
  
    // // set video time
    // video.currentTime = percent * video.duration;
  }


  let isDragging = false;

  // Mouse down = start drag
 thumb.addEventListener('mousedown', () => {
    isDragging = true;
  });
  
  // Drag across the scrubber
  document.addEventListener('mousemove', (e) => {
    if (isDragging) updateFromClientX(e.clientX);
  });
  
  // Release mouse
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  // Clicking the track jumps to that location
  scrubber.addEventListener('click', (e) => {
    updateFromClientX(e.clientX);
  });

  video.addEventListener("timeupdate", () => {
    const percent = video.currentTime / video.duration;
    thumb.style.left = `${percent * 100}%`;
    track.style.width = `${percent * 100}%`;

  });
    

})


