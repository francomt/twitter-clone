export const lightMode = () => {
  //PRIMARY BACKGROUND COLOR
  document.documentElement.style.setProperty(
    "--color-primary-background",
    "255, 255, 255"
  );
  document.documentElement.style.setProperty(
    "--color-primary-background-2",
    "242, 242, 242"
  );

  document.documentElement.style.setProperty(
    "--color-secondary-background",
    "220, 220, 220"
  );

  document.documentElement.style.setProperty(
    "--color-secondary-background-2",
    "204, 204, 204"
  );

  //FONT COLOR
  document.documentElement.style.setProperty("--color-font", "0, 0, 0");
  document.documentElement.style.setProperty("--color-font-dark", "95, 95, 95");
  document.documentElement.style.setProperty("--logo-color", "29, 161, 242");

  document.documentElement.style.setProperty("--follows-you", "rgba(1,1,1,.1)");
};

export const darkMode = () => {
  document.documentElement.style.setProperty(
    "--color-primary-background",
    "21, 32, 43"
  );
  document.documentElement.style.setProperty(
    "--color-primary-background-2",
    "25, 39, 52"
  );

  document.documentElement.style.setProperty(
    "--color-secondary-background",
    "37, 51, 65"
  );

  document.documentElement.style.setProperty(
    "--color-secondary-background-2",
    "51, 70, 89"
  );

  document.documentElement.style.setProperty("--color-font", "255, 255, 255");
  document.documentElement.style.setProperty("--logo-color", "255, 255, 255");
  document.documentElement.style.setProperty(
    "--color-font-dark",
    "205, 205, 205"
  );

  document.documentElement.style.setProperty("--follows-you", "#253341");
};
