import "./style.css"
import Experience from "./experience/Experience"

const experience = new Experience({
    targetElement: document.querySelector<HTMLDivElement>(".experience"),
})

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="projects">

    <div class="header">
      <div class="title">
        <h1>Current Projects</h1>
        <p>My present as a programmer</p>
      </div>
      <div class="close-btn">
        <button><img src="/close.svg" alt="" /></button>
      </div>
    </div>

    <div class="container">
      <div class="layout-grid">

        <a href="./Pendulum Parking.html" class="card" target="_blank">
          <div class="svg" style="background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>King of Bots</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="https://github.com/GlintonLiao/questopia" class="card" target="_blank">
          <div class="svg" style="background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Questopia</h3>
            <p>3D room · Personal website · Online portfolio</p>
          </div>
        </a>

        <a href="https://github.com/GlintonLiao/galaxy-generator" class="card" target="_blank">
          <div class="svg">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Galaxy Generator</h3>
            <p>Play with the galaxy by yourself</p>
          </div>
        </a>

        <a href="https://www.titongpaolu.run/" class="card" target="_blank">
          <div class="svg">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Titongpaolu</h3>
            <p>An informative website for the architectural industry</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card" target="_blank">
          <div class="svg">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card" target="_blank">
          <div class="svg">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card" target="_blank">
          <div class="svg">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card" target="_blank">
          <div class="svg">
            <img src="/svgs/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>
        
      </div>
    </div>

    <footer>
      <div class="contact">
        <a
          href="../img/Projects/QR Code.jpg"
          target="_blank"
          class="wechat-button"
        ></a>
        <a
          href="https://www.linkedin.com/in/glintonliao"
          target="_blank"
          class="linkedin-button"
        ></a>
        <a
          href="https://github.com/GlintonLiao"
          target="_blank"
          class="github-button"
        ></a>
      </div>

      <span> © Designed & Coded by Guotong Liao </span>
    </footer>
  </div>

  <div class="prev-projects">

    <div class="header">
      <div class="title">
        <h1>Previous Projects</h1>
        <p>My past as an architect</p>
      </div>
      <div class="prev-close-btn">
        <button><img src="/close.svg" alt="" /></button>
      </div>
    </div>

    <div class="container">
      <div class="layout-grid">

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Pendulum%20Parking.html" class="card" target="_blank">
          <img src="/imgs/Cover.png" class="img" alt="" />
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Archimason.html" class="card" target="_blank">
          <img
            src="/imgs/Cover-Archimason.jpg"
            class="img"
            alt=""
          />
          <div class="description">
            <h3>Archimason</h3>
            <p>Online architectral design assistant</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Protect%20Winterfell.html" class="card" target="_blank">
          <img
            src="/imgs/Cover-Protect Winterfell.jpg"
            class="img"
            alt=""
          />
          <div class="description">
            <h3>Protect Winterfell</h3>
            <p>Reconstruction of castle wall defense system</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Relevator.html" class="card" target="_blank">
          <img src="/imgs/Cover-Elevator.png" class="img" alt="" />
          <div class="description">
            <h3>Relevator</h3>
            <p>Taking elevator in an interesting way</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/South%20of%20the%20city.html" class="card" target="_blank">
          <img src="/imgs/Cover-Box.jpg" class="img" alt="" />
          <div class="description">
            <h3>South of the city</h3>
            <p>Computational commmunity design</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Artworks.html" class="card" target="_blank">
          <img src="/imgs/Cover-Artworks.jpg" class="img" alt="" />
          <div class="description">
            <h3>Digital Artworks</h3>
            <p>Daily design practice</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Poetry%20of%20triangle.html" class="card" target="_blank">
          <img
            src="/imgs/Cover-Poetry of Triangle.jpg "
            class="img"
            alt=""
          />
          <div class="description">
            <h3>Poetry of Triangle</h3>
            <p>Contemporary art museum in a historic area</p>
          </div>
        </a>

        <a href="https://glintonliao.github.io/GlintonLiao-s-Portfolio/Posts/Artstation.html" class="card" target="_blank">
          <img
            src="/imgs/Cover-Artstation.jpg"
            class="img"
            alt=""
          />
          <div class="description">
            <h3>Enhance the UX of Artstation</h3>
            <p>Create a seamless browsing experience</p>
          </div>
        </a>
    
      </div>
    </div>

    <footer>
      <div class="contact">
        <a
          href="/imgs/QR Code.jpg"
          target="_blank"
          class="wechat-button"
        ></a>
        <a
          href="https://www.linkedin.com/in/glintonliao"
          target="_blank"
          class="linkedin-button"
        ></a>
        <a
          href="https://github.com/GlintonLiao"
          target="_blank"
          class="github-button"
        ></a>
      </div>

      <span> © Designed & Coded by Guotong Liao </span>
    </footer>

  </div>
`

export { experience }
