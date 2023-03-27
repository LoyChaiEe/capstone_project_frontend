import "./svg.css";

export function HomeSVG() {
  return (
    <img
      src={require("../assets/home.png")}
      className="nav-link-logo"
      alt="home-png"
    />
  );
}

export function LessonSVG() {
  return (
    <img
      src={require("../assets/lesson.png")}
      className="nav-link-logo"
      alt="lesson-png"
    />
  );
}

export function CharacterSVG() {
  return (
    <img
      src={require("../assets/character.png")}
      className="nav-link-logo"
      alt="character-png"
    />
  );
}

export function ProfileSVG() {
  return (
    <img
      src={require("../assets/profile.png")}
      className="nav-link-logo"
      alt="profile-png"
    />
  );
}

export function AboutSVG() {
  return (
    <img
      src={require("../assets/about.png")}
      className="nav-link-logo"
      alt="about-png"
    />
  );
}
