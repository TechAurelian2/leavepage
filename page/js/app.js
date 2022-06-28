// Copyright 2017-2022 TechAurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

"use strict";

class App {

  /**
   * Cache some frequently used DOM elements.
   */
  constructor() {
    this.comeBackAudio = document.getElementById("comeBackAudio");
    this.portrait = document.getElementById("portrait");
  }

  /**
   * Init listening to visibility change events. Play "come back" on hidden and unloaded events.
   */
  initVisibilityEvents() {
    document.addEventListener("visibilitychange", () => {

      // Log the visibilitychange event
      console.log(`${new Date().toLocaleTimeString()}: visibilitychange => ${document.visibilityState}`);

      switch (document.visibilityState) {
        case "hidden":
        case "unloaded":
          // Update the "come back" title and play the "come back" audio
          document.title = "come back to me";
          this.comeBackAudio.play();
          break;
        case "visible":
          // Update the "leave" title and make sure the "portrait" is visible
          document.title = "leave page";
          this.portrait.hidden = false;
          break;
      }
    });
  }

  /**
   * Init the application.
   */
  init() {
    document.getElementById("soundOnButton").addEventListener("click", () => {

      // Toggle "panels"
      document.getElementById("confirmationPanel").hidden = true;
      document.getElementById("instructionsPanel").hidden = false;

      // Mobile browsers have a setting for requiring a "user gesture" to play or pause an audio or video element
      // See https://blog.foolip.org/2014/02/10/media-playback-restrictions-in-blink/
      // That's why we need the "sound on" button: to load the "come back" audio element when the user clicks the button
      this.comeBackAudio.load();

      // Start listening to visibility change events
      this.initVisibilityEvents();

      // Show yet another "leave page" message
      console.log("%cleave page already", "font-size: 2rem; font-weight: bold;");
    });
  }
}

/**
 * Init the application on window load event.
 */
window.addEventListener("load", () => {
  const app = new App();
  app.init();
});