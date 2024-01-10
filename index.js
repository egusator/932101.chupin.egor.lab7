const shapesContainer = document.querySelector(".shapes-canvas");

const squareBtn = document.getElementById('square-button');
const triangleBtn = document.getElementById('triangle-button');
const circleBtn = document.getElementById('circle-button');

const inputValueBox = document.getElementById("value-box"); 


class Shape {
    getRandomSize() {
      const maxSize = 200;
      const minSize = 25;
      return Math.floor(Math.random() * maxSize) + minSize;
    }
  
    getRandomPosition(windowSideSize) {
      return Math.floor(Math.random() * windowSideSize) + "px";
    }
  
    returnDefaultColor() {
      throw new Error("cannot call abstract");
    }
  
    constructor(shapeType) {
      this.shapeType = shapeType;
      this.figureSize = this.getRandomSize();
  
      this.shape = document.createElement("div");
      this.shape.classList.add(this.shapeType);
      this.shape.setAttribute("tabindex", "0");
      this.setSize();
      const windowWidth = window.innerWidth - this.figureSize;
      this.shape.style.left = this.getRandomPosition(windowWidth);
      const windowHeight = window.innerHeight - this.figureSize;
      this.shape.style.top = this.getRandomPosition(windowHeight);
      shapesContainer.appendChild(this.shape);    this.addEventListeners();
  
      this.shape.addEventListener("dblclick", () => {
          shapesContainer.removeChild(this.shape);
      });
  
      this.shape.addEventListener("focus", () => {
        this.setSelectedColor();
      });
  
      this.shape.addEventListener("blur", () => {
        this.returnDefaultColor();
      });
    }
  
    setSize() {
      this.shape.style.width = this.figureSize + "px";
      this.shape.style.height = this.figureSize + "px";
    }
  
    setSelectedColor() {
      this.shape.style.backgroundColor = "yellow";
      this.resetSelectedShape();
    }
  
    resetSelectedShape() {
      if (Shape.selectedShape && Shape.selectedShape !== this) {
        Shape.selectedShape.resetColor();
      }
  
      Shape.selectedShape = this;
    }
  
  }
  
  class Square extends Shape {
    constructor() {
      super("square");
    }
  
    returnDefaultColor() {
      this.shape.style.backgroundColor = 
        this.shape.style.backgroundColor.replace("yellow", "red");
    }
  }
  
  class Triangle extends Shape {
  
    constructor() {
      super("triangle");
    }
  
    returnDefaultColor() {
      this.shape.style.borderBottom = 
        this.shape.style.borderBottom.replace("yellow", "blue");
    }
  
    setSize() {
      const randomSize = this.figureSize;
      this.shape.style.border = randomSize / 2 + "px solid transparent";
      this.shape.style.borderBottom = randomSize/ 2 + "px  solid blue";
    }
  
    setSelectedColor() {
      this.shape.style.borderBottom = this.shape.style.borderBottom.replace("blue", "yellow");
      this.resetSelectedShape();
    }
  
  }
  
  class Circle extends Shape {
    constructor() {
      super("circle");
    }
  
    returnDefaultColor() {
      this.shape.style.backgroundColor = 
        this.shape.style.backgroundColor.replace("yellow", "green");
    }
  }

squareBtn.addEventListener("click", function() {
  for (let i = 0; i < parseInt(inputValueBox.value); i++) {
    new Square();
  }
});

triangleBtn.addEventListener("click", function() {
    for (let i = 0; i < parseInt(inputValueBox.value); i++) {
        new Triangle();
    }
});

circleBtn.addEventListener("click", function() {
    for (let i = 0; i < parseInt(inputValueBox.value); i++) {
        new Circle();
    }
});
