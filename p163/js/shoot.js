AFRAME.registerComponent("Paintballs", {
  init: function () {
    this.shootpaintball();
  },
  shootpaintball: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var paintBall = document.createElement("a-entity");

        paintBall.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        paintBall.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        paintBall.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        paintBall.setAttribute("velocity", direction.multiplyScalar(-20));

        var scene = document.querySelector("#scene");
        paintBall.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });
        paintBall.setAttribute("visible", false);
        paintBall.addEventListener("collide", this.removePaintBall);

        scene.appendChild(PaintBall);
        this.shootSound();
      }
    });
  },
  removePaintBall: function (e) {
    var scene = document.querySelector("#scene");
    var element = e.detail.target.el;
    var elementHit = e.detail.body.el;
    var paint = document.createElement("a-entity");
    var pos = element.getAttribute("position")
    var rotate = elementHit.getAttribute("rotation")

    paint.setAttribute("position", {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
    paint.setAttribute("rotation", {
      x: rotate.x,
      y: rotate.y,
      z: rotate.z,
    });
    paint.setAttribute("scale", {
      x: 2,
      y: 2,
      z: 2,
    });


    var colorNum = parseInt(Math.random() * 8 + 1)

    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./images/paint splash-0" + colorNum + ".png"
    });

    paint.setAttribute("geometry", {
      primitive: "plane",
      width: 0.5,
      height: 0.5
    });
    scene.appendChild(paint)
    element.removeEventListener("collide", this.removePaintBall);
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

