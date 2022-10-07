import "./style.css";
import Experience from "./experience/Experience";

const experience = new Experience({
  targetElement: document.querySelector<HTMLDivElement>(".experience"),
});

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

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg" style="background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>Pendulum Parking</h3>
            <p>Maximize the value of idle parking space</p>
          </div>
        </a>
        
      </div>
    </div>
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
        <div class="item">
          <div class="item-header">
            <div class="logo"><img src="/kingofbots.svg" alt="" /></div>
            <h3 class="title">King of Bots</h3>
          </div>
          <div class="item-description">
            An online racing game for people to interact using React and SpringBoot
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="demo">Live</div>
            <div class="github">Github</div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="logo"></div>
            <div class="title"></div>
          </div>
          <div class="item-description">
            An online racing game for people to interact
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="github"></div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="logo"></div>
            <div class="title"></div>
          </div>
          <div class="item-description">
            An online racing game for people to interact
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="github"></div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="logo"></div>
            <div class="title"></div>
          </div>
          <div class="item-description">
            An online racing game for people to interact
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="github"></div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="logo"></div>
            <div class="title"></div>
          </div>
          <div class="item-description">
            An online racing game for people to interact
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="github"></div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="logo"></div>
            <div class="title"></div>
          </div>
          <div class="item-description">
            An online racing game for people to interact
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="github"></div>
          </div>
        </div>
        <div class="item">
          <div class="item-header">
            <div class="logo"></div>
            <div class="title"></div>
          </div>
          <div class="item-description">
            An online racing game for people to interact
          </div>
          <div class="link">
            <div class="demo"></div>
            <div class="github"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
