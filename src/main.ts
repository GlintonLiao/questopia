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
            <h3>King of Bots</h3>
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

        <a href="./Pendulum Parking.html" class="card">
          <div class="svg" style="background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);">
            <img src="/kingofbots.svg" class="icon" alt="" />
          </div>
          <div class="description">
            <h3>King of Bots</h3>
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
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
