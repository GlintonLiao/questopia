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
      <p>My Present as a programmer</p>
    </div>
    <div class="close-btn">
      <button><img src="/close.svg" alt="" /></button>
    </div>
  </div>
  <div class="container">
    <div class="layout-grid">
      <div class="item">
        <div class="item-header">
          <div class="logo"><img src="/kingofbots.svg" alt="" /></div>
          <h2 class="title">King of Bots</h2>
        </div>
        <div class="item-description">
          An online racing game for people to interact
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

  <div class="prev-projects">
  <div class="header">
    <div class="title">
      <h1>Current Projects</h1>
      <p>My Present as a programmer</p>
    </div>
    <div class="close-btn">
      <button><img src="/close.svg" alt="" /></button>
    </div>
  </div>
  <div class="container">
    <div class="layout-grid">
      <div class="item">
        <div class="item-header">
          <div class="logo"><img src="/kingofbots.svg" alt="" /></div>
          <h2 class="title">King of Bots</h2>
        </div>
        <div class="item-description">
          An online racing game for people to interact
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
`;

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
